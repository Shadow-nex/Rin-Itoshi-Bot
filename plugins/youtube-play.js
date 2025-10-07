// plugins/playaudio_minimal.js
import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix }) => {
  if (!args[0]) return conn.reply(m.chat, '⚠️ Ingresa un título o enlace de YouTube.', m);

  await m.react('🕓');

  try {
    // Buscar video
    const videos = await searchVideos(args.join(" "));
    if (!videos.length) throw new Error('✖️ No se encontraron resultados.');

    const video = videos[0];

    // Obtener thumbnail
    const thumbnailBuffer = await (await fetch(video.miniatura)).buffer();

    // Enviar miniatura con info básica
    const infoMessage = `🎬 *${video.titulo}*\n> 📺 *Canal:* ${video.canal}\n> ⏱ *Duración:* ${video.duracion}\n> 👁 *Vistas:* ${video.vistas}\n> 🔗 *Link:* ${video.url}`;
    await conn.sendMessage(m.chat, { image: thumbnailBuffer, caption: infoMessage }, { quoted: m });

    // Descargar audio mediante API
    const apiUrl = `https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(video.url)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.status || !json.download) throw new Error('⚠️ No se pudo obtener el audio.');

    // Enviar audio directamente
    await conn.sendMessage(m.chat, {
      audio: { url: json.download },
      mimetype: 'audio/mpeg',
      fileName: `${json.title || video.titulo}.mp3`
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.error(e);
    await m.react('✖️');
    return conn.reply(m.chat, '⚠️ Ocurrió un error o no se encontró el video.', m);
  }
};

handler.help = ['play'];
handler.tags = ['descargas'];
handler.command = ['play', 'playaudio'];
export default handler;

// Función para buscar video en YouTube
async function searchVideos(query) {
  try {
    const res = await yts(query);
    return res.videos.slice(0, 1).map(v => ({
      titulo: v.title,
      url: v.url,
      miniatura: v.thumbnail,
      canal: v.author.name,
      duracion: v.duration.timestamp || 'No disponible',
      vistas: v.views?.toLocaleString() || 'No disponible'
    }));
  } catch (err) {
    console.error('Error en yt-search:', err.message);
    return [];
  }
}
