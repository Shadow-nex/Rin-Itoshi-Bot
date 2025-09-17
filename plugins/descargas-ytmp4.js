/*import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(
    `☁️ Ingresa el nombre de la canción o video que quieres buscar.\n\nEjemplo:\n*${usedPrefix + command} DJ Malam Pagi Slowed*`
  )
  await conn.sendMessage(m.chat, {
    text: `૮₍｡˃ ᵕ ˂ ｡₎ა 🫛 *¡Descargando tu video!*`
  }, { quoted: m })

  try {
    let api = `https://api.vreden.my.id/api/ytplaymp4?query=${encodeURIComponent(text)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.result?.status) return m.reply('❌ No se pudo obtener el video.')

    let meta = json.result.metadata
    let down = json.result.download

    let caption = `⊜─⌈ 📻 ◜YouTube MP4◞ 📻 ⌋─⊜
≡ 🌿 *Título:* ${meta.title || '-'}
≡ 🌷 *Autor:* ${meta.author?.name || '-'}
≡ 🌱 *Duración:* ${meta.duration?.timestamp || meta.timestamp || '-'}
≡ 🌤️ *Publicado:* ${meta.ago || '-'}
≡ ⭐ *Vistas:* ${meta.views?.toLocaleString() || '-'}
≡ 🎋 *Calidad:* ${down.quality || '-'}
≡ 🍏 *URL:* ${meta.url || '-'}`

    let head = await fetch(down.url, { method: "HEAD" })
    let fileSize = head.headers.get("content-length") || 0
    let fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2)

    if (fileSizeMB >= 50) {
      await conn.sendMessage(m.chat, {
        document: { url: down.url },
        fileName: down.filename || `${meta.title || 'video'}.mp4`,
        mimetype: 'video/mp4',
        caption: `${caption}\n\n≡ 📦 *Peso:* ${fileSizeMB} MB\n📂 Enviado como documento por superar 50 MB`
      }, { quoted: m })
    } else {
      await conn.sendMessage(m.chat, {
        video: { url: down.url },
        fileName: down.filename || 'video.mp4',
        mimetype: 'video/mp4',
        caption: `${caption}\n\n≡ 📦 *Peso:* ${fileSizeMB} MB`
      }, { quoted: m })
    }

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al procesar la solicitud, intenta nuevamente.')
  }
}

handler.help = ['ytmp4 *<texto>*']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'playmp4']

export default handler*/

import fetch from "node-fetch";
import axios from "axios";
import yts from "yt-search";

let handler = async (m, { conn, text, args }) => {
  try {
    if (!text) return conn.reply(m.chat, `🌷 *Por favor, ingresa la URL del vídeo de YouTube.*`, m);

    await conn.sendMessage(m.chat, {
      text: `૮₍｡˃ ᵕ ˂ ｡₎ა 🫛 *¡Descargando tu video!*`
    }, { quoted: m });

    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)/.test(args[0])) {
      return conn.reply(m.chat, `*Enlace inválido.* Por favor, ingresa una URL válida de YouTube.`, m);
    }

    await conn.sendMessage(m.chat, { react: { text: '⌛', key: m.key } });

    const videoData = await ytdl(args[0]);
    const search = await yts({ videoId: extractVideoId(args[0]) });
    const meta = search;

    const { title, duration, url } = videoData;
    const size = await getSize(url);
    const sizeStr = size ? await formatSize(size) : 'Desconocido';
    const thumbnail = await getThumbnail(args[0]);
    const cleanTitle = title.replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '_');
    const fileName = `${cleanTitle}.mp4`;

    const caption = `⊜─⌈ 📻 ◜YouTube MP4◞ 📻 ⌋─⊜
≡ 🌿 *Título:* ${meta.title || '-'}
≡ 🌷 *Autor:* ${meta.author?.name || '-'}
≡ 🌱 *Duración:* ${meta.duration?.timestamp || duration || '-'}
≡ 🌤️ *Publicado:* ${meta.ago || '-'}
≡ ⭐ *Vistas:* ${meta.views?.toLocaleString() || '-'}
≡ 🎋 *Calidad:* 480p
≡ 📦 *Peso:* ${sizeStr}
≡ 🍏 *URL:* ${meta.url || args[0]}`;

    let head = await fetch(url, { method: "HEAD" });
    let fileSize = head.headers.get("content-length") || 0;
    let fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);

    if (fileSizeMB >= 100) {
      await conn.sendMessage(m.chat, {
        document: { url },
        mimetype: 'video/mp4',
        fileName,
        caption: `${caption}\n\n📂 *Enviado como documento por superar 50 MB*`,
        thumbnail,
        contextInfo: {
          externalAdReply: {
            title: meta.title,
            body: '💦 ᥡ᥆ᥙ𝗍ᥙᑲᥱ ძ᥆ᥴ | rіᥒ і𝗍᥆sһі 🌾',
            mediaUrl: args[0],
            sourceUrl: args[0],
            thumbnailUrl: meta.image,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, {
        video: { url },
        mimetype: 'video/mp4',
        fileName,
        caption: `${caption}\n\n≡ 📦 *Peso:* ${fileSizeMB} MB`,
        thumbnail,
        contextInfo: {
          externalAdReply: {
            title: meta.title,
            body: '✅ Descarga completa',
            mediaUrl: args[0],
            sourceUrl: args[0],
            thumbnailUrl: meta.image,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    }

    await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });

  } catch (e) {
    console.error(e);
    m.reply(`❌ *Ocurrió un error:*\n${e.message}`);
  }
};

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'playmp4'];
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

function extractVideoId(url) {
  return url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
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
    console.error('😢 Error al obtener tamaño del archivo:', err.message);
    return null;
  }
}

async function getThumbnail(ytUrl) {
  try {
    const videoId = extractVideoId(ytUrl);
    if (!videoId) return null;
    const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const res = await fetch(thumbUrl);
    return await res.buffer();
  } catch {
    return null;
  }
}