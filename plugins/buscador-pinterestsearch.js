import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) return m.reply(`🎋 Ingresa un nombre o tema para buscar videos en *Pinterest*.\n\n📌 Ejemplo:\n${usedPrefix + command} gatos graciosos`)

    await m.react("⏳")

    const api = `https://api.neoxr.eu/api/pinterest-v2?q=${encodeURIComponent(text)}&type=video&apikey=russellxz`
    const res = await fetch(api)
    const data = await res.json()

    if (!data.status || !data.data?.length) {
      return m.reply(`❌ No se encontraron resultados para: *${text}*`)
    }

    const videos = data.data.filter(v => v.is_video && v.content?.[0]?.url)

    if (!videos.length) {
      return m.reply(`⚠️ No se encontraron videos válidos en Pinterest.`)
    }

    await m.react("🎞️")

    for (let v of videos) {
      const info = v.content[0]
      const author = v.author || {}

      const caption = `
╭━━━〔 🩵 *PINTEREST VIDEO* 🩵 〕━━⬣
┃💫 *Título:* ${v.title || "Sin título"}
┃📝 *Descripción:* ${v.description || "Sin descripción"}
┃👤 *Autor:* ${author.full_name || "Desconocido"} (@${author.username || "anon"})
┃🌟 *Seguidores:* ${author.follower_count || 0}
┃🔗 *Fuente:* ${v.source || "Desconocida"}
╰━━━━━━━━━━━━━━━━━━━━⬣
🎬 *Duración:* ${(info.duration / 1000).toFixed(1)} seg
      `.trim()

      try {
        await conn.sendMessage(m.chat, {
          video: { url: info.url },
          caption,
          thumbnail: info.thumbnail,
          mimetype: "video/mp4"
        }, { quoted: m })
      } catch {
        await conn.sendMessage(m.chat, { image: { url: info.thumbnail }, caption }, { quoted: m })
      }
    }

    await m.react("✅")

  } catch (err) {
    console.error(err)
    await m.reply("⚠️ Error al obtener los videos, intenta nuevamente más tarde.")
  }
}

handler.help = ["pinterestvideo", "pine"]
handler.tags = ["search"]
handler.command = ["pinterestvideo", "pinse"]

export default handler