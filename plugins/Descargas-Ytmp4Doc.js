import fetch from 'node-fetch'
import Jimp from 'jimp'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let q = args.join(" ").trim()
  if (!q) {
    return conn.sendMessage(m.chat, {
      text: `*🧪 Ingresa el nombre del video a descargar.*`
    }, { quoted: m })
  }

  await conn.sendMessage(m.chat, {
    text: `🎬 ¡Descargando video!

📊 Progreso: [▓▓▓▓▓░░░░░] 50%`
  }, { quoted: m })

  try {

    let res = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(q)}`)
    let json = await res.json()

    if (!json.status || !json.data || !json.data.length) {
      return conn.sendMessage(m.chat, { text: `❌ No encontré resultados para *${q}*.` }, { quoted: m })
    }

    let vid = json.data[0]

    let dl = await fetch(`https://api.starlights.uk/api/downloader/youtube?url=${encodeURIComponent(vid.url)}`)
    let info = await dl.json()

    if (!info.status || !info.mp4) {
      return conn.sendMessage(m.chat, { text: `⚠️ No se pudo obtener el video de *${vid.title}*.` }, { quoted: m })
    }

    let { mp4 } = info

    let caption = `
🎬 *${vid.title}*
⏱️ Duración: ${vid.duration}
👤 Canal: ${vid.author?.name || "Desconocido"}
📂 Tamaño: ${mp4.size}
🎞️ Calidad: ${mp4.quality}
🔗 Link: ${vid.url}
`.trim()

    let thumb = null
    try {
      const img = await Jimp.read(mp4.thumbnail || vid.thumbnail || "")
      img.resize(300, Jimp.AUTO)
      thumb = await img.getBufferAsync(Jimp.MIME_JPEG)
    } catch (err) {
      console.log("⚠️ Error al procesar miniatura:", err)
    }

    await conn.sendMessage(m.chat, {
      video: { url: mp4.dl_url },
      mimetype: "video/mp4",
      fileName: `${vid.title}.mp4`,
      caption,
      ...(thumb ? { jpegThumbnail: thumb } : {}),
      contextInfo: {
        externalAdReply: {
          title: vid.title,
          body: "🎬 YouTube Video",
          mediaUrl: vid.url,
          sourceUrl: vid.url,
          thumbnailUrl: mp4.thumbnail || vid.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (err) {
    console.error("Error en ytmp4:", err)
    conn.sendMessage(m.chat, { text: `💀 Error: ${err.message}` }, { quoted: m })
  }
}

handler.command = ['ytmp4doc', 'ytvdoc', 'ytdoc']
handler.help = ['ytmp4doc']
handler.tags = ['descargas']

export default handler