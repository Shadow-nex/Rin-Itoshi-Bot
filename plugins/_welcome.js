/*import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  // Función para obtener país por prefijo
  const getPais = (numero) => {
    const paisesPorPrefijo = {
      "1": "🇺🇸 Estados Unidos",
      "34": "🇪🇸 España",
      "52": "🇲🇽 México",
      "54": "🇦🇷 Argentina",
      "55": "🇧🇷 Brasil",
      "56": "🇨🇱 Chile",
      "57": "🇨🇴 Colombia",
      "58": "🇻🇪 Venezuela",
      "591": "🇧🇴 Bolivia",
      "593": "🇪🇨 Ecuador",
      "595": "🇵🇾 Paraguay",
      "598": "🇺🇾 Uruguay",
      "502": "🇬🇹 Guatemala",
      "503": "🇸🇻 El Salvador",
      "504": "🇭🇳 Honduras",
      "505": "🇳🇮 Nicaragua",
      "506": "🇨🇷 Costa Rica",
      "507": "🇵🇦 Panamá",
      "51": "🇵🇪 Perú",
      "53": "🇨🇺 Cuba",
      "91": "🇮🇳 India"
    }
    for (let i = 1; i <= 3; i++) {
      const prefijo = numero.slice(0, i)
      if (paisesPorPrefijo[prefijo]) return paisesPorPrefijo[prefijo]
    }
    return "🌎 Desconocido"
  }

  // JID y número del usuario que entra/sale
  const usuarioJid = m.messageStubParameters[0] || m.key.participant
  const numeroUsuario = usuarioJid.split('@')[0]
  const pais = getPais(numeroUsuario)

  // Foto de perfil del usuario o fallback
  const ppUrl = await conn.profilePictureUrl(usuarioJid, 'image')
    .catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

  // Miniatura para fkontak
  const thumbRes = await fetch("https://files.catbox.moe/jkw74m.jpg")
  const thumbBuffer = await thumbRes.buffer()

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      locationMessage: {
        name: "☆ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 𝚄𝙻𝚃𝚁𝙰 ☆ ⭐",
        jpegThumbnail: thumbBuffer
      }
    },
    participant: "0@s.whatsapp.net"
  }

  // Fecha y hora
  const fechaObj = new Date()
  const hora = fechaObj.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
  const fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
  const dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })

  // Cantidad de miembros
  const groupSize = participants.length + ((m.messageStubType === 27) ? 1 : ((m.messageStubType === 28 || m.messageStubType === 32) ? -1 : 0))

  const dev = "Rin Itoshi"
  const icono = "https://files.catbox.moe/jkw74m.jpg"

  // Contexto para mencionar al usuario
  const fakeContext = {
    contextInfo: {
      isForwarded: true,
      mentionedJid: [usuarioJid],
      externalAdReply: {
        title: "☆ Rin Itoshi Bot ☆",
        body: dev,
        mediaUrl: null,
        description: null,
        previewType: "PHOTO",
        thumbnailUrl: icono,
        sourceUrl: "https://instagram.com",
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }

  // Mensaje de bienvenida
  const welcomeMessage = `*╔═══════════════*
*╟* ⿻ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 ✰
*╠═══════════════* *╟* ${groupMetadata.subject} *╟*
≡‹⧽🌂 Usuario: @${numeroUsuario}
≡‹⧽⚽ Fecha ingreso: ${dia}, ${fecha}
≡‹⧽📡 Hora ingreso: ${hora}
≡‹⧽⚡ País: ${pais}
≡‹⧽🌷 Miembros actuales: ${groupSize}
*╚═══════════════*

🍂 Descripción:
${groupMetadata.desc?.slice(0, 200) || "Sin descripción."}`

  // Mensaje de despedida
  const byeMessage = `*╔═══════════════*
*╟* ⿻ ADIOS ✰
*╠═══════════════* *╟* 🧪 ${groupMetadata.subject} *╟*
≡‹⧽👋 Usuario: @${numeroUsuario}
≡‹⧽📅 Fecha salida: ${dia}, ${fecha}
≡‹⧽⏰ Hora salida: ${hora}
≡‹⧽⚡ País: ${pais}
≡‹⧽👥 Miembros: ${groupSize}
*╚═══════════════*

> 💔 Te esperamos pronto de regreso.
🍂 Usa #help para ver comandos.`

  // Enviar mensaje de bienvenida
  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption: welcomeMessage, ...fakeContext }, { quoted: fkontak })
  }

  // Enviar mensaje de despedida
  if (chat.welcome && (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE)) {
    await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption: byeMessage, ...fakeContext }, { quoted: fkontak })
  }
}*/

