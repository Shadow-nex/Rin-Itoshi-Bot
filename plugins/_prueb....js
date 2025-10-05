import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `❀ Por favor, ingresa un término de búsqueda.\nEjemplo: *${usedPrefix}pinterest2 edits Kaneki*`, m);

    try {
        await m.react('🕒');

        // Petición a la API de Pinterest
        const res = await axios.get(`https://api.vreden.my.id/api/v2/search/pinterest?query=${encodeURIComponent(text)}&limit=5&type=videos`);
        const data = res.data;

        if (!data?.status || !data?.result?.result?.length) {
            await conn.reply(m.chat, '⚠︎ No se encontraron videos para ese término.', m);
            return;
        }

        const results = data.result.result;

        for (const item of results) {
            const videoData = item.media_urls?.[0];

            const caption = createPinterestCaption(item);

            // Enviar miniatura con botón para abrir el video
            await conn.sendMessage(m.chat, {
                image: { url: videoData?.thumbnail || '' },
                caption,
                footer: 'Haz clic en el botón para ver el video',
                buttons: [
                    {
                        buttonId: `ver_${item.pin_url}`, 
                        buttonText: { displayText: 'Ver video' }, 
                        type: 1
                    }
                ],
                headerType: 4
            }, { quoted: m });
        }

        await m.react('✔️');
    } catch (e) {
        await m.react('✖️');
        await conn.reply(m.chat, `⚠︎ Se ha producido un error.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m);
    }
};

// Función para crear el caption de cada pin
function createPinterestCaption(item) {
    const uploader = item.uploader || {};
    const video = item.media_urls?.[0] || {};

    return `❀ Título › ${item.title || 'No disponible'}
> ☕︎ Autor › ${uploader.full_name || uploader.username || 'Desconocido'}
> ✧︎ Calidad › ${video.quality || 'No disponible'}
> 🕒 Duración › ${video.duration_ms ? Math.floor(video.duration_ms / 1000) + 's' : 'No disponible'}
> 🔗 Pin › ${item.pin_url || 'No disponible'}`;
}

handler.help = ['pinterest2 <término>'];
handler.tags = ['downloader'];
handler.command = ['pinterest2'];
handler.group = true;

export default handler;
