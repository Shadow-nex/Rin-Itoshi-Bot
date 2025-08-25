/*import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🍃 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://open.spotify.com/track/6UR5tB1wVm7qvH4xfsHr8m`)
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
    const duration = json.duration_ms ? (json.duration_ms / 1000).toFixed(0) : 0
    const download = json.download_url

    let caption = `\`\`\`🧪 *Título:* ${name}
🌷 *Artista:* ${artists}
⏱️ *Duración:* ${duration} seg\`\`\``

    await conn.sendMessage(m.chat, {
      document: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      caption: caption
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("❌ Error al procesar la descarga de Spotify.")
  }
}

handler.help = ['spotify2 <url>']
handler.tags = ['dl']
handler.command = ['spotify2']

export default handler*/

import fetch from 'node-fetch'

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

    let caption = `\`\`\`🧪 *Título:* ${name}
🌷 *Artista:* ${artists}
⏱️ *Duración:* ${duration} min\`\`\``

    await conn.sendMessage(m.chat, {
      document: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      caption: caption,
      jpegThumbnail: image ? await (await fetch(image)).buffer() : null // <-- portada
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: name,
          body: artists,
          thumbnailUrl: image,
          sourceUrl: text,
          mediaType: 2,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("❌ Error al procesar la descarga de Spotify.")
  }
}

handler.help = ['spotify2 <url>']
handler.tags = ['dl']
handler.command = ['spotify2']

export default handler