import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  const chat = global.db.data.chats[m.chat]

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

  const usuarioJid = m.messageStubParameters[0] || m.key.participant
  const numeroUsuario = usuarioJid.split('@')[0]
  const pais = getPais(numeroUsuario)

  const ppUrl = await conn.profilePictureUrl(usuarioJid, 'image')
    .catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

  const thumbBuffer = await fetch(icono).then(res => res.buffer())

  const fkontak = {
    key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" },
    message: { locationMessage: { name: "☆ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 𝚄𝙻𝚃𝚁𝙰 ☆ ⭐", jpegThumbnail: thumbBuffer } },
    participant: "0@s.whatsapp.net"
  }

  const fechaObj = new Date()
  const hora = fechaObj.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
  const fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
  const dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })

  const groupSize = participants.length + ((m.messageStubType === 27) ? 1 : ((m.messageStubType === 28 || m.messageStubType === 32) ? -1 : 0))

  const fakeContext = {
    contextInfo: {
      isForwarded: true,
      mentionedJid: [usuarioJid],
      externalAdReply: {
        title: "☆ Rin Itoshi Bot ☆",
        body: dev,
        mediaUrl: null,
        description: null,
        previewType: "PHOTO",
        thumbnailUrl: icono,
        sourceUrl: "https://instagram.com",
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }

  const welcomeMessage = `*╔═══════════════*
*╟* ⿻ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 ✰
*╠═══════════════* 
*╟* ${groupMetadata.subject}
≡‹⧽🌂 Usuario: @${numeroUsuario}
≡‹⧽⚽ Fecha ingreso: ${dia}, ${fecha}
≡‹⧽📡 Hora ingreso: ${hora}
≡‹⧽⚡ País: ${pais}
≡‹⧽🌷 Miembros actuales: ${groupSize}
*╚═══════════════*

🍂 Descripción:
${groupMetadata.desc?.slice(0, 200) || "Sin descripción."}

🌟 Usa #help o #menu para ver comandos.`

  const byeMessage = `*╔═══════════════*
*╟* ⿻ ADIOS ✰
*╠═══════════════* 
*╟* 🧪 ${groupMetadata.subject}
≡‹⧽👋 Usuario: @${numeroUsuario}
≡‹⧽📅 Fecha salida: ${dia}, ${fecha}
≡‹⧽⏰ Hora salida: ${hora}
≡‹⧽⚡ País: ${pais}
≡‹⧽👥 Miembros: ${groupSize}
*╚═══════════════*

💔 Te esperamos pronto de regreso.
🌟 Usa #help o #menu para ver comandos.`

  if (chat?.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    await conn.sendMessage(m.chat, { 
      image: { url: ppUrl }, 
      caption: welcomeMessage, 
      ...fakeContext, 
      footer: "☆ Rin Itoshi Bot ☆", 
      buttons: [
        { buttonId: "#reg shadow.18", buttonText: { displayText: "𝗔𝘂𝘁𝗼 𝘃𝗲𝗿𝗶𝗳𝗶𝗰𝗮𝗿" }, type: 1 },
        { buttonId: "#menu", buttonText: { displayText: "𝗠𝗘𝗡𝗨" }, type: 1 }
      ], 
      headerType: 4
    }, { quoted: fkontak })
  }

  if (chat?.welcome && (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE)) {
    await conn.sendMessage(m.chat, { 
      image: { url: ppUrl }, 
      caption: byeMessage, 
      ...fakeContext, 
      footer: "☆ Rin Itoshi Bot ☆", 
      buttons: [
        { buttonId: "#p", buttonText: { displayText: "𝗣𝗜𝗡𝗚" }, type: 1 },
        { buttonId: "#menu", buttonText: { displayText: "𝗠𝗘𝗡𝗨" }, type: 1 }
      ], 
      headerType: 4
    }, { quoted: fkontak })
  }
}