import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🍬 Por favor, ingrese un nombre de canal o usuario para buscar.\n\nEjemplo:\n> *${usedPrefix + command}* mahimking11`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/ytstalk?channel=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.data) {
      await m.react('✖️');
      return await conn.reply(m.chat, '❌ No se encontraron resultados para este canal.', m);
    }

    const user = json.data;
    let txt = `📌 *DETALLES DEL CANAL*\n\n`;
    txt += `👤 *Usuario:* ${user.username}\n`;
    txt += `🔖 *Suscriptores:* ${user.subscriber_count}\n`;
    txt += `📅 *Total de videos:* ${user.video_count}\n`;
    txt += `📜 *Descripción:* ${user.description || 'Sin descripción'}\n`;
    txt += `🔗 *Canal:* ${user.channel}\n\n`;

    txt += `🎬 *Últimos videos:*\n\n`;
    user.others.forEach((video, index) => {
      txt += `📽️ *Video ${index + 1}*\n`;
      txt += `📌 *Título:* ${video.title}\n`;
      txt += `📅 *Publicado:* ${video.published}\n`;
      txt += `👀 *Vistas:* ${video.views}\n`;
      txt += `⏳ *Duración:* ${video.duration}\n`;
      txt += `🔗 *Ver video:* https://www.youtube.com/watch?v=${video.videoId}\n\n`;
    });

    await conn.sendMessage(m.chat, { image: { url: user.avatar }, caption: txt }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, '⚠️ Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['youtubestalk *<nombre de usuario>*'];
handler.tags = ['stalk'];
handler.command = ['youtubestalk', 'ytstalk'];
handler.register = true;

export default handler;
