import fetch from 'node-fetch';

const thumbnailUrl = icono;

const contextInfo = {
  externalAdReply: {
    title: "🎧 YouTube Music",
    body: "Reproducción directa desde el universo musical...",
    mediaType: 1,
    previewType: 0,
    mediaUrl: "https://youtube.com",
    sourceUrl: "https://youtube.com",
    thumbnailUrl
  }
};

const handler = async (m, { conn, args, command, usedPrefix }) => {
  const text = args.join(" ").trim();
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🌿 *¿Qué deseas escuchar en YouTube?*\n\n🎋 Uso: *${usedPrefix + command} <nombre de canción/artista>*`,
      contextInfo
    }, { quoted: m });
  }

  await conn.sendMessage(m.chat, {
    text: `🌤️ B U S C A N D O :\n> ${text}*`,
    contextInfo
  }, { quoted: m });

  try {
    const search = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(text)}`);
    const jsonSearch = await search.json();

    if (!jsonSearch.status || !jsonSearch.data || jsonSearch.data.length === 0) {
      return conn.sendMessage(m.chat, {
        text: `No se encontraron resultados para *${text}*.`,
        contextInfo
      }, { quoted: m });
    }

    const video = jsonSearch.data[0];

    const dl = await fetch(`https://api.delirius.store/download/ytmp3?url=${encodeURIComponent(video.url)}`);
    const jsonDl = await dl.json();

    if (!jsonDl.status || !jsonDl.data?.download) {
      return conn.sendMessage(m.chat, {
        text: `⚠️ No se pudo obtener el audio de *${video.title}*.`,
        contextInfo
      }, { quoted: m });
    }

    const {
      title,
      author,
      duration,
      views,
      likes,
      comments,
      category,
      image
    } = jsonDl.data;

    const {
      filename,
      quality,
      size,
      url
    } = jsonDl.data.download;

    const durationFormatted = `${Math.floor(duration / 60)}:${duration % 60 < 10 ? '0'+duration%60 : duration%60} min`;

    const caption = `
🎬 *${title}*
👤 *Canal:* ${author}
📺 *Vistas:* ${views}
👍 *Likes:* ${likes}
💬 *Comentarios:* ${comments}
🎶 *Categoría:* ${category}
⏱️ *Duración:* ${durationFormatted}
🎵 *Calidad:* ${quality}
📂 *Tamaño:* ${size}
🔗 *YouTube:* ${video.url}
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: image },
      caption,
      contextInfo
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url },
      fileName: filename,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title,
          body: `Duración: ${durationFormatted}`,
          mediaUrl: video.url,
          sourceUrl: video.url,
          thumbnailUrl: image,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error("Error en YouTube Downloader:", e);
    await conn.sendMessage(m.chat, {
      text: `*Ocurrió un error al intentar obtener la canción...*\n\n🛠️ ${e.message}`,
      contextInfo
    }, { quoted: m });
  }
};

handler.help = ["ytmp3"].map(v=>v+" <url o texto>");
handler.tags = ["downloader"];
handler.command = ["ytmp3"];
    
export default handler;