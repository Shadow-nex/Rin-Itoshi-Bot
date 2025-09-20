import fetch from 'node-fetch'
import Jimp from 'jimp'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🍂 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://open.spotify.com/track/0RmVGwfIgezMi7EKB3lU0B`)
  }

  try {
    const apiURL = `https://api.stellarwa.xyz/dow/spotify?url=${encodeURIComponent(text)}&apikey=Diamond`
    const res = await fetch(apiURL)
    if (!res.ok) throw await res.text()

    const json = await res.json()
    if (!json || !json.data || !json.data.dl) {
      return m.reply("⚠️ No pude obtener el enlace de descarga. Intenta con otra URL.")
    }

    const name = json.data.title || "Desconocido"
    const download = json.data.dl
    const durationMs = json.data.duration || 0

    const duration = durationMs > 0 ? 
      new Date(durationMs).toISOString().substr(14, 5) : 
      "Desconocido"

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } })
    await conn.sendMessage(m.chat, {
      text: '🍂 *B U S C A N D O. . . ...*',
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ ᴅᴠ.sʜᴀᴅᴏᴡ 🪴',
          body: name,
          mediaType: 1,
          renderLargerThumbnail: false,
          sourceUrl: text
        }
      }
    }, { quoted: m })

    let caption = `\`\`\`🧪 Título: ${name}
⏱️ Duración: ${duration}\`\`\``

    // Enviar como documento (mp3)
    await conn.sendMessage(m.chat, {
      document: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      caption: caption
    }, { quoted: m })

    // Enviar como audio directo
    await conn.sendMessage(m.chat, {
      audio: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: name,
          body: "Spotify",
          mediaType: 2,
          renderLargerThumbnail: true,
          sourceUrl: text
        }
      }
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