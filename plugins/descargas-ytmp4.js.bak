import axios from "axios"

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  try {
    if (!text)
      return conn.reply(
        m.chat,
        `🚫 *Ingresa un enlace de YouTube válido.*\n\n📌 Ejemplo:\n${usedPrefix + command} https://youtu.be/f09Omvw5C70`,
        m
      )

    const apiUrl = `https://api.yupra.my.id/api/downloader/ytmp4?url=${encodeURIComponent(text)}`
    const res = await axios.get(apiUrl)
    const data = res.data

    if (data.status !== 200 || !data.result)
      throw new Error("❌ No se pudo obtener la información del video.")

    const info = data.result
    const video = info.formats?.find(v => v.itag === 18) || info.formats?.[0]

    // Calcular tamaño en MB
    const sizeMB = video?.contentLength ? (video.contentLength / 1048576).toFixed(2) : "Desconocido"
    const duracion = video?.approxDurationMs
      ? (video.approxDurationMs / 1000 / 60).toFixed(1) + " minutos"
      : "-"

    // Detectar servidor
    const servidor = video?.url?.includes("googlevideo") ? "Yupra" : "ymcdn.org"

    const caption = `
🎶 *ＹＯＵＴＵＢＥ • ＭＰ4* 🍎
────────────────────
> °🎋 𝐓𝐈𝐓𝐔𝐋𝐎: *${info.title || "-"}*
> °🌿 𝐃𝐔𝐑𝐀𝐂𝐈𝐎𝐍: *${duracion}*
> °🍏 𝐂𝐀𝐋𝐈𝐃𝐀𝐃: *${video.qualityLabel || "Desconocida"}*
> °☁️ 𝐓𝐀𝐌𝐀𝐍̃𝐎: *${sizeMB} MB*
> °⚙️ 𝐂𝐎𝐃𝐄𝐂𝐒: *${video.mimeType?.split(";")[0] || "-"}*
> °🕸️ 𝐒𝐄𝐑𝐕𝐈𝐃𝐎𝐑: *${servidor}*
> °🔢 𝐈𝐓𝐀𝐆: *${video.itag || "-"}*
> °🔊 𝐀𝐔𝐃𝐈𝐎: *${video.audioQuality || "-"}*
> °📈 𝐅𝐏𝐒: *${video.fps || "-"}*
────────────────────
✨ *Descargando video...*
`

    await conn.sendMessage(
      m.chat,
      {
        video: { url: video.url },
        caption,
        mimetype: "video/mp4",
        fileName: `${info.title || "video"}.mp4`
      },
      { quoted: m }
    )
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, "❌ *Error al descargar el video.*\nVerifica que el enlace sea válido o intenta nuevamente.", m)
  }
}

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'playmp4'];
handler.group = true;

export default handler;