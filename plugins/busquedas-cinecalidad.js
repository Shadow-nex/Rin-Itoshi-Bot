import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '✨ Ingresa el texto de lo que quieres buscar en Cinecalidad.\n\nEjemplo:\n' + `> *${usedPrefix + command}* navidad`, m, rcanal);
  await m.react('🕓');

  try {
    let res = await fetch(`https://delirius-apiofc.vercel.app/search/cinecalidad?query=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.data || json.data.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    let txt = '`乂  C I N E C A L I D A D  -  B Ú S Q U E`';

    for (let i = 0; i < json.data.length; i++) {
      let movie = json.data[i];
      txt += `\n\n`;
      txt += `  *» Nro* : ${i + 1}\n`;
      txt += `  *» Titulo* : ${movie.title}\n`;
      txt += `  *» Sinopsis* : ${movie.synopsis}\n`;
      txt += `  *» Géneros* : ${movie.genres}\n`;
      txt += `  *» Url* : ${movie.link}\n`;
    }

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
}

handler.help = ['cinecalidadsearch *<búsqueda>*'];
handler.tags = ['search'];
handler.command = ['cinecalidadsearch'];
handler.register = true;

export default handler;