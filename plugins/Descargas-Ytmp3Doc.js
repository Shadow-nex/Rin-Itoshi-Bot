import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let q = args.join(" ").trim()
  if (!q) {
    return conn.sendMessage(m.chat, {
      text: `🎶 Ingresa el nombre de la canción\n\n📌 Uso: *${usedPrefix + command} <canción/artista>*`
    }, { quoted: m })
  }

  await conn.sendMessage(m.chat, { text: `🔍 Buscando *${q}* en YouTube...` }, { quoted: m })

  try {
    // Buscar en YouTube (API Delirius)
    let res = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(q)}`)
    let json = await res.json()

    if (!json.status || !json.data || !json.data.length) {
      return conn.sendMessage(m.chat, { text: `❌ No encontré resultados para *${q}*.` }, { quoted: m })
    }

    let vid = json.data[0]

    // Descargar MP3 (API Starlights)
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

    // Enviar como documento .mp3
    await conn.sendMessage(m.chat, {
      document: { url: mp3.dl_url },
      mimetype: "audio/mpeg",
      fileName: `${mp3.title}.mp3`,
      caption
    }, { quoted: m })

  } catch (err) {
    console.error("Error en playdoc:", err)
    conn.sendMessage(m.chat, { text: `💀 Error: ${err.message}` }, { quoted: m })
  }
}

handler.command = /^playdoc$/i
handler.help = ["playdoc <canción>"]
handler.tags = ["descargas"]

export default handler