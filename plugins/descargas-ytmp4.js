import axios from "axios";
import yts from "yt-search";

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
        return conn.reply(
          m.chat,
          `🎋 *Ingresa el enlace o título de YouTube que deseas descargar en formato MP4.*\n\n🕸️ Ejemplo:\n${usedPrefix + command} https://youtu.be/HWjCStB6k4o`,
          m
        );

      await m.react("🕐");

      const search = await yts(text);
      const video = search.videos[0];
      if (!video) return m.reply("*☁️ No se encontró ningún video con ese texto o enlace.*");

      const meta = {
        title: video.title,
        duration: video.timestamp,
        author: video.author.name,
        views: video.views.toLocaleString(),
        ago: video.ago,
        url: video.url,
        thumbnail: video.thumbnail,
      };

      const info = `🎶 *ＹＯＵＴＵＢＥ • ＭＰ4* 🕸️
╭ׅ✿──────────────────
│🎋 𝐓𝐢𝐭𝐮𝐥𝐨: ${meta.title}
│🌿 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${meta.duration}
│🍏 𝐂𝐚𝐧𝐚𝐥: ${meta.author}
│🍄 𝐕𝐢𝐬𝐭𝐚𝐬: ${meta.views}
│🌷 𝐏𝐮𝐛𝐥𝐢𝐜𝐚𝐝𝐨: ${meta.ago}
│🕸️ 𝐋𝐢𝐧𝐤: ${meta.url}
├ׅ✿──────────────────
│☁️ *Calidad:* ${calidadPredeterminada}P
│⚙️ *Servidor:* Procesando...
╰✿──────────────────

> */setcalidad*`;

      await conn.sendMessage(
        m.chat,
        {
          text: info,
          contextInfo: {
            isForwarded: true,
            externalAdReply: {
              title: "🍉 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 - 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 🎥",
              thumbnailUrl: meta.thumbnail,
              sourceUrl: meta.url,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );

      let apiUsada = "Vreden";
      let dl_url, quality, fileSize = "Desconocido";

      try {
        const res = await axios.get(
          `https://api.vreden.my.id/api/v1/download/youtube/video?url=${encodeURIComponent(meta.url)}&quality=${calidadPredeterminada}`,
          { timeout: 15000 }
        );
        if (!res.data?.status) throw new Error("Fallo en la API principal");

        dl_url = res.data.result.download.url;
        quality = `${calidadPredeterminada}p`;

        const head = await axios.head(dl_url, { timeout: 8000 }).catch(() => null);
        if (head?.headers["content-length"]) {
          fileSize = formatSize(parseInt(head.headers["content-length"], 10));
        }
      } catch {

        apiUsada = "Starlight";
        const res2 = await axios.get(
          `https://apis-starlights-team.koyeb.app/starlight/youtube-mp4?url=${encodeURIComponent(meta.url)}&format=${calidadPredeterminada}p`,
          { timeout: 15000 }
        );
        if (!res2.data?.dl_url) throw new Error("Error en la API de respaldo");

        dl_url = res2.data.dl_url;
        quality = res2.data.quality || `${calidadPredeterminada}p`;

        const head2 = await axios.head(dl_url, { timeout: 8000 }).catch(() => null);
        if (head2?.headers["content-length"]) {
          fileSize = formatSize(parseInt(head2.headers["content-length"], 10));
        }
      }

      await m.react("✔️");

      await conn.sendMessage(
        m.chat,
        {
          video: { url: dl_url },
          caption: `*${meta.title}*\n🍧 *\`Calidad:\`* ${quality}\n📦 *\`Peso:\`* ${fileSize}\n⚙️ *\`Servidor:\`* ${apiUsada}`,
          mimetype: "video/mp4",
        },
        { quoted: m }
      );
    }
  } catch (err) {
    console.error(err);
    conn.reply(
      m.chat,
      "*Ocurrió un error al procesar tu solicitud.*\nVerifica el enlace o intenta con otro video.",
      m
    );
  }
};

handler.help = ["ytmp4 <url>", "setcalidad <valor>"];
handler.tags = ["descargas"];
handler.command = ["ytmp4", "setcalidad", "setquality"];
handler.register = true;
handler.group = true;

export default handler;