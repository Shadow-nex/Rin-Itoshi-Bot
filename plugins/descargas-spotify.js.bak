import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) 
        return conn.reply(m.chat, `🌸❗️ Acción mal usada ❗️🌸\n\n🌱 Usa el comando así:\n${usedPrefix + command} *nombre de la canción*`, m);

    try {
        await m.react('⌛️');

        let songs = await spotifyxv(text);
        if (!songs.length) throw "❌ No se encontró la canción.";
        let song = songs[0];

        const res = await fetch(`https://apis-starlights-team.koyeb.app/starlight/spotifydl?url=${encodeURIComponent(song.url)}`);
        const data = await res.json();

        if (!data || !data.music) throw "❌ No se pudo obtener el enlace de descarga.";

        const infoKawaii = `
🌸🌼 𝗠𝗨𝗦𝗜𝗖 𝗙𝗟𝗢𝗪𝗘𝗥 🌼🌸
💖 Título: ${data.title}
🌷 Artista: ${data.artist || song.artista.join(', ')}
🍓 Álbum: ${song.album}
⏳ Duración: ${song.duracion}
🔗 Enlace: ${data.spotify || song.url}
        `;

        await conn.sendMessage(
            m.chat,
            {
                text: infoKawaii,
                contextInfo: {
                    forwardingScore: 9999999,
                    isForwarded: true,
                    externalAdReply: {
                        showAdAttribution: true,
                        containsAutoReply: true,
                        renderLargerThumbnail: true,
                        title: 'Spotify Music',
                        mediaType: 1,
                        thumbnailUrl: data.thumbnail || song.imagen,
                        mediaUrl: data.music,
                        sourceUrl: data.music
                    }
                }
            },
            { quoted: m }
        );

        await conn.sendMessage(
            m.chat,
            { audio: { url: data.music }, fileName: `${data.title}.mp3`, mimetype: 'audio/mpeg' },
            { quoted: m }
        );

        await m.react('✅');

    } catch (e) {
        console.error(e);
        await m.react('❌');
        m.reply(`❌ Ocurrió un error inesperado: ${e.message || e}`);
    }
};

handler.help = ['spotify', 'music'];
handler.tags = ['downloader'];
handler.command = ['spotify', 'splay'];
//handler.group = true;

export default handler;


async function spotifyxv(query) {
    const token = await getSpotifyToken();
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const tracks = response.data.tracks.items;
    return tracks.map(track => ({
        name: track.name,
        artista: track.artists.map(a => a.name),
        album: track.album.name,
        duracion: timestamp(track.duration_ms),
        url: track.external_urls.spotify,
        imagen: track.album.images?.[0]?.url || ''
    }));
}

async function getSpotifyToken() {
    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64')
            }
        }
    );
    return response.data.access_token;
}

function timestamp(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}