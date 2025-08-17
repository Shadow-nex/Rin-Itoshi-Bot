import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = '✦◜ ៹ 𝑵𝒆𝒘 𝑴𝒆𝒎𝒃𝒆𝒓 ៹ ◞✦'
  let txt1 = '✦◜ ៹ 𝑩𝒚𝒆 𝑴𝒆𝒎𝒃𝒆𝒓 ៹ ◞✦'
  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `╭━〔 ✦ 🌟 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 🌟 ✦ 〕━╮
┃ ☘️ Grupo: *${groupMetadata.subject}*
┃ 🙋 Usuario: @${m.messageStubParameters[0].split`@`[0]}
┃ 💬 ${global.welcom1}
┃
┃ 👥 Miembros actuales: *${groupSize}*
┃ 🎯 Disfruta tu estadía y participa.
┃ 💡 Usa *#help* para ver comandos.
╰━━━━━━━━━━━━━━━━━━━━━━╯`    
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }
  
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `╭━〔 ✦ 🌸 𝐃𝐞𝐬𝐩𝐞𝐝𝐢𝐝𝐚 🌸 ✦ 〕━╮
┃ 🧪 Grupo: *${groupMetadata.subject}*
┃ 👋 Usuario: @${m.messageStubParameters[0].split`@`[0]}
┃ 💬 ${global.welcom2}
┃
┃ 👥 Miembros actuales: *${groupSize}*
┃ 🐾 Te esperamos pronto de regreso.
┃ 💡 Usa *#help* para ver comandos.
╰━━━━━━━━━━━━━━━━━━━━━━╯`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }}
