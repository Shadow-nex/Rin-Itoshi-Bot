let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = ` ︵ٜ⊹۬︵߭ꥈ‌⏜ׄ︵‌୨ ꥇ⭐߭ ୧‌︵۬߭⏜ꥇ‌︵⊹︵
       ꥇ𝐄ٜ۬߭𝐐ׄꥇ‌𝐔ᨘ࣪𝐈ꥈ𝐏࣭߭𝐎..𝐃𝐄..𝐀𝐘𝐔𝐃𝐀𝐍𝐓𝐄𝐒.il
⏝۬‌ꥇ︶ꥇ⊹۬︶‌⏝۬︶ᨘ⊹߭︶ׅꥇ⏝߭︶۬⊹ꥈ︶⏝
       ⬪ 🏜️ (*RIN ITOSHI BOT MD*) 

━━━━━━━━━━━━━━━━━━
🧑‍💼 *Dueño:* ${creador}
🤖 *Bot:* ${botname}
📦 *Versión:* ${vs}
📚 *Librería:* ${libreria} (${baileys})
━━━━━━━━━━━━━━━━━━

🧠 *Creador Principal*
╭─➤
│ ⚽ *Nombre:* ${etiqueta}𖣘
│ 🎈 *Rol:* Developer
│ 🔗 *Número:* wa.me/qr/5B6AGA5YNOUZI1
│ 🧬 *GitHub:* https://github.com/Yuji-XDev
╰───────────────

👥 *Colaboradores*
╭─➤
│ 🚫 Actualmente no hay colaboradores
╰───────────────`
await conn.sendFile(m.chat, img, 'staff.jpg', staff.trim(), fkontak)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
