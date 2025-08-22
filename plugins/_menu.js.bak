let handler = async (m, { conn }) => {
let pp = 'https://files.catbox.moe/vwlhum.mp4'; 
    let pp2 = 'https://telegra.ph/file/a11625fef11d628d3c8df.mp4'; 
    let pp3 = 'https://telegra.ph/file/062b9506656e89b069618.mp4';
    let pp4 = 'https://telegra.ph/file/1325494a54adc9a87ec56.mp4';
        
   const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7];
   const video = videos[Math.floor(Math.random() * videos.length)];
   
let texto = `╭━━━〔 📌 𝙈𝙀𝙉𝙐 𝘿𝙀 𝙋𝙍𝙐𝘽𝘼 〕━━⬣
┃✨ Este es un menú PPP de prueba
┃📝 Incluye información en texto
┃🎬 Y un video de ejemplo adjunto
╰━━━━━━━━━━━━━━━━⬣`

// Reacción
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

// Video + texto + botón
await conn.sendMessage(m.chat, { 
  video: { url: video }, 
  caption: texto,
  footer: "✨ Pulsa el botón para ver más",
  buttons: [
    { buttonId: ".menuppp", buttonText: { displayText: "🔄 Volver a ver" }, type: 1 }
  ]
}, { quoted: m })

}

handler.command = /^menuppp$/i
export default handler