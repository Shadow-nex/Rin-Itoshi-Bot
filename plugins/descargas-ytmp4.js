import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text)
      return conn.reply(
        m.chat,
        `🍷 *Ingresa el enlace de YouTube que deseas descargar en formato MP4.*\n\n📌 Ejemplo:\n${usedPrefix + command} https://youtube.com/watch?v=dQw4w9WgXcQ`,
        m
      );

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    const apiUrl = `https://api.yupra.my.id/api/downloader/ytmp4?url=${encodeURIComponent(text)}`;
    const res = await axios.get(apiUrl);

    if (res.data.status !== 200 || !res.data.result)
      throw "❌ No se pudo obtener la información del video.";

    const info = res.data.result;
    const format = info.formats?.[0];

    if (!format || !format.url) throw "⚠️ No se encontró el enlace de descarga MP4.";

    // Datos del video
    const {
      title,
      formats,
    } = info;

    const {
      qualityLabel,
      mimeType,
      bitrate,
      width,
      height,
      fps,
      contentLength,
      url: videoUrl,
      approxDurationMs,
      audioQuality,
      audioSampleRate,
      audioChannels,
    } = format;

    const duration = `${(approxDurationMs / 60000).toFixed(1)} min`;
    const sizeMB = (contentLength / 1024 / 1024).toFixed(2) + " MB";

    const caption = `
╭━━━〔 🎥 ＹＯＵＴＵＢＥ ＭＰ4 🍎 〕━━⬣
│🌸 *Título:* ${title}
│💠 *Calidad:* ${qualityLabel || "Desconocida"}
│🎚️ *Resolución:* ${width}x${height}
│🎵 *Audio:* ${audioQuality || "-"} (${audioSampleRate} Hz)
│💾 *Tamaño:* ${sizeMB}
│🕒 *Duración:* ${duration}
│⚙️ *Bitrate:* ${bitrate} bps
│🎬 *FPS:* ${fps}
│🔊 *Canales:* ${audioChannels}
│🧩 *Tipo:* ${mimeType.split(";")[0]}
╰━━━━━━━━━━━━━━━━━━⬣
👑 *Fuente:* Yupra API
🌷 *By:* Rin Itoshi Bot
`;

    const thumb = `https://i.ytimg.com/vi/${text.split("v=")[1]}/hqdefault.jpg`;

    await conn.sendMessage(m.chat, {
      image: { url: thumb },
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