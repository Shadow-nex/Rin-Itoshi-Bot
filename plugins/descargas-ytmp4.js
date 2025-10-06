import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text)
      return conn.reply(m.chat, `🚫 *Por favor, ingresa un enlace de YouTube.*\n\n📌 Ejemplo:\n${usedPrefix + command} https://youtu.be/f09Omvw5C70`, m)

    const apiUrl = `https://api.yupra.my.id/api/downloader/ytmp4?url=${encodeURIComponent(text)}`
    const response = await axios.get(apiUrl)
    const data = response.data

    if (data.status !== 200 || !data.result || !data.result.formats?.length)
      throw new Error('❌ No se pudo obtener información del video.')

    const video = data.result.formats.find(v => v.itag === 18) || data.result.formats[0]

    const caption = `
╭━━━〔 🌸 *RIN ITOSHI - YT VIDEO* 🌸 〕━━⬣
┃ 🎬 *Título:* ${data.result.title}
┃ 📺 *Calidad:* ${video.qualityLabel || 'Desconocida'}
┃ ⏱️ *Duración:* ${(video.approxDurationMs / 1000 / 60).toFixed(1)} min
┃ 💾 *Tamaño:* ${(video.contentLength / 1048576).toFixed(1)} MB
╰━━━━━━━━━━━━━━━━━━⬣
✨ *Descarga completada con éxito.*
`

    await conn.sendMessage(m.chat, {
      video: { url: video.url },
      caption,
      mimetype: 'video/mp4'
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    conn.reply(m.chat, '❌ *Error al descargar el video.*\nVerifica que el enlace sea válido.', m)
  }
}

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'playmp4'];
handler.group = true;

export default handler;