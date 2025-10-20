import fetch from "node-fetch"
import yts from "yt-search"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

function formatSize(bytes) {
  if (bytes === 0 || isNaN(bytes)) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim()) {
      return conn.reply(
        m.chat,
        `🎋 *Ingresa el enlace o título del video de YouTube que deseas descargar.*\n\nEjemplo:\n${usedPrefix + command} Shape of You`,
        m
      )
    }

    await m.react('🕒')

    let videoId
    if (youtubeRegexID.test(text)) {
      const match = text.match(youtubeRegexID)
      videoId = match[1]
    } else {
      const search = await yts(text)
      if (!search || !search.videos?.length) throw `No se encontraron resultados para *${text}*`
      videoId = search.videos[0].videoId
    }

    const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/video?url=https://youtu.be/${videoId}&quality=360`
    const response = await fetch(apiUrl)
    if (!response.ok) throw `Error en la API`
    const data = await response.json()

    if (!data?.result?.download?.url) throw `No se pudo obtener el enlace de descarga.`

    const { title, thumbnail, author, views, ago, duration } = data.result.metadata
    const { url, quality } = data.result.download

    const head = await fetch(url, { method: "HEAD" })
    const size = head.headers.get("content-length")
    const sizeMB = size ? Number(size) / (1024 * 1024) : 0

    const caption = `╔═══❖•ೋ° ⚜️ °ೋ•❖═══╗
    🎬 *ＹＯＵＴＵＢＥ ＶＩＤＥＯ* 🌷
╚═══❖•ೋ° ⚜️ °ೋ•❖═══╝
🍉 *Título:* ${title}
📡 *Canal:* ${author?.name}
🕒 *Duración:* ${duration?.timestamp || "Desconocida"}
👁 *Vistas:* ${views.toLocaleString()}
📆 *Publicado:* ${ago}
🎚 *Calidad:* ${quality}p
💾 *Tamaño:* ${formatSize(size)}
────────────────────
✨ *Enviando tu archivo...*`

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption
    }, { quoted: m })

    await m.react('📥')

    if (sizeMB > 100) {
      await conn.sendMessage(m.chat, {
        document: { url },
        mimetype: "video/mp4",
        fileName: `${title}.mp4`,
        caption: `🌿 *${title}* (Enviado como documento x pesar mas de 100 MB)`
      }, { quoted: m })
    } else {
      await conn.sendMessage(m.chat, {
        video: { url },
        mimetype: "video/mp4",
        fileName: `${title}.mp4`,
        caption: `☃️ *${title}*`
      }, { quoted: m })
    }

    await m.react('✔️')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    conn.reply(m.chat, `❌ Ocurrió un error:\n${e}`, m)
  }
}

handler.help = ["ytmp4 <url>"];
handler.tags = ["descargas"];
handler.command = ["ytmp4", "playmp4"];
handler.register = true;
handler.group = true;

export default handler