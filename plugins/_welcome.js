/*import { WAMessageStubType } from '@whiskeysockets/baileys'
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
        title: botname,
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

  const welcomeMessage = `┏ • 〇〇 • - • - • - • - • - ┓
🍓⏤͟͟͞͞Ｗ 𝐸 𝐿 𝐶 𝑂 𝑀 𝐸⏤͟͟͞͞🍁
┗┳┳• - • - • - • - • ┳┳ ┛

✿ вιєиνєи∂ισ α *_${groupMetadata.subject}_*
♧ _𝐔𝐬𝐮𝐚𝐫𝐢𝐨:_ @${numeroUsuario}
${global.welcom1}
● ${groupMetadata.desc?.slice(0, 200) || "Sin descripción."}
❏ αнσяα ѕσмσѕ *${groupSize}* мιєивяσѕ
❍ _𝐅𝐞𝐜𝐡𝐚:_ ${dia}, ${fecha}
❁ _𝐇𝐨𝐫𝐚:_ ${hora}
≡ _𝐏𝐚𝐢𝐬:_ ${pais}

> *➮ Puedes usar _#help_ para ver la lista de comandos. ૮₍｡˃ ᵕ ˂ ｡₎ა*`

  const byeMessage = `✿ α∂ισѕ ∂є *_${groupMetadata.subject}_*
 ${global.welcom2}
♧ _𝐔𝐬𝐮𝐚𝐫𝐢𝐨:_ @${numeroUsuario}
❏ _𝐌𝐢𝐞𝐦𝐛𝐫𝐨𝐬:_ ${groupSize}
❍ _𝐅𝐞𝐜𝐡𝐚:_ ${dia}, ${fecha}
❁ _𝐇𝐨𝐫𝐚:_ ${hora}
≡ _𝐏𝐚𝐢𝐬:_ ${pais}

> 💔 Te esperamos pronto de regreso.
> *➮ Puedes usar _#help_ para ver la lista de comandos. ૮₍｡˃ ᵕ ˂ ｡₎ა*

*🍓＊✿❀»»——>♡<——««❀✿＊🍁*`

  if (chat?.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    await conn.sendMessage(m.chat, { 
      image: { url: ppUrl }, 
      caption: welcomeMessage, 
      ...fakeContext, 
      footer: club, 
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
      footer: club, 
      buttons: [
        { buttonId: "#p", buttonText: { displayText: "𝗣𝗜𝗡𝗚" }, type: 1 },
        { buttonId: "#menu", buttonText: { displayText: "𝗠𝗘𝗡𝗨" }, type: 1 }
      ], 
      headerType: 4
    }, { quoted: fkontak })
  }
}
*/


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

  const usuarioJid = m.messageStubParameters?.[0] || m.key.participant
  const numeroUsuario = usuarioJid.split('@')[0]
  const pais = getPais(numeroUsuario)

  const generarImagenUrl = async (tipo) => {
    const username = numeroUsuario
    const guildName = groupMetadata.subject
    const memberCount = participants.length
    const avatar = await conn.profilePictureUrl(usuarioJid, 'image').catch(_ => 'https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
    const background = 'https://i.pinimg.com/originals/fb/f1/6b/fbf16b6d23fb9a8915a5c414bd15a023.jpg'
    const guildIcon = 'https://github.com/Yuji-XDev.png'
    return `https://api-nv.eliasaryt.pro/api/generate/welcome-image?username=${username}&guildName=${guildName}&memberCount=${memberCount}&avatar=${avatar}&background=${background}&guildIcon=${guildIcon}&key=hYSK8YrJpKRc9jSE`
  }

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
        title: botname,
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

  const welcomeMessage = `┏ • 〇〇 • - • - • - • - • - ┓
🍓⏤͟͟͞͞Ｗ 𝐸 𝐿 𝐶 𝑂 𝑀 𝐸⏤͟͟͞͞🍁
┗┳┳• - • - • - • - • ┳┳ ┛

✿ вιєиνєн∂ισ α *_${groupMetadata.subject}_*
♧ _𝐔𝐬𝐮𝐚𝐫𝐢𝐨:_ @${numeroUsuario}
${global.welcom1}
● ${groupMetadata.desc?.slice(0, 200) || "Sin descripción."}
❏ αнσяα ѕσмσѕ *${groupSize}* мιєивяσѕ
❍ _𝐅𝐞𝐜𝐡𝐚:_ ${dia}, ${fecha}
❁ _𝐇𝐨𝐫𝐚:_ ${hora}
≡ _𝐏𝐚𝐢𝐬:_ ${pais}

> *➮ Puedes usar _#help_ para ver la lista de comandos. ૮₍｡˃ ᵕ ˂ ｡₎ა*`

  const byeMessage = `✿ α∂ισѕ ∂є *_${groupMetadata.subject}_*
 ${global.welcom2}
♧ _𝐔𝐬𝐮𝐚𝐫𝐢𝐨:_ @${numeroUsuario}
❏ _𝐌𝐢𝐞𝐦𝐛𝐫𝐨𝐬:_ ${groupSize}
❍ _𝐅𝐞𝐜𝐡𝐚:_ ${dia}, ${fecha}
❁ _𝐇𝐨𝐫𝐚:_ ${hora}
≡ _𝐏𝐚𝐢𝐬:_ ${pais}

> 💔 Te esperamos pronto de regreso.
> *➮ Puedes usar _#help_ para ver la lista de comandos. ૮₍｡˃ ᵕ ˂ ｡₎ა*

*🍓＊✿❀»»——>♡<——««❀✿＊🍁*`

  if (chat?.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const imgWelcome = await generarImagenUrl('welcome')
    await conn.sendMessage(m.chat, { 
      image: { url: imgWelcome }, 
      caption: welcomeMessage, 
      ...fakeContext, 
      footer: club, 
      buttons: [
        { buttonId: "#reg shadow.18", buttonText: { displayText: "𝗔𝘂𝘁𝗼 𝘃𝗲𝗿𝗶𝗳𝗶𝗰𝗮𝗿" }, type: 1 },
        { buttonId: "#menu", buttonText: { displayText: "𝗠𝗘𝗡𝗨" }, type: 1 }
      ], 
      headerType: 4
    }, { quoted: fkontak })
  }

  if (chat?.welcome && (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE)) {
    const imgBye = await generarImagenUrl('bye')
    await conn.sendMessage(m.chat, { 
      image: { url: imgBye }, 
      caption: byeMessage, 
      ...fakeContext, 
      footer: club, 
      buttons: [
        { buttonId: "#p", buttonText: { displayText: "𝗣𝗜𝗡𝗚" }, type: 1 },
        { buttonId: "#menu", buttonText: { displayText: "𝗠𝗘𝗡𝗨" }, type: 1 }
      ], 
      headerType: 4
    }, { quoted: fkontak })
  }
}