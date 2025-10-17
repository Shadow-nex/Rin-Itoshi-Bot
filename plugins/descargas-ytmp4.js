import axios from "axios";
import fetch from "node-fetch";

const SEARCH_API = "https://delirius-apiofc.vercel.app/search/ytsearch?q=";
const DOWNLOAD_API = "https://api.stellarwa.xyz/dow/ytmp4?apikey=Shadow&url=";

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

async function buscarYDescargar(query) {
  try {
    const resBusqueda = await fetch(SEARCH_API + encodeURIComponent(query));
    if (!resBusqueda.ok) throw new Error("Error en la búsqueda");
    const jsonBusqueda = await resBusqueda.json();
    const video = jsonBusqueda.data?.[0];
    if (!video?.url) return null;

    const resDescarga = await fetch(DOWNLOAD_API + encodeURIComponent(video.url));
    if (!resDescarga.ok) throw new Error("Error en la descarga");
    const jsonDescarga = await resDescarga.json();

    const dl = jsonDescarga.data?.dl;
    if (!dl) return null;

    let fileSize = "Desconocido";
    let fileBytes = 0;
    const head = await axios.head(dl).catch(() => null);
    if (head?.headers["content-length"]) {
      fileBytes = parseInt(head.headers["content-length"], 10);
      fileSize = formatSize(fileBytes);
    }

    return {
      title: jsonDescarga.data.title,
      duration: video.duration || "Desconocida",
      views: video.views || 0,
      author: video.author?.name || "Desconocido",
      thumbnail: video.thumbnail,
      url: video.url,
      dl_url: dl,
      size: fileSize,
      bytes: fileBytes,
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
      await m.react("⚠️");
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
│⚙️ *Servidor:* Stellar
╰✿──────────────────`;

    await m.react("📥");

    const esGrande = video.bytes > 100 * 1024 * 1024; // > 100 MB

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

    await m.react("✅");
  } catch (err) {
    console.error("💥 Error general:", err);
    m.reply("❌ *Error al procesar tu solicitud.* Intenta nuevamente.");
  }
};

handler.help = ["ytmp4 <url>"];
handler.tags = ["descargas"];
handler.command = ["ytmp4", "playmp4", "mp4"];
handler.register = true;
handler.group = true;

export default handler;