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

    let search = await yts(text)
    let video = search.videos[0]
    if (!video) return conn.reply(m.chat, 'No se encontró ningún resultado.', m)

    const apiUrl = `https://api.zenzxz.my.id/downloader/ytmp3v2?url=${encodeURIComponent(video.url)}`
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json?.status || !json?.download_url) {
      return conn.reply(m.chat, 'No se pudo obtener el audio.', m)
    }

    const meta = {
      title: json.title,
      duration: { timestamp: formatDuration(json.duration) },
      url: video.url,
      author: { name: video.author?.name || 'Desconocido' }
    }
    const dl = {
      url: json.download_url
    }

    const size = await getSize(dl.url)
    const sizeStr = size ? await formatSize(size) : 'Desconocido'

    const textoInfo = `🍂 Título : ${meta.title}
⏱️ Duración : ${meta.duration.timestamp || video.timestamp || 'Desconocida'}
🌱 Canal : ${meta.author.name}
🚀 Vistas : ${video.views?.toLocaleString('es-PE') || '0'}
🌷 Tamaño : ${sizeStr}
🧪 Publicado : ${video.ago || 'Desconocido'}
💨 Link : ${meta.url}

> *≡ Enviando, espera un momento . . .*`

    await conn.sendMessage(m.chat, { text: textoInfo, quoted: m })

    const audioBuffer = await (await fetch(dl.url)).buffer()
    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      fileName: `${meta.title}.mp3`,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: video.title,
          body: ` Duración: ${video.timestamp}`,
          mediaUrl: video.url,
          sourceUrl: video.url,
          thumbnailUrl: video.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m })

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

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  if (!bytes || isNaN(bytes)) return 'Desconocido'
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}:${sec.toString().padStart(2,'0')}`
}