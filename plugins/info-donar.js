let media = 'https://files.catbox.moe/ur3ocy.jpg'

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

export default handler