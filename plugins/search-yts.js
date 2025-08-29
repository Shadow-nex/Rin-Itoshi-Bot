import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const videoCache = {};
const cacheTimeout = 10 * 60 * 1000; // 10 minutos
const formatAudio = "audio";
const formatVideo = "video";
const MAX_FILE_SIZE_MB = 100;

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
    const endpoints = {
      audio: `https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${url}`,
      video: `https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=api&url=${url}`,
    };
    let response = await fetch(endpoints[type]);
    let data = await response.json();
    if (data?.download) return data;
    throw new Error("API principal no respondió correctamente.");
  } catch (error) {
    console.log("Error en API principal:", error.message);
    try {
      const fallbackEndpoints = {
        audio: `https://api.neoxr.eu/api/youtube?url=${url}&type=audio&quality=128kbps&apikey=GataDios`,
        video: `https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=720p&apikey=GataDios`,
      };
      let response = await fetch(fallbackEndpoints[type]);
      let data = await response.json();
      if (data?.data?.url) {
        return {
          download: data.data.url,
          title: data.data.title,
          filesize: data.data.filesize,
          duration: data.data.duration,
          channel: data.data.channel,
          thumbnail: data.data.thumbnail,
        };
      }
      throw new Error("API de respaldo no respondió correctamente.");
    } catch (error) {
      console.log("Error en API de respaldo:", error.message);
      return null;
    }
  }
};

async function getSize(url) {
  try {
    const response = await axios.head(url);
    const length = response.headers['content-length'];
    return length ? parseInt(length, 10) : null;
  } catch (error) {
    console.error("Error al obtener el tamaño:", error.message);
    return null;
  }
}

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;

  if (!bytes || isNaN(bytes)) return 'Desconocido';

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  return `${bytes.toFixed(2)} ${units[i]}`;
}

const handler = async (m, { conn, text }) => {
  if (!text.trim()) return conn.reply(m.chat, "*🌱 Ingresa el nombre de la música a buscar.*", m);

  const search = await yts(text);
  if (!search.all.length) return conn.reply(m.chat, "❌ No se encontraron resultados.", m);

  const results = search.all.slice(0, 10);
  videoCache[m.sender] = { results, timestamp: Date.now() };

  let messageText = "🎵 *Resultados de búsqueda:* \n\n";
  results.forEach((video, i) => {
    const title = video.title || "Desconocido";
    const url = video.url || "No disponible";
    const duration = video.timestamp || "Desconocida";
    const author = video.author?.name || "Desconocido";
    const views = video.views ? video.views.toLocaleString() : "Desconocidas";
    const uploaded = video.ago || "Desconocida";

    messageText += `\n*${i + 1}.* *${title}*\n> 🚀 \`Duración:\` *${duration}*\n> 💥 \`Canal:\` *${author}*\n> 🌷 \`Vistas:\` *${views}*\n> ⚡ \`Subido:\` *${uploaded}*\n> 🔗 ${url}\n\n`;
  });

  messageText += "✏️ Responde con `A <número>` para audio o `V <número>` para video.\nEjemplo: `A 1` o `V 3`";

  await conn.reply(m.chat, messageText, m);
};

handler.command = ["ytss","ytsearch3"];
handler.tags = ["downloader"];
handler.help = ["ytss <texto>"];

handler.before = async (m, { conn }) => {
  if (!m.quoted || !m.quoted.text.includes("🎵 *Resultados de búsqueda:*")) return;

  const match = m.text.trim().match(/^([AV])\s*(\d+)$/i);
  if (!match) return;

  const [, type, number] = match;
  const index = parseInt(number) - 1;

  if (!videoCache[m.sender] || !videoCache[m.sender].results[index] || Date.now() - videoCache[m.sender].timestamp > cacheTimeout) {
    delete videoCache[m.sender];
    return conn.reply(m.chat, "❌ La lista de búsqueda ha expirado. Usa /yts nuevamente.", m);
  }

  const { url, timestamp: duration } = videoCache[m.sender].results[index];

  try {
    let mediaType = type.toUpperCase() === "A" ? formatAudio : formatVideo;
    let responseMessage = mediaType === "audio" ? "*🎶 Descargando audio, espera un momento...*" : "*📽 Descargando video, espera un momento...*";
    await conn.reply(m.chat, responseMessage, m);

    let apiData = await fetchAPI(url, mediaType);
    if (!apiData || !apiData.download) return conn.reply(m.chat, "⚠️ Error al obtener el enlace de descarga.", m);

    let downloadUrl = await shortenURL(apiData.download);

    const size = await getSize(apiData.download);
    const fileSizeMB = await formatSize(size);

    let fileName = `${apiData.title || "archivo"}.${mediaType === "audio" ? "mp3" : "mp4"}`;
    let asDocument = fileSizeMB !== "Desconocido" && parseFloat(fileSizeMB) > MAX_FILE_SIZE_MB;

    if (asDocument) await conn.reply(m.chat, "⚠️ El archivo es demasiado grande, se enviará como documento.", m);

    let infoMessage = `
🌱 *Título:* ${apiData.title || "Desconocido"}
⏱ *Duración:* ${duration}
💾 *Tamaño:* ${fileSizeMB}
🔗 *URL de descarga:* ${downloadUrl}
`;

    let messageOptions = asDocument
      ? { document: { url: downloadUrl }, fileName, mimetype: mediaType === "audio" ? "audio/mpeg" : "video/mp4", caption: infoMessage, thumbnail: apiData.thumbnail ? { url: apiData.thumbnail } : null }
      : mediaType === "audio"
        ? { audio: { url: downloadUrl }, mimetype: "audio/mpeg", fileName, caption: infoMessage, thumbnail: apiData.thumbnail ? { url: apiData.thumbnail } : null }
        : { video: { url: downloadUrl }, caption: infoMessage, thumbnail: apiData.thumbnail ? { url: apiData.thumbnail } : null };

    await conn.sendMessage(m.chat, messageOptions, { quoted: m });
  } catch (error) {
    conn.reply(m.chat, `⚠︎ Error: ${error.message}`, m);
  }
};

export default handler;