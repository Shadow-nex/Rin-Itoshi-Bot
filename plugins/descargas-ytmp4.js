import fetch from "node-fetch"

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
        `🎋 *Ingresa el enlace del video de YouTube que deseas descargar.*\n\nEjemplo:\n${usedPrefix + command} https://youtu.be/HWjCStB6k4o`,
        m
      )
    }

    await m.react('🕒')
    await conn.reply(m.chat, '*_🍃 Descargando video uwu_*', m, rcanal)

    const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/video?url=${encodeURIComponent(text)}&quality=360`
    const response = await fetch(apiUrl)
    if (!response.ok) throw `Error en la API.`
    const data = await response.json()

    const meta = data?.result?.metadata
    const down = data?.result?.download
    if (!down?.url) throw `No se pudo obtener el enlace de descarga.`

    const head = await fetch(down.url, { method: "HEAD" })
    const size = head.headers.get("content-length")
    const sizeMB = size ? Number(size) / (1024 * 1024) : 0

    const caption = `╔═══❖•ೋ° ⚜️ °ೋ•❖═══╗
🎬 *ＹＯＵＴＵＢＥ ＶＩＤＥＯ* 🌷
╚═══❖•ೋ° ⚜️ °ೋ•❖═══╝
🍉 *Título:* ${meta.title}
📡 *Canal:* ${meta.author?.name}
🕒 *Duración:* ${meta.duration?.timestamp || "Desconocida"}
👁 *Vistas:* ${meta.views?.toLocaleString() || "?"}
📆 *Publicado:* ${meta.ago}
🎚 *Calidad:* ${down.quality}p
💾 *Tamaño:* ${formatSize(size)}
────────────────────
✨ *Descarga Completa...*`

    await conn.sendMessage(m.chat, {
      video: { url: down.url },
      mimetype: "video/mp4",
      fileName: down.filename || `${meta.title}.mp4`,
      caption,
      thumbnail: await (await fetch(meta.thumbnail)).buffer()
    }, { quoted: m })

    await m.react('✔️')

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `*Ocurrió un error:*\n${e}`, m)
  }
}

handler.help = ["ytmp4 <url>"]
handler.tags = ["download"]
handler.command = ["ytmp4", "playmp4"]
handler.group = true

export default handler