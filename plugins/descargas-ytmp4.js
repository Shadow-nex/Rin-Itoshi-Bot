import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text)
      return conn.reply(
        m.chat,
        `🍷 *Ingresa el enlace de YouTube que deseas descargar en formato MP4.*\n\n📌 Ejemplo:\n${usedPrefix + command} https://youtu.be/dQw4w9WgXcQ`,
        m
      );

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    const apiUrl = `https://api.bk9.dev/download/youtube?url=${encodeURIComponent(text)}`;
    const res = await axios.get(apiUrl);

    if (!res.data.status || !res.data.BK9)
      throw "❌ No se pudo obtener la información del video.";

    const info = res.data.BK9;
    const format = info.formats.find(f => f.extension === "mp4" && f.has_audio) || info.formats[0];

    if (!format || !format.url)
      throw "⚠️ No se encontró un enlace de descarga MP4 válido.";

    const {
      title,
      author,
      duration,
      source,
      thumbnail,
      media_count,
    } = info;

    const {
      quality,
      type,
      extension,
      size,
      bitrate,
      fps,
      mime_type,
      has_audio,
      has_video,
      url: videoUrl
    } = format;

    const caption = `
╭━━━〔 🎥 ＹＯＵＴＵＢＥ ＭＰ4 🍎 〕━━⬣
│🌸 *Título:* ${title}
│👤 *Autor:* ${author}
│🎚️ *Calidad:* ${quality || "Desconocida"}
│💾 *Tamaño:* ${size || "N/A"}
│🕒 *Duración:* ${duration || "N/A"}
│🎞️ *FPS:* ${fps || "N/A"}
│🎵 *Audio:* ${has_audio ? "Sí" : "No"}
│🎬 *Video:* ${has_video ? "Sí" : "No"}
│⚙️ *Bitrate:* ${bitrate || "N/A"}
│🧩 *Tipo:* ${mime_type?.split(";")[0] || type}
│📡 *Fuente:* ${source || "YouTube"}
│🔢 *Formatos:* ${media_count || "N/A"}
╰━━━━━━━━━━━━━━━━━━⬣
👑 *API:* BK9 Dev
🌷 *By:* Rin Itoshi Bot
`;

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption,
    });

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl },
        mimetype: "video/mp4",
        caption: `🎬 *${title}*`,
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: "⚠️", key: m.key } });
    conn.reply(m.chat, `❌ *Error:* ${e?.message || e}`, m);
  }
};

handler.help = ["ytmp4"];
handler.tags = ["downloader"];
handler.command = ["ytmp4", "ytvideo", "youtubevideo"];

export default handler;