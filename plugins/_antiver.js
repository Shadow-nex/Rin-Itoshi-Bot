import { downloadContentFromMessage } from '@whiskeysockets/baileys'

let handler = m => m
handler.before = async function (m, { conn }) {
  let media, msg, type
  const chat = global.db.data.chats[m.chat]
  if (!chat?.antiver || chat?.isBanned) return
  if (!(m.mtype == 'viewOnceMessageV2' || m.mtype == 'viewOnceMessageV2Extension')) return

  msg = m.mtype == 'viewOnceMessageV2'
    ? m.message.viewOnceMessageV2.message
    : m.message.viewOnceMessageV2Extension.message

  type = Object.keys(msg)[0]

  let downloadType = ''
  if (type === 'imageMessage') downloadType = 'image'
  else if (type === 'videoMessage') downloadType = 'video'
  else if (type === 'audioMessage') downloadType = 'audio'

  if (!downloadType) return
  media = await downloadContentFromMessage(msg[type], downloadType)
  let buffer = Buffer.from([])
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk])
  }

  const fileSize = formatFileSize(msg[type]?.fileLength || 0)
  const description = `
✔ *ANTI VER UNA VEZ* ✔

✦ *No ocultes:* ${type === 'imageMessage' ? '`Imagen` 📸' : type === 'videoMessage' ? '`Vídeo` 📹' : '`Mensaje de voz` 🔊'}
- 🍬 *Usuario:* @${m.sender.split('@')[0]}
${msg[type]?.caption ? `- *Texto:* ${msg[type].caption}` : ''}
- 📦 *Tamaño:* ${fileSize}
  `.trim()

  if (type === 'imageMessage') {
    await conn.sendFile(m.chat, buffer, 'recovered.jpg', description, m, false, { mentions: [m.sender] })
  } else if (type === 'videoMessage') {
    await conn.sendFile(m.chat, buffer, 'recovered.mp4', description, m, false, { mentions: [m.sender] })
  } else if (type === 'audioMessage') {
    await conn.reply(m.chat, description, m, { mentions: [m.sender] })
    await conn.sendMessage(m.chat, { 
      audio: buffer, 
      fileName: 'recovered.mp3', 
      mimetype: 'audio/mpeg', 
      ptt: true 
    }, { quoted: m })
  }
}

export default handler


// =========================
function formatFileSize(bytes) {
  if (!bytes) return 'Desconocido'
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}