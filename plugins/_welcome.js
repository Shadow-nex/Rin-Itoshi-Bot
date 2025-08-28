import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  const fkontak = { 
    "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, 
    "message": { "contactMessage": { 
      "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
    }}, 
    "participant": "0@s.whatsapp.net"
  }

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
    .catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  let groupSize = participants.length
  if (m.messageStubType == 27) groupSize++;
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--;

  let fecha = moment().tz("America/Lima").format("DD/MM/YYYY")
  let hora = moment().tz("America/Lima").format("HH:mm")

  let reglas = `
1️⃣ Respeta a todos los miembros.  
2️⃣ No spam ni links peligrosos.  
3️⃣ Evita discusiones innecesarias.  
4️⃣ No enviar contenido +18.  
5️⃣ Usa los comandos con moderación.  
`.trim()

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `╭━〔 ✦ 🌟 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 🌟 ✦ 〕━╮
┃ ☘️ *Grupo:* ${groupMetadata.subject}
┃ 🙋 *Usuario:* @${m.messageStubParameters[0].split`@`[0]}
┃ 📅 *Fecha ingreso:* ${fecha}
┃ ⏰ *Hora ingreso:* ${hora}
┃ 👥 *Miembros actuales:* ${groupSize}
┃
┃ 📖 *Descripción:* 
┃ ${groupMetadata.desc?.slice(0, 200) || "Sin descripción."}
┃
┃ 📜 *Reglas*
┃ ${reglas.split("\n").map(r => "┃ " + r).join("\n")}
┃
┃ 💡 Usa *#help* para ver comandos.
╰━━━━━━━━━━━━━━━━━━━━━━╯`    
    await conn.sendMini(m.chat, '✦◜ ៹ 𝑵𝒆𝒘 𝑴𝒆𝒎𝒃𝒆𝒓 ៹ ◞✦', dev, bienvenida, img, img, redes, fkontak)
  }
  
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `╭━〔 ✦ 🌸 𝐃𝐞𝐬𝐩𝐞𝐝𝐢𝐝𝐚 🌸 ✦ 〕━╮
┃ 🧪 *Grupo:* ${groupMetadata.subject}
┃ 👋 *Usuario:* @${m.messageStubParameters[0].split`@`[0]}
┃ 📅 *Fecha salida:* ${fecha}
┃ ⏰ *Hora salida:* ${hora}
┃ 👥 *Miembros actuales:* ${groupSize}
┃
┃ 🐾 Te esperamos pronto de regreso.
┃ 💡 Usa *#help* para ver comandos.
╰━━━━━━━━━━━━━━━━━━━━━━╯`
    await conn.sendMini(m.chat, '✦◜ ៹ 𝑩𝒚𝒆 𝑴𝒆𝒎𝒃𝒆𝒓 ៹ ◞✦', dev, bye, img, img, redes, fkontak)
  }
}