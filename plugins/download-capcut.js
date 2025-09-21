import fetch from "node-fetch";
import cheerio from "cheerio";

const handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        return m.reply(`*🎋 Ingresa un link de CapCut.*\n\n🍄 Ejemplo:\n${usedPrefix + command} https://www.capcut.com/tv2/ZSSCR6UFU/`);
    }

    try {
        await m.react('🕒');
        const result = await capcutdl(text);

        if (!result) {
            await m.react('❌');
            return m.reply('*No se pudieron obtener los datos. Asegúrate de que la URL ingresada sea correcta.*');
        }

        const info = `🎬 CAPCUT DOWNLOADER 🎬 
 
° 🌴 *Título:* ${result.title}
° 👤 *Autor:* ${result.author.name}
° 📆 *Fecha:* ${result.date}
° 👥 *Usos:* ${result.uses}
° 🤍 *Likes:* ${result.likes}
° 🖼 *Thumbnail:* ${result.posterUrl || 'No disponible'}
° 📥 *Video URL:* 
 ${result.videoUrl}
        `.trim();

/*        if (result.author.avatarUrl) {
            await conn.sendMessage(m.chat, {
                image: { url: result.author.avatarUrl },
                caption: `👤 *Avatar de ${result.author.name}*`
            }, { quoted: m });
        }

        if (result.posterUrl) {
            await conn.sendMessage(m.chat, {
                image: { url: result.posterUrl },
                caption: dev
            }, { quoted: m });
        }*/

        await conn.sendFile(m.chat, result.videoUrl, '', info, m, {
            thumbnail: result.posterUrl ? await fetch(result.posterUrl).then(res => res.buffer()) : null
        });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        m.reply('*❌ Ocurrió un error al obtener los datos.*');
    }
};

handler.help = ["capcut *<url>*"];
handler.tags = ["downloader"];
handler.command = ["capcut", "capcutdl"];

export default handler;

async function capcutdl(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const videoElement = $('video.player-o3g3Ag');
        const videoSrc = videoElement.attr('src');
        const posterSrc = videoElement.attr('poster');
        const title = $('h1.template-title').text().trim();
        const actionsDetail = $('p.actions-detail').text().trim();
        const [date, uses, likes] = actionsDetail.split(',').map(item => item.trim());

        const authorAvatar = $('span.lv-avatar-image img').attr('src');
        const authorName = $('span.lv-avatar-image img').attr('alt');

        if (!videoSrc) throw new Error('No se encontró el link del video.');

        return {            
            title,
            date,
            uses,
            likes,
            author: {
                name: authorName || "Desconocido",
                avatarUrl: authorAvatar || null
            },
            videoUrl: videoSrc,
            posterUrl: posterSrc || null
        };
    } catch (error) {
        console.error('Error al obtener los detalles del video:', error.message);
        return null;
    }
}