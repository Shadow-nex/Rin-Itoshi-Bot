import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, '🌱 Ingresa un enlace o nombre de video de YouTube', m);
    }

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } });

    const search = await yts(text);
    const video = search.videos[0];
    if (!video) {
      return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
    }

    const { title, timestamp, views, ago, url, author, thumbnail } = video;
    const canal = author?.name || 'Desconocido';
    const vistas = new Intl.NumberFormat('es-PE').format(views);

    let duracion;
    const partes = timestamp.split(':');
    if (partes.length === 3) {
      const [horas, min, seg] = partes;
      duracion = `${parseInt(horas)} hora${horas === '1' ? '' : 's'}, ${parseInt(min)} minuto${min === '1' ? '' : 's'}, ${parseInt(seg)} segundo${seg === '1' ? '' : 's'}`;
    } else {
      const [min, seg] = partes;
      duracion = `${parseInt(min)} minuto${min === '1' ? '' : 's'}, ${parseInt(seg)} segundo${seg === '1' ? '' : 's'}`;
    }

    const api = `https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    const json = await res.json();

    if (!json || !json.status || !json.download) {
      throw new Error('⚠️ No se pudo generar el enlace de descarga.');
    }

    const textoInfo = `✿ YASSSU YOUTUBE MP3 ✿

🍃 Título: ${title}
⏱️ Duración: ${duracion}
🍰 Canal: ${canal}
👀 Vistas: ${vistas}
🌱 Publicado: ${ago}
🔗 Link: ${url}

➤ El audio está en camino... 🌸💖`;

    await conn.sendMessage(m.chat, {
      text: textoInfo,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: title,
          body: bot,
          thumbnailUrl: thumbnail,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: json.download },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg',
      contextInfo: { isForwarded: true }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error('❌ Error en ytmp3:', e);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    return conn.reply(m.chat, `❌ *Error:* ${e.message}`, m);
  }
};

handler.command = ['ytmp3'];
handler.tags = ['descargas'];
handler.help = ['ytmp3 <link>'];

export default handler;