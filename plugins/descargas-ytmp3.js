import fetch from "node-fetch";

const getSize = async (url) => {
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (!res.ok) return null;
    const length = res.headers.get("content-length");
    return length ? parseInt(length) : null;
  } catch {
    return null;
  }
};

const formatSize = (bytes) => {
  if (!bytes) return "Desconocido";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `Ingresa el nombre de la canción o un enlace de YouTube.\n\nEjemplo: ${usedPrefix + command} DJ Malam Pagi`,
        m
      );
    }

    let title = "Desconocido",
      author = "N/A",
      image = "https://files.catbox.moe/h4lrn3.jpg",
      duration = 0,
      filename = "audio.mp3",
      audioUrl = null,
      views = "N/A",
      likes = "N/A",
      category = "N/A",
      quality = "N/A",
      format = "mp3",
      id = "N/A",
      published = "Desconocido",
      sourceUrl = text;

    if (text.includes("youtube.com") || text.includes("youtu.be")) {
      const apiUrl = `https://api.delirius.store/download/ytmp3?url=${encodeURIComponent(text)}`;
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (json?.status && json?.data) {
        const data = json.data;
        const download = data.download || {};

        // Datos principales
        title = data.title || title;
        author = data.author || author;
        image = data.image_max_resolution || data.image || image;
        duration = data.duration || duration;
        filename = download.filename || `${title}.mp3`;
        audioUrl = download.url;

        // Extras
        views = data.views || views;
        likes = data.likes || likes;
        category = data.category || category;
        quality = download.quality || quality;
        format = download.extension || format;
        id = data.id || id;
        published = data.uploadDate || published;
        sourceUrl = text; // mantener URL original
      }
    } else {
      const apiUrl = `https://api.zenzxz.my.id/search/play?query=${encodeURIComponent(text)}`;
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (json?.status && json?.dl_mp3) {
        const meta = json.metadata || {};

        title = meta.title || title;
        author = meta.author || "Desconocido";
        image = meta.thumbnail || image;
        duration = meta.duration || 0;
        filename = `${title}.mp3`;
        audioUrl = json.dl_mp3;

        // Extras
        quality = meta.quality || quality;
        format = meta.format || format;
        id = meta.id || id;
        published = meta.published || published;
        sourceUrl = meta.url || text;
      }
    }

    if (!audioUrl) {
      return conn.reply(m.chat, "❌ No se encontró un enlace de descarga válido.", m);
    }

    const formatDuration = (secs) => {
      const min = Math.floor(secs / 60);
      const sec = secs % 60;
      return `${min}:${sec.toString().padStart(2, "0")} min`;
    };

    const sizeStr = await getSize(audioUrl).then((size) => formatSize(size));

    const textoInfo = `\`\`\`
🍂 Título     : ${title}
🌱 Autor      : ${author}
⏱️ Duración   : ${duration ? formatDuration(duration) : 'Desconocida'}
🚀 Vistas     : ${views}
👍 Likes      : ${likes}
📂 Categoría  : ${category}
🧩 Formato    : ${format}
🎶 Calidad    : ${quality}
📦 Tamaño     : ${sizeStr}
📅 Publicado  : ${published}
🔑 ID Video   : ${id}
💨 Link       : ${sourceUrl}\`\`\`

*≡ Enviando, espera un momento . . .*`;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: image },
        caption: textoInfo,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: title,
            body: "🍂 Descargando desde YouTube",
            thumbnailUrl: image,
            sourceUrl: sourceUrl,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: m }
    );

    const audioBuffer = await (await fetch(audioUrl)).buffer();

    await conn.sendMessage(
      m.chat,
      {
        audio: audioBuffer,
        fileName: filename,
        mimetype: "audio/mpeg",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: `Duración: ${duration ? formatDuration(duration) : "N/A"}`,
            mediaUrl: sourceUrl,
            sourceUrl: sourceUrl,
            thumbnailUrl: image,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "❌ Ocurrió un error al procesar tu solicitud.", m);
  }
};

handler.help = ["ytmp3"].map(v => v + " <url o texto>");
handler.tags = ["downloader"];
handler.command = ["ytmp3"];

export default handler;