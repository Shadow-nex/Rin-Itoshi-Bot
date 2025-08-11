import yts from 'yt-search';

const traducirAgo = (texto) => {
  return texto
    .replace(/second[s]? ago/i, 'unos segundos')
    .replace(/minute[s]? ago/i, 'minutos')
    .replace(/hour[s]? ago/i, 'horas')
    .replace(/day[s]? ago/i, 'días')
    .replace(/week[s]? ago/i, 'semanas')
    .replace(/month[s]? ago/i, 'meses')
    .replace(/year[s]? ago/i, 'año')
    .replace(/\b1 (segundo|minuto|hora|día|semana|mes|año)s?\b/g, '1 $1')
    .replace(/\b(\d+)\b/, 'hace $1');
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `*༄❖ Invoca un título para buscar en el reino de YouTube...*`, m, fake);
  }

  try {
    const search = await yts(text);
    const videoInfo = search.all?.[0];

    if (!videoInfo) {
      return conn.reply(m.chat, '⚠️ No se encontró ningún video. Intenta con otro título.', m);
    }

    const title = videoInfo.title || 'Título desconocido';
    const duration = videoInfo.timestamp || 'Duración desconocida';
    const views = typeof videoInfo.views === 'number' ? videoInfo.views.toLocaleString() : 'No disponible';
    const canal = videoInfo.author?.name || 'Autor desconocido';
    const agoEn = videoInfo.ago || 'Desconocido';
    const ago = traducirAgo(agoEn);
    const url = videoInfo.url || '';
    const thumbnail = videoInfo.thumbnail || null;

    const body = ` *"${title}"*

> ⏱️ *Duración:* ${duration}
> 📊 *Vistas:* ${views}
> 🎤 *Canal:* ${canal}
> 📅 *Publicado:* ${ago}
> 🔗 *Enlace:* ${url}
> 💽 *Formato:* MP3 / MP4 disponible`;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail },
        caption: body,
        footer: `📥 *¿Quieres descargarlo?* Solo elige una opción abajo`,
        buttons: [
          { buttonId: `${usedPrefix}ytmp3 ${url}`, buttonText: { displayText: '💿 Audio' }, type: 1 },
          { buttonId: `${usedPrefix}ytmp4 ${url}`, buttonText: { displayText: '☘️ Video' }, type: 1 },
          { buttonId: `${usedPrefix}ytmp3doc${url}`, buttonText: { displayText: '💚 Audio Doc' }, type: 1 },
          { buttonId: `${usedPrefix}ytmp4doc ${url}`, buttonText: { displayText: '☁️ Video Doc' }, type: 1 },
        ],
        viewOnce: true,
        headerType: 4,
      },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `❗ Ocurrió un error: ${error.message}`, m);
  }
};

handler.command = ['play', 'play2'];
handler.tags = ['descargas'];
handler.limit = 6;

export default handler;