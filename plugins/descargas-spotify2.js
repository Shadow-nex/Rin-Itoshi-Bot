import fetch from 'node-fetch'
import Jimp from 'jimp'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🍂 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://open.spotify.com/track/6UR5tB1wVm7qvH4xfsHr8m`)
  }

  try {
    const apiURL = `https://api.dorratz.com/spotifydl?url=${encodeURIComponent(text)}`
    const res = await fetch(apiURL)
    if (!res.ok) throw await res.text()

    const json = await res.json()
    if (!json || !json.download_url) {
      return m.reply("⚠️ No pude obtener el enlace de descarga. Intenta con otra URL.")
    }

    const name = json.name || "Desconocido"
    const artists = json.artists || "Desconocido"
    const image = json.image || null
    const duration = json.duration_ms 
      ? new Date(json.duration_ms).toISOString().substr(14, 5) 
      : "0:00"
    const download = json.download_url
    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } })
    let caption = `\`\`\`🧪 Título: ${name}
🌷 Artista: ${artists}
⏱️ Duración: ${duration} min\`\`\``

    let thumb = null
    if (image) {
      try {
        const img = await Jimp.read(image)
        img.resize(300, Jimp.AUTO)
        thumb = await img.getBufferAsync(Jimp.MIME_JPEG)
      } catch (err) {
        console.log("⚠️ Error al procesar miniatura:", err)
      }
    }

    await conn.sendMessage(m.chat, {
      document: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      caption: caption,
      ...(thumb ? { jpegThumbnail: thumb } : {})
    }, { quoted: m })


    await conn.sendMessage(m.chat, {
      audio: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      ...(thumb ? { 
        contextInfo: {
          externalAdReply: {
            title: name,
            body: artists,
            mediaType: 2,
            renderLargerThumbnail: true,
            thumbnail: thumb,
            sourceUrl: text
          }
        }
      } : {})
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("\`Error al procesar la descarga de Spotify.\`")
  }
}

handler.help = ['spotify2 <url>']
handler.tags = ['dl']
handler.command = ['spotify2']

export default handler