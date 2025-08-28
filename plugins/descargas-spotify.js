import axios from 'axios';

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`🍂 Ingresa el nombre de una canción o una URL de Spotify.\n\nEjemplo:\n.Spotify hola remix`);

  try {
    let songUrl;

    if (text.startsWith('https://open.spotify.com/')) {
      songUrl = text;
    } else {
      const results = await spotifySearch(text);
      if (!results.length) return m.reply('⚠️ No se encontró la canción.');
      songUrl = results[0].url;
    }

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } });

    const res = await axios.get(`https://delirius-apiofc.vercel.app/download/spotifydl?url=${songUrl}`);
    const data = res.data?.data;
    if (!data?.url) return m.reply('❌ No se pudo obtener el enlace de descarga.');

    const info = `╭━━━〔 *Spotify DL* 〕━━⬣
┃ ✦ *Título:* ${data.title}
┃ ✦ *Artista:* ${data.author}
┃ ✦ *Duración:* ${msToTime(data.duration)}
┃ ✦ *Enlace:* ${songUrl}
╰━━━━━━━━━━━━━━⬣`;

    await conn.sendMessage(m.chat, { image: { url: data.image }, caption: info }, { quoted: m });

    // 🔥 Descargar en buffer en vez de usar url directo
let audioBuffer = await axios.get(data.url, {
  responseType: 'arraybuffer',
  headers: {
    'User-Agent': 'Mozilla/5.0', // algunos servers lo piden
  }
}).then(r => r.data);

await conn.sendMessage(m.chat, {
  audio: audioBuffer,
  mimetype: 'audio/mpeg',
  fileName: `${data.title}.mp3`,
  ptt: false,
  contextInfo: {
    externalAdReply: {
      title: data.title,
      body: `Artista: ${data.author}`,
      mediaType: 1,
      thumbnailUrl: data.image,
      mediaUrl: songUrl,
      sourceUrl: songUrl,
      renderLargerThumbnail: true
    }
  }
}, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.log(e);
    await m.reply('❌ Error al procesar la canción.');
  }
};

handler.help = ['spotify'];
handler.tags = ['descargas'];
handler.command = ['spotify', 'spotidown'];
export default handler;

async function spotifySearch(query) {
  const res = await axios.get(`https://api.stellarwa.xyz/search/spotify?query=${encodeURIComponent(query)}&apikey=proyectsV2`);
  if (!res.data?.status || !res.data?.data?.length) return [];

  return res.data.data.map(track => ({
    title: track.title,
    artist: track.artist,
    album: track.album,
    duration: track.duration,
    url: track.url,
    image: track.image || ''
  }));
}

function msToTime(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}