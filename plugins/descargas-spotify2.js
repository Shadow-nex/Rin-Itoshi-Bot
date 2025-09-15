import fetch from 'node-fetch'
import Jimp from 'jimp'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🍂 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh`)
  }

  try {

    const apiURL = `https://api.siputzx.my.id/api/d/spotifyv2?url=${encodeURIComponent(text)}`
    const res = await fetch(apiURL)
    if (!res.ok) throw await res.text()

    const json = await res.json()
    if (!json || !json.data || !json.data.mp3DownloadLink) {
      return m.reply("⚠️ No pude obtener el enlace de descarga. Intenta con otra URL.")
    }

    const name = json.data.songTitle || "Desconocido"
    const artists = json.data.artist || "Desconocido"
    const image = json.data.coverImage || null
    const download = json.data.mp3DownloadLink
    const duration = "Desconocido"

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } })
    await conn.sendMessage(m.chat, {
      text: '🍂 *B U C A N D O. . . ...*',
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ ᴅᴠ.sʜᴀᴅᴏᴡ 🪴',
          body: artists,
          thumbnailUrl: image,
          sourceUrl: text,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m })

    let caption = `\`\`\`🧪 Título: ${name}
🌷 Artista: ${artists}
⏱️ Duración: ${duration}\`\`\``

    // Miniatura
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

handler.help = ['music <url>']
handler.tags = ['dl']
handler.command = ['music']

export default handler