import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(
            m.chat,
            `🌸✨ Ingresa un usuario de Instagram ✨🌸\n\nEjemplo:\n*${usedPrefix + command} Shadow.XYZ*`,
            m
        );
    }

    try {
        // Reemplaza 'YOUR_API_KEY' con tu clave Apify
        const apiKey = 'YOUR_API_KEY';
        const url = `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${apiKey}&usernames=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const json = await res.json();

        if (!json || json.length === 0) {
            return conn.reply(m.chat, '❌ Usuario no encontrado 🌸', m);
        }

        const data = json[0];

        const info = `
🌸✨ Perfil Instagram ✨🌸
👤 Usuario: @${data.username}
🌐 Link: https://instagram.com/${data.username}
        `.trim();

        await conn.sendMessage(m.chat, {
            image: { url: data.profilePicUrl },
            caption: info
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        conn.reply(m.chat, "❌ Error al obtener el perfil 🌸", m);
    }
};

handler.help = ["igstalk"].map(v => v + " <usuario>");
handler.tags = ["tools","anime","otaku"];
handler.command = ["igstalk"];
handler.register = true;

export default handler;
