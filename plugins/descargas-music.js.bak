import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🎵 Ingresa el nombre de la canción\n\nEjemplo:\n*${usedPrefix + command} 3 pa 3*`, m)

  try {
    let url = `https://api.nekolabs.my.id/downloader/spotify/play/v1?q=${encodeURIComponent(text)}`
    let res = await axios.get(url, { timeout: 15000 })
    if (!res.data.status) throw new Error('No se encontró resultado.')

    let { metadata, downloadUrl } = res.data.result
    let { title, artist, duration, cover, url: spotifyUrl } = metadata

    let caption = `╭━━━〔 🎶 *Spotify Downloader* 🎶 〕━━⬣
┃✨ *Título:* ${title}
┃👤 *Artista:* ${artist}
┃⏱ *Duración:* ${duration}
┃🔗 *Spotify:* ${spotifyUrl}
╰━━━━━━━━━━━━━━⬣`

    // Enviar info con portada
    await conn.sendMessage(m.chat, {
      image: { url: cover },
      caption
    }, { quoted: m })

    // Descargar y enviar audio si está disponible
    if (downloadUrl && !downloadUrl.includes('undefined')) {
      let audio = await fetch(downloadUrl)
      let buffer = await audio.buffer()

      await conn.sendMessage(m.chat, {
        audio: buffer,
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`
      }, { quoted: m })
    } else {
      conn.reply(m.chat, `⚠️ No se encontró link de descarga para esta canción.`, m)
    }

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `❌ Error al buscar/descargar la canción.`, m)
  }
}

handler.help = ['spotify2 <canción>']
handler.tags = ['downloader']
handler.command = /^spotify2$/i

export default handler