import fetch from "node-fetch";
import axios from "axios";

const MAX_FILE_SIZE = 280 * 1024 * 1024; // 280 MB
const VIDEO_THRESHOLD = 70 * 1024 * 1024; // 70 MB
const HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024; // 100 MB

let isProcessingHeavy = false;

const isValidYouTubeUrl = (url) =>
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);

function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return "Desconocido";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  bytes = Number(bytes);
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

function formatViews(views) {
  return views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatDuration(duration) {
  if (!duration) return "Desconocida";
  const parts = duration.split(":").map(Number).reverse();
  const [seconds = 0, minutes = 0, hours = 0] = parts;
  const formatted = [];
  if (hours) formatted.push(`${hours} hora${hours !== 1 ? "s" : ""}`);
  if (minutes) formatted.push(`${minutes} minuto${minutes !== 1 ? "s" : ""}`);
  if (seconds || (!hours && !minutes)) formatted.push(`${seconds} segundo${seconds !== 1 ? "s" : ""}`);
  return formatted.join(", ");
}

async function getSize(url) {
  try {
    const response = await axios.head(url, { timeout: 10000 });
    const size = parseInt(response.headers["content-length"], 10);
    if (!size) throw new Error("Tamaño no disponible");
    return size;
  } catch {
    throw new Error("No se pudo obtener el tamaño del archivo");
  }
}

async function fetchVideoInfo(url) {
  try {
    const apiRes = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`);
    const json = await apiRes.json();
    if (!json?.status || !json?.data?.download?.url) throw new Error("No se pudo obtener la descarga");
    return {
      url: json.data.download.url,
      title: json.data.title,
      author: json.data.author,
      size: json.data.download.bytes_size,
      thumbnail: json.data.image,
      duration: json.data.duration,
      views: json.data.views,
      publishedAt: json.data.publishedAt,
    };
  } catch (e) {
    throw new Error(`Error API: ${e.message}`);
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🌴 Uso: ${usedPrefix}${command} https://youtube.com/watch?v=iQEVguV71sI`, m);

  if (!isValidYouTubeUrl(text)) {
    await m.react("✖️");
    return m.reply("🚫 Enlace de YouTube inválido");
  }

  await m.react("📀");
  await m.reply("🍧 *𝐄𝐥 𝐯𝐢𝐝𝐞𝐨 𝐬𝐞 𝐞𝐬𝐭𝐚́ 𝐞𝐧𝐯𝐢𝐚𝐧𝐝𝐨... 𝚊𝚠𝚞𝚞~* 🌸");

  const videoId = text.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  const backupUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=TdrL3QxjyVw`;

  try {

    const searchRes = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(text)}`);
    const searchJson = await searchRes.json();
    if (!searchJson?.status || !searchJson?.data?.length) throw new Error("No se encontró el video");

    const videoData = searchJson.data.find(v => v.type === "video") || searchJson.data[0];
    const videoInfo = await fetchVideoInfo(videoData.url);

    if (videoInfo.size > MAX_FILE_SIZE) throw new Error("♡ No puedo procesar esta descarga porque traspasa el límite de descarga");

    if (videoInfo.size > HEAVY_FILE_THRESHOLD) {
      isProcessingHeavy = true;
      await conn.reply(m.chat, "🤨 Espera, estoy lidiando con un archivo pesado", m);
    }

    const isSmallVideo = videoInfo.size < VIDEO_THRESHOLD;
    const buffer = await (await fetch(videoInfo.url)).buffer();

    const caption = `\`\`\`⊜─⌈ 📻 ◜YouTube MP4◞ 📻 ⌋─⊜

≡ 🎵 Título : ${videoInfo.title}
≡ 📺 Canal : ${videoInfo.author}
≡ ⏳ Duración : ${formatDuration(videoInfo.duration)}
≡ 👀 Vistas : ${formatViews(videoInfo.views)}
≡ 📅 Publicado : ${videoInfo.publishedAt}
≡ 🍂 Peso : ${formatSize(videoInfo.size)}
≡ 🔗 Enlace : ${videoData.url}
≡ 🌳 Calidad : 360\`\`\`

> ${dev}`;

    await conn.sendFile(
      m.chat,
      buffer,
      `${videoInfo.title}.mp4`,
      caption,
      fkontak,
      null,
      { mimetype: "video/mp4", asDocument: !isSmallVideo, filename: `${videoInfo.title}.mp4` }
    );

    await m.react("✅");
    isProcessingHeavy = false;
  } catch (e) {

    try {
      await m.react("⚠️");
      const backupInfo = await fetchVideoInfo("TdrL3QxjyVw");
      const buffer = await (await fetch(backupInfo.url)).buffer();

      const caption = `\`\`\`⊜─⌈ 📻 ◜YouTube MP4◞ 📻 ⌋─⊜

≡ 🎵 Título : ${backupInfo.title}
≡ 📺 Canal : ${backupInfo.author}
≡ ⏳ Duración : ${formatDuration(backupInfo.duration)}
≡ 👀 Vistas : ${formatViews(backupInfo.views)}
≡ 📅 Publicado : ${backupInfo.publishedAt}
≡ 🍂 Peso : ${formatSize(backupInfo.size)}
≡ 🔗 Enlace : https://youtu.be/TdrL3QxjyVw
≡ 🌳 Calidad : 360\`\`\`

> ${club}`;

      await conn.sendFile(
        m.chat,
        buffer,
        `${backupInfo.title}.mp4`,
        caption,
        fkontak,
        null,
        { mimetype: "video/mp4", asDocument: false, filename: `${backupInfo.title}.mp4` }
      );
      await m.react("✅");
    } catch (err) {
      await m.react("🔴");
      await m.reply(`❌ Error: ${err.message || "No se pudo procesar la descarga de respaldo"}`);
    }
    isProcessingHeavy = false;
  }
};

handler.help = ["ytmp4 *<url>*"];
handler.command = ["ytmp4"];
handler.tags = ["descargas"];

export default handler;