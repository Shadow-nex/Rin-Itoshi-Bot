import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
  return m.reply(hotw);
}
  try {
    const res = await fetch('https://www.reddit.com/r/nsfw.json?limit=50');
    const json = await res.json();
    const posts = json.data.children.filter(post => post.data.post_hint === 'image');

    if (!posts.length) {
      return conn.reply(m.chat, '⚠️ No se encontró contenido NSFW por ahora.', m);
    }

    
    const post = posts[Math.floor(Math.random() * posts.length)].data;
    const image = post.url_overridden_by_dest || post.url;
    const title = post.title;
    const author = post.author;

    await conn.sendFile(m.chat, image, 'nsfw.jpg', `🔞 *${title}*\n👤 u/${author}\n📍 r/nsfw`, m);
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Hubo un error al obtener el contenido NSFW.', m);
  }
};

handler.command = ['nsfw1'];
handler.tags = ['nsfw'];
handler.help = ['nsfw1'];
handler.register = true


export default handler;