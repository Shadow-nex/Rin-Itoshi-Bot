import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🎵 Ingresa el nombre de la canción\n\nEjemplo:\n*${usedPrefix + command} 3 pa 3*`, m)

  try {
    // Nueva API de búsqueda
    let searchUrl = `https://api.delirius.store/search/spotify?q=${encodeURIComponent(text)}&limit=1`
    let search = await axios.get(searchUrl, { timeout: 15000 })

    if (!search.data.status || !search.data.data || search.data.data.length === 0) {
      throw new Error('No se encontró resultado.')
    }

    // Tomamos la primera coincidencia
    let data = search.data.data[0]
    let { title, artist, album, duration, popularity, publish, url: spotifyUrl, image } = data

    let caption = `「✦」Descargando *<${title}>*\n\n` +
      `> ꕥ Autor » *${artist}*\n` +
      (album ? `> ❑ Álbum » *${album}*\n` : '') +
      (duration ? `> ⴵ Duración » *${duration}*\n` : '') +
      (popularity ? `> ✰ Popularidad » *${popularity}*\n` : '') +
      (publish ? `> ☁︎ Publicado » *${publish}*\n` : '') +
      (spotifyUrl ? `> 🜸 Enlace » ${spotifyUrl}` : '')

    // Enviar info con portada
    await conn.sendMessage(m.chat, {
      image: { url: image },
      caption
    }, { quoted: m })

    // Intentar descarga con /v1
    let apiV1 = `https://api.nekolabs.my.id/downloader/spotify/v1?url=${encodeURIComponent(spotifyUrl)}`
    let dl1 = await axios.get(apiV1, { timeout: 20000 })
    let downloadUrl = dl1?.data?.result?.downloadUrl

    // Si falla o devuelve undefined → intentar con /v2
    if (!downloadUrl || downloadUrl.includes('undefined')) {
      let apiV2 = `https://api.nekolabs.my.id/downloader/spotify/v2?url=${encodeURIComponent(spotifyUrl)}`
      let dl2 = await axios.get(apiV2, { timeout: 20000 })
      downloadUrl = dl2?.data?.result?.downloadUrl
    }

    // Enviar audio si se obtuvo
    if (downloadUrl) {
      let audio = await fetch(downloadUrl)
      let buffer = await audio.buffer()

      await conn.sendMessage(m.chat, {
        audio: buffer,
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`
      }, { quoted: m })
    } else {
      conn.reply(m.chat, `⚠️ No se encontró un link de descarga válido para esta canción.`, m)
    }

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `❌ Error al buscar/descargar la canción.`, m)
  }
}

handler.help = ['spotify2 <canción>']
handler.tags = ['downloader']
handler.command = ['spotify2']

export default handler