import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `🌸✨ Onichan~ debes poner un link de TikTok uwu 💖`, m, fake);
    }

    try {
        await conn.reply(m.chat, `
╭─⊰ 🌸 𝐍𝐲𝐚𝐚~ ⊱─╮  
┃ ⏳ *Espera un momentito onii-chan...*  
┃ 💕 *Estoy descargando tu videíto kawaii~*  
╰─⊰ ✨ 𝐀𝐰𝐮𝐮~ ⊱─╯`, m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
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

        const data = tiktokData.data;
        const videoURL = data.play;

        const formatNumber = (n = 0) => n.toLocaleString('es-PE');
        const formatDuration = (seconds = 0) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins} min ${secs} seg`;
        };

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `
ㅤ۟∩　ׅ　★ ໌　ׅ　🅣𝗂𝗄𝖳𝗈𝗄 🅓ownload　ׄᰙ

𖣣ֶㅤ֯⌗ 🫟  ׄ ⬭ *Título:* ${data.title || 'Sin descripción uwu'}
𖣣ֶㅤ֯⌗ 🧑🏻  ׄ ⬭ *Autor:* ${data.author?.unique_id || 'Desconocido'}
𖣣ֶㅤ֯⌗ ⏱️  ׄ ⬭ *Duración:* ${formatDuration(data.duration)}
𖣣ֶㅤ֯⌗ 🍁  ׄ ⬭ *Likes:* ${formatNumber(data.digg_count)}
𖣣ֶㅤ֯⌗ 🎋  ׄ ⬭ *Comentarios:* ${formatNumber(data.comment_count)}
𖣣ֶㅤ֯⌗ 🌱  ׄ ⬭ *Vistas:* ${formatNumber(data.play_count)}
𖣣ֶㅤ֯⌗ 🌳  ׄ ⬭ *Compartidos:* ${formatNumber(data.share_count)}
𖣣ֶㅤ֯⌗ 🎶  ׄ ⬭ *Audio:* ${data.music?.title || 'Desconocido'}
𖣣ֶㅤ֯⌗ 📺  ׄ ⬭ *Calidad:* ${videoURL.includes('hd') ? 'HD 🌟' : 'Normalito 📺'}

╭─╼⃝🌸 𝑶𝒏𝒊𝒄𝒉𝒂𝒂𝒏~ 💖  
│ 🍡 *Tu video está servidito nya~!*  
╰─❖ 🌈 𝐃𝐢𝐬𝐟𝐫𝐮𝐭𝐚𝐥𝐨, 𝐨𝐧𝐢𝐢-𝐜𝐡𝐚𝐧~ 💞`, fkontak);
        } else {
            return conn.reply(m.chat, "❌ No pude descargarlo nya~ 😿", m);
        }
    } catch (error1) {
        return conn.reply(m.chat, `❌ Error inesperado: ${error1.message}`, m);
    }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*');
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
handler.register = true;
handler.coin = 2;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    let response = await (await fetch(tikwm)).json();
    return response;
}