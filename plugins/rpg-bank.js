import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
  if (who == conn.user.jid) return m.react('✖️')
  if (!(who in global.db.data.users)) return m.reply(`🌱 El usuario no se encuentra en mi base de datos.`)

  let user = global.db.data.users[who]
  let total = (user.coin || 0) + (user.bank || 0)

  let img = 'https://files.catbox.moe/spg9j8.jpg'

  let texto = `
╭━━━〔 💼 𝐄𝐒𝐓𝐀𝐓𝐔𝐒 𝐅𝐈𝐍𝐀𝐍𝐂𝐈𝐄𝐑𝐎 💼 〕
┃
┃ 🕴️ Socio » *${conn.getName(who)}*
┃ 💵 Liquidez » *${user.coin || 0} ${moneda}*
┃ 🏦 Reservas » *${user.bank || 0} ${moneda}*
┃ 💼 Capital Neto » *${total} ${moneda}*
┃
╰━━━━━━━━━━━━━━━━━━━━⬣

> 🌸 *Consejo:* Protege tu dinero y evita robos.
Usa:  *${usedPrefix}deposit cantidad*
`

  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: texto
  }, { quoted: m })
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank'] 
handler.register = true
handler.group = true

export default handler