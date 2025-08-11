import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `🔍 *Uso correcto:* ${usedPrefix}${command} <nombre de app>\n\nEjemplo: ${usedPrefix}${command} WhatsApp`, m);
  }

  const query = args.join(' ');
  const apiUrl = `https://api.vreden.my.id/api/playstore?query=${encodeURIComponent(query)}`;

  try {
    await m.react('🔎');

    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.result || json.result.length === 0) {
      return conn.reply(m.chat, `❌ No se encontraron resultados para: *${query}*`, m);
    }

    const apps = json.result.slice(0, 5);

    for (const app of apps) {
      const caption = `📲 *${app.title}*\n\n` +
                      `👤 *Desarrollador:* ${app.developer || 'Desconocido'}\n` +
                      `⭐ *Puntuación:* ${app.score || 'No disponible'}\n` +
                      `💰 *Precio:* ${app.price || 'Gratis'}\n` +
                      `🔗 *Enlace:* ${app.link || 'No disponible'}`;

      await conn.sendFile(m.chat, app.icon || icono, 'app.jpg', caption, m);
    }

    await m.react('✅');

  } catch (err) {
    console.error(err);
    await m.react('⚠️');
    conn.reply(m.chat, `❌ Error al buscar la app:\n*${err.message}*`, m);
  }
};

handler.command = ['playstore'];
handler.help = ['playstore <nombre>'];
handler.tags = ['buscador'];

export default handler;