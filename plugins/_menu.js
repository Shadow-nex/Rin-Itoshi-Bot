let handler = async (m, { conn }) => {

let texto = `╭━━━〔 📌 𝙈𝙀𝙉𝙐 𝘿𝙀 𝙋𝙍𝙐𝘽𝘼 〕━━⬣
┃✨ Este es un menú PPP de prueba
┃📝 Incluye información en texto
┃🎬 Y un video de ejemplo adjunto
╰━━━━━━━━━━━━━━━━⬣`

await conn.sendMessage(m.chat, { 
  video: { url: "https://files.catbox.moe/81wrse.mp4" }, 
  caption: texto 
}, { quoted: m })

}

handler.command = /^menuppp$/i
export default handler