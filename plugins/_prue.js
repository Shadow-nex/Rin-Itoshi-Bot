/*import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys'
import yts from 'yt-search'

const handler = async (m, { conn }) => {
  const youtubeRegex = /https?:\/\/(?:www\.|youtu\.be\/|youtube\.com\/watch\?v=)[^\s]+/i
  const match = m.text?.match(youtubeRegex)
  if (!match) return

  // 🛡️ Evita activarse si el mensaje tiene más texto además del link
  if (m.text.trim() !== match[0]) return

  await m.react('🕸️')

  const url = match[0]
  const search = await yts(url)
  const video = search.videos[0]

  if (!video) {
    await m.react('❌')
    return conn.reply(m.chat, '⚠️ No se encontró el video en YouTube.', m)
  }

  const media = await prepareWAMessageMedia(
    { image: { url: video.thumbnail } },
    { upload: conn.waUploadToServer }
  )

  const interactiveMessage = {
    body: {
      text: `===========================
✿ *\`${video.title}\`*

= ° 🌵 *𝙰𝚄𝚃𝙾𝚁:* ${video.author.name}
= ° 🍁 *𝚅𝙸𝚂𝚃𝙰𝚂:* ${video.views.toLocaleString()}
= ° 🌿 *𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽:* ${video.timestamp}
= ° 🔗 *𝚄𝚁𝙻:* ${video.url}
===========================`
    },
    footer: { text: '┊▬ ʀɪɴ ɪᴛᴏsʜɪ вσт | ву ѕнα∂σω 𝚇𝙳 ▬ ❜┊' },
    header: {
      title: '乂 𝘠𝘖𝘜𝘛𝘜𝘉𝘌 - 𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋 乂',
      hasMediaAttachment: true,
      imageMessage: media.imageMessage
    },
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: '    🌷  ᴏᴘᴄɪᴏɴᴇs ᴅᴇ ᴅᴇsᴄᴀʀɢᴀ 🎋',
            sections: [
              {
                title: video.title,
                rows: [
                  {
                    header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐌𝐏𝟑',
                    title: '✿ 🎧 Descargar audio',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/ytmp3 ${video.url}`
                  },
                  {
                    header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐌𝐏𝟒',
                    title: '✿ 📹 Descargar video',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/ytmp4 ${video.url}`
                  },
                  {
                    header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐌𝐏𝟑 𝐃𝐎𝐂',
                    title: '✿ 🌿 Audio en documento',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/ytmp3doc ${video.url}`
                  },
                  {
                    header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐌𝐏𝟒 𝐃𝐎𝐂',
                    title: '✿ 👽 Video en documento',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/ytmp4doc ${video.url}`
                  },
                  {
                    header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐀',
                    title: '✿ ⚡ Descarga rápida de audio',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/yta ${video.url}`
                  },
                  {
                    header: '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 • 𝐘𝐓𝐕',
                    title: '✿ ⚡ Descarga rápida de video',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/ytv ${video.url}`
                  }
                ]
              }
            ]
          })
        },
        {
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '🍧 Abrir en YouTube',
            url: video.url
          })
        }
      ],
      messageParamsJson: ''
    }
  }

  const msg = generateWAMessageFromContent(
    m.chat,
    {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage
        }
      }
    },
    { quoted: m }
  )

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
  await m.react('✔️')
}

handler.customPrefix = /https?:\/\/(?:www\.|youtu\.be\/|youtube\.com\/watch\?v=)[^\s]+/i
handler.command = new RegExp
export default handler*/