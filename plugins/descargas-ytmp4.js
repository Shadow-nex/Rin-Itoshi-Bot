import fetch from "node-fetch";
import axios from 'axios';
import yts from 'yt-search';

const MAX_FILE_SIZE = 280 * 1024 * 1024; // 280 MB
const VIDEO_THRESHOLD = 70 * 1024 * 1024; // 70 MB
const HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024; // 100 MB

let isProcessingHeavy = false;

const isValidYouTubeUrl = (url) =>
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);

function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  bytes = Number(bytes);
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

function formatViews(views) {
  return views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatDuration(duration) {
  if (!duration) return 'Desconocida';
  const parts = duration.split(':').map(Number).reverse();
  const [seconds = 0, minutes = 0, hours = 0] = parts;
  const formatted = [];
  if (hours) formatted.push(`${hours} hora${hours !== 1 ? 's' : ''}`);
  if (minutes) formatted.push(`${minutes} minuto${minutes !== 1 ? 's' : ''}`);
  if (seconds || (!hours && !minutes)) formatted.push(`${seconds} segundo${seconds !== 1 ? 's' : ''}`);
  return formatted.join(', ');
}

async function getSize(url) {
  try {
    const response = await axios.head(url, { timeout: 10000 });
    const size = parseInt(response.headers['content-length'], 10);
    if (!size) throw new Error('Tamaño no disponible');
    return size;
  } catch {
    throw new Error('No se pudo obtener el tamaño del archivo');
  }
}

async function ytdl(url) {
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    referer: 'https://id.ytmp3.mobi/',
  };

  try {
    const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`, { headers });
    if (!initRes.ok) throw new Error('Fallo al inicializar la solicitud');
    const init = await initRes.json();

    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
    if (!videoId) throw new Error('ID de video no encontrado');

    const convertRes = await fetch(`${init.convertURL}&v=${videoId}&f=mp4&_=${Date.now()}`, { headers });
    if (!convertRes.ok) throw new Error('Fallo al convertir el video');
    const convert = await convertRes.json();

    let info;
    for (let i = 0; i < 3; i++) {
      const progressRes = await fetch(convert.progressURL, { headers });
      if (!progressRes.ok) throw new Error('Fallo al obtener el progreso');
      info = await progressRes.json();
      if (info.progress === 3) break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (!info || !convert.downloadURL) throw new Error('No se pudo obtener la URL de descarga');
    return { url: convert.downloadURL, title: info.title || 'Video sin título' };
  } catch (e) {
    throw new Error(`Error en la descarga: ${e.message}`);
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🌴 Uso: ${usedPrefix}${command} https://youtube.com/watch?v=iQEVguV71sI`, m, fake);
  }

  if (!isValidYouTubeUrl(text)) {
    await m.react('✖️');
    return m.reply('🚫 Enlace de YouTube inválido');
  }

  await m.react('📀');

  try {
    const search = await yts({ query: text, pages: 1 });
    const video = search.videos[0];
    const { title, timestamp, views, ago, author, thumbnail, url: videoUrl } = video || {};

    const textoInfo = `╭━━⬣『 *🎲 YOUTUBE - MP4* 』⬣━━⬣
┃
┃ 🍃 *Titulo:* ${title}
┃ ⏱️ *Duración:* ${formatDuration(timestamp)}
┃ 🍰 *Canal:* ${author?.name}
┃ 👀 *Vistas:* ${formatViews(views)}
┃ 🌱 *Publicado:* ${ago}
┃ 🔗 *Link:* ${videoUrl}
┃
╰━━━━⬣
*➭ El video se está enviando... 🌸*`;

    const thumbnailBuffer = await fetch(thumbnail).then(res => res.buffer()).catch(() => null);

    await conn.sendMessage(m.chat, {
      text: textoInfo,
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363401008003732@newsletter',
          serverMessageId: '',
          newsletterName: '˗ˏˋ🎀 sᴜᴋuna_ʙᴏᴛ⋆.ᴍᴅ ᯓ✧💌 ˎˊ˗'
        },
        forwardingScore: 9999999,
        isForwarded: true,
        externalAdReply: {
          showAdAttribution: true,
          renderLargerThumbnail: true,
          title: title,
          body: '┈ ⋞ 〈 👾 ʀɪɴ ɪᴛᴏsʜɪ - ᴀɪ ⚽ 〉 ⋟ ┈',
          mediaType: 1,
          thumbnail: thumbnailBuffer,
          sourceUrl: "https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U"
        }
      }
    }, { quoted: m });

    const { url, title: titleVid } = await ytdl(text);
    const size = await getSize(url);

    if (!size) {
      await m.react('🔴');
      throw new Error('No se pudo determinar el tamaño del video');
    }

    if (size > MAX_FILE_SIZE) {
      await m.react('🔴');
      throw new Error('♡ No puedo procesar esta descarga porque traspasa el límite de descarga');
    }

    if (size > HEAVY_FILE_THRESHOLD) {
      isProcessingHeavy = true;
      await conn.reply(m.chat, '🤨 Espera, estoy lidiando con un archivo pesado', m);
    }

    await m.react('✅️');

    const caption = `*💌 ${titleVid}*\n> ⚖️ Peso: ${formatSize(size)}\n> 🌎 URL: ${text}`;
    const isSmallVideo = size < VIDEO_THRESHOLD;

    const buffer = await (await fetch(url)).buffer();
    await conn.sendFile(
      m.chat,
      buffer,
      `${titleVid}.mp4`,
      caption,
      fkontak,
      null,
      {
        mimetype: 'video/mp4',
        asDocument: !isSmallVideo,
        filename: `${titleVid}.mp4`
      }
    );

    await m.react('🟢');
    isProcessingHeavy = false;
  } catch (e) {
    await m.react('🔴');
    await m.reply(`❌ Error: ${e.message || 'No se pudo procesar la solicitud'}`);
    isProcessingHeavy = false;
  }
};

handler.help = ['ytmp4 *<url>*'];
handler.command = ['ytmp4'];
handler.tags = ['descargas'];

export default handler;