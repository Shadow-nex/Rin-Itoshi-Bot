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

    let fechaObj = new Date()
    let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
    let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
    let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })
   
  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = ` 💖 B I E N V E N I D O 🌀
≡ 🌱 \`ɢʀᴜᴘᴏ:\` *${groupMetadata.subject}*
≡ 🌂 \`ᴜsᴇʀ:\` *@${m.messageStubParameters[0].split`@`[0]}*
≡ ⚽ \`ғᴇᴄʜᴀ ɪɴɢʀᴇsᴏ:\` *${dia}, ${fecha}*
≡ 📡 \`ʜᴏʀᴀ ɪɴɢʀᴇsᴏ:\` *${hora}*
≡ 🌷 \`ᴍɪᴇᴍʙʀᴏs ᴀᴄᴛᴜᴀʟᴇs:\` *${groupSize}*

🍂 *Descripción:*
${groupMetadata.desc?.slice(0, 200) || "Sin descripción."}`    
    await conn.sendMini(m.chat, '✦◜ ៹ 𝑵𝒆𝒘 𝑴𝒆𝒎𝒃𝒆𝒓 ៹ ◞✦', dev, bienvenida, img, img, redes, fkontak)
  }
  
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = ` 🌂 A D I O S 🌱
≡ 🧪 \`ɢʀᴜᴘᴏ:\` *${groupMetadata.subject}*
≡ 👋 \`ᴜsᴇʀ:\` *@${m.messageStubParameters[0].split`@`[0]}*
≡ 📅 \`ғᴇᴄʜᴀ sᴀʟɪᴅᴀ:\` *${dia}, ${fecha}*
≡ ⏰ \`ʜᴏʀᴀ sᴀʟɪᴅᴀ:\` *${hora}*
≡ 👥 \`ᴍɪᴇᴍʙʀᴏs:\` *${groupSize}*

> 🐾 Te esperamos pronto de regreso.
> 🍂 Usa *#help* para ver comandos.`
    await conn.sendMini(m.chat, '✦◜ ៹ 𝑩𝒚𝒆 𝑴𝒆𝒎𝒃𝒆𝒓 ៹ ◞✦', dev, bye, img, img, redes, fkontak)
  }
}