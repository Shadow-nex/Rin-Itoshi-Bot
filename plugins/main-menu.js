import axios from 'axios'
import moment from 'moment-timezone'
import fs from 'fs'
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
    const shadow_xyz = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        productMessage: {
          product: {
            productImage: {
              mimetype: "image/jpeg",
              jpegThumbnail: thumbnail
            },
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
    await conn.sendMessage(m.chat, {
      text: `╭─〔 🍂 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎... 🌷 〕─⬣\n┃ 🌱 *𝒄𝒐𝒏𝒆𝒄𝒕𝒂𝒏𝒅𝒐 𝒂 𝒍𝒂 𝒃𝒂𝒔𝒆 𝒅𝒆 𝒅𝒂𝒕𝒐𝒔...*\n┃ 📡 *sɪɴᴄʀᴏɴɪᴢᴀɴᴅᴏ ᴍᴇɴᴜ...*\n╰─ ─ ─ ─ ─ ─ ─ ─ ─ ╴ ╴ ╴ ╴\n> ${club}`,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ ᴅᴠ.sʜᴀᴅᴏᴡ 🪴',
          body: club,
          thumbnailUrl: 'https://files.catbox.moe/q8b2br.jpg',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: false
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
\`\`\`      ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟🧃⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜\`\`\`
\`\`\`      ּ͜⌒໊݂݁͜           ݊ ּ͜⌒໊݂݁͜⏜݄݊͜ ͜⏜݆ׄ͜⌒໊݂͜.           ּ͜⌒໊݂݁͜\`\`\`
\`\`\`            ꮚ ׅ ${ucapan()} ৎ୭ \`\`\`
\`\`\`             ׅ ෫@${userId.split('@')[0]} ಒ \`\`\`
\`\`\`     ׅ   . ׅ    ֹ─ׂ┄꯭──ׂ ͜છֶ̤͝🍰ֶ͝છ̤͜ ┄꯭─┄ׅ─   . ׅ   . ׅ    ֹ\`\`\`


╔══════════════════╗
║ ⁞)ֶָ֢֯᷼͝🐾 [ 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢 ]  ׅ🐾ׁ᷒ᮬ ׅ║
╠══════════════════╣
║ ৎּٜ̊🐱ꨩ〪̥〭ᴜsᴇʀ: *${name}*
║ ৎּٜ̊🌻ꨩ〪̥〭 ɴɪᴠᴇʟ: *${level}*
║ ৎּٜ̊🍀ꨩ〪̥〭 ᴇxᴘ ᴛᴏᴛᴀʟ: *${exp}*
║ ৎּٜ̊🌸ꨩ〪̥〭 ʀᴀɴɢᴏ: ${role}
║ ৎּٜ̊🌈ꨩ〪̥〭 ᴘʀᴏɢʀᴇsᴏ: ░▒▓████████
╚══════════════════╝

${readMore}

╔══════════════════╗
║ ⁞)ֶָ֢֯᷼͝🦄 [ ʙᴏᴛ ɪɴғᴏ ] ׅ🦄ׁ᷒ᮬ ׅ ║
╠══════════════════╣
║ ৎּٜ̊🔧ꨩ〪̥〭ᴍᴏᴅᴏ: *ɢʀᴀᴛɪs 🧪*
║ ৎּٜ̊👑ꨩ〪̥〭 ᴏᴡɴᴇʀ: *+${suittag}*
║ ৎּٜ̊🤖ꨩ〪̥〭 ᴛɪᴘᴏ: ${(conn.user.jid == global.conn.user.jid ? '🌟 ʙᴏᴛ ᴏғɪᴄɪᴀʟ' : '✨ sᴜʙ ʙᴏᴛ')}
║ ৎּٜ̊📖ꨩ〪̥〭 ᴄᴏᴍᴀɴᴅᴏs: *${totalCommands}*
║ ৎּٜ̊🧑‍🤝‍🧑ꨩ〪̥〭 ᴛᴏᴛᴀʟ ᴜsᴇʀs: *${totalreg}*
║ ৎּٜ̊⏳ꨩ〪̥〭 ʀᴜɴᴛɪᴍᴇ: *${uptime}*
╚══════════════════╝

${readMore}

╔══════════════════╗
║ ⁞)ֶָ֢֯᷼͝🕹️ [ 𝗙𝗘𝗖𝗛𝗔 & 𝗛𝗢𝗥𝗔 ] ׅ🍄ׁ᷒ᮬ ׅ ║
╠══════════════════╣
║ ৎּٜ̊⏰ꨩ〪̥〭 ʜᴏʀᴀ: *${hora}*
║ ৎּٜ̊📆ꨩ〪̥〭 ғᴇᴄʜᴀ: *${fecha}*
║ ৎּٜ̊🌙ꨩ〪̥〭 ᴅɪᴀ: *${dia}*
╚══════════════════╝

  ᧙🔥 \`𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘𝗦\` 🐉

${readMore}
\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗜 𝗡 𝗙 𝗢 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */afk [alasan]*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menu*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */uptime*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */script*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */staff*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */creador*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */grupos*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */estado*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */infobot*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sug*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ping*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reportar <txt>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reglas*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */speed*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sistema*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */usuarios*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ds*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */funciones*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */editautoresponder*


\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗠𝗘𝗡𝗨 𝗟𝗜𝗦𝗧 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menulist*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */dev - ᴍᴇɴᴜ ᴏᴡɴᴇʀ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menusticker - ᴍᴇɴᴜ sᴛɪᴄᴋᴇʀs*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menusearch - ᴍᴇɴᴜ sᴇᴀʀᴄʜ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menudl - ᴍᴇɴᴜ ᴅᴇsᴄᴀʀɢᴀs*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menulogos - ʟᴏɢᴏs*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menunsfw - ᴍᴇɴᴜ 18*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menugp - ᴍᴇɴᴜ ɢʀᴜᴘᴏ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menu2 - ᴍᴇɴᴜ ᴀᴜᴅɪᴏs*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */menurpg - ᴍᴇɴᴜ ʀᴘɢ*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗦𝗘𝗔𝗥𝗖𝗛 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴀɴɪᴍᴇɪɴғᴏ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴀɴɪᴍᴇsᴇᴀʀᴄʜ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴄᴜᴇᴠᴀɴᴀ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ɢɪᴛʜᴜʙsᴇᴀʀᴄʜ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sᴇᴀʀᴄʜʜᴇɴᴛᴀɪ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ɢᴏᴏɢʟᴇ <ʙúsǫᴜᴇᴅᴀ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ɪᴍᴀɢᴇɴ <ǫᴜᴇʀʏ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ɪɴғᴏᴀɴɪᴍᴇ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ɢɪᴛʜᴜʙsᴛᴀʟᴋ <ǫᴜᴇʀʏ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sᴏᴜɴᴅᴄʟᴏᴜᴅsᴇᴀʀᴄʜ <ᴛxᴛ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴘɪɴᴛᴇʀᴇsᴛ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴘᴏʀɴʜᴜʙsᴇᴀʀᴄʜ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sᴘᴏᴛɪғʏsᴇᴀʀᴄʜ <ᴛᴇxᴛᴏ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ʏᴛsᴇᴀʀᴄʜ2 <ᴛᴇxᴛ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ɴᴘᴍᴊs*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ɢɴᴜʟᴀ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴀᴘᴋsᴇᴀʀᴄʜ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴡɪᴋɪs*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴛɪᴋᴛᴏᴋsᴇᴀʀᴄʜ <ᴛxᴛ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴛᴡᴇᴇᴛᴘᴏsᴛs*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */xɴxxs*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */xᴠsᴇᴀʀᴄʜ*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ʏᴛs*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ғᴅʀᴏɪᴅsᴇᴀʀᴄʜ <ᴛéʀᴍɪɴᴏ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ʜᴀᴘᴘʏᴍᴏᴅsᴇᴀʀᴄʜ <ʙúsǫᴜᴇᴅᴀ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴄɪɴᴇᴄᴀʟɪᴅᴀᴅsᴇᴀʀᴄʜ <ʙúsǫᴜᴇᴅᴀ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ʏᴀʜᴏᴏsᴇᴀʀᴄʜ <ʙúsǫᴜᴇᴅᴀ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ᴍᴏᴠɪᴇ <ᴛéʀᴍɪɴᴏ>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */stickerly*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗦𝗨𝗕 𝗕𝗢𝗧𝗦 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */qr*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */code*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */token*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sockets*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */deletesesion*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pausarai*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */fb2*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */fdroid <url>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */fb*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sound*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */gitclone <url git>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */gdrive*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ig*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */mediafire <url>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */mega*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */apk <nombre>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pinvid <link>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */apk2 <busqueda>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */npmdl*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tt2*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */kwaidl*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */likee <url>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */aplay2 • applemusic2*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */capcut <url>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */play*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */play2*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ytmp3doc*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ytmp4doc*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */iaimg <texto>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */yta*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ytv*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */stickerlydl*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tiktokrandom*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */spotify*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tiktokhd*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tiktoktrends*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */snapchat <link>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */terabox*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tiktok <url>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tiktokmp3 <url>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tiktokimg <url>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */twitter <url>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */xvideosdl*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */xnxxdl*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pindl*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */apkpure*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */apkpuredl*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗙 𝗨 𝗡 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */gay @tag* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */lesbiana @tag* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pajero @tag* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pajera @tag* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */puto @tag* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */puta @tag* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */manco @tag* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */manca @tag* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */rata @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */prostituta @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */amigorandom*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */jalamela*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */simi*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */chiste*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */consejo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */doxear <mension>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */facto*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reto*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */verdad*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */prostituto <@tag*>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */formarpareja*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */formarpareja5*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */huevo @user*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */chupalo <mencion>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */aplauso <mencion>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */marron <mencion>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */suicidar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */iqtest <mencion>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */meme*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */morse*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */nombreninja <texto>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */paja*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */personalidad <mencion>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pregunta*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */zodiac 2002 02 25*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ship*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sorte*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */top [texto]*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */formartrio <mencion>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tt*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗙𝗥𝗔𝗖𝗘 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */piropo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */frase*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗝𝗨𝗘𝗚𝗢𝗦 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ahorcado*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */delxo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */genio <pregunta>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */math <mode>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ppt texto*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pvp*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sopa*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */acertijo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ttt texto*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗔𝗡𝗜𝗠𝗘 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */angry/enojado @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */bath/bañarse @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */bite/morder @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */bleh/lengua @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */blush/sonrojarse @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */bored/aburrido @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */nights/noches*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */dias/days*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */coffe/cafe @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cry/llorar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cuddle/acurrucarse @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */dance/bailar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */drunk/borracho @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */eat/comer @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */messi*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cr7*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */facepalm/palmada @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */happy/feliz @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */hello/hola @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */hug/abrazar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */kill/matar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */kiss2/besar2 @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */kiss/besar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */laugh/reirse @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */lick/lamer @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */love2/enamorada @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */patt/acariciar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */poke/picar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pout/pucheros @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ppcouple*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */preg/embarazar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */punch/golpear @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */run/correr @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sad/triste @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */scared/asustada @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */seduce/seducir @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */shy/timida @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */slap/bofetada @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sleep/dormir @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */smoke/fumar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */think/pensando @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */undress/encuerar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */waifu*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗣𝗘𝗥𝗙𝗜𝗟 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reg*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */unreg*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */profile*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */perfildates*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */marry [mension / etiquetar]*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */divorce*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setgenre <text>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */delgenre*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setbirth <text>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */delbirth*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setdesc <text>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */deldesc*


\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗟𝗢𝗚𝗢𝗦 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */glitchtext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */narutotext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */dragonball*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */neonlight*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pubglogo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */harrypotter*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */marvel*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pixelglitch*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */amongustext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */writetext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */advancedglow*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */typographytext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */neonglitch*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */flagtext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */flag3dtext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */deletingtext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */blackpinkstyle*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */glowingtext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */underwatertext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */logomaker*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cartoonstyle*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */papercutstyle*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */watercolortext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */effectclouds*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */blackpinklogo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */gradienttext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */summerbeach*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */luxurygold*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */multicoloredneon*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sandsummer*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */galaxywallpaper*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */style*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */makingneon*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */royaltext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */freecreate*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */galaxystyle*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */rainytext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */graffititext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */colorfulltext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */equalizertext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */angeltxt*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */starlight*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */steel*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */neoncity*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cloudsky*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */matrix*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */minion*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */papercut3d*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */firetext*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */icecold*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */rainbowtext*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗦𝗧𝗔𝗟𝗞 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tiktokstalk <usuario>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */kwaistalk <usuario>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */telegramstalk <nombre_usuario>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */youtubestalk <nombre de usuario>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */instagramstalk <usuario>*


\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */comprarpremium*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */premium*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */vip*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */spamwa <number>|<mesage>|<no of messages>*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗥 𝗣 𝗚 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */aventura*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */baltop*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */bank / bal*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cazar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */codigo <cantida de coins>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */canjear <código>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cartera*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */apostar <cantidad>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cf*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cofre*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */crimen*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */daily*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */depositar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */explorar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */gremio*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */regalo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */halloween*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */heal*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */inventario*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */mensual*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */mazmorra*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */minar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */navidad*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */retirar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */robar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */robarxp*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ruleta <cantidad> <color>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */buyall*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */buy*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */protituirse*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */work*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pay / transfer*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */semanal*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */levelup*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */lvl @user*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */slot <apuesta>*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗚 𝗔 𝗖 𝗛 𝗔 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */rw*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reclamar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */harem*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */waifuimage*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */charinfo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */topwaifus [pagina]*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */regalar <nombre del personaje> @usuario*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */vote <personaje>*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sticker <img>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sticker <url>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setmeta*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */delmeta*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */bratvid <texto>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pfp @user*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */qc*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */toimg (reply)*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */brat*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */bratvid <texto>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */emojimix  <emoji+emoji>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */wm <packname>|<author>*


\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗧𝗢𝗢𝗟𝗦 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */letra <texto>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */fake*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */hd*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */detectar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */clima <ciudad/país>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */join*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */nuevafotochannel*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */nosilenciarcanal*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */silenciarcanal*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */noseguircanal*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */seguircanal*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */avisoschannel*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */resiviravisos*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */inspect*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */inspeccionar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */eliminarfotochannel*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reactioneschannel*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reaccioneschannel*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */nuevonombrecanal* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */nuevadescchannel*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setavatar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setbanner*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */seticono*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setmoneda*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setname nombre1/nombre2*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cal <ecuacion>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */horario*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */read*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */traducir <idoma>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */say*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */whatmusic <audio/video>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */paisinfo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ssweb*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tamaño <cantidad>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */document <audio/video>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */translate*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */up*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */enhance*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */wikipedia*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗢𝗡 / 𝗢𝗙𝗙 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */welcome*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */bienvenida*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antiprivado*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antiprivate*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */restrict*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */restringir*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antibot*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antibots*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */autoaceptar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */aceptarauto*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */autorechazar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */rechazarauto*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */autoresponder*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */autorespond*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antisubbots*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antibot2*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */modoadmin*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */soloadmin*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reaction*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reaccion*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */nsfw*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */modohorny*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antispam*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */jadibotmd*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */modejadibot*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */subbots*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */detect*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */avisos*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antilink*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */audios*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antiver*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antiocultar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antilink2*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */antiarabe*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗚𝗥𝗨𝗣𝗢𝗦 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */admins*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */agregar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */advertencia <@user>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */delwarn*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */grupo abrir / cerrar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */group open / close*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */delete*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */demote <@user>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */promote <@user>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */encuesta <text|text2>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */kickfantasmas*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */gpbanner*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */gpdesc*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */gpname*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */hidetag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */infogrupo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */kickall*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */kick <@user>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */kicknum*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */listonline*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */link*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */listadv*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */mute*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */unmute*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */config*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */restablecer*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setbye*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setwelcome*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */testwelcome*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setemoji <emoji>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */invocar <mensaje opcional>*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗡 𝗦 𝗙 𝗪 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sixnine/69 @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */anal/culiar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */blowjob/mamada @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */boobjob/rusa @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cum/leche @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */fap/paja @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */follar @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */fuck/coger @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */footjob/pies @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */fuck2/coger2 @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */grabboobs/agarrartetas @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */grop/manosear @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */penetrar @user*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */lickpussy/coño @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */r34 <tag>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */sexo/sex @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */spank/nalgada @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */suckboobs/chupartetas @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */violar/perra @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */lesbianas/tijeras @tag*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */pack*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tetas*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */undress/encuerar*


\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗖𝗥𝗘𝗔𝗗𝗢𝗥 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */addcoins <@user>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */addowner / delowner*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */addprem [@user] <days>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */añadirxp*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */copia*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */autoadmin*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */banuser @tag* <razón>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */banlist*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */bcgc*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */block / unblock*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */blocklist*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */chetar @user / <número>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */cleartmp*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */creargc*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */deletefile*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */delprem <@user>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */deschetar @user / <número>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */dsowner*
°𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. =>
°𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. >
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */fetch*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */getplugin*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */grouplist*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */salir*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */let*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setppbot* 
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */prefix [prefix]*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */quitarcoin <@user> / all*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */quitarxp <@user>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */resetprefix*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */restablecerdatos*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */restart / reiniciar*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */reunion*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */savefile <ruta/nombre>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */saveplugin*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setcmd <texto>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */delcmd*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */listcmd*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setimage*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */setstatus <teks>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */spam2*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */unbanuser <@tag*>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ip <alamat ip>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */update / fix*

\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗜𝗔 - 𝗔𝗜 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */dalle*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */demo <texto>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */flux <texto>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */gemini*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */ia*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */llama*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */webpilot <texto>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */copilot <texto>*


\`\`\`   ݄݊ ⏜᷼͝⏜݄݊ ᩚ⌒  ⌒ ⏜᷼͝⏜݄݊ \`\`\`
\`\`\`   ⪛⪜🍭⃝⃗𐇵҉ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗦 𐇵҉⚽⫹⫺\`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮\`\`\`
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tourl <imagen>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */catbox*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tourl3*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */togifaud*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tomp3*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tovideo*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tts <lang> <teks>*
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. */tts2*

> ${dev}`.trim()
    await m.react('🌤️')
    await conn.sendMessage(m.chat, {
      video: { url: video },
      gifPlayback: true,
      caption: menuText,
      footer: club,
      buttons: [
        { buttonId: `/code`, buttonText: { displayText: "𓏸𓈒ㅤׄ  s ᴇ ʀ ʙ ᴏ ᴛㅤꨶ〆⁾ ㅤׄㅤ⸼ㅤ" }, type: 1 },
        { buttonId: `/menulist`, buttonText: { displayText: "𓏸𓈒ㅤׄ ᴍᴇɴᴜ - ʟɪsᴛᴀㅤꨶ〆⁾ ㅤׄㅤ⸼ㅤ" }, type: 1 }
      ],
      headerType: 4,
      contextInfo: {      
      jpegThumbnail: icono,
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '      ⿻̟֟፝݊͜⃝⁩⚽꫶⃝꙰⿻͜𝐑𝐈𝐍͜ 𝐈͜𝐓𝐎𝐒༙͜ᝲ𝐇𝐈🍧⃟─̶̲̲̲̲̲̲̲̲̲֟፝͠',
          body: '      🍨⃟≛⃝🫐๋⭑sʜᴀᴅᴏᴡ.xʏᴢ ⊹༙ᝲ🧪𝆺𝅥𝆹𝅥𝆬! 	✰ :',
          thumbnailUrl: 'https://d.uguu.se/GFyqTdLR.jpg',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: shadow_xyz })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender]
    }, { quoted: m })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto']
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
  let res = "🌷 ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙"
  if (time >= 5 && time < 12) res = "🍂 ʙᴜᴇɴᴏs ᴅɪᴀs ☀️"
  else if (time >= 12 && time < 18) res = "🌱 ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs 🌤️"
  else if (time >= 18) res = "🐥 ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙"
  return res
}