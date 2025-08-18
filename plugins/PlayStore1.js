// Play Store Search - By Jose Xral 🔍
// Busca aplicaciones en Google Play Store
// https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S

import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa el nombre de la aplicación que deseas buscar.\n\nEjemplo:\n' + `> *${usedPrefix}playstore1* whatsapp`, m, rcanal);

  await m.react('🕓');

  const PlayStore = async (search) => {
    try {
      const { data } = await axios.get(`https://play.google.com/store/search?q=${search}&c=apps`);
      const resultados = [];
      const $ = cheerio.load(data);
      
      $('.ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a').each((i, u) => {
        const linkk = $(u).attr('href');
        const nombre = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .DdYX5').text();
        const desarrollador = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb').text();
        const calificacion = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div').attr('aria-label');
        const calificacionTexto = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF').text();
        const link = `https://play.google.com${linkk}`;

        resultados.push({
          link: link,
          nombre: nombre || 'Sin nombre',
          desarrollador: desarrollador || 'Sin desarrollador',
          img: 'https://files.catbox.moe/dklg5y.jpg', 
          calificacion: calificacion || 'Sin calificación',
          calificacionTexto: calificacionTexto || 'Sin calificación',
          link_desarrollador: `https://play.google.com/store/apps/developer?id=${desarrollador.split(" ").join('+')}`
        });
      });

      return resultados.length ? resultados.slice(0, Math.min(5, resultados.length)) : { message: 'No se encontraron resultados' };
    } catch (error) {
      console.error(error);
      throw new Error('Error en la búsqueda de Play Store');
    }
  };

  try {
    const resultados = await PlayStore(text);
    if (resultados.message) return m.reply(resultados.message);

    let txt = `*🔎 Resultados de la búsqueda en Play Store para "${text}"*\n\n`;
    for (let app of resultados) {
      txt += `▢ *Nombre:* ${app.nombre}\n`;
      txt += `▢ *Desarrollador:* ${app.desarrollador}\n`;
      txt += `▢ *Calificación:* ${app.calificacionTexto} (${app.calificacion})\n`;
      txt += `▢ *Link:* ${app.link}\n`;
      txt += `▢ *Link del Desarrollador:* ${app.link_desarrollador}\n\n━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    }

    await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
        externalAdReply: {
          title: resultados[0].nombre,
          body: `Resultados de búsqueda de Play Store - ${text}`,
          thumbnailUrl: 'https://files.catbox.moe/dklg5y.jpg',
          sourceUrl: resultados[0].link,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
    
    await m.react('✅');
  } catch (error) {
    console.error(error);
    m.reply('Ocurrió un error durante la búsqueda.');
    await m.react('✖️');
  }
};

handler.help = ['playstore *<query>*'];
handler.tags = ['search'];
handler.command = ['playstore1', 'ps1'];
handler.limit = false;

export default handler;