import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return conn.reply(m.chat, "🍎 Ingresa un enlace válido de Apple Music.", m);

  try {
    let url = `https://api.siputzx.my.id/api/d/musicapple?url=${encodeURIComponent(args[0])}`;
    let res = await fetch(url);
    let json = await res.json();

    if (!json.status) return conn.reply(m.chat, "❌ No se pudo obtener la información.", m);

    let data = json.data || {};
    let {
      url: musicUrl = "",
      songTitle = "",
      artist = "",
      artworkUrl = "",
      mp3DownloadLink = "",
      coverDownloadLink = ""
    } = data;

    let info = `
╭━━━〔 🍎 𝗔𝗣𝗣𝗟𝗘 𝗠𝗨𝗦𝗜𝗖 〕━━⬣
┃🎵 *Título:* ${songTitle || "Desconocido"}
┃🎤 *Artista:* ${artist || "Desconocido"}
┃🌐 *URL:* ${musicUrl}
╰━━━━━━━━━━━━━━━━⬣
    `.trim();

    await conn.sendFile(m.chat, artworkUrl || coverDownloadLink, 'cover.jpg', info, m);
 
    if (mp3DownloadLink) {
      await conn.sendFile(
        m.chat,
        mp3DownloadLink,
        `${songTitle || "audio"}.mp3`,
        `🎶 Aquí tienes tu canción: *${songTitle || "Desconocido"}* - ${artist || ""}`,
        m,
        null,
        { mimetype: 'audio/mpeg' }
      );
    } else {
      conn.reply(m.chat, "⚠️ No se encontró un enlace de descarga para esta canción.", m);
    }

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "⚠️ Ocurrió un error al procesar la solicitud.", m);
  }
};

handler.command = ['applemusic'];
export default handler;