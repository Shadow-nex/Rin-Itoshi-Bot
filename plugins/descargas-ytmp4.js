import fetch from "node-fetch"

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("🌿 Ingresa un enlace de *YouTube* para descargar el video.")

  try {
    m.react("⏳")

    let api = `https://apis-starlights-team.koyeb.app/starlight/youtube-mp4?url=${encodeURIComponent(text)}&format=360p`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.dl_url) return m.reply("❌ No se pudo obtener el enlace de descarga. Intenta con otro video.")

    let { title, author, thumbnail, quality, dl_url } = json

    // Mensaje decorado
    let caption = `
╭━━━〔 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐕𝐈𝐃𝐄𝐎 🎬 〕━━⬣
┃ 🌿 *Título:* ${title}
┃ 👤 *Autor:* ${author}
┃ 📹 *Calidad:* ${quality}
╰━━━━━━━━━━━━━━⬣
> 🧩 *Descarga completada con éxito.*
`

    await conn.sendMessage(m.chat, {
      video: { url: dl_url },
      caption,
      mimetype: "video/mp4",
      fileName: `${title}.mp4`,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: author,
          thumbnailUrl: thumbnail,
          sourceUrl: text,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    m.react("✅")

  } catch (e) {
    console.error(e)
    m.reply("⚠️ Error al procesar la descarga. Intenta nuevamente más tarde.")
    m.react("❌")
  }
}

handler.help = ["ytmp4"]
handler.tags = ["downloader"]
handler.command = ["ytmp4"]

export default handler