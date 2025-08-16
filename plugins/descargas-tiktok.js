import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `*🌱 Por favor, ingresa un enlace de TikTok.*`, m, fake);
    }

    try {
        await conn.reply(m.chat, `
           ʚ🍃ɞ *Onichan~*
*🌳 Espere un momentito...*  
*Estoy descargando su videíto~* 💖  
*Awu~ 📥📺*`, m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "❌ Error: No se pudo obtener el video.", m);
        }

        const data = tiktokData.data;
        const videoURL = data.play;

        const formatNumber = (n = 0) => n.toLocaleString('es-PE');
        const formatDuration = (seconds = 0) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins} min ${secs} seg`;
        };

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `╭─❍⃟🌸 𝑶𝒏𝒊𝒄𝒉𝒂𝒂𝒂𝒏~ 𝒂𝒘𝒖𝒖𝒖!! 💗
┃  
┃ 📥 *TikTok Descargado nyan~!*  
┃  
┃ 🎀 *Título:* ${data.title || 'Sin descripción uwu'}  
┃ 💖 *Likes:* ${formatNumber(data.digg_count)} 💕  
┃ 💬 *Comentarios:* ${formatNumber(data.comment_count)} ✨  
┃ 👁️ *Vistas:* ${formatNumber(data.play_count)} nya~  
┃ 🔁 *Compartido:* ${formatNumber(data.share_count)} 💌  
┃ ⏱️ *Duración:* ${formatDuration(data.duration)} ⌛  
┃ 🖼️ *Calidad:* ${videoURL.includes('hd') ? 'HD 🎞️✨' : 'Normalito 📺💭'}  
┃  
╰─⟦ 💞 𝙀𝙣𝙟𝙤𝙮 𝙞𝙩 𝙤𝙣𝙞𝙘𝙝𝙖𝙣~! 🌈 𝙆𝙮𝙖𝙖𝙖 💕 ⟧`, m);
        } else {
            return conn.reply(m.chat, "❌ No se pudo descargar.", m);
        }
    } catch (error1) {
        return conn.reply(m.chat, `❌ Error: ${error1.message}`, m);
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