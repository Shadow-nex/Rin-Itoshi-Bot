import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '*✨ Ingresa un término de búsqueda.*', m, rcanal);

    await m.react('🕓');
    try {
        const response = await fetch(`https://api.dorratz.com/v3/fdroid-search?query=${encodeURIComponent(text)}`);
        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text();
            throw new Error(`Respuesta no válida del servidor:\n\n${textResponse}`);
        }

        const data = await response.json();

        if (!data.status || !data.result || data.result.length === 0) {
            throw new Error('No se encontraron resultados para tu búsqueda.');
        }

        let txt = `*📦 RESULTADOS EN F-DROID:*\n\n`;
        for (const app of data.result) {
            txt += `🌐 *Nombre:* ${app.name}\n`;
            txt += `📄 *Descripción:* ${app.description || 'Sin descripción'}\n`;
            txt += `🔗 *Enlace:* ${app.link}\n\n`;
        }

        await conn.reply(m.chat, txt.trim(), m, rcanal);
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
        await conn.reply(m.chat, '❌ Ocurrió un error:\n' + error.message, m);
    }
};

handler.help = ['fdroidsearch <término>'];
handler.tags = ['search'];
handler.command = ['fdroidsearch'];
handler.register = true;

export default handler;