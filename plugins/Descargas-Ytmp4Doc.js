import fetch from "node-fetch";
import axios from 'axios';

let handler = async (m, { conn, text, args }) => {
  try {
    if (!text) return conn.reply(m.chat, `💔 *Por favor, ingresa la URL del vídeo de YouTube.*`, m, fake);

    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) {
      return conn.reply(m.chat, `⚠️ *Enlace inválido.* Por favor, ingresa una URL válida de YouTube.`, m);
    }

    await conn.sendMessage(m.chat, { react: { text: '📀', key: m.key } });

    const thumbRes = await fetch('https://files.catbox.moe/qzp733.jpg');
    const thumbBuffer = await thumbRes.buffer();

    const fkontak = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
      },
      message: {
        locationMessage: {
          name: `DESCARGA COMPLETA\n[▓▓▓▓▓▓░░░░░░] 100%`,
          jpegThumbnail: thumbBuffer
        }
      },
      participant: "0@s.whatsapp.net"
    };

    const videoData = await ytdl(args[0]);
    const { title, duration, url } = videoData;
    const size = await getSize(url);
    const sizeStr = size ? await formatSize(size) : 'Desconocido';
    const thumbnail = await getThumbnail(args[0]);
    const cleanTitle = title.replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '_');
    const fileName = `${cleanTitle}.mp4`;

    await conn.sendMessage(m.chat, {
    text: `🎶 ¡Descargando archivo!

📊 Progreso: [▓▓▓▓▓░░░░░] 50%

📂 Nombre: *${title}*
⏰ Tiempo: *${duration}*
💽 Peso: *${sizeStr}*
🔗 Link: ${args[0]}

⌛ Estado: Casi listo, procesando video...`,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: title,
        thumbnailUrl: thumbnail,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

    const caption = `*📥 Descarga completa:*\n> 🎧 *Título:* ${title}\n> ⏱️ *Duración:* ${duration}\n> 💾 *Tamaño:* ${sizeStr}`;

    try {
      await conn.sendMessage(m.chat, {
        document: { url },
        fileName,
        mimetype: 'video/mp4',
        caption,
        thumbnail,
        contextInfo: {
          externalAdReply: {
            title,
            body: '🌱 YOUTUBE DOC 💎',
            mediaUrl: args[0],
            sourceUrl: args[0],
            thumbnailUrl: args[0],
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak });
    } catch (err) {
      console.warn('❗ Error al enviar como documento. Se enviará como video.');

      await conn.sendMessage(m.chat, {
        video: { url },
        caption,
        mimetype: 'video/mp4',
        thumbnail
      }, { quoted: fkontak });
    }

    await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });

  } catch (e) {
    console.error(e);
    m.reply(`❌ *Ocurrió un error:*\n${e.message}`);
  }
};

handler.command = ['ytmp4doc', 'ytvdoc', 'ytdoc'];
handler.help = ['ytmp4doc'];
handler.tags = ['descargas'];
export default handler;


async function ytdl(url) {
  const headers = {
    "accept": "*/*",
    "accept-language": "es-PE,es;q=0.9",
    "sec-fetch-mode": "cors",
    "Referer": "https://id.ytmp3.mobi/"
  };

  const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
  const init = await initRes.json();
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  const convertURL = init.convertURL + `&v=${videoId}&f=mp4&_=${Math.random()}`;

  const convertRes = await fetch(convertURL, { headers });
  const convert = await convertRes.json();

  let info = {};
  for (let i = 0; i < 3; i++) {
    const progressRes = await fetch(convert.progressURL, { headers });
    info = await progressRes.json();
    if (info.progress === 3) break;
  }

  return {
    url: convert.downloadURL,
    title: info.title || 'video',
    duration: info.duration || 'Desconocido'
  };
}

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
  try {
    const res = await axios.head(url);
    const length = res.headers['content-length'];
    return length ? parseInt(length, 10) : null;
  } catch (err) {
    console.error('⚠️ Error al obtener tamaño del archivo:', err.message);
    return null;
  }
}

async function getThumbnail(ytUrl) {
  try {
    const videoId = ytUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
    if (!videoId) return null;
    const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const res = await fetch(thumbUrl);
    return await res.buffer();
  } catch {
    return null;
  }
}