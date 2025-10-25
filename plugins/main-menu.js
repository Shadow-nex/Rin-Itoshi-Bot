import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
  try {
    await m.react('🍓')

    const user = global.db.data.users[m.sender] || {}
    const name = await conn.getName(m.sender)
    const premium = user.premium ? '✅ Sí' : '❌ No'
    const limit = user.limit || 0
    const totalreg = Object.keys(global.db.data.users).length
    const groupUserCount = m.isGroup ? participants.length : '-'
    const groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
    const uptime = clockString(process.uptime() * 1000)
    const fecha = new Date(Date.now())
    const locale = 'es-PE'
    const dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
    const fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    const hora = fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
    const totalCommands = Object.keys(global.plugins).length

    const userId = m.sender.split('@')[0]
    const phone = PhoneNumber('+' + userId)
    const pais = phone.getRegionCode() || 'Desconocido 🌐'
    
    const perfil = await conn.profilePictureUrl(conn.user.jid, 'image')
      .catch(() => 'https://files.catbox.moe/9i5o9z.jpg')

    const channelRD = { 
      id: '120363422142340004@newsletter', 
      name: '𝖱in Itoshi : 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 𝖮𝖿𝗂𝖼𝗂𝖺𝗅'
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
          title: '🍒 Rin Itoshi-𝖬𝖣',
          body: '✨ Dev: Shadow_xyz ☃️',
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnailUrl: perfil,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }

    let tags = {
      'main': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴍᴀɪɴ` 🍓 ᦡᦡ',
      'fun': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ғᴜɴ` 🎭 ᦡᦡ',
      'anime': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴀɴɪᴍᴇ` 🌸',
      'descargas': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅ` 🎧 ᦡᦡ',
      'grupo': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ɢʀᴜᴘᴏs` 🏮 ᦡᦡ',
      'ia': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ɪᴀ` ☁️ ᦡᦡ',
      'tools': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴛᴏᴏʟs` 🧩 ᦡᦡ',
      'owner': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴏᴡɴᴇʀ` ⚙️ ᦡᦡ',
      'jadibot': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴊᴀᴅɪ-ʙᴏᴛ` 🍰 ᦡᦡ',
      'nsfw': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ɴsғᴡ` 🍑 ᦡᦡ',
    }

    let commands = Object.values(global.plugins)
      .filter(v => v.help && v.tags)
      .map(v => {
        return {
          help: Array.isArray(v.help) ? v.help : [v.help],
          tags: Array.isArray(v.tags) ? v.tags : [v.tags]
        }
      })

    let menuTexto = ''
    for (let tag in tags) {
      let comandos = commands
        .filter(cmd => cmd.tags.includes(tag))
        .map(cmd => cmd.help.map(e => `> ര ׄ 🍃 ׅ  ${usedPrefix}${e}`).join('\n'))
        .join('\n')
      if (comandos) {
        menuTexto += `\n\n*${tags[tag]}*\n${comandos}`
      }
    }

    const infoUser = `
ര ׄ ☃️ ׅ  Bienvenid@ a | Rin itoshi 
─────────────────────
🌿 *Usuario:* @${userId}
🍉 *Premium:* ${premium}
🌍 *País:* ${pais}
🎲 *Límite:* ${limit}
🎋 *Usuarios totales:* ${totalreg}
☁️ *Grupos activos:* ${groupsCount}
🚀 *Tiempo activo:* ${uptime}
─────────────────────
🌾 *Bot:* ${(conn.user.jid == global.conn.user.jid ? '🌟 `ʙᴏᴛ ᴏғɪᴄɪᴀʟ`' : '✨ `sᴜʙ ʙᴏᴛ`')}
🕸️ *Comandos:* ${totalCommands}
📡 *Fecha:* \`${hora}, ${dia}, ${fechaTxt}\`
─────────────────────\n`.trim()

    const cuerpo = infoUser + `\n*🍡 Mᴇɴú ᴅɪsᴘᴏɴɪʙʟᴇ:*

${menuTexto}`.trim()

    const vids = [
      'https://files.catbox.moe/tc1zxx.mp4',
      'https://files.catbox.moe/o3ggg8.mp4'
    ]
    let videoUrl = vids[Math.floor(Math.random() * vids.length)]

    await conn.sendMessage(m.chat, {
      document: fs.readFileSync('./README.md'),
      fileName: '🚀 ʙᴏᴛ ᴍᴅ | Mᴇɴᴜ 🌸',
      mimetype: 'application/pdf',
      caption: cuerpo,
      gifPlayback: true,
      mentions: [m.sender],
      ...metaMsg
    })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { 
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender] 
    })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']
handler.register = true

export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}