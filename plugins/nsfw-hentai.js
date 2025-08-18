import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    if (!global.db?.data?.chats?.[m.chat]?.nsfw && m.isGroup) {
      return m.reply('❌ Este comando NSFW no está habilitado en este grupo.');
    }

    const url = 'https://nekobot.xyz/api/image?type=hentai';
    const res = await fetch(url).then(v => v.json());

    await conn.sendFile(
      m.chat,
      res.message,
      'hentai.jpg',
      '🥵 *Mmm toma tu hentai pervertido...*',
      m
    );
  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al obtener la imagen.');
  }
};

handler.command = ['hentai2'];
handler.help = ['hentai2'];
handler.tags = ['nsfw'];
handler.group = false;
handler.register = true;

export default handler;