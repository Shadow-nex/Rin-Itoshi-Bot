/*import chalk from 'chalk'
import fetch from 'node-fetch'
import ws from 'ws'
let { WAMessageStubType } = await import('@whiskeysockets/baileys')
import { promises as fs } from 'fs'
import path from 'path'

let handler = m => m

handler.before = async function (m, { conn }) {
  if (!m.messageStubType || !m.isGroup) return

  const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  

  let chat = global.db.data.chats[m.chat]
  let usuario = `@${m.sender.split('@')[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'

  let param = m.messageStubParameters?.[0] || ''

  let nombre = `⋆｡˚ ❀ ˚｡⋆｡˚✦˚｡⋆｡˚ ❀ ˚｡⋆
   💎 𝑪𝒂𝒎𝒃𝒊𝒐 𝒅𝒆 𝑵𝒐𝒎𝒃𝒓𝒆 💎
⋆｡˚ ❀ ˚｡⋆｡˚✦˚｡⋆｡˚ ❀ ˚｡⋆
👤 Usuario: *${usuario}*
🆕 Nuevo nombre: 『 *${param}* 』
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let foto = `✧･ﾟ: ✧･ﾟ:☁️:･ﾟ✧:･ﾟ✧
      🌷 Foto del Grupo 🌷
✧･ﾟ: ✧･ﾟ:☁️:･ﾟ✧:･ﾟ✧
👤 Usuario: *${usuario}*
📸 Imagen actualizada con éxito.
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let edit = `╭─────────────➤
   ⚙️ 𝑪𝒐𝒏𝒇𝒊𝒈 𝑮𝒓𝒖𝒑𝒐 ⚙️
╰─────────────➤
👤 Usuario: *${usuario}*
${param == 'on'
    ? '🌱 Solo administradores pueden editar.'
    : '🍂 Todos los miembros pueden configurar.'}
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let newlink = `❖───────────────❖
     🌂 Enlace Nuevo 🌂
❖───────────────❖
👤 Generado por: *${usuario}*
💖 Aquí tienes la nueva invitación.
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let status = `✦━━━━━━━✦
   🛡️ Estado del Grupo
✦━━━━━━━✦
👤 Acción de: *${usuario}*
${param == 'on'
    ? '⚽💨 Grupo cerrado — Solo administradores pueden escribir.'
    : '☘️ Grupo abierto — Todos pueden escribir.'}`

  let admingp = `⋆｡˚ 🐁 ˚｡⋆｡˚✦˚｡⋆｡˚ 🐁 ˚｡⋆
   👑 𝐍𝐮𝐞𝐯𝐨 𝐀𝐝𝐦𝐢𝐧
⋆｡˚ 🐁 ˚｡⋆｡˚✦˚｡⋆｡˚ 🐁 ˚｡⋆
🔰 *@${param.split('@')[0]}*
🌀 Nombrado por: *${usuario}*
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  let noadmingp = `⋆｡˚ 💥 ˚｡⋆｡˚✦˚｡⋆｡˚ 💥 ˚｡⋆
   ⚠️ 𝐀𝐝𝐦𝐢𝐧 𝐑𝐞𝐦𝐨𝐯𝐢𝐝𝐨
⋆｡˚ 💥 ˚｡⋆｡˚✦˚｡⋆｡˚ 💥 ˚｡⋆
🔻 *@${param.split('@')[0]}*
🗑️ Removido por: *${usuario}*
— ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ —`

  if (chat.detect && m.messageStubType == 2) {
    const uniqid = (m.isGroup ? m.chat : m.sender)
    const sessionPath = './Sessions/'
    for (const file of await fs.readdir(sessionPath)) {
      if (file.includes(uniqid)) {
        await fs.unlink(path.join(sessionPath, file))
        console.log(
          `${chalk.yellow.bold('[ Archivo Eliminado ]')} ${chalk.greenBright(`'${file}'`)}\n` +
          `${chalk.blue('(Session PreKey)')} ${chalk.redBright('que provoca el "undefined" en el chat')}`
        )
      }
    }

  } else if (chat.detect && m.messageStubType == 21) {
    await this.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })  

  } else if (chat.detect && m.messageStubType == 22) {
    await this.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 23) {
    await this.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 25) {
    await this.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  

  } else if (chat.detect && m.messageStubType == 26) {
    await this.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  

  } else if (chat.detect && m.messageStubType == 29) {
    await this.sendMessage(m.chat, { text: admingp, mentions: [m.sender, param] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 30) {
    await this.sendMessage(m.chat, { text: noadmingp, mentions: [m.sender, param] }, { quoted: fkontak })

  } else {
    if (m.messageStubType == 2) return
    console.log({
      messageStubType: m.messageStubType,
      messageStubParameters: m.messageStubParameters,
      type: WAMessageStubType[m.messageStubType], 
    })
  }
}

export default handler*/


