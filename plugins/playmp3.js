import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Ingresa el nombre de la canción o el enlace de YouTube.\n\nEjemplo: *${usedPrefix + command} https://youtu.be/TdrL3QxjyVw*`);

    try {l
        let res = await fetch(`https://api.stellarwa.xyz/dow/ytmp3?url=${encodeURIComponent(text)}&apikey=Diamond`);
        let data = await res.json();

        if (!data?.status) {
            res = await fetch(`https://api.stellarwa.xyz/dow/ytmp3v2?url=${encodeURIComponent(text)}&apikey=Diamond`);
            data = await res.json();
        }

        if (!data?.status) return m.reply('❌ No se pudo obtener la información del audio.');

        const video = data.data || {};
        const title = video.title || 'Desconocido';
        const image = video.thumbnail || '';
        const filename = `${title}.mp3`;
        const quality = video.quality || '128kbps';
        const size = video.filesize || 'Desconocido';
        const urlDownload = video.dl || '';

        let caption = `
╭━━〔 🎵 Audio Encontrado 〕━━⬣
≡ 📌 Título : ${title}
≡ ⚡ Tamaño : ${size}
≡ 🎧 Calidad : ${quality}
╰━━━━━━━━━━━━━━━━⬣
`;

        await conn.sendMessage(m.chat, { 
            image: { url: image },
            caption
        }, { quoted: m });

        if (urlDownload) {
            await conn.sendMessage(m.chat, {
                audio: { url: urlDownload },
                fileName: filename,
                mimetype: 'audio/mpeg'
            }, { quoted: m });
        } else {
            m.reply('No se pudo descargar el audio.');
        }

    } catch (e) {
        console.error(e);
        m.reply('Ocurrió un error al procesar la solicitud.');
    }
};

handler.help = ['playmp3'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = ['playmp3'];

export default handler;