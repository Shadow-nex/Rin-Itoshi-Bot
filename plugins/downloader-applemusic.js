import axios from "axios";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

const streamPipeline = promisify(pipeline);

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const url = args[0];
    if (!url) {
      return conn.reply(m.chat, `🧪 Ingresa una URL de *Apple Music*.\n\n🍂 Ejemplo:\n${usedPrefix + command} https://music.apple.com/es/album/...`, m);
    }

    await conn.reply(m.chat, `🔎 Obteniendo información de la canción...`, m);

    const api = `https://delirius-apiofc.vercel.app/download/applemusicdl?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(api, { timeout: 20000 });

    if (!data?.status || !data?.data?.download) throw new Error("No se pudo obtener información de la canción.");

    const track = data.data;
    const downloadUrl = track.download;
    const safeTitle = (track.name || "track").replace(/[\\/:"*?<>|]+/g, "_");
    const fileName = `${safeTitle} - ${track.artists}.mp3`.slice(0, 180);

    const tmpDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const filePath = path.join(tmpDir, `${Date.now()}_${fileName}`);

    const response = await axios.get(downloadUrl, { responseType: "stream", timeout: 0 });
    await streamPipeline(response.data, fs.createWriteStream(filePath));

    const caption = `
╭━━━〔 🎵 𝐀𝐏𝐏𝐋𝐄 𝐌𝐔𝐒𝐈𝐂 𝐃𝐋 🎵 〕━━⬣
┃ ✧ *${track.name}*
┃ 👥 ${track.artists}
┃ ⏱️ ${track.duration || "Desconocida"}
╰━━━━━━━━━━━━━━━━⬣
`;

    await conn.sendMessage(m.chat, {
      image: { url: track.image },
      caption: caption,
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: fs.createReadStream(filePath),
      mimetype: "audio/mpeg",
      fileName: fileName
    }, { quoted: m });

    try { fs.unlinkSync(filePath); } catch {}

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ Error: ${e.message}`, m);
  }
};

handler.help = ["applemusicdl"];
handler.tags = ["downloader"];
handler.command = ['applemusicdl', 'applemusic'];

export default handler;