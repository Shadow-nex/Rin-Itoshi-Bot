import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `✨ Por favor, ingrese un término de búsqueda.\n\nEjemplo:\n> *${usedPrefix + command}* blackpink`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/search/movie?query=${text}`);
    const json = await res.json();

    if (!json.status || !json.data || json.data.length === 0) {
      await m.react('✖️');
      return await conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda.', m);
    }

    let txt = '`🎬 Resultados de la búsqueda`\n\n';
    json.data.forEach((movie, index) => {
      txt += `✩ ${index + 1}. *Título:* ${movie.title}\n`;
      txt += `✩  *Fecha de lanzamiento:* ${movie.release_date}\n`;
      txt += `✩  *Calificación:* ${movie.vote_average} (${movie.vote_count} votos)\n`;
      txt += `✩  *Resumen:* ${movie.overview}\n`;
      txt += `✩  *Imagen:* ${movie.image}\n`;
      txt += `✩  *Enlace:* ${movie.video ? 'Ver video' : 'Sin video disponible'}\n\n`;
    });

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['movie <término>'];
handler.tags = ['search'];
handler.command = ['movie', 'moviepelicula', 'buscarpeliculamovie'];
handler.register = true;

export default handler;