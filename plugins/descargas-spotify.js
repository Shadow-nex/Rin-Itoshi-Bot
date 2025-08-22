/*import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
  const text = args.join(" ");
  if (!text) {
    return m.reply(
      `⟬⟬ 🌸 *SPOTIFY - DESCARGAS* 🌸 ⟭⟭
╭─╼━━━━━━━━━━━╾─╮
│ 🪷 Uso correcto:
│ ⤷ ${usedPrefix + command} dj opus
╰─╼━━━━━━━━━━━╾─╯
     ⌬ 𝑩𝒐𝒕: *Rin Itoshi*`
    );
  }

  await m.react('🔍');

  try {
    const searchRes = await fetch(`https://api.vreden.my.id/api/spotifysearch?query=${encodeURIComponent(text)}`);
    const searchJson = await searchRes.json();

    if (!searchJson.result || searchJson.result.length === 0) {
      return m.reply(
        `⟬⟬ 🌸 *SPOTIFY - DESCARGAS* 🌸 ⟭⟭
╭─╼━━━━━━━━━━━╾─╮
│ ❌ No encontré resultados para:
│ ⤷ *${text}*
╰─╼━━━━━━━━━━━╾─╯
     ⌬ 𝑩𝒐𝒕: *Rin Itoshi*`
      );
    }

    const track = searchJson.result[0];
    const { title, artist, album, duration, releaseDate, spotifyLink, coverArt } = track;

    const detailRes = await fetch(`https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(spotifyLink)}`);
    const detailJson = await detailRes.json();

    if (!detailJson.result?.music) {
      return m.reply(
        `⟬⟬ 🌸 *SPOTIFY - DESCARGAS* 🌸 ⟭⟭
╭─╼━━━━━━━━━━━╾─╮
│ ⚠️ No pude obtener el audio de:
│ ⤷ *${title}*
╰─╼━━━━━━━━━━━╾─╯
     ⌬ 𝑩𝒐𝒕: *Rin Itoshi*`
      );
    }

    const audioUrl = detailJson.result.music;

    await conn.sendMessage(m.chat, {
      image: { url: coverArt },
      caption: `⟬⟬ 🎼 *SPOTIFY - TRACK* 🎼 ⟭⟭
╭─╼━━━━━━━━━━━╾─╮
│ 🎵 *Título:* ${title}
│ 👤 *Artista:* ${artist}
│ 💿 *Álbum:* ${album}
│ ⏱️ *Duración:* ${duration}
│ 📅 *Lanzamiento:* ${releaseDate}
│ 🌐 *Spotify:* ${spotifyLink}
╰─╼━━━━━━━━━━━╾─╯
     ⌬ 𝑩𝒐𝒕: *Rin Itoshi*`
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mp4',
      ptt: false,
      fileName: `${title}.mp3`
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.error(e);
    return m.reply(
      `⟬⟬ 🌸 *SPOTIFY - DESCARGAS* 🌸 ⟭⟭
╭─╼━━━━━━━━━━━╾─╮
│ ⚠️ Ocurrió un error inesperado.
│ 🔄 Intenta nuevamente más tarde.
╰─╼━━━━━━━━━━━╾─╯
     ⌬ 𝑩𝒐𝒕: *Rin Itoshi*`
    );
  }
};

handler.help = ['spotify'];
handler.tags = ['descargas'];
handler.command = ['spotify'];
handler.register = true;

export default handler;*/

import axios from 'axios';

let handler = async (m, { conn, text }) => {

  if (!text) return m.reply(`🍂 Ingresa el nombre de una canción o una URL de Spotify.`);

  try {
    let song;
    const isSpotifyUrl = text.startsWith('https://open.spotify.com/');
    if (isSpotifyUrl) {
      song = { url: text };
    } else {
      const results = await spotifyxv(text);
      if (!results.length) return m.reply('No se encontró la canción.');
      song = results[0];
    }

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } });
     
    const res = await axios.get(`https://api.stellarwa.xyz/dow/spotify?url=${song.url}&apikey=proyectsV2`);
    const data = res.data?.data;
    if (!data?.download) return m.reply('No se pudo obtener el enlace de descarga.');

    const info = `[ ✿ ] Descargando › *${data.title}*\n\n` +
                 `> [✩] Artista › *${data.artist}*\n` +
                 (song.album ? `> ✰ Álbum › *${song.album}*\n` : '') +
                 `> 🌱 Duración › *${data.duration}*\n` +
                 `> 🍂 Enlace › *${song.url}*`;

    await conn.sendMessage(m.chat, { image: { url: data.image }, caption: info }, { quoted: m });
    
    
    await conn.sendMessage(m.chat, {
      audio: { url: data.download },
      ptt: true,
      fileName: `${data.title}.mp3`,
      mimetype: 'audio/mpeg'
    }, { quoted: m });
    
    /*await conn.sendMessage(m.chat, {
      audio: { url: data.download },
      mimetype: 'audio/mpeg',
      ptt: true,
      fileName: `${data.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: data.title,
          body: `Duración: ${data.duration}`,
          mediaType: 1,
          thumbnailUrl: data.image,
          mediaUrl: song.url,
          sourceUrl: song.url,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });*/
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    await m.reply('❌ Error al procesar la canción.');
  }
};

handler.tags = ['descargas'];
handler.help = ['spotify'];
handler.command = ['spotify'];
export default handler;

async function spotifyxv(query) {
  const res = await axios.get(`https://api.stellarwa.xyz/search/spotify?query=${encodeURIComponent(query)}&apikey=proyectsV2`);
  if (!res.data?.status || !res.data?.data?.length) return [];

  const firstTrack = res.data.data[0];

  return [{
    name: firstTrack.title,
    artista: [firstTrack.artist],
    album: firstTrack.album,
    duracion: firstTrack.duration,
    url: firstTrack.url,
    imagen: firstTrack.image || ''
  }];
}