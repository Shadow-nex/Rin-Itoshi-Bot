/* 
- Downloader CapCut By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import fetch from "node-fetch";
import cheerio from "cheerio";

const handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        return m.reply(`*${xdownload} Por favor, ingresa un link de CapCut.*`);
    }

    try {
        await m.react('🕒');
        const result = await capcutdl(text);

        if (!result) {
            await m.react('❌');
            return m.reply('*❌ No se pudieron obtener los datos. Asegúrate de que la URL ingresada sea correcta.*');
        }

        const cpt = `\`\`\`◜CapCut - Download◞\`\`\`\n\n° *🌴 Título:* ${result.title}\n° *📆 Fecha:* ${result.date}\n° *👤 Autor:* ${result.author.name}\n° *🤍 Likes:* ${result.likes}\n\n> ${dev}`;
        await conn.sendFile(m.chat, result.videoUrl, '', cpt, m, {
            thumbnail: await fetch(result.posterUrl).then(res => res.buffer())
        });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        m.reply('*❌ Ocurrió un error al obtener los datos.*');
    }
};

handler.help = ["capcut *<url>*"];
handler.tags = ["descargas"];
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

        if (!videoSrc || !posterSrc || !title || !date || !uses || !likes || !authorAvatar || !authorName) {
            throw new Error('Algunos elementos importantes no se encontraron en la página.');
        }

        return {            
            title: title,
            date: date,
            pengguna: uses,
            likes: likes,
            author: {
                name: authorName,
                avatarUrl: authorAvatar
            },
            videoUrl: videoSrc,
            posterUrl: posterSrc
        };
    } catch (error) {
        console.error('Error al obtener los detalles del video:', error.message);
        return null;
    }
}
