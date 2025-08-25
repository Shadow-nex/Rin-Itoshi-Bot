import fetch from 'node-fetch'
import yts from 'yt-search'

async function getFileSize(url) {
  try {
    let res = await fetch(url, { method: "HEAD" })
    let size = res.headers.get("content-length")
    if (!size) return "Desconocido"
    let i = Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "KB", "MB", "GB", "TB"][i]
  } catch {
    return "Desconocido"
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🌷 Ejemplo de uso:\n\n✎ ✧ \`${usedPrefix + command}\` miss you`)
  }

  try {
    // 🔎 Buscar en YouTube
    let search = await yts(text)
    if (!search || !search.videos || search.videos.length === 0) {
      return m.reply("⚠️ No se encontraron resultados en YouTube.")
    }

    let vid = search.videos[0]
    let api = `https://api.nexfuture.com.br/api/downloads/youtube/playvideo/v2?query=${encodeURIComponent(vid.url)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.status || !json.resultado?.result?.video) {
      return m.reply("❌ No se pudo obtener el video desde la API NexFuture.")
    }

    let video = json.resultado.result.video
    let channel = json.resultado.result.channel
    let downloads = json.resultado.downloads
    let stats = json.resultado.stats

    // 📦 sacar peso real
    let pesoVideo = await getFileSize(downloads.video.any4k || downloads.video.config)

    let caption = `
╭━━━〔 🎬 𝗜𝗡𝗙𝗢 𝗩𝗜𝗗𝗘𝗢 〕━━⬣
┃📌 *Título:* ${video.title}
┃📺 *Canal:* ${channel?.name}
┃📅 *Publicado:* ${video.published}
┃⏳ *Duración:* ${video.duration} 
┃👁️ *Vistas:* ${video.views}
┃❤️ *Likes:* ${stats.likes.toLocaleString()}
┃👎 *Dislikes:* ${stats.dislikes.toLocaleString()}
┃⭐ *Rating:* ${stats.rating.toFixed(2)}
┃📦 *Peso:* ${pesoVideo}
╰━━━━━━━━━━━━━━━━━━⬣
`

    // 📸 Enviar con miniatura
    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnails[1]?.url || video.thumbnails[0]?.url },
      caption
    }, { quoted: m })

    // 📥 Mandar video directo
    if (downloads.video.any4k) {
      await conn.sendMessage(m.chat, {
        video: { url: downloads.video.any4k },
        mimetype: "video/mp4",
        fileName: `${video.title}.mp4`,
        caption: `✅ Aquí tienes tu video: *${video.title}*`
      }, { quoted: m })
    } else {
      await conn.sendMessage(m.chat, {
        text: "⚠️ No se encontró un enlace válido de descarga para este video."
      }, { quoted: m })
    }

  } catch (e) {
    console.error(e)
    m.reply("⚠️ Error al procesar tu petición.")
  }
}

handler.command = ['ytmp4doc', 'ytvdoc', 'ytdoc'];
handler.help = ['ytmp4doc']
handler.tags = ['descargas']

export default handler