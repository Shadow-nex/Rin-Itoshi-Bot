let handler = async (m, { conn }) => {

  let img = 'https://api.fgmods.xyz/api/nsfw/cosplay?apikey=fg_KatBGzCS';

  conn.sendMessage(m.chat, {
    image: { url: img },
    caption: '😋 Aqui tienes',
  }, { quoted: m });

  m.react('✅');
}

handler.help = ['cosplay'];
handler.tags = ['nsfw'];
handler.command = ['cosplay'];

export default handler;