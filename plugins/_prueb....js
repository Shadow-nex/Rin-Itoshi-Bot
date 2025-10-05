import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `❀ Por favor, ingresa un término de búsqueda.\nEjemplo: *${usedPrefix}pinterest2 edits Kaneki*`, m);

    try {
        await m.react('🕒');

        // Realizar la solicitud a la API de Zyla Labs
        const res = await axios.get(`https://zylalabs.com/api/1851/videos+and+images+downloader+from+pinterest+api/1513/fetch+video+or+image?url=${encodeURIComponent(text)}`, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY'
            }
        });

        const data = res.data;

        if (!data?.status || !data?.video_url) {
            await conn.reply(m.chat, '⚠︎ No se encontró un video válido para ese término.', m);
            return;
        }

        const videoUrl = data.video_url;

        // Descargar el video como buffer
        const videoBuffer = await downloadVideo(videoUrl);

        // Enviar el video a WhatsApp
        await conn.sendMessage(m.chat, {
            video: videoBuffer,
            caption: `❀ Video de Pinterest: ${text}`,
            mimetype: 'video/mp4'
        }, { quoted: m });

        await m.react('✔️');
    } catch (e) {
        await m.react('✖️');
        await conn.reply(m.chat, `⚠︎ Se ha producido un error.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m);
    }
};

// Función para descargar el video como buffer
async function downloadVideo(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
}

handler.help = ['pinterest2 <término>'];
handler.tags = ['downloader'];
handler.command = ['pinterest2'];
handler.group = true;

export default handler;
