import fetch from 'node-fetch';
import { prepareWAMessageMedia, downloadContentFromMessage } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, '❌ *Debes enviar un link de Spotify válido*', m);

    try {
        await m.react('🎵');

        const spotifyUrl = args[0];
        const apiUrl = `https://api.neoxr.eu/api/spotify?url=${encodeURIComponent(spotifyUrl)}&apikey=russellxz`;

        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.status) return conn.reply(m.chat, '❌ No se pudo obtener la canción de Spotify', m);

        const trackData = json.data;
        const track = {
            title: trackData.title,
            duration: trackData.duration,
            thumbnail: trackData.thumbnail,
            downloadUrl: trackData.url,
            artist: {
                name: trackData.artist.name,
                spotifyLink: trackData.artist.external_urls.spotify
            }
        };

        // Mensaje decorado
        const caption = `
🎶 *${track.title}*
👤 Artista: ${track.artist.name}
⏱ Duración: ${track.duration}
🔗 Spotify: ${track.artist.spotifyLink}
📥 Descarga/Audio: ${track.downloadUrl}
        `;

        const media = await prepareWAMessageMedia({ audio: { url: track.downloadUrl }, mimetype: 'audio/mpeg' }, { upload: conn.waUploadToServer });

        await conn.sendMessage(m.chat, { ...media, caption }, { quoted: m });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Ocurrió un error al procesar la canción', m);
    }
};

handler.help = ['spotify', 'splay'];
handler.tags = ['descargas'];
handler.command = ['spotify', 'splay'];
handler.register = true;

export default handler;