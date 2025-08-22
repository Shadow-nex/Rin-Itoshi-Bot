import axios from 'axios';

const SpotifyAlbumInfo = async (albumUrl) => {
    try {
        const response = await axios.get(`https://delirius-apiofc.vercel.app/download/spotifyalbum?url=${albumUrl}`);
        const data = response.data;

        if (!data.status || !data.data) {
            throw new Error("Álbum no encontrado o datos no disponibles");
        }

        const album = data.data;
        const tracks = data.tracks.map(track => ({
            title: track.title,
            artist: track.artist,
            duration: track.duration,
            image: track.image,
            url: track.url
        }));

        return {
            albumName: album.name,
            image: album.image,
            releaseDate: album.publish,
            totalTracks: album.total_tracks,
            tracks: tracks
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `🍬 Por favor, ingresa el enlace del álbum de Spotify.\n\nEjemplo:\n> *${usedPrefix + command}* https://open.spotify.com/album/22DL6IRGNYNenKej7aw8pO`, m, rcanal);
    }

    const albumUrl = args[0];

    await m.react('🕓');
    try {
        const albumData = await SpotifyAlbumInfo(albumUrl);
        
        let txt = '`S P O T I F Y  -  A L B U M`\n\n';
        txt += ` ✩ *Nombre del álbum*: ${albumData.albumName}\n`;
        txt += ` ✩ *Fecha de lanzamiento*: ${albumData.releaseDate}\n`;
        txt += ` ✩ *Total de pistas*: ${albumData.totalTracks}\n`;
        txt += ` ✩ *Portada del álbum*: ${albumData.image}\n\n`;
        
        albumData.tracks.forEach((track, index) => {
            txt += ` ✩ *Pista ${index + 1}:* ${track.title} - ${track.artist} (${track.duration})\n`;
            txt += `  ✩  *Enlace:* ${track.url}\n\n`;
        });

        await conn.sendMessage(m.chat, { image: { url: albumData.image }, caption: txt }, { quoted: m });
        await m.react('✅');
    } catch (error) {
        await conn.reply(m.chat, error.message, m);
        await m.react('✖️');
    }
};

handler.help = ['spotifyalbum *<url>*'];
handler.tags = ['tools'];
handler.command = ['spotifyalbum'];
handler.register = true;

export default handler;
