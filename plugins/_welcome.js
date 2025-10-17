import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  const chat = global.db.data.chats[m.chat]
  if (!chat?.welcome) return true

  const getPais = (numero) => {
    const paises = {
      "1": "🇺🇸 Estados Unidos", "34": "🇪🇸 España", "52": "🇲🇽 México",
      "54": "🇦🇷 Argentina", "55": "🇧🇷 Brasil", "56": "🇨🇱 Chile",
      "57": "🇨🇴 Colombia", "58": "🇻🇪 Venezuela", "591": "🇧🇴 Bolivia",
      "593": "🇪🇨 Ecuador", "595": "🇵🇾 Paraguay", "598": "🇺🇾 Uruguay",
      "502": "🇬🇹 Guatemala", "503": "🇸🇻 El Salvador", "504": "🇭🇳 Honduras",
      "505": "🇳🇮 Nicaragua", "506": "🇨🇷 Costa Rica", "507": "🇵🇦 Panamá",
      "51": "🇵🇪 Perú", "53": "🇨🇺 Cuba", "91": "🇮🇳 India"
    }
    for (let i = 1; i <= 3; i++) {
      const prefijo = numero.slice(0, i)
      if (paises[prefijo]) return paises[prefijo]
    }
    return "🌎 Desconocido"
  }

  const usuarioJid = m.messageStubParameters?.[0] || m.key.participant
  const numeroUsuario = usuarioJid.split('@')[0]
  const pais = getPais(numeroUsuario)

  const avatarUsuario = await conn.profilePictureUrl(usuarioJid, 'image')
    .catch(() => 'https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')

  const generarImagenUrl = async (tipo) => {
    const username = `@${numeroUsuario}`
    const guildName = groupMetadata.subject
    const memberCount = participants.length
    const guildIcon = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
    const key = 'hYSK8YrJpKRc9jSE'

    const url = `https://api-nv.ultraplus.click/api/generate/welcome-image?username=${encodeURIComponent(username)}&guildName=${encodeURIComponent(guildName)}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatarUsuario)}&background=https://files.catbox.moe/7cckvp.jpg&guildIcon=https://shadow-xyz.vercel.app/img/shadow13.jpg&key=${key}&type=${tipo}`

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('API no responde')
      return url
    } catch {
      return avatarUsuario
    }
  }

  const thumbBuffer = await fetch('https://files.catbox.moe/7sbozb.jpg').then(res => res.buffer())

  const fkontak = {
    key: { participants: "0@s.whatsapp.net", remoteJid: m.chat, fromMe: false, id: "Halo" },
    message: { locationMessage: { name: "☆ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 𝚄𝙻𝚃𝚁𝙰 ☆ 🌸", jpegThumbnail: thumbBuffer } },
    participant: "0@s.whatsapp.net"
  }

  const fechaObj = new Date()
  const hora = fechaObj.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
  const fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
  const dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })
  const groupSize = participants.length + ((m.messageStubType === 27) ? 1 : ((m.messageStubType === 28 || m.messageStubType === 32) ? -1 : 0))

  const contextInfo = {
    mentionedJid: [usuarioJid],
    externalAdReply: {
      title: '🍉 𝙒𝙚𝙡𝙘𝙤𝙢𝙚 𝙍𝙞𝙣 𝙄𝙩𝙤𝙨𝙝𝙞 - 𝘽𝙤𝙩 🌿',
      body: '',
      previewType: "PHOTO",
      thumbnailUrl: 'https://shadow-xyz.vercel.app/img/shadow1.jpg',
      sourceUrl: "https://instagram.com",
      mediaType: 1
    }
  }

  const welcomeMessage = `
  ╔═══════════════════╗
           \`\`\`𝖡𝖨𝖤𝖭𝖵𝖤𝖭𝖨𝖣𝖮/𝖠\`\`\`
  ╚═══════════════════╝
╭────⋆ ╤╤╤ ✯ ╤╤╤ ⋆╯
│ 🌾 *Usuario:* ${'@' + numeroUsuario}
│ 📚 *Grupo:* ${groupMetadata.subject}
│• | ✧︿︿ . . . .
│ 🎋 *Miembros:* ${groupSize}
│ 🍉 *Fecha:* ${dia}, ${fecha}, ${hora}
│ ☃️ *Lugar:* ${pais}
╰━━━⬣

> ✨ *${groupMetadata.desc?.slice(0, 120) || "Sin descripción."}*
> ૮₍｡˃ ᵕ ˂ ｡₎ა 💕 Usa *_#help_* para explorar comandos.`

  const byeMessage = `
  ╔═══════════════════╗
          \`\`\`HASTA PRONTO\`\`\`
  ╚═══════════════════╝
╭────⋆ ╤╤╤ ✯ ╤╤╤ ⋆╯
│ 🌾 *Usuario:* ${'@' + numeroUsuario}
│ 📚 *Grupo:* ${groupMetadata.subject}
│• | ✧︿︿ . . . 
│ 🎋 *Miembros:* ${groupSize}
│ 🍉 *Fecha:* ${dia}, ${fecha}, ${hora}
│ ☃️ *Lugar:* ${pais}
╰━━━⬣

> 🌧️ *Esperamos verte de nuevo pronto.*
> 🍃 Usa *_#help_* si vuelves, estaremos aquí.`

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const imgWelcome = await generarImagenUrl('welcome')
    await conn.sendMessage(m.chat, { 
      image: { url: imgWelcome },
      caption: welcomeMessage,
      contextInfo,
      mentions: [usuarioJid]
    }, { quoted: fkontak })
  }

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    const imgBye = await generarImagenUrl('bye')
    await conn.sendMessage(m.chat, {
      image: { url: imgBye },
      caption: byeMessage,
      contextInfo,
      mentions: [usuarioJid]
    }, { quoted: fkontak })
  }
}