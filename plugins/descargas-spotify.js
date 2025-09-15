import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(
        `🎵 Ingresa el nombre de la canción o el enlace de Spotify.\n\nEjemplo: *${usedPrefix + command} I CAN'T STOP ME* o *${usedPrefix + command} https://open.spotify.com/track/37ZtpRBkHcaq6hHy0X98zn*`
    );

    await m.reply('🔎 Buscando canción en Spotify...');

    try {
        let res;

        if (/https?:\/\/open\.spotify\.com\/track\/\w+/.test(text)) {
            res = await fetch(`https://delirius-apiofc.vercel.app/download/spotifydl?url=${encodeURIComponent(text)}`);
        } else {
            res = await fetch(`https://delirius-apiofc.vercel.app/download/spotifysearch?query=${encodeURIComponent(text)}`);
        }

        const json = await res.json();
        if (!json.status) return m.reply('❌ No se encontró la canción en Spotify.');

        const data = json.data;
        const title = data.title || 'Desconocido';
        const author = data.author || 'Desconocido';
        const image = data.image || '';
        const duration = data.duration || 0;
        const audioUrl = data.url;
        const spotifyUrl = data.source || 'https://www.delirius.store/';

        const minutes = Math.floor(duration / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        const caption = `🎵 ──〔 Spotify Downloader 〕──
≡ 🎼 Título : ${title}
≡ 👤 Artista : ${author}
≡ ⏳ Duración : ${formattedDuration}`;

        const buttons = [
            { buttonId: `play ${title}`, buttonText: { displayText: '▶️ Escuchar' }, type: 1 },
            { buttonId: `url ${spotifyUrl}`, buttonText: { displayText: '🔗 Spotify' }, type: 1 }
        ];

        await conn.sendMessage(m.chat, {
            image: { url: image },
            caption,
            footer: 'Delirius API',
            buttons,
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg'
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        m.reply('❌ Ocurrió un error al buscar la canción.');
    }
}

handler.help = ['spotifydl', 'spotify'].map(v => v + ' *<url o texto>*');
handler.tags = ['downloader'];
handler.command = ["spotifydl","spotify"];

export default handler;