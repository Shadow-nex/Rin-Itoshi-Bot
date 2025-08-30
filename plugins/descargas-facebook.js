import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*`Ingresa el link del vídeo a descargar ❤️‍🔥`*', m, fake);
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return conn.reply(m.chat, '*`Error al obtener datos. Verifica el enlace.`*', m);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '*`No se encontraron resultados.`*', m);
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)") || result[0];
  } catch (error) {
    return conn.reply(m.chat, '*`Error al procesar los datos.`*', m);
  }

  if (!data) {
    return conn.reply(m.chat, '*`No se encontró una resolución adecuada.`*', m);
  }

  await m.react('✅');
  let video = data.url;
  
  let caption = `
╭━━━〔 📥 Descarga Instagram 〕━━⬣
┃👤 *Autor:* ${res.author || "Desconocido"}
┃🏷️ *Título:* ${res.title || "Sin título"}
┃🎞️ *Resolución:* ${data.resolution || "N/A"}
┃📦 *Tamaño:* ${data.filesize || "N/A"}
┃🔗 *Enlace:* ${args[0]}
╰━━━━━━━━━━━━━━━━━━⬣
  `.trim();

  try {
    await conn.sendMessage(m.chat, {
      video: { url: video },
      caption: caption,
      fileName: 'igdl.mp4',
      mimetype: 'video/mp4'
    }, { quoted: m });
  } catch (error) {
    await m.react('❌');
    return conn.reply(m.chat, '*`Error al enviar el video.`*', m);
  }
};

handler.help = ['instagram', 'igdl'];
handler.tags = ['descargas'];
handler.command = ['instagram', 'ig', 'igdl'];

export default handler;