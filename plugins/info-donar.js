/*let media = 'https://files.catbox.moe/ur3ocy.jpg'

let handler = async (m, { conn, command }) => {
  let str = `
╭━━━〔 💖 𝗗𝗢𝗡𝗔𝗥 〕━━⬣
┃☁️ Apoya el proyecto *Rin Itoshi Bot*
┃
┃📌 Tu ayuda mantiene vivo el bot 💕
┃
┃🔗 PayPal:
┃ https://paypal.me/shadowCore877
╰━━━━━━━━━━━━━━━━━━⬣
`

  await conn.sendButton(
    m.chat,
    str,
    `☁️ 𝐃𝐄𝐕.𝐒𝐇𝐀𝐃𝐎𝗪\n⚡ Proyecto Rin Itoshi Bot\n\n${wm}`,
    media,
    [
      ['📢 𝗚𝗥𝗨𝗣𝗢𝗦 ~', '.grupos'],
      ['👤 𝗖𝗥𝗘𝗔𝗗𝗢𝗥 • 𝗢𝗙𝗖', '#owner'],
      ['☘️ 𝗠𝗘𝗡𝗨 • 𝗔𝗟𝗟', '/menu']
    ],
    null,
    [
      ['🌐 𝗚𝗜𝗧𝗛𝗨𝗕', `https://github.com/Yuji-XDev/`]
    ],
    fkontak
  )
}

handler.help = ['donar']
handler.tags = ['info']
handler.command = ['donar', 'alv']
handler.exp = 200

export default handler*/

import db from '../lib/database.js'
import fs from 'fs'

let handler = async (m, { conn, command }) => {
try {
let user = db.data.users[m.sender]
let media = './src/catalogo.jpg'


let titulo = `🎁 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐁𝐨𝐭 - 𝐀𝐬𝐢𝐬𝐭𝐞𝐧𝐜𝐢𝐚`
let descripcion = `Apoya al proyecto y contribuye para mantener activo el bot 💖`
let link = 'https://paypal.me/shadowCore877' 
let git = 'https://github.com/Shadow-nex/Rin-Itoshi-Bot'
let wm = '© 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐁𝐨𝐭'
let asistencia = `✨ ¡Gracias por tu interés en apoyar a Rin Itoshi Bot!  
Tu donación nos ayuda a seguir mejorando y manteniendo el servicio activo.  
Cualquier aporte es muy valioso 💕`

let texto = `
╭━━━〔 🌸 𝐃𝐨𝐧𝐚𝐜𝐢𝐨𝐧 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐁𝐨𝐭 🌸 〕
┃ 💎 *${user?.name || 'Usuario'}*, gracias por usar el bot.
┃ 🩷 Tu apoyo mantiene vivo este proyecto.
┃ 🌐 Puedes donar desde PayPal:
┃ 💰 ${link}
╰━━━━━━━━━━━━━━━━━━⬣
`

await conn.sendMessage(m.chat, {
  text: texto,
  contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 9999999,
    isForwarded: true,
    externalAdReply: {
      title: titulo,
      body: descripcion,
      thumbnailUrl: media,
      sourceUrl: link,
      mediaType: 1,
      renderLargerThumbnail: true
    }
  }
}, { quoted: m })

await conn.sendHydrated(
  m.chat,
  `🌟 ${titulo}\n\n${asistencia}\n\n${wm}`,
  null,
  media,
  link,
  '💖 𝐃𝐨𝐧𝐚𝐫 | 𝐒𝐮𝐩𝐩𝐨𝐫𝐭',
  null,
  null,
  [
    ['🌺 𝐆𝐫𝐮𝐩𝐨𝐬 𝐎𝐟𝐢𝐜𝐢𝐚𝐥𝐞𝐬', '.grupos'],
    ['👑 𝐂𝐫𝐞𝐚𝐝𝐨𝐫', '#owner'],
    ['🏡 𝐌𝐞𝐧𝐮 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥', '/menu']
  ],
  m
)

} catch (e) {
console.error(e)
conn.reply(m.chat, '⚠️ Hubo un error al enviar el mensaje de donación.', m)
}
}

handler.help = ['donar']
handler.tags = ['info']
handler.command = ['donar', 'alv']
handler.exp = 200

export default handler