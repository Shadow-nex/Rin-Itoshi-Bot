// *👂 [ Obtener Tendencias de TikTok ]*
// *By Code Titans*

import axios from 'axios';

let handler = async (m, { conn }) => {
  try {
    await m.react('🕓');
    
    const response = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktok-trends?region=PE');
    
    if (response.status === 200 && Array.isArray(response.data)) {
      let trends = response.data;
      
      if (trends.length === 0) {
        await m.reply('No hay tendencias disponibles en este momento.');
        return;
      }

      let text = '`乂  T I K T O K  -  T R E N D E N C I A S`\n\n';
      
      for (let trend of trends) {
        text += `☃️ *Título*: ${trend.title}\n`;
        text += `☃️ *Creador*: ${trend.author.nickname} [@${trend.author.unique_id}]\n`;
        text += `☃️ *Likes*: ${trend.likes}\n`;
        text += `☃️ *Comentarios*: ${trend.comment}\n`;
        text += `☃️ *Compartidos*: ${trend.shares}\n`;
        text += `☃️ *Reproducciones*: ${trend.repros}\n`;
        text += `☃️ *Descargas*: ${trend.downloads}\n`;
        text += `☃️ *Duración*: ${trend.duration} segundos\n`;
        text += `☃️ *URL del video*: ${trend.nowm}\n`;
        text += `☃️ *Portada* ${trend.cover}\n\n`;
      }
      
      await conn.sendMessage(m.chat, { text: text }, { quoted: m });
      await m.react('✅');
    } else {
      await m.react('✖️');
      await conn.reply(m.chat, 'Error al obtener las tendencias de TikTok.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['tiktok'];
handler.help = ['tiktok-trends'];
handler.command = ['tiktoktrends', 'tttrends', 'td'];
handler.register = true;

export default handler;