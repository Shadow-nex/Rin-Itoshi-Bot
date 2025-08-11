let media = 'https://files.catbox.moe/ur3ocy.jpg'
let handler = async (m, { conn, command }) => {
let user = db.data.users[m.sender]
let str = `╭─〔 ⚔️ 𝐒𝐔𝐊𝐔𝐍𝐀 𝐔𝐋𝐓𝐑𝐀 𝐗𝐃 🐾 〕─╮
┃ ✦ ¡𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨, 𝐜𝐚𝐦𝐩𝐞𝐨𝐧 𝐝𝐞𝐥 𝐜𝐚𝐚𝐨𝐬!
┃ ✦ Este es el rincón maldito del bot 🔥
┃ ✦ Explora las funciones oscuras y letales...
┃ ✦ Usa los botones para navegar el inframundo 👹
╰──────────────────────⬣`
await conn.sendButton(m.chat, str, `☁️ 𝐃𝐄𝐕.𝐒𝐇𝐀𝐃𝐎𝐖\n${club}\n\n` + wm, media, [
['📢 𝗚𝗥𝗨𝗣𝗢𝗦 ~', '.grupos'],
['👤 𝗖𝗥𝗘𝗔𝗗𝗢𝗥 • 𝗢𝗙𝗖', '#owner'],
['☘️ 𝗠𝗘𝗡𝗨 • 𝗔𝗟𝗟', '/menu']], null, [
['🌐 𝗚𝗜𝗧𝗛𝗨𝗕', `https://github.com/Yuji-XDev/SukunaUltra-MD`]], fkontak)}

handler.help = ['donar']
handler.tags = ['info']
handler.command = ['donar', 'alv']
handler.exp = 200
export default handler