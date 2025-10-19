import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises as fsPromises } from 'fs'
import { join } from 'path'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
  try {
    await m.react('🍓')

    let { exp, bank, registered } = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let groupUserCount = m.isGroup ? participants.length : '-'

    let perfil = await conn.profilePictureUrl(conn.user.jid, 'image')
      .catch(() => 'https://files.catbox.moe/9i5o9z.jpg')

    const userId = m.sender.split('@')[0]
    let taguser = `@${userId}`
    let phone = PhoneNumber('+' + userId)
    let pais = phone.getRegionCode() || 'Desconocido 🌐'

    const vids = [
      'https://files.cloudkuimages.guru/videos/0HMQaxtq.mp4',
      'https://files.cloudkuimages.guru/videos/0HMQaxtq.mp4',
      'https://files.cloudkuimages.guru/videos/0HMQaxtq.mp4'
    ]
    let videoUrl = vids[Math.floor(Math.random() * vids.length)]

    const header = [
      `╔═━★•°*"'*°•★━═╗`,
      `    ✦ ꧁𝐖𝐞𝐥𝐜𝐨𝐦𝐞꧂ ✦`,
      `╚═━★•°*"'*°•★━═╝`
    ].join('\n')

    const user = global.db.data.users[m.sender] || {};
    const country = user.country || '';
    const isPremium = user.premium || false;


    const channelRD = { 
      id: '120363417186717632@newsletter', 
      name: '𝖱𝗈𝗑𝗒 𝖡𝗈𝗍 𝖠𝖨 : 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅'
    }


    const metaMsg = {
      quoted: global.fakeMetaMsg,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '໒֟፝🍉 ֪𝖱𝗈𝗑𝗒-𝖠𝖨',
          body: '𝖱𝗈𝗑𝗒-𝖠𝗂 : 𝖡𝗋𝖺𝗒𝖺𝗇 𝖴𝗐𝗎 📌',
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnailUrl: 'https://files.catbox.moe/9i5o9z.jpg',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }

    const body = `
*ര ׄ 🌟 ׅ Bienvenido a, Roxy MD*
────────────────
*✨ I N F O R M A C I Ó N ✨*

*\`· ›  Nombre del Bot\`* :: RoxyBot-MD 
*\`· ›  Nombre de Usuario\`* :: ${taguser}
*\`· ›  Estado\`* :: Gratis
*\`· ›  Tiempo en línea\`*  :: ${uptime}
────────────────

*\`sі ᥱᥒᥴᥙ𝗍rᥲs ᥙᥒ ᥱrr᥆r ᥴ᥆ᥒ𝗍ᥲᥴ𝗍ᥲ ᥴ᥆ᥒ ᥱᥣ ᥆ᥕᥒᥱr\`*
*\`sі 𝗊ᥙіᥱrᥱs ᥴrᥱᥲr ᥙᥒ sᥙᑲᑲ᥆𝗍 ᥙSᥲ\`*
_#code_

𓂂𓏸  𐅹੭੭   *\`Mᥲіᥒ\`* ☁️ ᦡᦡ

ര ׄ ☁️ ׅ ${usedPrefix}ʀᴇɢ <ɴᴏᴍʙʀᴇ ᴇᴅᴀᴅ>
ര ׄ ☁️ ׅ ${usedPrefix}ᴜɴʀᴇɢ
ര ׄ ☁️ ׅ ${usedPrefix}ᴍᴇɴᴜ
ര ׄ ☁️ ׅ ${usedPrefix}ᴊᴜᴇɢᴏs
ര ׄ ☁️ ׅ ${usedPrefix}ᴘɪɴɢ
ര ׄ ☁️ ׅ ${usedPrefix}ɢʀᴜᴘᴏs
ര ׄ ☁️ ׅ ${usedPrefix}ᴏᴡɴᴇʀ


𓂂𓏸  𐅹੭੭   *\`𝖭𝗌ẜɯ\`* 🪼 ᦡᦡ

ര ׄ 🪼 ׅ ${usedPrefix}ᴘᴀᴄᴋ
ര ׄ 🪼 ׅ ${usedPrefix}ᴘᴇɴᴇᴛʀᴀʀ
ര ׄ 🪼 ׅ ${usedPrefix}sᴇxᴏ
ര ׄ 🪼 ׅ ${usedPrefix}ᴠɪᴏʟᴀʀ
ര ׄ 🪼 ׅ ${usedPrefix}ғᴏʟʟᴀʀ


𓂂𓏸  𐅹੭੭   *\`𝖥𝗎𝗇\`* 🌳 ᦡᦡ

ര ׄ 🌳 ׅ ${usedPrefix}ᴛᴏᴘ <text>
ര ׄ 🌳 ׅ ${usedPrefix}ɢᴀʏ
ര ׄ 🌳 ׅ ${usedPrefix}ᴘᴀᴊᴇᴀᴍᴇ
ര ׄ 🌳 ׅ ${usedPrefix}ᴅᴏxᴇᴏ @usuario
ര ׄ 🌳 ׅ ${usedPrefix}ᴅᴏxᴜᴇʀ @usuario
ര ׄ 🌳 ׅ ${usedPrefix}ғᴏʀᴍᴀʀᴘᴀʀᴇᴊᴀ
ര ׄ 🌳 ׅ ${usedPrefix}ғᴏʀᴍᴀʀᴘᴀʀᴇᴊᴀ𝟻
ര ׄ 🌳 ׅ ${usedPrefix}ʜᴜᴇᴠᴏ


𓂂𓏸  𐅹੭੭   *\`𝖠𝗇ı𝗆ᧉ\`* 🥞 ᦡᦡ

ര ׄ 🥞 ׅ ${usedPrefix}ᴋɪss
ര ׄ 🥞 ׅ ${usedPrefix}ᴀɴɢʀʏ
ര ׄ 🥞 ׅ ${usedPrefix}ʙɪᴛᴇ
ര ׄ 🥞 ׅ ${usedPrefix}ɴᴏᴄʜᴇs
ര ׄ 🥞 ׅ ${usedPrefix}ᴅɪ́ᴀs
ര ׄ 🥞 ׅ ${usedPrefix}ᴄᴀғᴇ
ര ׄ 🥞 ׅ ${usedPrefix}ᴄʀʏ
ര ׄ 🥞 ׅ ${usedPrefix}ᴄᴜᴅᴅʟᴇ
ര ׄ 🥞 ׅ ${usedPrefix}ʜᴀᴘᴘʏ
ര ׄ 🥞 ׅ ${usedPrefix}ʜᴇʟʟᴏ
ര ׄ 🥞 ׅ ${usedPrefix}ʟᴏʟɪ
ര ׄ 🥞 ׅ ${usedPrefix}ʀᴡ
ര ׄ 🥞 ׅ ${usedPrefix}ᴡ
ര ׄ 🥞 ׅ ${usedPrefix}ʀᴇᴄʟᴀᴍᴀᴡᴀɪғᴜ


𓂂𓏸  𐅹੭੭   *\`𝖣ᨣ𝗐𝗇𝗅ᨣ𝖺𝖽ᧉꭇ𝗌\`* 🍄 ᦡᦡ

ര ׄ 🍄 ׅ ${usedPrefix}ᴛɪᴋᴛᴏᴋ
ര ׄ 🍄 ׅ ${usedPrefix}ᴘʟᴀʏ
ര ׄ 🍄 ׅ ${usedPrefix}ᴘɪɴᴅʟ <link>
ര ׄ 🍄 ׅ ${usedPrefix}ɪɴsᴛᴀɢʀᴀᴍ <link>
ര ׄ 🍄 ׅ ${usedPrefix}ꜰᴀᴄᴇʙᴏᴏᴋ <link>


𓂂𓏸  𐅹੭੭   *\`𝖲ᧉ𝖺ꭇ𝖼𝗁\`* 🧃 ᦡᦡ

ര ׄ 🧃 ׅ ${usedPrefix}ʏᴛs
ര ׄ 🧃 ׅ ${usedPrefix}ᴘɪɴᴛᴇʀᴇsᴛ
ര ׄ 🧃 ׅ ${usedPrefix}ᴀᴘᴛᴏɪᴅᴇ<texto>
ര ׄ 🧃 ׅ ${usedPrefix}ᴛɪᴋᴛᴏᴋsᴇᴀʀᴄʜ
ര ׄ 🧃 ׅ ${usedPrefix}sꜱᴡᴇʙ
ര ׄ 🧃 ׅ ${usedPrefix}sᴘᴏᴛɪꜰʏ


𓂂𓏸  𐅹੭੭   *\`𝗀ꭇ𝗎𝗉ᨣ𝗌\`* 🍯 ᦡᦡ

ര ׄ 🍯 ׅ ${usedPrefix}ᴛᴀɢᴛᴇxᴛ
ര ׄ 🍯 ׅ ${usedPrefix}ᴀᴅᴠᴇʀᴛᴇɴᴄɪᴀ <@tag> <text>
ര ׄ 🍯 ׅ ${usedPrefix}ᴘᴇʀғɪʟ
ര ׄ 🍯 ׅ ${usedPrefix}ɢʀᴜᴘᴏᴄᴇʀʀᴀʀ
ര ׄ 🍯 ׅ ${usedPrefix}ɢʀᴜᴘᴏᴀʙʀɪʀ
ര ׄ 🍯 ׅ ${usedPrefix}ɪɴᴠᴏᴄᴀʀ 
ര ׄ 🍯 ׅ ${usedPrefix}sᴇᴛᴘᴘɢʀᴜᴘᴏ 
ര ׄ 🍯 ׅ ${usedPrefix}ᴋɪᴄᴋ <@tag>
ര ׄ 🍯 ׅ ${usedPrefix}ᴛᴀɢ
ര ׄ 🍯 ׅ ${usedPrefix}ᴅᴇʟ


𓂂𓏸  𐅹੭੭   *\`𝖨𝗇ƚᧉ𝖨ı𝗀ᧉ𝗇𝖼ı𝖺𝗌\`* 🧋 ᦡᦡ

ര ׄ 🧋 ׅ ${usedPrefix}ᴍᴀɢɪᴄsᴛᴜᴅɪᴏ <texto>
ര ׄ 🧋 ׅ ${usedPrefix}ᴀɪ <texto>
ര ׄ 🧋 ׅ ${usedPrefix}ᴡᴘᴡ
ര ׄ 🧋 ׅ ${usedPrefix}ᴘᴏʟʟɪɴᴀᴛɪᴏɴs <texto>
ര ׄ 🧋 ׅ ${usedPrefix}ɢᴇᴍɪɴɪ
ര ׄ 🧋 ׅ ${usedPrefix}ʙɢʀᴇᴍᴏᴠᴇʀ <imagen>


𓂂𓏸  𐅹੭੭   *\`𝖨𝗇ƚᧉꭇ𝗇ᧉƚ\`* 🍟 ᦡᦡ

ര ׄ 🍟 ׅ ${usedPrefix}ɴɪᴍᴇɢᴀᴍᴇsᴇᴀʀᴄʜ
ര ׄ 🍟 ׅ ${usedPrefix}ᴍᴇɪᴏ
    
    
𓂂𓏸  𐅹੭੭   *\`𝖩𝖺𝖽ı-ᗷᨣƚ𝗌\`* 🍰 ᦡᦡ

ര ׄ 🍰 ׅ ${usedPrefix}ʙᴏᴛs
ര ׄ 🍰 ׅ ${usedPrefix}ᴄᴏᴅᴇ


𓂂𓏸  𐅹੭੭   *\`𝗈ɯ𝗇ᧉꭇ\`* 🌷 ᦡᦡ
ര ׄ 🌷 ׅ ${usedPrefix}ʀᴇɪɴɪᴄɪᴀʀ
ര ׄ 🌷 ׅ ${usedPrefix}ᴅsᴏᴡɴᴇʀ
ര ׄ 🌷 ׅ ${usedPrefix}sᴇᴛɴᴀᴍᴇ
ര ׄ 🌷 ׅ ${usedPrefix}sᴇᴛᴘᴘ <img>
ര ׄ 🌷 ׅ ${usedPrefix}ʀᴇsᴛᴀʀᴛ
ര ׄ 🌷 ׅ ${usedPrefix}ᴜᴘᴅᴀᴛᴇ


𓂂𓏸  𐅹੭੭   *\`𝖲ƚ𝗂𝖼𝗄ᧉꭇ\`* 🫓 ᦡᦡ

ര ׄ 🫓 ׅ ${usedPrefix}sᴛɪᴄᴋᴇʀ <img>
ര ׄ 🫓 ׅ ${usedPrefix}ʙʀᴀᴛ *<texto>*


𓂂𓏸  𐅹੭੭   *\`𝖳ᨣᨣ𝗅𝗌\`* 🍵 ᦡᦡ

ര ׄ 🍵 ׅ ${usedPrefix}sᴛɪᴄᴋᴇʀsᴇᴀʀᴄʜ <text>
ര ׄ 🍵 ׅ ${usedPrefix}ʀᴠᴏᴄᴀʟ <audio>
ര ׄ 🍵 ׅ ${usedPrefix}ᴛᴏᴜʀʟ2
ര ׄ 🍵 ׅ ${usedPrefix}ʜᴅ
ര ׄ 🍵 ׅ ${usedPrefix}ᴛᴏᴜʀʟ <imagen>
`.trim()

    const menu = `${header}\n${body}`

    const botname = '🌸◌*̥₊ Rᴏxʏ-Mᴅ ◌❐🎋༉'
    const textbot = '💖 𝙍𝙊𝙓𝙔 𝘽𝙔 𝘿𝙀𝙑 𝘽𝙍𝘼𝙔𝘼𝙉 ✨️'
    const banner = perfil
    const redes = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i'

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: body,
      gifPlayback: true,
      mentions: [m.sender],  
      ...metaMsg
    })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { 
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender] 
    }, { 
      quoted: metaMsg 
    })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']
handler.register = true
//handler.limit = false;

export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

/*import fs from 'fs'

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

export default handler*/