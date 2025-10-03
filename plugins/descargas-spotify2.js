import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🍂 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://open.spotify.com/track/0RmVGwfIgezMi7EKB3lU0B\n\n✎ ✧ \`${usedPrefix + command}\` TWICE - I CAN'T STOP ME`)
  }

  try {
    let info, json

    if (text.includes("spotify.com/track")) {
      const url1 = `https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(text)}`
      const res1 = await fetch(url1)
      if (!res1.ok) throw await res1.text()
      const j1 = await res1.json()
      if (!j1 || !j1.data || !j1.data.url) throw "No pude obtener la descarga"

      json = {
        title: j1.data.title,
        author: j1.data.author,
        image: j1.data.image,
        duration: j1.data.duration,
        url: j1.data.url
      }

      const query = encodeURIComponent(j1.data.title + " " + j1.data.author)
      const resInfo = await fetch(`https://api.yupra.my.id/api/search/spotify?q=${query}`)
      if (resInfo.ok) {
        const jInfo = await resInfo.json()
        info = jInfo.result?.[0] || null
      }

    } else {

      const resSearch = await fetch(`https://api.yupra.my.id/api/search/spotify?q=${encodeURIComponent(text)}`)
      if (!resSearch.ok) throw await resSearch.text()
      const jSearch = await resSearch.json()
      if (!jSearch.result || !jSearch.result[0]) throw "No encontré resultados"

      info = jSearch.result[0]

      const previewUrl = info.spotify_preview
      const resDl = await fetch(`https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(previewUrl)}`)
      if (!resDl.ok) throw await resDl.text()
      const jDl = await resDl.json()
      if (!jDl || !jDl.data || !jDl.data.url) throw "No pude obtener la descarga"

      json = {
        title: jDl.data.title,
        author: jDl.data.author,
        image: jDl.data.image,
        duration: jDl.data.duration,
        url: jDl.data.url
      }
    }

    const name = json.title || "Desconocido"
    const author = json.author || "Desconocido"
    const download = json.url
    const durationMs = json.duration || 0
    const duration = durationMs > 0 ? 
      new Date(durationMs).toISOString().substr(14, 5) : 
      "Desconocido"

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } })

    let moreInfo = info ? `
🎶 Álbum: ${info.album_name || "Desconocido"}
📀 Release: ${info.release_date || "N/A"}
🔗 Preview: ${info.spotify_preview || "N/A"}` : ""

    let caption = `\`\`\`🧪 Título: ${name}
👤 Artista: ${author}
⏱️ Duración: ${duration}\`\`\`${moreInfo}`

    await conn.sendMessage(m.chat, {
      text: '🍂 *B U S C A N D O. . . ...*',
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ ᴅᴠ.sʜᴀᴅᴏᴡ 🪴',
          body: name,
          mediaType: 1,
          thumbnailUrl: json.image,
          renderLargerThumbnail: true,
          sourceUrl: text
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      document: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      caption: caption
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: name,
          body: "Spotify",
          mediaType: 2,
          thumbnailUrl: json.image,
          renderLargerThumbnail: true,
          sourceUrl: text
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("`❌ Error al procesar la descarga de Spotify.`")
  }
}

handler.help = ['music <url|nombre>']
handler.tags = ['dl']
handler.command = ['music']

export default handler