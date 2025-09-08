import chalk from 'chalk'
import fetch from 'node-fetch'
import ws from 'ws'
let { WAMessageStubType } = await import('@whiskeysockets/baileys')
import { promises as fs } from 'fs'
import path from 'path'

let handler = m => m

handler.before = async function (m, { conn }) {
  if (!m.messageStubType || !m.isGroup) return

  const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  

  let chat = global.db.data.chats[m.chat]
  let usuario = `@${m.sender.split('@')[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'

  let param = m.messageStubParameters?.[0] || ''

  let nombre = `⋆｡˚ ❀ ˚｡⋆｡˚✦˚｡⋆｡˚ ❀ ˚｡⋆
   💎 𝑪𝒂𝒎𝒃𝒊𝒐 𝒅𝒆 𝑵𝒐𝒎𝒃𝒓𝒆 💎
⋆｡˚ ❀ ˚｡⋆｡˚✦˚｡⋆｡˚ ❀ ˚｡⋆
👤 Usuario: *${usuario}*
🆕 Nuevo nombre: 『 *${param}* 』
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let foto = `✧･ﾟ: ✧･ﾟ:☁️:･ﾟ✧:･ﾟ✧
      🌷 Foto del Grupo 🌷
✧･ﾟ: ✧･ﾟ:☁️:･ﾟ✧:･ﾟ✧
👤 Usuario: *${usuario}*
📸 Imagen actualizada con éxito.
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let edit = `╭─────────────➤
   ⚙️ 𝑪𝒐𝒏𝒇𝒊𝒈 𝑮𝒓𝒖𝒑𝒐 ⚙️
╰─────────────➤
👤 Usuario: *${usuario}*
${param == 'on'
    ? '🌱 Solo administradores pueden editar.'
    : '🍂 Todos los miembros pueden configurar.'}
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let newlink = `❖───────────────❖
     🌂 Enlace Nuevo 🌂
❖───────────────❖
👤 Generado por: *${usuario}*
💖 Aquí tienes la nueva invitación.
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let status = `✦━━━━━━━✦
   🛡️ Estado del Grupo
✦━━━━━━━✦
👤 Acción de: *${usuario}*
${param == 'on'
    ? '⚽💨 Grupo cerrado — Solo administradores pueden escribir.'
    : '☘️ Grupo abierto — Todos pueden escribir.'}`

  let admingp = `⋆｡˚ 🐁 ˚｡⋆｡˚✦˚｡⋆｡˚ 🐁 ˚｡⋆
   👑 𝐍𝐮𝐞𝐯𝐨 𝐀𝐝𝐦𝐢𝐧
⋆｡˚ 🐁 ˚｡⋆｡˚✦˚｡⋆｡˚ 🐁 ˚｡⋆
🔰 *@${param.split('@')[0]}*
🌀 Nombrado por: *${usuario}*
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let noadmingp = `⋆｡˚ 💥 ˚｡⋆｡˚✦˚｡⋆｡˚ 💥 ˚｡⋆
   ⚠️ 𝐀𝐝𝐦𝐢𝐧 𝐑𝐞𝐦𝐨𝐯𝐢𝐝𝐨
⋆｡˚ 💥 ˚｡⋆｡˚✦˚｡⋆｡˚ 💥 ˚｡⋆
🔻 *@${param.split('@')[0]}*
🗑️ Removido por: *${usuario}*
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  if (chat.detect && m.messageStubType == 2) {
    const uniqid = (m.isGroup ? m.chat : m.sender)
    const sessionPath = './Sessions/'
    for (const file of await fs.readdir(sessionPath)) {
      if (file.includes(uniqid)) {
        await fs.unlink(path.join(sessionPath, file))
        console.log(
          `${chalk.yellow.bold('[ Archivo Eliminado ]')} ${chalk.greenBright(`'${file}'`)}\n` +
          `${chalk.blue('(Session PreKey)')} ${chalk.redBright('que provoca el "undefined" en el chat')}`
        )
      }
    }

  } else if (chat.detect && m.messageStubType == 21) {
    await this.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })  

  } else if (chat.detect && m.messageStubType == 22) {
    await this.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 23) {
    await this.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 25) {
    await this.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  

  } else if (chat.detect && m.messageStubType == 26) {
    await this.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  

  } else if (chat.detect && m.messageStubType == 29) {
    await this.sendMessage(m.chat, { text: admingp, mentions: [m.sender, param] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 30) {
    await this.sendMessage(m.chat, { text: noadmingp, mentions: [m.sender, param] }, { quoted: fkontak })

  } else {
    if (m.messageStubType == 2) return
    console.log({
      messageStubType: m.messageStubType,
      messageStubParameters: m.messageStubParameters,
      type: WAMessageStubType[m.messageStubType], 
    })
  }
}

export default handler