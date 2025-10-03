let handler = async (m, { conn }) => {
  if (!global.db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('《✦》El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw on*');
  }

  try {
    let img = 'https://dark-core-api.vercel.app/api/random/ass?key=api';
    let text = '🍑 *Disfruta tu ración de... arte digital 🙈*';

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: text,
      footer: dev,
      buttons: [
        {
          buttonId: '.culo',
          buttonText: { displayText: '😔 Siguiente' },
          type: 1
        }
      ],
      headerType: 4
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    m.reply(' Error al obtener la imagen, revisa la API o tu conexión.');
  }
}

handler.help = ['culo'];
handler.tags = ['nsfw'];
handler.command = ['culo'];

export default handler;