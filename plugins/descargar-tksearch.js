import fetch from 'node-fetch'
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let tiktokSessions = new Map()

let handler = async (m, { conn, args, command, usedPrefix }) => {
  let query = args.join(" ").trim()

  if (command === 'tksearch') {
    if (!query) {
      return m.reply(`✍️ Escribe lo que quieres buscar\n\n🌀 Ejemplo:\n${usedPrefix}tksearch edits de rin itoshi`)
    }

    tiktokSessions.set(m.chat, { videos: [], currentIndex: 0, query })

    try {
      const res = await fetch(`https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(query)}`)
      const json = await res.json()

      if (!json.meta || !json.meta.length) return m.reply('❌ No se encontraron videos.')

      let session = { videos: json.meta, currentIndex: 0, query }
      tiktokSessions.set(m.chat, session)

      return await sendTikTokVideo(session, m, conn, usedPrefix)
    } catch (e) {
      console.error(e)
      return m.reply('❌ Error al buscar videos.')
    }
  }

  if (command === 'tkseguir') {
    let session = tiktokSessions.get(m.chat)
    if (!session || !session.videos.length) return m.reply('❌ Usa primero el comando .tksearch')

    if (session.currentIndex + 1 >= session.videos.length) return m.reply('✅ No hay más resultados. Vuelve a buscar.')

    session.currentIndex += 1
    return await sendTikTokVideo(session, m, conn, usedPrefix)
  }
}

async function sendTikTokVideo(session, m, conn, usedPrefix) {
  const video = session.videos[session.currentIndex]

  // Aseguramos que haya un link válido (puede ser video.play, video.hd, etc.)
  const url = video.play || video.hd || video.nowm || video.url
  if (!url) return conn.reply(m.chat, '❌ No se pudo obtener el video.', m)

  const text = `🎥 *Resultado ${session.currentIndex + 1}/${session.videos.length}*
🔍 _${session.query}_

✅ Pulsa el botón para ver más videos.`

  const msg = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
    interactiveMessage: {
      body: { text },
      footer: { text: 'TIKTOK SEARCH 🎵' },
      header: {
        videoMessage: { url },
        hasMediaAttachment: true
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({
              display_text: "▶️ Siguiente Video",
              id: `${usedPrefix}tkseguir`
            })
          }
        ]
      }
    }
  }), { userJid: m.sender })

  return await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.command = ['tksearch', 'tkseguir']
handler.help = ['tksearch <texto>', 'tkseguir']
handler.tags = ['tiktok']

export default handler