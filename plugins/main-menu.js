import fs from 'fs'

let handler = async (m, { conn, usedPrefix }) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))
  let taguser = '@' + m.sender.split('@')[0]

  let tags = {
    'info': 'ᴍᴇɴᴜ ɪɴғᴏ',
    'anime': 'ᴍᴇɴᴜ ᴀɴɪᴍᴇ',
    'buscador': 'ᴍᴇɴᴜ ʙᴜsᴄᴀᴅᴏʀ',
    'downloader': 'ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
    'fun': 'ᴍᴇɴᴜ ғᴜɴ',
    'grupo': 'ᴍᴇɴᴜ ɢʀᴜᴘᴏ',
    'ai': 'ᴍᴇɴᴜ ᴀɪ',
    'game': 'ᴍᴇɴᴜ ɢᴀᴍᴇ',
    'jadibot': 'ᴍᴇɴᴜ ᴊᴀᴅɪʙᴏᴛ',
    'main': 'ᴍᴇɴᴜ ᴍᴀɪɴ',
    'nable': 'ᴍᴇɴᴜ ᴏɴ / ᴏғғ',
    'nsfw': 'ᴍᴇɴᴜ ɴsғᴡ',
    'owner': 'ᴍᴇɴᴜ ᴏᴡɴᴇʀ',
    'sticker': 'ᴍᴇɴᴜ sᴛɪᴄᴋᴇʀ',
    'tools': 'ᴍᴇɴᴜ ᴛᴏᴏʟs',
  }

  let header = '* %category'
  let body = '│ • %cmd'
  let footer = '└───···'
  let after = `✨ itachi-bot-MD - Tu asistente anime favorito`

  let user = global.db.data.users[m.sender]
  let nombre = await conn.getName(m.sender)
  let premium = user.premium ? 'ɴᴏ ❌' : 'sɪ ✅'
  let limite = user.limit || 0
  let totalreg = Object.keys(global.db.data.users).length
  let groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
  let muptime = clockString(process.uptime())

  function clockString(seconds) {
    let h = Math.floor(seconds / 3600)
    let m = Math.floor(seconds % 3600 / 60)
    let s = Math.floor(seconds % 60)
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
  }

  let infoUser = `
*乂 ɪ ɴ ғ ᴏ  ᴜ s ᴇ ʀ*
> *user: ${nombre}*
> *premium: ${premium}*
> *limite ${limite}*

*乂 ɪ ɴ ғ ᴏ  ʙ ᴏ ᴛ*
> *grupos: ${groupsCount}*
> *activo: ${muptime}*
> *usuarios: ${totalreg}*
> *plataforma: ʟɪɴᴜx*
 
*ꜱɪ ᴇɴᴄᴜᴇɴᴛʀᴀꜱ ᴀʟɢᴜ́ɴ ᴇʀʀᴏʀ, ᴘᴏʀ ꜰᴀᴠᴏʀ ᴄᴏɴᴛᴀᴄᴛᴀ ᴀʟ ᴏᴡɴᴇʀ.*
`.trim()

  let commands = Object.values(global.plugins).filter(v => v.help && v.tags).map(v => {
    return {
      help: Array.isArray(v.help) ? v.help : [v.help],
      tags: Array.isArray(v.tags) ? v.tags : [v.tags]
    }
  })

  let menu = []
  for (let tag in tags) {
    let comandos = commands
      .filter(command => command.tags.includes(tag))
      .map(command => command.help.map(cmd => body.replace(/%cmd/g, usedPrefix + cmd)).join('\n'))
      .join('\n')
    if (comandos) {
      menu.push(header.replace(/%category/g, tags[tag]) + '\n' + comandos + '\n' + footer)
    }
  }

  let finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n' + after

  let imagen = 'https://cdn.yupra.my.id/yp/8b6org82.jpg'

  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;Itachi;;;
FN:Itachi
item1.TEL;waid=13135550002:+1 (313) 555-0002
item1.X-ABLabel:Celular
END:VCARD`

  let qkontak = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
    },
    message: {
      contactMessage: {
        displayName: "𝗜 𝗧 𝗔 𝗖 𝗛 𝗜 - 𝗕 𝗢 𝗧",
        vcard: vcard,
      },
    },
  }

  await conn.sendMessage(m.chat, {
    document: fs.readFileSync('./README.md'),
    fileName: '🌸 і𝗍ᥲᥴһі - ᑲ᥆𝗍 🌸',
    mimetype: 'application/pdf',
    caption: finalMenu,
    contextInfo: {
      externalAdReply: {
        title: botname,
        body: dev,
        thumbnailUrl: imagen,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: qkontak }) 

  await delay(300)
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']
handler.register = true

export default handler