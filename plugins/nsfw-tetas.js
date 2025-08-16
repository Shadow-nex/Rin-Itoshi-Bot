let handler = async(m, { conn }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
  return m.reply(hotw);
  }
let img = 'https://delirius-apiofc.vercel.app/nsfw/boobs';

let text = '*😋 TETAS*';

conn.sendMessage(m.chat, { image: { url: img }, caption: text }, { quoted: m });
m.react('✅');
}

handler.help = ['tetas'];
handler.tags = ['nsfw'];
handler.command = ['tetas'];

export default handler;