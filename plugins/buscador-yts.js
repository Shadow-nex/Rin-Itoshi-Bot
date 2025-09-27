// - codigo creado x ShadowCore 🎋
// - https://github.com/Yuji-XDev
// - https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U

import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const videoCache = {};
const cacheTimeout = 10 * 60 * 1000; // 10 minutos
const MAX_FILE_SIZE_MB = 50;

const shortenURL = async (url) => {
  try {
    let response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    let shortUrl = await response.text();
    return shortUrl.includes("http") ? shortUrl : url;
  } catch {
    return url;
  }
};

const fetchAPI = async (url, type) => {
  try {
    let endpoint =
      type === "audio"
        ? `https://api.zenzxz.my.id/downloader/ytmp3v2?url=${encodeURIComponent(url)}`
        : `https://api.zenzxz.my.id/downloader/ytmp4v2?url=${encodeURIComponent(url)}`;

    let response = await fetch(endpoint);
    let data = await response.json();

    if (data?.status && data?.download_url) {
      return {
        download: data.download_url,
        title: data.title || "Desconocido",
        duration: data.duration || 0,
        thumbnail: data.thumbnail || null,
        format: data.format || "mp4"
      };
    }
    throw new Error("API principal no respondió correctamente.");
  } catch (error) {
    console.log("Error en API:", error.message);
    return null;
  }
};

async function getSize(url) {
  try {
    const response = await axios.head(url);
    const length = response.headers["content-length"];
    return length ? parseInt(length, 10) : null;
  } catch {
    return null;
  }
}

function formatSize(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  if (!bytes || isNaN(bytes)) return "Desconocido";
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

const handler = async (m, { conn, text }) => {
  if (!text?.trim()) return conn.reply(m.chat, "*🎋 Ingresa el nombre de la música a buscar.*", m);

  const search = await yts(text);
  if (!search.all.length) return conn.reply(m.chat, "No se encontraron resultados.", m);

  const results = search.all.slice(0, 10);
  videoCache[m.sender] = { results, timestamp: Date.now() };
  await m.react('🕒');

  let messageText = `🌷 Resultados de la búsqueda para *<${text}>*\n\n`;
  results.forEach((v, i) => {
    messageText += `
*${i + 1}.*
✿ *${v.title}*
> ✦ Canal » *${v.author.name}*
> ⴵ Duración » *${v.timestamp}*
> ✐ Subido » *${v.ago}*
> ✰ Vistas » *${v.views}*
> 🜸 Enlace » ${v.url}


────────────────────────`;
  });

  messageText += `
\n✏️ Responde con:
- \`A <número>\` → Audio
- \`V <número>\` → Video
- \`AD <número>\` → Audio Doc
- \`VD <número>\` → Video Doc`;

  // Miniatura
  const thumbnail2 = results[0]?.thumbnail;
  const thumb = thumbnail2 ? (await conn.getFile(thumbnail2))?.data : null;

  const fakertX = {
    contextInfo: {
      externalAdReply: {
        title: '🍓 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 🎶 𝗦𝗲𝗮𝗿𝗰𝗵',
        body: 'Resultados encontrados',
        mediaType: 1,
        previewType: 0,
        sourceUrl: results[0]?.url,
        thumbnail: thumb,
        renderLargerThumbnail: true
      }
    }
  };

  await m.react('✔️');
  await conn.sendMessage(m.chat, { text: messageText, ...fakertX }, { quoted: m });
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['buscador'];
handler.command = ['ytsearch', 'yts'];
handler.group = true;

handler.before = async (m, { conn }) => {
  if (!m.quoted || !m.quoted.text.includes("Resultados de la búsqueda")) return;

  const match = m.text.trim().match(/^(A|V|AD|VD)\s*(\d+)$/i);
  if (!match) return;

  const [, type, number] = match;
  const index = parseInt(number) - 1;

  if (!videoCache[m.sender] || !videoCache[m.sender].results[index] || Date.now() - videoCache[m.sender].timestamp > cacheTimeout) {
    delete videoCache[m.sender];
    return conn.reply(m.chat, "🎋 La lista expiró. Usa /yts otra vez.", m);
  }

  const videoData = videoCache[m.sender].results[index];
  const urlVideo = videoData.url;

  try {
    let mediaType = type.startsWith("A") ? "audio" : "video";
    let asDocument = type.endsWith("D");

    await conn.reply(m.chat, mediaType === "audio" ? "*🍂 ძᥱsᥴᥲrgᥲᥒძ᥆ ᥲᥙძі᥆...*" : "☁️ ძᥱsᥴᥲrgᥲᥒძ᥆ ᥎іძᥱ᥆...*", m, fake);

    let apiData = await fetchAPI(urlVideo, mediaType);
    if (!apiData) return conn.reply(m.chat, "Error al obtener el enlace.", m);

    let downloadUrl = await shortenURL(apiData.download);
    let sizeBytes = await getSize(apiData.download);
    let fileSizeMB = formatSize(sizeBytes);

    let fileName = `${apiData.title}.${mediaType === "audio" ? "mp3" : "mp4"}`;

    let infoMessage = `
> 🌱 *Título:* ${apiData.title}
> ⏱ *Duración:* ${videoData.timestamp || "?"}
> 💾 *Tamaño:* ${fileSizeMB}
> 🔗 *Descarga:* ${downloadUrl}
`;

    if (asDocument) {
      await conn.sendMessage(m.chat, {
        document: { url: apiData.download },
        fileName,
        mimetype: mediaType === "audio" ? "audio/mpeg" : "video/mp4",
        caption: infoMessage,
        thumbnail: apiData.thumbnail ? { url: apiData.thumbnail } : null
      }, { quoted: m });
    } else if (mediaType === "audio") {
      await conn.sendMessage(m.chat, {
        audio: { url: apiData.download },
        fileName,
        mimetype: "audio/mpeg",
        ptt: false,
        caption: infoMessage,
        contextInfo: {
          externalAdReply: {
            title: apiData.title,
            body: `✐ Duración: ♪ [${videoData.timestamp || "?"}] • ☊ [${fileSizeMB}]`,
            thumbnailUrl: apiData.thumbnail,
            sourceUrl: urlVideo,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, {
        video: { url: apiData.download },
        caption: infoMessage,
        thumbnail: apiData.thumbnail ? { url: apiData.thumbnail } : null
      }, { quoted: m });
    }

  } catch (error) {
    conn.reply(m.chat, `⚠︎ Error: ${error.message}`, m);
  }
};

export default handler;