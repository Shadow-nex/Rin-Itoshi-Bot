import axios from "axios";
import fetch from "node-fetch";

const SEARCH_API = "https://delirius-apiofc.vercel.app/search/ytsearch?q=";
const DOWNLOAD_API = "https://api.stellarwa.xyz/dow/ytmp4?apikey=stellar-MUdpZwW6&url=";

let calidadPredeterminada = "360";

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
    const head = await axios.head(dl).catch(() => null);
    if (head?.headers["content-length"]) {
      fileSize = formatSize(parseInt(head.headers["content-length"], 10));
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
    };
  } catch (err) {
    console.log("❌ Error:", err.message);
    return null;
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (command === "setcalidad" || command === "setquality") {
      const calidad = text.trim();
      if (!calidad)
        return m.reply(`🌱 *Debes especificar la calidad de descarga.*\n\n🌿 Ejemplo:\n${usedPrefix + command} 720`);

      const opciones = ["144", "240", "360", "480", "720", "1080"];
      if (!opciones.includes(calidad))
        return m.reply(`🎋 *Calidad inválida.* Usa una de estas:\n> ${opciones.join("p, ")}p`);

      calidadPredeterminada = calidad;
      return m.reply(`✅ *Calidad predeterminada actualizada a:* ${calidad}p`);
    }

    if (command === "ytmp4") {
      if (!text)
        return m.reply(`🎋 *Ingresa el enlace o título del video de YouTube que deseas descargar.*\n\nEjemplo:\n${usedPrefix + command} Shape of You`);

      await m.react("🔍");

      const video = await buscarYDescargar(text);
      if (!video) {
        await m.react("⚠️");
        return m.reply("⚠️ *No se pudo encontrar o descargar el video.* Intenta con otro nombre o enlace.");
      }

      await m.react("🎶");

      const info = `
🎶 *ＹＯＵＴＵＢＥ • ＭＰ4* 🕸️
╭ׅ✿──────────────────
│🎋 𝐓𝐢𝐭𝐮𝐥𝐨: ${video.title}
│🌿 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${video.duration}
│🍏 𝐂𝐚𝐧𝐚𝐥: ${video.author}
│🍄 𝐕𝐢𝐬𝐭𝐚𝐬: ${video.views.toLocaleString()}
│🕸️ 𝐋𝐢𝐧𝐤: ${video.url}
├ׅ✿──────────────────
│☁️ *Calidad:* ${calidadPredeterminada}P
│📦 *Peso:* ${video.size}
│⚙️ *Servidor:* Stellar
╰✿──────────────────
> */setcalidad* para cambiar resolución
`;

      await conn.sendMessage(
        m.chat,
        {
          text: info,
          contextInfo: {
            isForwarded: true,
            externalAdReply: {
              title: "🍉 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 - 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 🎥",
              thumbnailUrl: video.thumbnail,
              sourceUrl: video.url,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );

      await m.react("📥");

      await conn.sendMessage(
        m.chat,
        {
          video: { url: video.dl_url },
          caption: `🎬 ${video.title}\n🍧 *Calidad:* ${calidadPredeterminada}p\n📦 *Peso:* ${video.size}`,
          mimetype: "video/mp4",
        },
        { quoted: m }
      );

      await m.react("✅");
    }
  } catch (err) {
    console.error("💥 Error general:", err);
    m.reply("❌ *Error al procesar tu solicitud.* Intenta nuevamente.");
  }
};

handler.help = ["ytmp4 <url>", "setcalidad <valor>"];
handler.tags = ["descargas"];
handler.command = ["ytmp4", "playmp4", "mp4", "setcalidad", "setquality"];
handler.register = true;
handler.group = true;

export default handler;