import axios from 'axios'
import moment from 'moment-timezone'
import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, args }) => {
  try {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let { exp, coin, level, role } = global.db.data.users[userId] || { exp: 0, coin: 0, level: 0, role: 'Sin rango' }
    let { min, xp, max } = xpRange(level, global.multiplier || 1)
    let name = await conn.getName(userId)

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.keys(global.plugins).length

    let videos = [
      'https://files.catbox.moe/vwlhum.mp4',
      'https://files.catbox.moe/tc1zxx.mp4',
      'https://files.catbox.moe/o3ggg8.mp4',
      'https://files.catbox.moe/uzi4do.mp4',
      'https://files.catbox.moe/9gtjpt.mp4'
    ]
    let video = videos[Math.floor(Math.random() * videos.length)]

    const getThumbnail = async () => {
      const res = await axios.get("https://files.catbox.moe/ipahdi.jpg", { responseType: "arraybuffer" })
      return res.data
    }
    const thumbnail = await getThumbnail()

    // fake product message
    const shadow_xyz = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        productMessage: {
          product: {
            productImage: { mimetype: "image/jpeg", jpegThumbnail: thumbnail },
            title: "☆ ⚡ 𝐌𝐄𝐍𝐔 | 𝐅𝐔𝐍𝐂𝐈𝐎𝐍𝐄𝐒 🦠☆",
            description: "Funciones y comandos disponibles",
            currencyCode: "USD",
            priceAmount1000: 5000,
            retailerId: "menu-funciones",
            productImageCount: 1
          },
          businessOwnerJid: "13135550002@s.whatsapp.net"
        }
      }
    }

    // placeholders si no los tienes
    let club = '💫 ᴇsᴛɪʟᴏ: Rɪɴ Iᴛᴏsʜɪ'
    let redes = 'https://instagram.com'
    let suittag = '51999999999' // tu número
    let channelRD = { id: '120363187089999999@newsletter', name: 'RinItoshiBot' }
    let dev = '🧠 Dᴇᴠ: Shadow.xyz'

    await conn.sendMessage(m.chat, {
      text: `╭─〔 🍂 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎... 🌷 〕─⬣\n┃ 🌱 *𝒄𝒐𝒏𝒆𝒄𝒕𝒂𝒏𝒅𝒐 𝒂 𝒍𝒂 𝒃𝒂𝒔𝒆...*\n┃ 📡 *sɪɴᴄʀᴏɴɪᴢᴀɴᴅᴏ ᴍᴇɴᴜ...*\n╰────────────────────╯\n${club}`,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ Shadow 🪴',
          body: club,
          thumbnailUrl: 'https://i.pinimg.com/originals/87/ad/73/87ad73e9f7ed89dcf4fc502f84c4e75c.png',
          sourceUrl: redes,
          mediaType: 1
        }
      }
    }, { quoted: m })

    await new Promise(resolve => setTimeout(resolve, 2000))

    let fechaObj = new Date()
    let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
    let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
    let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })
    let readMore = String.fromCharCode(8206).repeat(4001)

    let menuText = `
🍄 ${ucapan()} @${userId.split('@')[0]}

💠 *Usuario:* ${name}
💰 *Coins:* ${coin}
🌿 *Nivel:* ${level}
📊 *Exp:* ${exp}
🎗 *Rango:* ${role}

⏳ *Runtime:* ${uptime}
📚 *Comandos:* ${totalCommands}
👥 *Usuarios:* ${totalreg}

🕒 *Hora:* ${hora}
📅 *Fecha:* ${fecha}
🌙 *Día:* ${dia}
${readMore}
`.trim()

    const menuText1 = `
🍭 *CONVERTS*
> /tourl <imagen>
> /catbox
> /tomp3
> /tovideo
> /tts <lang> <texto>

${dev}`

    await m.react('🌤️')
    await conn.sendMessage(m.chat, {
      video: { url: video },
      gifPlayback: true,
      caption: menuText,
      footer: menuText1,
      buttons: [
        { buttonId: '/code', buttonText: { displayText: "🧠 Sᴇʀʙᴏᴛ" }, type: 1 },
        { buttonId: '/menulist', buttonText: { displayText: "📜 Mᴇɴᴜ ʟɪsᴛᴀ" }, type: 1 }
      ],
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '⚽ Rɪɴ Iᴛᴏsʜɪ 𝐌𝐃 🍧',
          body: 'Shadow.xyz | Official Menu',
          thumbnailUrl: 'https://i.pinimg.com/originals/db/d2/3f/dbd23fd3c722ee5f46a633cfcc242c14.jpg',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: shadow_xyz })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { text: `✘ Error al enviar el menú:\n${e.message}` }, { quoted: m })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'allmenu']
handler.register = true
export default handler

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}ʜ ${minutes}ᴍ ${seconds}s`
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH')
  if (time >= 5 && time < 12) return "☀️ ʙᴜᴇɴᴏs ᴅɪᴀs"
  if (time >= 12 && time < 18) return "🌤️ ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs"
  return "🌙 ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs"
}