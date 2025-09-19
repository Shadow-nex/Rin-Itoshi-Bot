import fetch from "node-fetch";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) return conn.reply(
      m.chat,
      `Escribe el nombre de la canción o un link de YouTube.\nEjemplo: ${usedPrefix + command} DJ Malam Pagi`,
      m
    );

    let title = "Desconocido",
        author = "Desconocido",
        image = "https://files.catbox.moe/h4lrn3.jpg",
        duration = 0,
        filename = "audio.mp3",
        audioUrl = null,
        views = "-",
        likes = "-",
        category = "-",
        quality = "-",
        format = "mp3",
        id = "-",
        published = "-",
        sourceUrl = text,
        sizeStr = "-";

    if (text.includes("youtube.com") || text.includes("youtu.be")) {
      const apiUrl = `https://api.delirius.store/download/ytmp3?url=${encodeURIComponent(text)}`;
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (json?.status && json?.data) {
        const data = json.data;
        const download = data.download || {};

        title = data.title || title;
        author = data.author || author;
        image = data.image_max_resolution || data.image || image;
        duration = data.duration || duration;
        filename = download.filename || `${title}.mp3`;
        audioUrl = download.url || null;

        views = data.views || views;
        likes = data.likes || likes;
        category = data.category || category;
        quality = download.quality || quality;
        format = download.extension || format;
        id = data.id || id;
        published = data.uploadDate || published;

        // Usar tamaño directo si existe
        if (download.bytes_size) {
          const k = 1024;
          const sizes = ["B","KB","MB","GB"];
          const i = Math.floor(Math.log(download.bytes_size)/Math.log(k));
          sizeStr = `${(download.bytes_size/Math.pow(k,i)).toFixed(2)} ${sizes[i]}`;
        }
      }
    }

    if (!audioUrl) return conn.reply(m.chat, "❌ No se encontró un enlace de descarga válido.", m);

    const formatDuration = (secs) => {
      const min = Math.floor(secs/60);
      const sec = secs % 60;
      return `${min}:${sec.toString().padStart(2,"0")} min`;
    };

    const infoMsg = `\`\`\`
🍂 Título     : ${title}
🌱 Autor      : ${author}
⏱️ Duración   : ${duration ? formatDuration(duration) : "-"}
🚀 Vistas     : ${views}
👍 Likes      : ${likes}
📂 Categoría  : ${category}
🧩 Formato    : ${format}
🎶 Calidad    : ${quality}
📦 Tamaño     : ${sizeStr}
📅 Publicado  : ${published}
🔑 ID Video   : ${id}
💨 Link       : ${sourceUrl}\`\`\`

*≡ Enviando, espera un momento...*`;

    await conn.sendMessage(m.chat, { image: { url: image }, caption: infoMsg }, { quoted: m });

    const audioBuffer = await (await fetch(audioUrl)).buffer();
    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: filename, mimetype: "audio/mpeg", ptt: false }, { quoted: m });

  } catch(e) {
    console.error(e);
    conn.reply(m.chat, "❌ Ocurrió un error al procesar tu solicitud.", m);
  }
};

handler.help = ["ytmp3"].map(v=>v+" <url o texto>");
handler.tags = ["downloader"];
handler.command = ["ytmp3"];

export default handler;