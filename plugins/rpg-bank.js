import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
if (!global.db.data.chats[m.chat].economy && m.isGroup) {
return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
}
  let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
  if (who == conn.user.jid) return m.react('✖️')
  if (!(who in global.db.data.users)) return m.reply(`🌱 El usuario no se encuentra en mi base de datos.`)

  let user = global.db.data.users[who]
  let total = (user.coin || 0) + (user.bank || 0)

  let img = 'https://files.catbox.moe/spg9j8.jpg'

  let texto = `
╭━━━〔 💎 𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀 💎 〕━━━⬣
┃
┃ 👤 Usuario » *${conn.getName(who)}*
┃ ⛀ Dinero » *${user.coin || 0} ${moneda}*
┃ ⚿ Banco  » *${user.bank || 0} ${moneda}*
┃ 💰 Total  » *${total} ${moneda}*
┃
╰━━━━━━━━━━━━━━━━━⬣

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