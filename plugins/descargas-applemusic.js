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
      pageTitle = "",
      description = "",
      keywords = "",
      songTitle = "",
      artist = "",
      artworkUrl = "",
      appleTitle = "",
      appleDescription = "",
      musicReleaseDate = "",
      mp3DownloadLink = "",
      coverDownloadLink = ""
    } = data;

    let info = `
╭━━━〔 🍎 𝗔𝗣𝗣𝗟𝗘 𝗠𝗨𝗦𝗜𝗖 〕━━⬣
┃🎵 *Título:* ${songTitle || "Desconocido"}
┃🎤 *Artista:* ${artist || "Desconocido"}
┃📀 *Álbum:* ${appleTitle || "Desconocido"}
┃📝 *Descripción:* ${appleDescription || description || "Ninguna"}
┃📅 *Fecha:* ${musicReleaseDate || "No disponible"}
┃🔑 *Keywords:* ${keywords || "Ninguna"}
┃🌐 *URL:* ${musicUrl}
╰━━━━━━━━━━━━━━━━⬣

⬇️ *Descarga MP3:* 
${mp3DownloadLink || "No disponible"}

🖼️ *Portada:* 
${coverDownloadLink || artworkUrl || "No disponible"}
    `.trim();

    await conn.sendFile(m.chat, artworkUrl || coverDownloadLink, 'cover.jpg', info, m);

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "⚠️ Ocurrió un error al procesar la solicitud.", m);
  }
};

handler.command = ['applemusic'];
export default handler;