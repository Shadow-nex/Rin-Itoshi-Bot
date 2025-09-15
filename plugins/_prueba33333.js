import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`📲 Ingresa el enlace de la app de Google Play Store.\n\nEjemplo: *${usedPrefix + command} https://play.google.com/store/apps/details?id=com.whatsapp*`);

    try {
        const res = await fetch(`https://api.apkcombo.com/api/download?url=${encodeURIComponent(text)}`);
        const data = await res.json();

        if (!data || !data.status) return m.reply('❌ No se pudo obtener la información de la app.');

        const app = data.data || {};
        const title = app.title || 'Desconocido';
        const developer = app.developer || 'Desconocido';
        const category = app.category || 'Desconocido';
        const version = app.version || 'N/A';
        const size = app.size || 'N/A';
        const rating = app.rating || 'N/A';
        const downloads = app.downloads || 'N/A';
        const thumbnail = app.icon || '';
        const downloadUrl = app.downloadUrl || '';

        const caption = `
╭━━〔 📲 App Encontrada 〕━━⬣
≡ 📌 Nombre : ${title}
≡ 👤 Desarrollador : ${developer}
≡ 🗂 Categoría : ${category}
≡ 🔢 Versión : ${version}
≡ ⚡ Tamaño : ${size}
≡ ⭐ Rating : ${rating}
≡ ⬇️ Descargas : ${downloads}
╰━━━━━━━━━━━━━━━━⬣
`;

        await conn.sendMessage(m.chat, { 
            image: { url: thumbnail },
            caption
        }, { quoted: m });

        if (downloadUrl) {
            await conn.sendMessage(m.chat, {
                text: `⬇️ Aquí tienes el enlace de descarga:\n${downloadUrl}`
            }, { quoted: m });
        } else {
            m.reply('❌ No se pudo generar el enlace de descarga.');
        }

    } catch (e) {
        console.error(e);
        m.reply('❌ Ocurrió un error al procesar la solicitud.');
    }
};

handler.help = ['playstoredl'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = ['playstoredl'];

export default handler;