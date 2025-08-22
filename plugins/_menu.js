/*let handler = async (m, { conn }) => {
    let pp = 'https://files.catbox.moe/vwlhum.mp4'; 
    let pp2 = 'https://files.catbox.moe/tc1zxx.mp4'; 
    let pp3 = 'https://files.catbox.moe/o3ggg8.mp4';
    let pp4 = 'https://files.catbox.moe/uzi4do.mp4';
        
   const videos = [pp, pp2, pp3, pp4];
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
export default handler*/


let handler = async (m, { conn }) => {
  // Lista de videos cortos (tipo gif)
  const videos = [
    'https://files.catbox.moe/vwlhum.mp4',
    'https://files.catbox.moe/tc1zxx.mp4',
    'https://files.catbox.moe/o3ggg8.mp4',
    'https://files.catbox.moe/uzi4do.mp4'
  ]

  // Lista de captions decorados
  const captions = [
    '✨ Aquí tienes tu animación mágica!',
    '🔥 Disfruta este loop animado!',
    '🎬 Un gif con estilo para ti!',
    '💫 Movimiento infinito cargado!'
  ]

  // Elegir un video y caption aleatorio
  const video = videos[Math.floor(Math.random() * videos.length)]
  const caption = captions[Math.floor(Math.random() * captions.length)]

  // Enviar como “GIF animado”
  await conn.sendMessage(m.chat, {
    video: { url: video },
    gifPlayback: true,
    caption: caption
  }, { quoted: m })
}

handler.command = /^gifprueba$/i
export default handler