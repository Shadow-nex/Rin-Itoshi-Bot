import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'playlist') {
    if (!text) return conn.reply(m.chat, "🎶 *Escribe el nombre de una playlist de YouTube para buscarla.*", m);

    try {
      let result = await yts({ query: text, type: 'playlist' });
      let playlists = result.playlists;

      if (!playlists || playlists.length === 0)
        return conn.reply(m.chat, "❌ No encontré ninguna playlist con ese nombre.", m);

      let pl = playlists[0]; // primera playlist encontrada
      let thumb = pl.thumbnail || pl.author.bestAvatar?.url;

      let videos = pl.videos.slice(0, 15);

      let caption =
        `🎼 *Resultados para:* "${text}"\n\n` +
        `📂 *${pl.title}*\n` +
        `👤 Autor: ${pl.author.name}\n` +
        `🎵 Videos en total: ${pl.videoCount}\n` +
        `🔗 URL: ${pl.url}\n\n` +
        `✨ *Mostrando ${videos.length} primeros videos de la playlist:*`;
  
      let listSections = videos.map((v, i) => ({
        title: `🎬 ${i + 1}. ${v.title.slice(0, 60)}`,
        rows: [
          {
            title: "🎵 Descargar Audio",
            description: `Duración: ${v.duration} | Autor: ${v.author?.name || pl.author.name}`,
            id: `${usedPrefix}ytmp33 ${v.url}`
          },
          {
            title: "🎥 Descargar Video",
            description: `Duración: ${v.duration} | Publicado: ${v.ago}`,
            id: `${usedPrefix}ytmp44 ${v.url}`
          },
          {
            title: "🔗 Ver en YouTube",
            description: "Abrir este video en YouTube",
            id: v.url
          }
        ]
      }));

      await conn.sendMessage(m.chat, {
        text: caption,
        footer: "📌 Selecciona un video de la lista para descargar",
        title: "📂 *Videos de la Playlist*",
        buttonText: "✨ Ver lista",
        sections: listSections,
        contextInfo: {
          externalAdReply: {
            title: pl.title,
            body: pl.author.name,
            thumbnailUrl: thumb,
            sourceUrl: pl.url,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      await conn.sendButton(
        m.chat,
        "⚠️ Ocurrió un error buscando playlists.",
        `🛠️ Comando: ${usedPrefix + command}`,
        null,
        [["📩 Reportar error", `#report ${usedPrefix + command}`]],
        m
      );
    }
  }

  else if (command === 'ytmp33' || command === 'ytmp44') {
    if (!text || !text.includes('youtu')) {
      return m.reply('🎥 *Por favor, proporciona un enlace válido de YouTube.*');
    }

    await m.react('⏳');

    try {
      if (command === 'ytmp33') {
        const res = await fetch(`https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (!json.status) throw '❌ No se pudo obtener el audio.';

        await conn.sendFile(
          m.chat,
          json.download,
          'audio.mp3',
          `🎧 *Título:* ${json.title}\n📥 *Audio descargado con éxito.*`,
          m
        );

      } else if (command === 'ytmp44') {
        const res = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=api&url=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (!json.download) throw '❌ No se pudo obtener el video.';

        await conn.sendFile(
          m.chat,
          json.download,
          'video.mp4',
          `🎬 *Título:* ${json.title}\n📽️ *Calidad:* ${json.quality}p\n📥 *Video descargado con éxito.*`,
          m
        );
      }

    } catch (e) {
      console.error(e);
      m.reply('⚠️ Error al procesar la descarga. Intenta más tarde.');
    }
  }
};

handler.help = ['playlist <texto>', 'ytmp33 <url>', 'ytmp44 <url>'];
handler.tags = ['descargas', 'busqueda'];
handler.command = ['playlist', 'ytmp33', 'ytmp44'];

export default handler;