let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const groupMetadataCache = new Map()
const lidCache = new Map()
const handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]
const users = m.messageStubParameters[0]
const usuario = await resolveLidToRealJid(m?.sender, conn, m?.chat)
const groupAdmins = participants.filter(p => p.admin)
const rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name }, externalAdReply: { title: "𐔌 . ⋮ ᗩ ᐯ I Տ O .ᐟ ֹ ₊ ꒱", body: textbot, mediaUrl: null, description: null, previewType: "PHOTO", thumbnail: await (await fetch(icono)).buffer(), sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, mentionedJid: null }}
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'
const nombre = `> ❀ @${usuario.split('@')[0]} Ha cambiado el nombre del grupo.\n> ✦ Ahora el grupo se llama:\n> *${m.messageStubParameters[0]}*.`
const foto = `> ❀ Se ha cambiado la imagen del grupo.\n> ✦ Acción hecha por:\n> » @${usuario.split('@')[0]}`
const edit = `> ❀ @${usuario.split('@')[0]} Ha permitido que ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo.`
const newlink = `> ❀ El enlace del grupo ha sido restablecido.\n> ✦ Acción hecha por:\n> » @${usuario.split('@')[0]}`
const status = `> ❀ El grupo ha sido ${m.messageStubParameters[0] == 'on' ? '*cerrado*' : '*abierto*'} Por @${usuario.split('@')[0]}\n> ✦ Ahora ${m.messageStubParameters[0] == 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensaje.`
const admingp = `> ❀ @${users.split('@')[0]} Ahora es admin del grupo.\n> ✦ Acción hecha por:\n> » @${usuario.split('@')[0]}`
const noadmingp = `> ❀ @${users.split('@')[0]} Deja de ser admin del grupo.\n> ✦ Acción hecha por:\n> » @${usuario.split('@')[0]}`
if (chat.detect && m.messageStubType == 2) {
const uniqid = (m.isGroup ? m.chat : m.sender).split('@')[0]
const sessionPath = `./${sessions}/`
for (const file of await fs.promises.readdir(sessionPath)) {
if (file.includes(uniqid)) {
await fs.promises.unlink(path.join(sessionPath, file))
console.log(`${chalk.yellow.bold('✎ Delete!')} ${chalk.greenBright(`'${file}'`)}\n${chalk.redBright('Que provoca el "undefined" en el chat.')}`)
}}} if (chat.detect && m.messageStubType == 21) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: nombre, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 22) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { image: { url: pp }, caption: foto, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 23) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: newlink, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 25) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: edit, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 26) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: status, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 29) {
rcanal.contextInfo.mentionedJid = [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
await this.sendMessage(m.chat, { text: admingp, ...rcanal }, { quoted: null })
return
} if (chat.detect && m.messageStubType == 30) {
rcanal.contextInfo.mentionedJid = [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
await this.sendMessage(m.chat, { text: noadmingp, ...rcanal }, { quoted: null })
} else { 
if (m.messageStubType == 2) return
console.log({messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType], 
})}}

export default handler

async function resolveLidToRealJid(lid, conn, groupChatId, maxRetries = 3, retryDelay = 60000) {
const inputJid = lid.toString()
if (!inputJid.endsWith("@lid") || !groupChatId?.endsWith("@g.us")) { return inputJid.includes("@") ? inputJid : `${inputJid}@s.whatsapp.net` }
if (lidCache.has(inputJid)) { return lidCache.get(inputJid) }
const lidToFind = inputJid.split("@")[0]
let attempts = 0
while (attempts < maxRetries) {
try {
const metadata = await conn?.groupMetadata(groupChatId)
if (!metadata?.participants) { throw new Error("No se obtuvieron participantes") }
for (const participant of metadata.participants) {
try {
if (!participant?.jid) continue
const contactDetails = await conn?.onWhatsApp(participant.jid)
if (!contactDetails?.[0]?.lid) continue
const possibleLid = contactDetails[0].lid.split("@")[0]
if (possibleLid === lidToFind) {
lidCache.set(inputJid, participant.jid)
return participant.jid
}} catch (e) { continue }}
lidCache.set(inputJid, inputJid)
return inputJid
} catch (e) {
if (++attempts >= maxRetries) {
lidCache.set(inputJid, inputJid)
return inputJid
}
await new Promise((resolve) => setTimeout(resolve, retryDelay))
}}
return inputJid
}