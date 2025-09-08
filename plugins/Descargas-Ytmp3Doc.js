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
    text: `🍂 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗘𝗡 𝗠𝗔𝗥𝗖𝗔 𝗣𝗥𝗢𝗚𝗥𝗘𝗦𝗢\n\n°^☘️ [▓▓▓▓▓░░░░░░░] 50% Completado`
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

    if (!info.status || !info.mp3) {
      return conn.sendMessage(m.chat, { text: `⚠️ No se pudo obtener el audio de *${vid.title}*.` }, { quoted: m })
    }

    let { mp3 } = info

    let caption = `
📀 *${mp3.title}*
⏱️ Duración: ${vid.duration}
👤 Canal: ${vid.author?.name || "Desconocido"}
🎵 Calidad: ${mp3.quality}
📂 Tamaño: ${mp3.size}
🔗 YouTube: ${vid.url}
`.trim()

    let thumb = null
    try {
      const img = await Jimp.read(mp3.thumbnail)
      img.resize(300, Jimp.AUTO)
      thumb = await img.getBufferAsync(Jimp.MIME_JPEG)
    } catch (err) {
      console.log("⚠️ Error al procesar miniatura:", err)
    }

    await conn.sendMessage(m.chat, {
      document: { url: mp3.dl_url },
      mimetype: "audio/mpeg",
      fileName: `${mp3.title}.mp3`,
      caption,
      ...(thumb ? { jpegThumbnail: thumb } : {}),
      contextInfo: {
        externalAdReply: {
          title: mp3.title,
          body: "🧪 YOUTUBE DOC 💎",
          mediaUrl: vid.url,
          sourceUrl: vid.url,
          thumbnailUrl: mp3.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (err) {
    console.error("Error en playdoc:", err)
    conn.sendMessage(m.chat, { text: `💀 Error: ${err.message}` }, { quoted: m })
  }
}

handler.command = ['ytmp3doc', 'ytadoc']
handler.help = ['ytmp3doc <texto>']
handler.tags = ['descargas']

export default handler