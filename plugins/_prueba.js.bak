// 📌 Comando: lyrics / letra
// Creado desde cero 🔥

import axios from "axios"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`❌ Ejemplo de uso:\n${usedPrefix + command} ojala beret`)
  }

  try {
    // Buscar en Genius con API free
    let search = await axios.get(
      `https://deliriussapi-oficial.vercel.app/search/genius?q=${encodeURIComponent(text)}`
    )
    let data = search.data

    if (!data || !data.length) {
      return m.reply(`⚠️ No encontré resultados para: *${text}*`)
    }

    // Tomamos el primer resultado
    let song = data[0]

    // Buscar letra
    let lyricsRes = await axios.get(
      `https://deliriussapi-oficial.vercel.app/search/lyrics?url=${song.url}&parse=false`
    )

    let lyrics = lyricsRes.data.lyrics || "⚠️ No se encontró la letra."

    // Construcción del mensaje
    let caption = `
╭━━━〔 🎶 𝑳𝒆𝒕𝒓𝒂 🎶 〕━━⬣
┃ ✨ *Título:* ${song.title}
┃ 🎤 *Artista:* ${song.artist?.name || "Desconocido"}
┃ 🌐 *Enlace:* ${song.url}
╰━━━━━━━━━━━━━━━━⬣

${lyrics}
`

    // Enviar con portada si existe
    await conn.sendMessage(m.chat, {
      image: { url: song.image || "https://i.ibb.co/4VfS7Fk/music.jpg" },
      caption
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    m.reply("❌ Ocurrió un error al buscar la letra.")
  }
}

handler.help = ["lyrics", "letra"].map(v => v + " <canción>")
handler.tags = ["music"]
handler.command = /^(lyrics|lyric|letra|lirik)$/i

export default handler