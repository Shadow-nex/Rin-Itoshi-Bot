import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, '🌱 Ingresa un enlace o nombre de video de YouTube', m);
    }

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } });

    let video;
    if (text.includes("youtube.com") || text.includes("youtu.be")) {
      const search = await yts({ videoId: text.split("v=")[1] || text.split("/").pop() });
      video = search;
    } else {
      const search = await yts(text);
      video = search.videos[0];
    }

    if (!video) {
      return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
    }

    const { title, timestamp, views, ago, url, author, thumbnail } = video;
    const canal = author?.name || 'Desconocido';
    const vistas = new Intl.NumberFormat('es-PE').format(views);

    let duracion;
    const partes = (timestamp || "0:00").split(':');
    if (partes.length === 3) {
      const [h, m2, s] = partes;
      duracion = `${parseInt(h)}h, ${parseInt(m2)}m, ${parseInt(s)}s`;
    } else {
      const [m2, s] = partes;
      duracion = `${parseInt(m2)}m, ${parseInt(s)}s`;
    }

    const api = `https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    const json = await res.json();

    const textoInfo = `✿ YASSSU YOUTUBE MP3 🌲

🍂 *Título:* ${title}
⏱️ *Duración:* ${duracion}
🍰 *Canal:* ${canal}
👀 *Vistas:* ${vistas}
🌱 *Publicado:* ${ago}
🔗 *Link:* ${url}

*➤ El audio está en camino... 🌸💖*`;

    await conn.sendMessage(m.chat, {
      text: textoInfo,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: title,
          body: "📥 Descargando desde YouTube",
          thumbnailUrl: thumbnail,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    if (json?.status && json?.download) {
      await conn.sendMessage(m.chat, {
        audio: { url: json.download },
        fileName: `${title}.mp3`,
        mimetype: 'audio/mpeg',
        contextInfo: { isForwarded: true }
      }, { quoted: m });
    } else {
      await conn.reply(m.chat, `⚠️ No se pudo enviar el audio, pero aquí tienes el enlace:\n\n${json?.download || url}`, m);
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error('❌ Error en ytmp3:', e);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    await conn.reply(m.chat, `❌ *Error:* ${e.message}\n\nPero aquí tienes el link directo: https://youtube.com/watch?v=${text.split("v=")[1] || text}`, m);
  }
};

handler.command = ['ytmp3'];
handler.tags = ['descargas'];
handler.help = ['ytmp3 <link o texto>'];

export default handler;