import fs from 'fs'
import fetch from 'node-fetch'
import { WAMessageStubType } from '@whiskeysockets/baileys'

async function generarBienvenida({ conn, userId, groupMetadata, chat }) {
  const username = `@${userId.split('@')[0]}`
  const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Mexico_City", day: 'numeric', month: 'long', year: 'numeric' })
  const groupSize = groupMetadata.participants.length + 1
  const desc = groupMetadata.desc?.toString() || 'Sin descripción'
  const mensaje = (chat.sWelcome || 'Edita con el comando "setwelcome"')
    .replace(/{usuario}/g, `${username}`)
    .replace(/{grupo}/g, `*${groupMetadata.subject}*`)
    .replace(/{desc}/g, `${desc}`)

  const caption = `👋 ¡Hola, ${username}!
Bienvenid@ al grupo *_${groupMetadata.subject}_*

🍃 *_Esperamos que disfrutes tu estadía._*

🌿 \`𝐈𝐧𝐟𝐨 - 𝐆𝐫𝐨𝐮𝐩:\`
 • ᴍɪᴇᴍʙʀᴏs: ${groupSize}
 • ʜᴏʀᴀ: undefined
 • ғᴇᴄʜᴀ: ${fecha}
 • ᴅᴇsᴄʀɪᴘᴄɪᴏɴ: ${mensaje}`
  return { pp, caption, username }
}

async function generarDespedida({ conn, userId, groupMetadata, chat }) {
  const username = `@${userId.split('@')[0]}`
  const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Mexico_City", day: 'numeric', month: 'long', year: 'numeric' })
  const groupSize = groupMetadata.participants.length - 1
  const desc = groupMetadata.desc?.toString() || 'Sin descripción'
  const mensaje = (chat.sBye || 'Edita con el comando "setbye"')
    .replace(/{usuario}/g, `${username}`)
    .replace(/{grupo}/g, `*${groupMetadata.subject}*`)
    .replace(/{desc}/g, `*${desc}*`)

  const caption = `💐 ${username}, ha salido del grupo *"_${groupMetadata.subject}_"*

🌾 ${mensaje}

📉 \`𝐄𝐬𝐭𝐚𝐝𝐨 𝐀𝐜𝐭𝐮𝐚𝐥:\`
 • ᴍɪᴇᴍʙʀᴏs: ${groupSize}
 • ʜᴏʀᴀ: undefined
 • ғᴇᴄʜᴀ: ${fecha}`
  return { pp, caption, username }
}

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0
  const chat = global.db.data.chats[m.chat]
  const userId = m.messageStubParameters[0]
  const who = userId || '0@s.whatsapp.net'

  const meta = groupMetadata
  const totalMembers = meta.participants.length
  const groupSubject = meta.subject
  const date = new Date().toLocaleString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit' })

  let thumbBuffer
  try {
    const res = await fetch('https://i.postimg.cc/rFfVL8Ps/image.jpg')
    thumbBuffer = Buffer.from(await res.arrayBuffer())
  } catch {
    thumbBuffer = null
  }

  const fkontak = {
    key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
    message: { locationMessage: { name: '🍉 𝙒𝙚𝙡𝙘𝙤𝙢𝙚 - 𝙆𝙖𝙣𝙚𝙠𝙞 𝙈𝘿 📡', jpegThumbnail: thumbBuffer } },
    participant: '0@s.whatsapp.net'
  }

  if (chat.welcome && m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const { pp, caption, username } = await generarBienvenida({ conn, userId, groupMetadata, chat })

    const productMessage = {
      product: {
        productImage: { url: pp },
        productId: '24529689176623820',
        title: `🌸 Bienvenida/o causa • ${groupSubject}`,
        description: caption,
        currencyCode: 'USD',
        priceAmount1000: '100000',
        retailerId: 1677,
        url: `https://wa.me/${userId.split('@')[0]}`,
        productImageCount: 1
      },
      businessOwnerJid: who,
      caption: caption,
      footer: `👥 Miembros: ${totalMembers} 📆 ${date}`,
      interactiveButtons: [
        {
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: '🌿 ᴍᴇɴᴜ - ᴋᴀɴᴇᴋɪ ᴀɪ 💐',
            id: '.menu'
          })
        }
      ],
      mentions: [userId]
    }

    await conn.sendMessage(m.chat, productMessage, { quoted: fkontak })
  }

  if (chat.welcome && (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {
    const { pp, caption, username } = await generarDespedida({ conn, userId, groupMetadata, chat })

    const productMessage = {
      product: {
        productImage: { url: pp },
        productId: '24529689176623820',
        title: `🍂 Adios • ${groupSubject}`,
        description: caption,
        currencyCode: 'USD',
        priceAmount1000: '100000',
        retailerId: 1677,
        url: `https://wa.me/${userId.split('@')[0]}`,
        productImageCount: 1
      },
      businessOwnerJid: who,
      caption: caption,
      footer: `👥 Miembros: ${totalMembers} 📆 ${date}`,
      interactiveButtons: [
        {
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: '🌿 ᴍᴇɴᴜ - ᴋᴀɴᴇᴋɪ ᴀɪ 💐',
            id: '.menu'
          })
        }
      ],
      mentions: [userId]
    }

    await conn.sendMessage(m.chat, productMessage, { quoted: fkontak })
  }
}

export { generarBienvenida, generarDespedida }
export default handler