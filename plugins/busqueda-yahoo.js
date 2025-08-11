import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '🌹 Ingresa el nombre que deseas buscar en Yahoo.\n\nEjemplo:\n' + `> *${usedPrefix + command}* Chaewon`, m, rcanal);
  await m.react('🕓');

  try {
    let res = await fetch(`https://delirius-apiofc.vercel.app/search/yahoo?query=${encodeURIComponent(text)}&language=en`);
    let json = await res.json();

    if (!json.data || json.data.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    let txt = '`乂  Y A H O O  -  B Ú S Q U E`';

    for (let i = 0; i < json.data.length; i++) {
      let search = json.data[i];
      txt += `\n\n`;
      txt += `  *» Nro* : ${i + 1}\n`;
      txt += `  *» Título* : ${search.title}\n`;
      txt += `  *» Enlace* : ${search.link}\n`;
      txt += `  *» Descripción* : ${search.description}\n`;
    }

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
}

handler.help = ['yahoosearch *<búsqueda>*'];
handler.tags = ['search'];
handler.command = ['yahoosearch'];
handler.register = true;

export default handler;