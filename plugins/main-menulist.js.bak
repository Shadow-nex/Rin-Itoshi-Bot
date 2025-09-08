// ☘️ Código hecho por DEV.𝘚𝘏𝘈𝘋𝘖𝘞 XD
// - https://github.com/Yuji-XDev
// - 𝘙𝘐𝘕 𝘐𝘛𝘖𝘚𝘏𝘐 BOT MD ⚽

import moment from 'moment-timezone'

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('⚡')
  try {
    const uptime = clockString(process.uptime() * 1000)
    const now = new Date()
    const hora = now.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
    const fecha = now.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
    const dia = now.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })

    const totalUsers = Object.keys(global.db.data.users).length
    const totalCommands = Object.keys(global.plugins).length
    const user = global.db.data.users[m.sender] || {}
    const taguser = '@' + (m.sender.pushname ? m.sender.pushname : m.sender.split('@')[0])

    const menutxt = `⿻̟֟፝݊͜⃝⁩⚽꫶⃝꙰⿻͜𝐑𝐈𝐍͜ 𝐈͜𝐓𝐎𝐒༙͜ᝲ𝐇𝐈🍧⃟─̶͠
  🍨⃟≛⃝🫐๋⭑ shadow.xyz ✰ :

┌───────────
│ 🍂 ᴄʀᴇᴀᴅᴏʀ: *shadow.xyz*
│ 💾 ᴠᴇʀꜱɪᴏ́ɴ: *2.2.5*
│ 👥 ᴜꜱᴇʀꜱ: *${totalUsers}*
│ 🧰 ᴄᴏᴍᴀɴᴅᴏꜱ: *${totalCommands}*
│ ⏱️ ʀᴜɴᴛɪᴍᴇ: *${uptime}*
│ 📆 ꜰᴇᴄʜᴀ: *${fecha}*
│ 🌱 ᴅɪᴀ: *${dia}*
│ 🕓 ʜᴏʀᴀ: *${hora}*
└────────────`

    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '📞 ᴏᴡɴᴇʀ' }, type: 1 },
      { buttonId: `${usedPrefix}reg Shadow.18`, buttonText: { displayText: '💌 ᴀᴜᴛᴏ ᴠᴇʀɪғɪᴄᴀʀ' }, type: 1 }
    ]

    const sections = [
      {
        title: '⚡ MENÚS DISPONIBLES',
        rows: [
          { title: "⪛ 💥 𝐌𝐄𝐍𝐔 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎 ⪜", description: "Lista de todos los comandos", id: `${usedPrefix}menu` },
          { title: "⪛ 📥 DESCARGAS ⪜", description: "YouTube, FB, Spotify, IG, etc.", id: `${usedPrefix}menudl` },
          { title: "⪛ ⛏️ RPG ⪜", description: "Juega y sube de nivel", id: `${usedPrefix}menurpg` }
        ]
      }
    ]

    await conn.sendMessage(m.chat, {
      document: { url: 'https://shadow.xyz' }, // puedes poner un PDF, link, etc.
      fileName: 'RIN ITOSHI BOT ⚽',
      mimetype: 'application/pdf',
      caption: menutxt,
      jpegThumbnail: { url: 'https://tinyurl.com/29d2bflx' },
      footer: '© RIN ITOSHI ULTRA BOT | by shadow.xyz',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '🍭 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓 ⚽',
              sections
            })
          }
        }
      ],
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: 'Menú Oficial ⚽',
          body: `${ucapan()} ${taguser}`,
          thumbnailUrl: 'https://tinyurl.com/2c2wh7v2',
          sourceUrl: 'https://wa.me/51987654321',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `❌ Error al enviar el menú:\n\n${e.message}`, m)
  }
}

handler.command = ['menulist', 'listmenu']
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH')
  if (time >= 5 && time < 12) return "Bᴜᴇɴᴏꜱ Dɪᴀꜱ 🌞"
  if (time >= 12 && time < 19) return "Bᴜᴇɴᴀ Tᴀʀᴅᴇ 🌆"
  return "Bᴜᴇɴᴀ Nᴏᴄʜᴇ 🌙"
}