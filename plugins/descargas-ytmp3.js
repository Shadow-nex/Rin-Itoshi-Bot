import fetch from "node-fetch";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `Ingresa el nombre de la canción o un enlace de YouTube.\n\n🍂 Ejemplo: ${usedPrefix + command} DJ Malam Pagi`,
        m
      );
    }

    const url = `https://api.vreden.my.id/api/v1/download/play/audio?query=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`❌ Error HTTP ${res.status}`);

    const json = await res.json();

    const result = json?.result ?? {};
    const metadata = result?.metadata ?? {};
    const download = result?.download ?? {};

    const {
      type,
      videoId,
      url: videoUrl,
      title,
      description,
      image,
      thumbnail,
      seconds,
      timestamp,
      duration,
      ago,
      views,
      author
    } = metadata;

    const author_name = author?.name ?? "Desconocido";

    const {
      quality,
      url: audioUrl,
      filename
    } = download;

    let info = `🎼 *Título:* ${title}
👤 *Autor:* ${author_name}
📀 *Tipo:* ${type}
⏱️ *Duración:* ${timestamp} (${seconds}s)
📅 *Publicado:* ${ago}
👀 *Vistas:* ${views?.toLocaleString()}
🎧 *Calidad:* ${quality}
🔗 *YouTube:* ${videoUrl}
💾 *Archivo:* ${filename}`;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail },
        caption: info,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: "Descargando ...",
            thumbnailUrl: image,
            sourceUrl: videoUrl,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    );

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: audioUrl },
        fileName: `${title}.mp3`,
        mimetype: "audio/mpeg",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: `🍁 Duración: ${timestamp}`,
            mediaUrl: videoUrl,
            sourceUrl: videoUrl,
            thumbnailUrl: thumbnail,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: m }
    );

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, "❌ Ocurrió un error al procesar la canción.", m);
  }
};

handler.help = ["ytmp3"].map(v => v + " <texto>");
handler.tags = ["downloader"];
handler.command = ["ytmp3"];

export default handler;