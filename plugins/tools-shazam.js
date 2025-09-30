/*// - codigo creado x ShadowCore 🎋
// - https://github.com/Yuji-XDev
// - https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U
// - no quitar creditos xD
import acrcloud from 'acrcloud'
import ytsearch from 'yt-search'

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || q.mediaType || ''
    
    if (!/video|audio/.test(mime)) {
      return conn.reply(
        m.chat,
        `✔️ *Usa el comando así:*\n\n 🌤️ Etiqueta un audio o video corto con: *${usedPrefix + command}* para intentar reconocer la canción.`,
        m
      )
    }

    let loadingMsg = await conn.sendMessage(m.chat, {
       image: { url: icono },
      caption: '🍏 *Detectando canción...*'
    }, { quoted: m })

    const buffer = await q.download()
    if (!buffer) throw 'No se pudo descargar el archivo. Intenta nuevamente.'

    const result = await acr.identify(buffer)
    const { status, metadata } = result

    if (status.code !== 0) throw status.msg || 'No se pudo identificar la canción.'

    const music = metadata.music?.[0]
    if (!music) throw 'No se encontró información de la canción.'

    const title = music.title || 'Desconocido'
    const artist = music.artists?.map(v => v.name).join(', ') || 'Desconocido'
    const album = music.album?.name || 'Desconocido'
    const release = music.release_date || 'Desconocida'

    const yt = await ytsearch(`${title} ${artist}`)
    const video = yt.videos.length > 0 ? yt.videos[0] : null

    let info = `
╭━━━〔 ✦ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 - 𝚄𝙻𝚃𝚁𝙰 ✦ 〕━━⬣
┃ ✧ 𝐂𝐚𝐧𝐜𝐢ó𝐧 𝐝𝐞𝐭𝐞𝐜𝐭𝐚𝐝𝐚 ✧  
┃────────────────────
┃ 🌿 *𝐓𝐢𝐭𝐮𝐥𝐨:* ${title}
┃ 👤 *𝐀𝐫𝐭𝐢𝐬𝐭𝐚:* ${artist}
┃ 💿 *𝐀𝐥𝐛𝐮𝐦:* ${album}
┃ 📅 *𝐋𝐚𝐧𝐳𝐚𝐦𝐢𝐞𝐧𝐭𝐨:* ${release}
┃────────────────────
${video ? `┃ 🔎 *Encontrado en YouTube:*  
┃ 🎥 𝐁𝐮𝐬𝐜𝐚𝐧𝐝𝐨: ${video.title}
┃ ⏱ 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${video.timestamp}
┃ 👁 𝐕𝐢𝐬𝐭𝐚𝐬: ${video.views.toLocaleString()}
┃ 📺 𝐂𝐚𝐧𝐚𝐥: ${video.author.name}
┃ 🔗 𝐋𝐢𝐧𝐤: ${video.url}` : 'No se encontró en YouTube'}
╰━━━━━━━━━━━━━━⬣
`.trim()

    await conn.sendMessage(m.chat, { delete: loadingMsg.key })

    if (video) {
      await conn.sendMessage(m.chat, {
        image: { url: video.thumbnail },
        caption: info
      }, { quoted: m })
    } else {
      await conn.reply(m.chat, info, m)
    }

    await conn.sendMessage(m.chat, {
      react: {
        text: '✔️',
        key: m.key
      }
    })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `> Error al identificar la música:\n${e}`, m)
  }
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
handler.register = true

export default handler
*/

// - codigo creado x ShadowCore 🎋
// - https://github.com/Yuji-XDev
// - https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U
// - no quitar creditos xD
import acrcloud from 'acrcloud'
import ytsearch from 'yt-search'
import baileys from '@whiskeysockets/baileys'

const { generateWAMessageFromContent, generateWAMessageContent, proto } = baileys

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m
    const mime = q.mimetype || ''
    const mtype = q.mtype || ''

    if (!/audio|video/.test(mime) && !/audioMessage|videoMessage/.test(mtype)) {
      return conn.reply(
        m.chat,
        `✔️ *Usa el comando así:*\n\nEtiqueta un audio o video corto con: *${usedPrefix + command}* para intentar reconocer la canción.`,
        m
      )
    }

    await m.react('🕓')

    const buffer = await q.download?.()
    if (!buffer) throw '❌ No se pudo descargar el archivo. Intenta nuevamente.'

    const result = await acr.identify(buffer)
    const { status, metadata } = result

    if (status.code !== 0) throw status.msg || 'No se pudo identificar la canción.'

    const music = metadata.music?.[0]
    if (!music) throw 'No se encontró información de la canción.'

    const title = music.title || 'Desconocido'
    const artist = music.artists?.map(v => v.name).join(', ') || 'Desconocido'
    const album = music.album?.name || 'Desconocido'
    const release = music.release_date || 'Desconocida'

    const yt = await ytsearch(`${title} ${artist}`)
    const video = yt.videos.length > 0 ? yt.videos[0] : null

    if (video) {
      const { imageMessage } = await generateWAMessageContent(
        { image: { url: video.thumbnail } },
        { upload: conn.waUploadToServer }
      )

      const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `╭━━━〔 ✦ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 ✦ 〕━━⬣
┃ ✧ 𝐂𝐚𝐧𝐜𝐢ó𝐧 𝐝𝐞𝐭𝐞𝐜𝐭𝐚𝐝𝐚 ✧  
┃────────────────────
┃ 🌿 *𝐓𝐢𝐭𝐮𝐥𝐨:* ${title}
┃ 👤 *𝐀𝐫𝐭𝐢𝐬𝐭𝐚:* ${artist}
┃ 💿 *𝐀𝐥𝐛𝐮𝐦:* ${album}
┃ 📅 *𝐋𝐚𝐧𝐳𝐚𝐦𝐢𝐞𝐧𝐭𝐨:* ${release}
┃────────────────────
┃ 🎥 𝐁𝐮𝐬𝐜𝐚𝐧𝐝𝐨: ${video.title}
┃ ⏱ 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${video.timestamp}
┃ 👁 𝐕𝐢𝐬𝐭𝐚𝐬: ${video.views.toLocaleString()}
┃ 📺 𝐂𝐚𝐧𝐚𝐥: ${video.author.name}
┃ 🔗 𝐋𝐢𝐧𝐤: ${video.url}
╰━━━━━━━━━━━━━━⬣`
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: '🎋 Rin Itoshi Ultra'
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '',
                hasMediaAttachment: true,
                imageMessage
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                      display_text: "🎵 Descargar Audio",
                      id: "ytmp3",
                      copy_code: `.ytmp3 ${video.url}`
                    })
                  },
                  {
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                      display_text: "📹 Descargar Video",
                      id: "ytmp4",
                      copy_code: `.ytmp4 ${video.url}`
                    })
                  },
                  {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                      display_text: "🌐 Ver en YouTube",
                      url: video.url,
                      merchant_url: video.url
                    })
                  }
                ]
              })
            })
          }
        }
      }, { quoted: m })

      await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
      await m.react('✔️')
    } else {
      //await conn.reply(m.chat, `✔️ Detectado:\n\n🎵 ${title}\n👤 ${artist}`, m)
      //await m.react('❌')
    }

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `> ❌ Error al identificar la música:\n${e}`, m)
  }
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
handler.register = true

export default handler