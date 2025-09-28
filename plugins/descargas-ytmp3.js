import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'

let handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `🎋 Ingresa el nombre de la canción o un enlace de YouTube.\n\n🌾 Ejemplo: ${usedPrefix + command} DJ Malam Pagi`,
        m
      )
    }

    await conn.sendMessage(m.chat, {
      react: { text: "⏳", key: m.key }
    })

    let search = await yts(text)
    let video = search.videos[0]
    if (!video) return conn.reply(m.chat, '❌ No se encontró ningún resultado.', m)

    const apiUrl = `https://xrljosedevapi.vercel.app/download/ytmp3?url=${encodeURIComponent(video.url)}&apikey=xrlfree`
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json?.status || !json?.download_url) {
      return conn.reply(m.chat, '❌ No se pudo obtener el audio.', m)
    }

    const size = await getSize(json.download_url)
    const sizeStr = size ? formatSize(size) : 'Desconocido'


    const meta = {
      title: json.title || video.title,
      duration: video.timestamp || "Desconocida",
      url: video.url,
      author: video.author?.name || "Desconocido",
      views: video.views?.toLocaleString('es-PE') || "0",
      ago: video.ago || "Desconocido",
      thumbnail: json.thumbnail || video.thumbnail,
      size: sizeStr
    }

    const textoInfo = `🍂 *Título:* ${meta.title}
⏱️ *Duración:* ${meta.duration}
🌱 *Canal:* ${meta.author}
🚀 *Vistas:* ${meta.views}
🌷 *Tamaño:* ${meta.size}
🧪 *Publicado:* ${meta.ago}
💨 *Link:* ${meta.url}

> *≡ Enviando, espera un momento...*`

    await conn.sendMessage(m.chat, {
      text: textoInfo,
      contextInfo: {
        externalAdReply: {
          title: "Descargando audio",
          body: meta.title,
          thumbnailUrl: meta.thumbnail,
          sourceUrl: meta.url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak })

    const audioBuffer = await (await fetch(json.download_url)).buffer()
    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      fileName: `${meta.title}.mp3`,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: meta.title,
          body: `Duración: ${meta.duration}`,
          mediaUrl: meta.url,
          sourceUrl: meta.url,
          thumbnailUrl: meta.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      react: { text: "✔️", key: m.key }
    })

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `❌ Error: ${e.message}`, m)
  }
}

handler.command = ['ytmp3', 'song']
handler.tags = ['descargas']
handler.help = ['ytmp3 <texto o link>', 'song <texto>']

export default handler


async function getSize(url) {
  try {
    const response = await axios.head(url)
    const length = response.headers['content-length']
    return length ? parseInt(length, 10) : null
  } catch {
    return null
  }
}

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  if (!bytes || isNaN(bytes)) return 'Desconocido'
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}