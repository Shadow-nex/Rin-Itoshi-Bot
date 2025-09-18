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

/*
import fetch from "node-fetch";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `⚠️ Ingresa un enlace de YouTube.\n\n📌 Ejemplo: ${usedPrefix + command} https://youtu.be/TdrL3QxjyVw`,
        m
      );
    }

    const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.status || !json.data) {
      return conn.reply(m.chat, "❌ No se pudo obtener el audio. Intenta con otro link.", m);
    }

    const { 
      title, 
      id, 
      author, 
      image, 
      image_max_resolution, 
      private: priv, 
      views, 
      likes, 
      comments, 
      category, 
      duration, 
      download 
    } = json.data;

    // --- Convertir duración a formato mm:ss ---
    const formatDuration = (secs) => {
      const min = Math.floor(secs / 60);
      const sec = secs % 60;
      return `${min}:${sec.toString().padStart(2, "0")} min`;
    };

    const caption = `
╭━━━〔 🎵 𝐘𝐓 𝐌𝐏𝟑 🎵 〕━━⬣
┃ 📌 *Título:* ${title}
┃ 🆔 *ID:* ${id}
┃ 👤 *Autor:* ${author}
┃ 🗂️ *Categoría:* ${category}
┃ ⏱️ *Duración:* ${formatDuration(duration)}
┃ 👀 *Vistas:* ${views}
┃ 👍 *Likes:* ${likes}
┃ 💬 *Comentarios:* ${comments}
┃ 🔒 *Privado:* ${priv ? "Sí" : "No"}
┃ 📂 *Archivo:* ${download.filename}
┃ 🎶 *Calidad:* ${download.quality}
┃ 📏 *Tamaño:* ${download.size}
┃ 🧩 *Extensión:* ${download.extension}
╰━━━━━━━━━━━━━━━━━⬣
`;

    // --- Descargar audio ---
    const audioRes = await fetch(download.url);
    const audioBuffer = await audioRes.arrayBuffer();

    // --- Info con miniatura HD ---
    await conn.sendMessage(m.chat, {
      image: { url: image_max_resolution || image },
      caption: caption.trim()
    }, { quoted: m });

    // --- Enviar audio ---
    await conn.sendMessage(m.chat, {
      audio: Buffer.from(audioBuffer),
      fileName: download.filename || `${title}.mp3`,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: `🎶 ${author} | ⏱️ ${formatDuration(duration)}`,
          thumbnailUrl: image,
          mediaUrl: text,
          sourceUrl: text,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "❌ Ocurrió un error al procesar tu solicitud.", m);
  }
};

handler.help = ["ytmp3"].map(v => v + " <url>");
handler.tags = ["downloader"];
handler.command = ["ytmp3"];
export default handler;*/