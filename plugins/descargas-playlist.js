import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'playlist' || command === 'ytbuscar') {
    if (!text) return conn.reply(m.chat, "🌴 *Por favor, escribe el nombre de un video o canal de YouTube.*", m);

    try {
      let result = await yts(text);
      let ytres = result.videos;

      if (!ytres || ytres.length === 0)
        return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);

      let topResults = ytres.slice(0, 5);
      let first = topResults[0];

      await conn.sendMessage(m.chat, {
        image: { url: first.thumbnail },
        caption:
          `📌 *Resultados para:* "${text}"\n\n` +
          `🎬 *${first.title}*\n` +
          `⏱️ Duración: ${first.timestamp}\n` +
          `📅 Publicado: ${first.ago}\n` +
          `📺 Canal: ${first.author.name}\n` +
          `👁️‍🗨️ Vistas: ${first.views.toLocaleString()}\n` +
          `🔗 URL: ${first.url}`,
        mentions: [m.sender]
      }, { quoted: m });

      let listSections = topResults.map(v => ({
        title: `🔎 ${v.title.slice(0, 50)}`,
        rows: [
          {
            title: "🎵 Descargar Audio",
            description: `Duración: ${v.timestamp} | Visitas: ${v.views.toLocaleString()}`,
            id: `${usedPrefix}ytmp33 ${v.url}`
          },
          {
            title: "🎥 Descargar Video",
            description: `Publicado: ${v.ago} | Canal: ${v.author.name}`,
            id: `${usedPrefix}ytmp44 ${v.url}`
          },
          {
            title: "📄 Audio (Documento)",
            description: `Audio en formato documento.`,
            id: `${usedPrefix}ytmp3doc ${v.url}`
          },
          {
            title: "📄 Video (Documento)",
            description: `Video en formato documento.`,
            id: `${usedPrefix}ytmp4doc ${v.url}`
          },
          {
            title: "🔗 Ir al video",
            description: "Abrir en YouTube",
            id: `${v.url}`
          }
        ]
      }));

      await conn.sendList(m.chat,
        "📜 *Resultados de búsqueda en YouTube*",
        `🔍 *Término buscado:* ${text}\n🎬 *Total encontrados:* ${ytres.length}\n📄 *Mostrando:* ${topResults.length}`,
        "✅ *Seleccione una opción:*",
        listSections,
        m.sender
      );

    } catch (e) {
      console.error(e);
      await conn.sendButton(m.chat,
        "⚠️ Ocurrió un error al realizar la búsqueda.\nPuedes reportarlo para que lo revisemos.",
        `🛠️ Comando: ${usedPrefix + command}`,
        null,
        [["📩 Reportar error", `#report ${usedPrefix + command}`]],
        m
      );
    }

  } else if (command === 'ytmp33' || command === 'ytmp44') {
    if (!text || !text.includes('youtu')) {
      return m.reply('🎥 *Por favor, proporciona un enlace válido de YouTube.*');
    }

    await m.react('⏳');

    try {
      if (command === 'ytmp33') {
        const res = await fetch(`https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (!json.status) throw '❌ No se pudo obtener el audio.';

        await conn.sendFile(m.chat, json.download, 'audio.mp3', `🎧 *Título:* ${json.title}\n📥 *Audio descargado con éxito.*`, m, fake);

      } else if (command === 'ytmp44') {
        const res = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=api&url=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (!json.download) throw '❌ No se pudo obtener el video.';

        await conn.sendFile(m.chat, json.download, 'video.mp4', `🎬 *Título:* ${json.title}\n📽️ *Calidad:* ${json.quality}p\n📥 *Video descargado con éxito.*`, m, fake);
      }

    } catch (e) {
      console.error(e);
      m.reply('⚠️ Error al procesar la descarga. Intenta más tarde.');
    }
  }
};

handler.help = ['playlist <texto>', 'ytmp33 <url>', 'ytmp44 <url>'];
handler.tags = ['descargas'];
handler.command = ['playlist', 'ytbuscar', 'ytmp33', 'ytmp44'];

export default handler;