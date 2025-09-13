import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `🌸✨ Onichan~ debes poner un link de TikTok uwu 💖`, m, fake);
    }

    try {
        await conn.reply(m.chat, `🌷 *Espera un momentito onii-chan...*  
🌱 *Estoy descargando tu videíto kawaii~* ✨ 𝐀𝐰𝐮𝐮~ `, m);
/*
        let loadMsg = await conn.reply(m.chat, "🍂 Descargando 0%", m);
        for (let i = 10; i <= 100; i += 10) {
            await new Promise(res => setTimeout(res, 300));
            await conn.sendMessage(m.chat, { 
                edit: loadMsg.key, 
                text: `🍧 Descargando ${i}%...` 
            });
        }*/

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "❌ Uff... No pude traer tu video onichan 😿", m);
        }

        const thumbRes = await fetch('https://h.uguu.se/npXXAmah.jpg');
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
                    name: ` • 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙰𝙳𝙰 •`,
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

        const getFileSize = async (url) => {
            try {
                const res = await fetch(url, { method: 'HEAD' });
                const size = res.headers.get('content-length');
                if (!size) return 'Desconocido';
                const mb = (parseInt(size) / (1024 * 1024)).toFixed(2);
                return `${mb} MB`;
            } catch {
                return 'Desconocido';
            }
        };

        const videoSize = await getFileSize(videoURL);

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `❐ 🍧 • *𝐓𝐢𝐭𝐮𝐥𝐨:* ${data.title || 'Sin descripción uwu'}

  *~ ＥＳＴＡＤＯ ~*
❐ 🍂 • *𝐀𝐮𝐭𝐨𝐫* ➭ ${data.author?.nickname || data.author?.unique_id || 'Desconocido'}
❐ 🌷 • *𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧* ➭ ${formatDuration(data.duration)}
❐ 💖 • *𝐓𝐚𝐦𝐚𝐧̃𝐨* ➭ ${videoSize}
❐ 🔥 • *𝐋𝐢𝐤𝐞𝐬* ➭ ${formatNumber(data.digg_count)}
❐ 💙 • *𝐂𝐨𝐦𝐞𝐧𝐭𝐚𝐫𝐢𝐨𝐬* ➭ ${formatNumber(data.comment_count)}
❐ 💥 • *𝐕𝐢𝐬𝐭𝐚𝐬* ➭ ${formatNumber(data.play_count)}
❐ 🌾 • *𝐂𝐨𝐦𝐩𝐚𝐫𝐭𝐢𝐝𝐨𝐬* ➭ ${formatNumber(data.share_count)}
❐ 🍄 • *𝐀𝐮𝐝𝐢𝐨* ➭ ${data.music_info?.title || 'Desconocido'} - ${data.music_info?.author || 'Desconocido'}
❐ ⚡ • *𝐂𝐚𝐥𝐢𝐝𝐚𝐝* ➭ ${videoURL.includes('hd') ? 'HD 🌟' : 'Normalito 📺'}`, fkontak);
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