import fetch from 'node-fetch';

let tiktokSessions = new Map();

const tiktokHandler = async (m, { conn, command, args, usedPrefix }) => {
    let query = args.join(' ').trim();

    let session = tiktokSessions.get(m.chat) || {
        videos: [],
        currentIndex: 0,
        query: query || ''
    };

    if (command === 'tksearch') {
        if (!query) {
            return conn.reply(
                m.chat,
                `🌷 \`\`\`Escribe lo que quieres buscar\`\`\`\n\`Ejemplo:\`\n> ${usedPrefix}tksearch Videos Graciosos `,
                m
            );
        }

        session = { videos: [], currentIndex: 0, query: query };
        tiktokSessions.set(m.chat, session);

        try {
            const apiUrl = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(query)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.meta || !data.meta.length) {
                return conn.reply(m.chat, '❌ No se encontraron videos', m);
            }

            session.videos = data.meta;
            tiktokSessions.set(m.chat, session);

            return await sendVideoWithButtons(session, m, conn, usedPrefix);
        } catch (error) {
            console.error(error);
            return conn.reply(m.chat, '❌ Error al buscar videos', m);
        }
    }

    if (command === 'tkseguir') {
        if (!session.videos.length) {
            return conn.reply(m.chat, '❌ Primero usa .tksearch para buscar videos', m);
        }

        if (session.currentIndex + 1 >= session.videos.length) {
            return conn.reply(m.chat, '✅ No hay más videos, vuelve a buscar.', m);
        }

        session.currentIndex += 1;
        tiktokSessions.set(m.chat, session);
        return await sendVideoWithButtons(session, m, conn, usedPrefix);
    }
};

async function sendVideoWithButtons(session, m, conn, usedPrefix) {
    const video = session.videos[session.currentIndex];

    try {
        const infoUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(video.play)}`;
        const res = await fetch(infoUrl);
        const infoData = await res.json();

        const data = infoData.data;
        if (!data) throw new Error("No data");

        let title = data.title || "Sin título";
        let author = data.author?.nickname || "Desconocido";
        let username = data.author?.username || "N/A";
        let duration = data.duration || "N/A";
        let views = data.repro || "0";
        let likes = data.like || "0";
        let shares = data.share || "0";
        let comments = data.comment || "0";
        let linkVideo = data.meta?.media?.[0]?.hd || data.meta?.media?.[0]?.org;

        const caption = `🎬 *TikTok - Resultado ${session.currentIndex + 1}*\n\n` +
            `≡ 📌 *Título:* ${title}\n` +
            `≡ 👤 *Autor:* ${author} (${username})\n` +
            `≡ ⏳ *Duración:* ${duration}s\n` +
            `≡ 👀 *Vistas:* ${views}\n` +
            `≡ ❤️ *Likes:* ${likes}\n` +
            `≡ 💬 *Comentarios:* ${comments}\n` +
            `≡ 🔄 *Compartidos:* ${shares}\n\n` +
            `🌐 *Link:* ${linkVideo}\n\n` +
            `✅ Usa el botón para ver más videos.`;

        const buttons = [];

        if (session.currentIndex + 1 < session.videos.length) {
            buttons.push({
                buttonId: `${usedPrefix}tkseguir`,
                buttonText: { displayText: " Siguiente video" },
                type: 1
            });
        }

        await conn.sendMessage(
            m.chat,
            {
                video: { url: linkVideo },
                caption: caption,
                buttons: buttons,
                viewOnce: true
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Error al obtener info del video', m);
    }
}

tiktokHandler.help = ['tksearch <búsqueda>', 'tkseguir'];
tiktokHandler.tags = ['descargas'];
tiktokHandler.command = ['tksearch', 'tkseguir'];

export default tiktokHandler;