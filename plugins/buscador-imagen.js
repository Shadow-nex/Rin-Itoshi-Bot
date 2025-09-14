//• @David-Chian
//- https://github.com/David-Chian

import { googleImage } from '@bochilteam/scraper'
import pkg from '@whiskeysockets/baileys'

const { generateWAMessageFromContent, proto } = pkg

async function sendAlbumMessage(conn, jid, medias, options = {}) {
  if (typeof jid !== 'string') throw new TypeError(`jid must be string, recibido: ${typeof jid}`)
  if (!Array.isArray(medias) || medias.length < 2) throw new RangeError('⚠️ Se necesitan al menos 2 imágenes para un álbum')

  const caption = options.caption || ''
  const delay = !isNaN(options.delay) ? options.delay : 500

  const albumMsg = generateWAMessageFromContent(
    jid,
    {
      albumMessage: proto.AlbumMessage.fromObject({
        expectedImageCount: medias.length
      })
    },
    {}
  )

  await conn.relayMessage(jid, albumMsg.message, { messageId: albumMsg.key.id })
  
  for (let i = 0; i < medias.length; i++) {
    const { url } = medias[i]

    const imgMsg = await conn.sendMessage(
      jid,
      {
        image: { url },
        ...(i === 0 ? { caption } : {})
      },
      { quoted: options.quoted || null }
    )

    imgMsg.message.messageContextInfo = {
      messageAssociation: {
        associationType: 1,
        parentMessageKey: albumMsg.key
      }
    }

    await conn.relayMessage(jid, imgMsg.message, { messageId: imgMsg.key.id })
    await new Promise((r) => setTimeout(r, delay))
  }

  return albumMsg
}

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un texto para buscar una imagen.`, m)

  await m.react('🕒')
  await conn.sendMessage(m.chat, {
    text: '✧ *Descargando su imagen...*',
    contextInfo: {
      externalAdReply: {
        title: 'Buscador de Imágenes',
        body: 'By Rin Itoshi',
        mediaType: 1,
        showAdAttribution: true,
        sourceUrl: 'https://github.com/David-Chian'
      }
    }
  }, { quoted: m })

  try {
    const res = await googleImage(text)
    const images = []

    for (let i = 0; i < 10; i++) {
      const img = await res.getRandom()
      if (img) images.push({ url: img })
    }

    if (images.length < 2) {
      await conn.reply(m.chat, '✧ No se encontraron suficientes imágenes para un álbum.', m)
      return
    }

    const caption = `❀ *Resultados de búsqueda para:* ${text}`
    await sendAlbumMessage(conn, m.chat, images, { caption, quoted: m })

    await m.react('✅')
  } catch (err) {
    console.error(err)
    await m.react('❌')
    conn.reply(m.chat, '⚠︎ Hubo un error al obtener las imágenes.', m)
  }
}

handler.help = ['imagen <texto>']
handler.tags = ['buscador', 'tools']
handler.command = ['imagen', 'image', 'img']
handler.register = true

export default handler