let handler = async (m, { conn }) => {

    
  let img = 'https://api.fgmods.xyz/api/nsfw/cosplay?apikey=fg_KatBGzCS';
  let text = 'aqui tienes';

  conn.sendMessage(m.chat, {
    image: { url: img },
    caption: text,
    buttons: [
      { buttonId: '.cosplay', buttonText: { displayText: '🔁 Otra más' }, type: 1 }
    ]
  }, { quoted: m });

  m.react('✅');
}

handler.help = ['cosplay'];
handler.tags = ['nsfw'];
handler.command = ['cosplay'];

export default handler;