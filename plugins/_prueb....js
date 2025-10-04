import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `❀ Por favor, ingresa un término de búsqueda.\nEjemplo: *${usedPrefix}pinterest2 edits Kaneki*`, m);

    try {
        await m.react('🕒');
        
        const res = await axios.get(`https://api.vreden.my.id/api/v2/search/pinterest?query=${encodeURIComponent(text)}&limit=10&type=videos`);
        const data = res.data;

        if (!data?.status || !data?.result?.result?.length) {
            await conn.reply(m.chat, '⚠︎ No se encontraron videos para ese término.', m);
            return;
        }

        const results = data.result.result;

        const medias = results.map(item => {
            const videoData = item.media_urls[0];
            const caption = createPinterestCaption(item);

            return {
                type: 'video',
                data: {
                    url: videoData.url,
                    thumbnail: videoData.thumbnail,
                    caption
                }
            };
        });

        await conn.sendSylphy(m.chat, medias, { quoted: m });

        await m.react('✔️');
    } catch (e) {
        await m.react('✖️');
        await conn.reply(m.chat, `⚠︎ Se ha producido un error.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m);
    }
};

function createPinterestCaption(item) {
    const uploader = item.uploader;
    const video = item.media_urls[0];

    return `❀ Título › ${item.title || 'No disponible'}\n> ☕︎ Autor › ${uploader.full_name || uploader.username || 'Desconocido'}\n> ✧︎ Calidad › ${video.quality || 'No disponible'}\n> 🕒 Duración › ${Math.floor(video.duration_ms / 1000)}s\n> 🔗 Pin › ${item.pin_url}`;
}

handler.help = ['pinterest2 <término>'];
handler.tags = ['downloader'];
handler.command = ['pinterest2'];
handler.group = true;

export default handler;