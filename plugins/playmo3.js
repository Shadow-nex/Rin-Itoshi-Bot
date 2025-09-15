import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`🎵 Ingresa el nombre de la canción o el enlace de YouTube.\n\nEjemplo: *${usedPrefix + command} https://youtu.be/TdrL3QxjyVw*`);

    try {
        const res = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(text)}`);
        const data = await res.json();

        const status = data?.status ?? false;
        const video = data?.data ?? {};

        if (!status) return m.reply('❌ No se pudo obtener la información del video.');

        const title = video?.title ?? 'Desconocido';
        const author = video?.author ?? 'Desconocido';
        const views = video?.views ?? '0';
        const likes = video?.likes ?? '0';
        const comments = video?.comments ?? '0';
        const duration = video?.duration ?? 0;
        const category = video?.category ?? 'N/A';
        const image = video?.image ?? '';
        const image_max = video?.image_max_resolution ?? '';

        const download = video?.download ?? {};
        const filename = download?.filename ?? 'audio.mp3';
        const quality = download?.quality ?? '128kbps';
        const size = download?.size ?? '0 MB';
        const urlDownload = download?.url ?? '';

        let caption = `
╭━━〔 🎵 Audio Encontrado 〕━━⬣
≡ 📌 Título : ${title}
≡ 👤 Autor : ${author}
≡ 👁️ Vistas : ${views}
≡ 👍 Likes : ${likes}
≡ 💬 Comentarios : ${comments}
≡ ⏱️ Duración : ${duration} seg
≡ 📂 Categoría : ${category}
≡ ⚡ Tamaño : ${size}
≡ 🎧 Calidad : ${quality}
╰━━━━━━━━━━━━━━━━⬣
`;

        await conn.sendMessage(m.chat, { 
            image: { url: image_max || image },
            caption
        }, { quoted: m });
 
        if (urlDownload) {
            await conn.sendMessage(m.chat, {
                audio: { url: urlDownload },
                fileName: filename,
                mimetype: 'audio/mpeg'
            }, { quoted: m });
        } else {
            m.reply('❌ No se pudo descargar el audio.');
        }

    } catch (e) {
        console.error(e);
        m.reply('❌ Ocurrió un error al procesar la solicitud.');
    }
};

handler.help = ['playmp3'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = ['playmp3'];

export default handler;