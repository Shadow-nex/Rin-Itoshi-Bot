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

  const generarImagenUrl = async (tipo) => {
    const username = numeroUsuario
    const guildName = groupMetadata.subject
    const memberCount = participants.length
    const avatar = await conn.profilePictureUrl(usuarioJid, 'image').catch(_ => 'https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg')
    const background = 'https://files.catbox.moe/b9p86d.jpg'
    const guildIcon = 'https://github.com/Yuji-XDev.png'

    const url = `https://api-nv.eliasaryt.pro/api/generate/welcome-image?username=${encodeURIComponent(username)}&guildName=${encodeURIComponent(guildName)}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatar)}&background=${encodeURIComponent(background)}&guildIcon=${encodeURIComponent(guildIcon)}&key=hYSK8YrJpKRc9jSE&type=${tipo}`

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('API no responde')
      return url
    } catch {
      return background
    }
  }

  const thumbUrl = Array.isArray(icono) ? icono[Math.floor(Math.random() * icono.length)] : icono
  const thumbBuffer = await fetch('https://files.catbox.moe/7sbozb.jpg').then(res => res.buffer())

  const fkontak = {
    key: { participants: "0@s.whatsapp.net", remoteJid: m.chat, fromMe: false, id: "Halo" },
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
        previewType: "PHOTO",
        thumbnailUrl: thumbUrl,
        sourceUrl: "https://instagram.com",
        mediaType: 1
      }
    }
  }

  const welcomeMessage1 = `\`\`\`  ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟🎋⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`  ໍ۪۫꒰̥᷑ໍ᮫۪۫𝆬🍈 ࣮࣮᷑᷑𝗕֘𝗜۫𝗘〪࣮࣫𝗡۪۫࣫𝗩𝗘᮫࣮𝆬᷑𝗡۫𝗜֘ ᮫𝆬ᤲ࣫𝗗֘ ᮫𝆬ᤲ࣫𝗢֘ ᮫𝆬ᤲ࣫ 🌿᩠̥ໍ۪۫꒱̥ໍ۪۫ \`\`\`
\`\`\` ︶ִֶָ⏝︶ִֶָ⏝˖ ࣪ ୨✧୧ ࣪ ˖⏝ִֶָ︶⏝ִֶָ︶ \`\`\``
  const welcomeMessage2 = `
♧ _𝐔𝐬𝐮𝐚𝐫𝐢𝐨:_ @${numeroUsuario}
✿ _𝐆𝐫𝐨𝐮𝐩:_ *${groupMetadata.subject}*

● ${groupMetadata.desc?.slice(0, 200) || "Sin descripción."}

❏ αнσяα ѕσмσѕ *${groupSize}* мιєивяσѕ
❍ _𝐅𝐞𝐜𝐡𝐚:_ ${dia} | ${fecha} | ${hora}
≡ _𝐏𝐚𝐢𝐬:_ ${pais}

> *➮ Puedes usar _#help_ para ver la lista de comandos. ૮₍｡˃ ᵕ ˂ ｡₎ა*`

  const byeMessage1 = `\`\`\`  ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟🎋⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`  ໍ۪۫꒰̥᷑ໍ᮫۪۫𝆬🍈 ࣮࣮᷑᷑𝗔〪֘۫࣫𝗗۪۫࣫𝗜᮫࣮𝆬᷑𝗢۫֘ ᮫𝆬ᤲ࣫𝗦֘ ᮫𝆬ᤲ࣫֘ ᮫𝆬ᤲ࣫ 🌿᩠̥ໍ۪۫꒱̥ໍ۪۫ \`\`\`
\`\`\` ︶ִֶָ⏝︶ִֶָ⏝˖ ࣪ ୨✧୧ ࣪ ˖⏝ִֶָ︶⏝ִֶָ︶ \`\`\``
  const byeMessage2 = `
✿ _𝐆𝐫𝐨𝐮𝐩:_ *${groupMetadata.subject}*
♧ _𝐔𝐬𝐮𝐚𝐫𝐢𝐨:_ @${numeroUsuario}
${global.welcom2}
❏ _𝐌𝐢𝐞𝐦𝐛𝐫𝐨𝐬:_ ${groupSize}
❍ _𝐅𝐞𝐜𝐡𝐚:_ ${dia} | ${fecha} | ${hora}
≡ _𝐏𝐚𝐢𝐬:_ ${pais}

> 💔 Te esperamos pronto de regreso.
> *➮ Puedes usar _#help_ para ver la lista de comandos. ૮₍｡˃ ᵕ ˂ ｡₎ა*

*🍓＊✿❀»»——>♡<——««❀✿＊🍁*`

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const imgWelcome = await generarImagenUrl('welcome')
    await conn.sendMessage(m.chat, { 
      image: { url: imgWelcome }, 
      caption: welcomeMessage1, 
      ...fakeContext, 
      footer: welcomeMessage2, 
      buttons: [
        { buttonId: "#reg shadow.18", buttonText: { displayText: "⿻͢⃟𖤍۬፝͡ 𝗔𝗨𝗧𝗢 𝗩𝗘𝗥𝗜𝗙𝗜𝗖𝗔𝗥͜͡🕸️︎͢⸸𖾏ꦿ" }, type: 1 },
        { buttonId: "#menu", buttonText: { displayText: "⿻͢⃟𖤍۬፝͡ 𝗠 𝗘 𝗡 𝗨͜͡🌱︎͢⸸𖾏ꦿ" }, type: 1 }
      ], 
      headerType: 4
    }, { quoted: fkontak })
  }

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    const imgBye = await generarImagenUrl('bye')
    await conn.sendMessage(m.chat, {
      image: { url: imgBye },
      caption: byeMessage1, 
      ...fakeContext, 
      footer: byeMessage2, 
      buttons: [
        { buttonId: "#p", buttonText: { displayText: "⿻͢⃟𖤍۬፝͡ 𝗣 𝗜 𝗡 𝗚͜͡🌿︎͢⸸𖾏ꦿ" }, type: 1 },
        { buttonId: "#menu", buttonText: { displayText: "⿻͢⃟𖤍۬፝͡𝗠 𝗘 𝗡 𝗨͜͡☁️︎͢⸸𖾏ꦿ" }, type: 1 }
      ], 
      headerType: 4
    }, { quoted: fkontak })
  }
}