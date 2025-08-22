let handler = async (m, { conn }) => {

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


  const video = videos[Math.floor(Math.random() * videos.length)]
  const caption = captions[Math.floor(Math.random() * captions.length)]


  await conn.sendMessage(m.chat, {
    video: { url: video },
    gifPlayback: true,
    caption: caption
  }, { quoted: m })
}

handler.command = /^gifprueba$/i
export default handler