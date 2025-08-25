import fetch from 'node-fetch'

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

    let caption = `
╭━━━〔 𝗦𝗣𝗢𝗧𝗜𝗙𝗬 𝟮 〕━━⬣
┃🎶 *Título:* ${name}
┃👤 *Artista:* ${artists}
┃⏱️ *Duración:* ${duration} seg
┃📥 *Descarga directa abajo* 
╰━━━━━━━━━━━━━━━━⬣
`

    await conn.sendMessage(m.chat, {
      image: { url: image },
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
handler.command = /^spotify2$/i

export default handler