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

import fetch from 'node-fetch';

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    return m.reply(`🎵 Ingresa el nombre o URL de una canción de Spotify.\n\nEjemplo:\n.${command} https://open.spotify.com/track/6UR5tB1wVm7qvH4xfsHr8m\n.${command} Carla Morrison Disfruto`);
  }

  try {
    // Si es un link directo de Spotify
    let spotifyUrl = text.startsWith("https://open.spotify.com/track/") 
      ? text 
      : null;

    // Si no es URL, buscar en Spotify usando API de búsqueda gratis
    if (!spotifyUrl) {
      let search = await fetch(`https://api.dorratz.com/spotifysearch?text=${encodeURIComponent(text)}`);
      let sdata = await search.json();
      if (!sdata || !sdata.data || sdata.data.length === 0) {
        return m.reply("❌ No encontré resultados en Spotify.");
      }
      spotifyUrl = sdata.data[0].url; // primer resultado
    }

    // Descargar canción desde la API
    let res = await fetch(`https://api.dorratz.com/spotifydl?url=${spotifyUrl}`);
    let json = await res.json();

    if (!json.download_url) {
      return m.reply("⚠️ No se pudo obtener el enlace de descarga.");
    }

    let caption = `╭━━━〔 🎶 SPOTIFY DL 〕━━⬣
┃✨ *Título:* ${json.name}
┃🎤 *Artista:* ${json.artists}
┃⏱️ *Duración:* ${(json.duration_ms / 60000).toFixed(2)} min
┃📀 *By:* ${json.creator}
╰━━━━━━━━━━━━━━━━⬣`;

    // Enviar portada + info
    await conn.sendMessage(m.chat, {
      image: { url: json.image },
      caption
    }, { quoted: m });

    // Enviar canción
    await conn.sendMessage(m.chat, {
      audio: { url: json.download_url },
      mimetype: "audio/mpeg",
      fileName: `${json.name}.mp3`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Error al procesar la canción.");
  }
};

handler.help = ["spotify <url|texto>"];
handler.tags = ["descargas"];
handler.command = /^spotify(dl)?$/i;

export default handler;