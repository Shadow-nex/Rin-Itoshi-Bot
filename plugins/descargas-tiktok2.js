import fetch from 'node-fetch';

var handler = async (m, { conn, text }) => {
  try {
    let regex = /(https?:\/\/(?:www\.)?(?:vt\.)?tiktok\.com\/[^\s]+)/gi;
    let urls = text.match(regex);

    if (!urls) return; // si no hay link de TikTok, no hace nada

    let url = urls[0];
    await m.react('🕒');

    const tiktokData = await tiktokdl(url);

    if (!tiktokData || !tiktokData.video || !tiktokData.video.no_watermark) {
      return conn.reply(m.chat, "❌ Uff... No pude traer tu video onichan 😿", m);
    }

    const thumbRes = await fetch('https://files.catbox.moe/knns14.jpg');
    const thumbBuffer = await thumbRes.buffer();

    const fkontak = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
      },
      message: {
        locationMessage: {
          name: `🌀 ᴅᴏᴡɴʟᴏᴀᴅ ᴛɪᴋᴛᴏᴋ | 🌱 𝙍𝙞𝙣 𝙄𝙩𝙤𝙨𝙝𝙞 𝙈𝘿 🍂`,
          jpegThumbnail: thumbBuffer
        }
      },
      participant: "0@s.whatsapp.net"
    };

    const videoURL = tiktokData.video.no_watermark;

    await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `
╭─╼⃝🌸 𝑶𝒏𝒊𝒄𝒉𝒂𝒂𝒏~ 💖  
│ 🍡 *Tu video está servidito nya~!*  
╰─❖ 🌈 𝐃𝐢𝐬𝐟𝐫𝐮𝐭𝐚𝐥𝐨, 𝐨𝐧𝐢𝐢-𝐜𝐡𝐚𝐧~ 💞`, fkontak);
    await m.react('✅');
    
  } catch (error1) {
    return conn.reply(m.chat, `❌ Error inesperado: ${error1.message}`, m);
  }
};

handler.customPrefix = /https?:\/\/(www\.)?(vt\.)?tiktok\.com\//i;
handler.command = new RegExp;

export default handler;

// Nueva función de descarga
async function tiktokdl(url) {
  let api = `https://api.dorratz.com/tiktok?url=${encodeURIComponent(url)}`;
  let response = await (await fetch(api)).json();
  return response;
}