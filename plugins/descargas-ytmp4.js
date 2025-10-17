import axios from "axios";
import fetch from "node-fetch";

const SEARCH_API = "https://delirius-apiofc.vercel.app/search/ytsearch?q=";
const DOWNLOAD_API = "https://api.stellarwa.xyz/dow/ytmp4?apikey=Shadow&url=";
const BACKUP_API = "https://api.neoxr.eu/api/youtube?apikey=6cp02j&type=video&quality=480p&url=";

let calidadPredeterminada = "480";

function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return "Desconocido";
  const unidades = ["B", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < unidades.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${unidades[i]}`;
}

async function obtenerTamaño(url) {
  try {
    const head = await axios.head(url, { timeout: 8000 });
    const size = parseInt(head.headers["content-length"], 10);
    return !isNaN(size) && size > 0 ? size : 0;
  } catch {
    return 0;
  }
}

async function buscarYDescargar(query) {
  try {
 
    const resBusqueda = await fetch(SEARCH_API + encodeURIComponent(query));
    if (!resBusqueda.ok) throw new Error("Error en la búsqueda");
    const jsonBusqueda = await resBusqueda.json();
    const video = jsonBusqueda.data?.[0];
    if (!video?.url) return null;

    let usarBackup = false;
    let jsonDescarga = null;

    const resDescarga = await fetch(DOWNLOAD_API + encodeURIComponent(video.url));
    if (!resDescarga.ok) usarBackup = true;
    else {
      jsonDescarga = await resDescarga.json().catch(() => null);
      if (!jsonDescarga?.data?.dl) usarBackup = true;
    }

    let dlURL, title, author, thumbnail, sizeBytes = 0, sizeTexto = "Desconocido";

    if (usarBackup) {
      console.log("⚠️ Usando API de respaldo (Neoxr)...");
      const resBackup = await fetch(BACKUP_API + encodeURIComponent(video.url));
      if (!resBackup.ok) throw new Error("Error en API de respaldo");
      const jsonBackup = await resBackup.json();

      dlURL = jsonBackup.data.url;
      title = jsonBackup.title;
      author = jsonBackup.channel || video.author?.name || "Desconocido";
      thumbnail = jsonBackup.thumbnail;
      sizeTexto = jsonBackup.data.size || "Desconocido";

      const matchMB = sizeTexto.match(/([\d.]+)\s*MB/i);
      if (matchMB) sizeBytes = parseFloat(matchMB[1]) * 1024 * 1024;
    } else {
      dlURL = jsonDescarga.data.dl;
      title = jsonDescarga.data.title;
      author = video.author?.name || "Desconocido";
      thumbnail = video.thumbnail;
      sizeBytes = await obtenerTamaño(dlURL);
      sizeTexto = sizeBytes ? formatSize(sizeBytes) : "Desconocido";
    }

    if (!usarBackup && sizeBytes > 100 * 1024 * 1024) {
      console.log("⚠️ Archivo >100MB, cambiando a API de respaldo (Neoxr)...");
      const resBackup = await fetch(BACKUP_API + encodeURIComponent(video.url));
      const jsonBackup = await resBackup.json();
      dlURL = jsonBackup.data.url;
      title = jsonBackup.title;
      author = jsonBackup.channel || video.author?.name || "Desconocido";
      thumbnail = jsonBackup.thumbnail;
      sizeTexto = jsonBackup.data.size || "Desconocido";
      const matchMB = sizeTexto.match(/([\d.]+)\s*MB/i);
      if (matchMB) sizeBytes = parseFloat(matchMB[1]) * 1024 * 1024;
      usarBackup = true;
    }

    return {
      title,
      duration: video.duration || "Desconocida",
      views: video.views || 0,
      author,
      thumbnail,
      url: video.url,
      dl_url: dlURL,
      size: sizeTexto,
      bytes: sizeBytes,
      servidor: usarBackup ? "Neoxr" : "Stellar",
    };
  } catch (err) {
    console.log("Error:", err.message);
    return null;
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text)
      return m.reply(`🎋 *Ingresa el enlace o título del video de YouTube que deseas descargar.*\n\nEjemplo:\n${usedPrefix + command} Shape of You`);

    await m.react("🕐");

    const video = await buscarYDescargar(text);
    if (!video) {
      return m.reply("⚠️ *No se pudo encontrar o descargar el video.* Intenta con otro nombre o enlace.");
    }

    const caption = `
🎶 *ＹＯＵＴＵＢＥ • ＭＰ4* 🕸️
╭ׅ✿──────────────────
│🎋 𝐓𝐢𝐭𝐮𝐥𝐨: ${video.title}
│🌿 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${video.duration}
│🍏 𝐂𝐚𝐧𝐚𝐥: ${video.author}
│🍄 𝐕𝐢𝐬𝐭𝐚𝐬: ${video.views.toLocaleString()}
│🕸️ 𝐋𝐢𝐧𝐤: ${video.url}
├ׅ✿──────────────────
│☁️ *Calidad:* ${calidadPredeterminada}p
│📦 *Peso:* ${video.size}
│⚙️ *Servidor:* ${video.servidor}
╰✿──────────────────`;

    await m.react("📥");

    const esGrande = video.bytes > 100 * 1024 * 1024;

    await conn.sendMessage(
      m.chat,
      esGrande
        ? {
            document: { url: video.dl_url },
            mimetype: "video/mp4",
            fileName: `${video.title}.mp4`,
            caption,
          }
        : {
            video: { url: video.dl_url },
            mimetype: "video/mp4",
            caption,
          },
      { quoted: m }
    );

    await m.react("✔️");
  } catch (err) {
    console.error("💥 Error general:", err);
    m.reply("❌ *Error al procesar tu solicitud.* Intenta nuevamente.");
  }
};

handler.help = ["ytmp4 <url>"];
handler.tags = ["descargas"];
handler.command = ["ytmp4", "playmp4"];
handler.register = true;
handler.group = true;

export default handler;