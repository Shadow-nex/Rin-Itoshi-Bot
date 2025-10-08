import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys'
import yts from 'yt-search'

let handler = async (m, { conn, text }) => {
  try {
    const youtubeRegex = /https?:\/\/(?:www\.|youtu\.be\/|youtube\.com\/watch\?v=)[^\s]+/i
    const match = m.text?.match(youtubeRegex)
    if (!match) return

    // Evita interferir con comandos tipo /ytmp3 o !ytmp4
    if (/^[\\/!#.]/.test(m.text)) return

    const url = match[0]
    await m.react('⏳')

    const result = await yts({ videoId: url.split('v=')[1] || url.split('/').pop() })
    if (!result || !result.title) return m.reply('⚠️ No se pudo obtener la información del video.')

    const video = result
    const media = await prepareWAMessageMedia(
      { image: { url: video.thumbnail } },
      { upload: conn.waUploadToServer }
    )

    const interactiveMessage = {
      body: {
        text: `===========================
✿ *\`${video.title}\`*

= ° 🌵 *𝙰𝚄𝚃𝙾𝚁:* ${video.author.name}
= ° 🍁 *𝚅𝙸𝚂𝚃𝙰𝚂:* ${video.views?.toLocaleString() || 0}
= ° 🌿 *𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽:* ${video.timestamp}
= ° 🔗 *𝚄𝚁𝙻:* ${url}
===========================`
      },
      footer: { text: '┊▬ ʀɪɴ ɪᴛᴏsʜɪ вσт | ву ѕнα∂σω 𝚇𝙳 ▬ ❜┊' },
      header: {
        title: '乂 𝘠𝘖𝘜𝘛𝘜𝘉𝘌 - 𝘚𝘌𝘈𝘙𝘊𝘏 乂',
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
              title: '      ᴏᴘᴄɪᴏɴᴇs ᴅᴇ ᴅᴇsᴄᴀʀɢᴀ 🎋',
              sections: [
                {
                  title: video.title,
                  rows: [
                    {
                      header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐌𝐏𝟑',
                      title: '✿ 🎧 Descargar audio',
                      description: `✎ Duración: ${video.timestamp}`,
                      id: `/ytmp3 ${url}`
                    },
                    {
                      header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐌𝐏𝟒',
                      title: '✿ 📹 Descargar video',
                      description: `✎ Duración: ${video.timestamp}`,
                      id: `/ytmp4 ${url}`
                    },
                    {
                      header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐌𝐏𝟑 𝐃𝐎𝐂',
                      title: '✿ 🎋 Audio en documento',
                      description: `✎ Duración: ${video.timestamp}`,
                      id: `/ytmp3doc ${url}`
                    },
                    {
                      header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐌𝐏𝟒 𝐃𝐎𝐂',
                      title: '✿ 🎋 Video en documento',
                      description: `✎ Duración: ${video.timestamp}`,
                      id: `/ytmp4doc ${url}`
                    },
                    {
                      header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐀',
                      title: '✿ ⚡ Descarga rápida de audio',
                      description: `✎ Duración: ${video.timestamp}`,
                      id: `/yta ${url}`
                    },
                    {
                      header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐕',
                      title: '✿ ⚡ Descarga rápida de video',
                      description: `✎ Duración: ${video.timestamp}`,
                      id: `/ytv ${url}`
                    }
                  ]
                }
              ]
            })
          },
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: '🌐 Abrir en YouTube',
              url
            })
          }
        ],
        messageParamsJson: ''
      }
    }

    const msg = generateWAMessageFromContent(
      m.chat,
      { interactiveMessage },
      { userJid: conn.user.jid, quoted: m }
    )
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    await m.react('✔️')
  } catch (err) {
    console.error(err)
    await m.react('❌')
    m.reply('⚠️ Error al procesar el enlace de YouTube.')
  }
}

handler.command = /^linkyoutube$/i // Comando oculto (nunca se usa)
handler.customPrefix = /https?:\/\/(?:www\.|youtu\.be\/|youtube\.com\/watch\?v=)[^\s]+/i
handler.explicit = true // Fuerza ejecución aunque no sea comando

export default handler