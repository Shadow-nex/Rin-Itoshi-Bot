const handler = async (m, { conn }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(hotw);
    }
    
  const url = 'https://nekobot.xyz/api/image?type=hentai';
  const res = await fetch(url).then(v => v.json());
  await conn.sendFile(m.chat, res.message, 'hentai.jpg', `🥵 *Mmm toma tu hentai pervertido...*`, m);
};
handler.command = ['hentai'];
handler.help = ['hentai'];
handler.tags = ['nsfw'];
handler.group = false;
handler.register = true;

export default handler;
