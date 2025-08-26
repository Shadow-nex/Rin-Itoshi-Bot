import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🍃 Ingresa el nombre de la canción o un link de YouTube.\n\n✎ Ejemplo: *${usedPrefix + command}* Fade Alan Walker`)
  }

  try {
    // Buscar canción en YouTube
    let search = await yts(text)
    let video = search.videos[0]
    if (!video) return m.reply('❌ No encontré resultados.')

    let title = video.title
    let url = video.url
    let duration = video.timestamp
    let views = video.views.toLocaleString('en-US')

    // Descargar usando la "app API"
    let api = `https://ochinpo-helper.hf.space/download?url=${encodeURIComponent(url)}&type=audio`

    let caption = `
╭━━━〔 🎶  𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚 𝐝𝐞 𝐀𝐮𝐝𝐢𝐨  🎶 〕━━⬣
┃ ✦ *Título:* ${title}
┃ ✦ *Duración:* ${duration}
┃ ✦ *Vistas:* ${views}
┃ ✦ *Link:* ${url}
╰━━━━━━━━━━━━━━━━━━⬣
    `.trim()

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: api },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
        caption
      },
      { quoted: m }
    )
  } catch (e) {
    console.log(e)
    m.reply('⚠️ Ocurrió un error al procesar tu solicitud.')
  }
}

handler.help = ['ytaudio <texto|link>']
handler.tags = ['downloader']
handler.command = /^playochi|ytmp3ochi|ytaudioochi$/i

export default handler