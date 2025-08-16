import fetch from 'node-fetch';

const SPOTIFY_SEARCH_API = 'https://api.vreden.my.id/api/spotifysearch?query=';
const SPOTIFY_DOWNLOAD_API = 'https://api.vreden.my.id/api/spotify?url=';

async function fetchSpotifySearch(query) {
  try {
    const res = await fetch(SPOTIFY_SEARCH_API + encodeURIComponent(query));
    if (!res.ok) return null;
    const json = await res.json();
    return json.result?.[0] || null;
  } catch {
    return null;
  }
}

async function fetchSpotifyDownload(spotifyUrl) {
  try {
    const res = await fetch(SPOTIFY_DOWNLOAD_API + encodeURIComponent(spotifyUrl));
    if (!res.ok) return null;
    const json = await res.json();
    return json.result?.music ? json.result : null;
  } catch {
    return null;
  }
}

let handler = async (m, { text, conn, command }) => {
  if (!text) return m.reply('*🌱 Ingresa el nombre de la canción. Ejemplo: .music DJ Opus*');

  try {
    const track = await fetchSpotifySearch(text);
    if (!track) return m.reply('⚠️ No se encontraron resultados en Spotify.');

    const { title, artist, album, duration, popularity, releaseDate, spotifyLink, coverArt } = track;

  await conn.sendMessage(m.chat, {
    text: `📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗘𝗡 𝗖𝗨𝗥𝗦𝗢...
   [▰▰▰▰▰▱▱▱▱▱] 50%

> 🎵 Título: ${title}
> 🧑‍🎤 Artista: ${artist}
> 💿 Álbum: ${album}
> ⏱️ Duración: ${duration}
> 📈 Popularidad: ${popularity}
> 📅 Lanzamiento: ${releaseDate}
> 🔗 Spotify: ${spotifyLink}`,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: title,
        body: `Duración: ${duration}`,
        thumbnailUrl: coverArt,
        sourceUrl: spotifyLink,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

    const download = await fetchSpotifyDownload(spotifyLink);
    if (!download || !download.music) return m.reply('❌ No se pudo obtener el enlace de descarga.');

    const doc = {
      audio: { url: download.music },
      mimetype: 'audio/mpeg',
      fileName: `${download.title || 'track'}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: spotifyLink,
          title: title,
          body: `🧪 Duración: ${duration} | 🌷 Lanzamiento: ${releaseDate}`,
          sourceUrl: spotifyLink,
          thumbnailUrl: coverArt || "https://h.uguu.se/gwCZoshl.jpg",
          renderLargerThumbnail: true
        }
      }
    }

    await conn.sendMessage(m.chat, doc, { quoted: m })
    await m.react('✅')

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al procesar tu solicitud.');
  }
};

handler.command = ['music'];
handler.help = ['music <canción>'];
handler.tags = ['downloader'];
export default handler;