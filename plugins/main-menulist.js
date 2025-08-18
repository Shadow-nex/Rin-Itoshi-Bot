import fetch from 'node-fetch'

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🌳')

  try {
    const uptime = clockString(process.uptime() * 1000)
    const now = new Date()
    const hora = now.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
    const fecha = now.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
    const dia = now.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })

    const totalUsers = Object.keys(global.db.data.users).length
    const totalCommands = Object.values(global.plugins).filter(p => p.help && p.tags).length
    const user = global.db.data.users[m.sender] || {}
    const taguser = '@' + (m.sender.pushname ? m.sender.pushname : m.sender.split('@s.whatsapp.net')[0])

    const texto = `*☆═━┈◈ ╰  𝕽𝖎𝖓 𝕴𝖙𝖔𝖘𝖍𝖎 𝕭𝖔𝖙 𝕸𝕯 ╯ ◈┈━═☆*

 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ʙᴏᴛ\` 𑁭𑁘

> ┊ 🍂 𝗖ʀᴇᴀᴅᴏʀ : *Dev.Shadow*
> ┊ 🧸 𝗖ᴏɴᴛᴀᴄᴛᴏ : *wa.link/z1w9sq*
> ┊ 💾 𝗩ᴇʀꜱɪᴏɴ : *2.2.5*
> ┊ 👥 𝗨ꜱᴜᴀʀɪᴏꜱ : *${totalUsers}*
> ┊ 🧰 𝗖ᴏᴍᴀɴᴅᴏꜱ : *${totalCommands}*
> ┊ 🔐 𝗠ᴏᴅᴏ : *Privado*
> ┊ 📚 𝗟ɪʙʀᴇʀɪᴀ : *Baileys-MD*
> ┊ ⏱️ 𝗔ᴄᴛɪᴠᴏ : *${uptime}*


 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ᴜsᴇʀ\` 𑁭𑁘

> ┊ 🆔 𝗜ᴅ: *${conn.getName(m.sender)}*
> ┊ 💸 𝗠ᴏɴᴇᴅᴀꜱ:  *${user.coin || 0}*
> ┊ 📊 𝗡ɪᴠᴇʟ:  *${user.level || 0}*
> ┊ ⚡ 𝗘xᴘ: *${user.exp || 0}*
> ┊ 👑 𝗥ᴀɴɢᴏ: *${user.role || 'Sin Rango'}*

 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ғᴇᴄʜᴀ\` 𑁭𑁘

> ┊ 📆 𝗙ᴇᴄʜᴀ: *${fecha}*
> ┊ 💎 𝗗ɪᴀ:    *${dia}*
> ┊ ⏰ 𝗛ᴏʀᴀ:  *${hora}*`

    const imgUrl = 'https://files.catbox.moe/4dple4.jpg'
    const thumb2 = await (await fetch(imgUrl)).buffer()

    const imgenUrl = 'https://files.catbox.moe/9l7hcn.jpg'
    const thumb = await (await fetch(imgenUrl)).buffer()

    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '📞 ᴏᴡɴᴇʀ' }, type: 1 },
      { buttonId: `${usedPrefix}reg Shadow.18`, buttonText: { displayText: '💌 ᴀᴜᴛᴏ ᴠᴇʀɪғɪᴄᴀʀ' }, type: 1 }
    ]

    const sections = [
      {
        title: "🌟 𝐌𝐄𝐍𝐔𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒 🔋",
        rows: [
          { title: "📥 Mᴇɴᴜ [ 𝗗𝗟 ]", description: "🎧 ᴅᴇsᴄᴀʀɢᴀ ᴄᴏɴᴛᴇɴɪᴅᴏ...", id: `${usedPrefix}menudl` },
          { title: "⛏️ Mᴇɴᴜ [ 𝗥𝗣𝗚 ]", description: "🎮 ᴀᴠᴇɴᴛᴜʀᴀ ʀᴘɢ ⚔️.", id: `${usedPrefix}menurpg` },
          { title: "🔍 Mᴇɴᴜ [ 𝗦𝗘𝗔𝗥𝗖𝗛 ]", description: "🌍 ʙᴜsǫᴜᴇᴅᴀs.", id: `${usedPrefix}menuse` }
        ]
      }
    ]

    await conn.sendMessage(m.chat, {
      image: thumb2,
      caption: texto,
      footer: '[⚙] Sistema: *RIN.EXΞ*',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '🍂 𝐀𝐋𝐌𝐎𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓 ⚽',
              sections
            })
          }
        }
      ],
      headerType: 1,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: '',
          body: `${ucapan()} あ ${taguser} あ`,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    await m.react('❌')
    await conn.reply(m.chat, `* [ 🧪 ] ocurrio un error al enviar el menu-list:*\n\n> ${e.message}`, m)
  }
}

handler.command = ['menulist', 'listmenu']
handler.help = ['menulist']
handler.tags = ['menus']
handler.register = true

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

function ucapan() {
  const time = new Date().getHours()
  if (time >= 5 && time < 12) return "Bᴜᴇɴ Dɪ́ᴀ 🏞️"
  if (time >= 12 && time < 19) return "Hᴇʀᴍᴏsᴀ Tᴀʀᴅᴇ 🌆"
  return "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃"
}