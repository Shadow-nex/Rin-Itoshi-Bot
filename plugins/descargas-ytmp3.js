import fetch from 'node-fetch';
import axios from 'axios';

async function getSize(url) {
  try {
    const response = await axios.head(url);
    const length = response.headers['content-length'];
    return length ? parseInt(length, 10) : null;
  } catch (error) {
    console.error("Error al obtener el tamaño:", error.message);
    return null;
  }
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

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, '🌸✨ Ingresa un link de YouTube', m);

    const url = args[0];
    let dl = null;
    let meta = null;

    try {
        const res1 = await fetch(`https://api.nekolabs.my.id/downloader/youtube/v1?url=${encodeURIComponent(url)}&format=mp3`);
        const data1 = await res1.json();
        if (data1.status && data1.result) {
            dl = { url: data1.result.download };
            meta = {
                title: data1.result.title,
                thumbnail: data1.result.cover,
                duration: data1.result.duration
            };
        }
    } catch {}

    if (!dl) {
        try {
            const res2 = await fetch(`https://api.nekolabs.my.id/downloader/youtube/v3?url=${encodeURIComponent(url)}&type=audio&format=320`);
            const data2 = await res2.json();
            if (data2.status && data2.result) {
                dl = { url: data2.result.downloadUrl };
                meta = {
                    title: data2.result.title,
                    thumbnail: data2.result.cover,
                    duration: null
                };
            }
        } catch {}
    }

    if (!dl) {
        try {
            const res3 = await fetch(`https://api.nekolabs.my.id/downloader/youtube/play/v1?q=${encodeURIComponent(url)}`);
            const data3 = await res3.json();
            if (data3.status && data3.result) {
                dl = { url: data3.result.downloadUrl };
                meta = {
                    title: data3.result.metadata.title,
                    thumbnail: data3.result.metadata.cover,
                    duration: data3.result.metadata.duration
                };
            }
        } catch {}
    }

    if (!dl) {
        try {
            const apiUrl = `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(url)}`;
            const res = await fetch(apiUrl);
            const json = await res.json();
            if (json.status && json.result && json.result.url) {
                dl = { url: json.result.url };
                meta = {
                    title: json.result.title,
                    thumbnail: json.result.thumbnail,
                    duration: json.result.duration
                };
            }
        } catch {}
    }

    if (!dl) return conn.reply(m.chat, '❌ No se pudo descargar el audio, todas las APIs fallaron.', m);

    const size = await getSize(dl.url);
    const sizeStr = size ? await formatSize(size) : 'Desconocido';

    const textoInfo = `\`\`\`✿  𝗬𝗔𝗦𝗦𝗨 - 𝗬𝗧 𝗠𝗣𝟯 ⚽\n\n🍂 Título : ${meta.title}\n⏱️ Duración : ${meta.duration || 'Desconocida'}\n🌱 Canal : Desconocido\n🚀 Vistas : 0\n🌷 Tamaño : ${sizeStr}\n🧪 Publicado : Desconocido\n💨 Link : ${url}\`\`\`\n*≡ Enviando, espera un momento . . .*`;

    // Bloque de envío original
    await conn.sendMessage(
      m.chat,
      {
        image: { url: meta.thumbnail },
        caption: textoInfo,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363401008003732@newsletter',
            serverMessageId: 100,
            newsletterName: '🗿 Toca aquí 🌱'
          },
          externalAdReply: {
            title: meta.title,
            body: "🍂 Descargando desde YouTube 🧪",
            thumbnailUrl: 'https://files.catbox.moe/h4lrn3.jpg',
            sourceUrl: url,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: m }
    );

    const audioBuffer = await (await fetch(dl.url)).buffer();

    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      fileName: `${meta.title}.mp3`,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: meta.title,
          body: `🍁 Duracion: ${meta.duration || 'Desconocida'}`,
          mediaUrl: url,
          sourceUrl: url,
          thumbnailUrl: meta.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });
};

handler.command = ['ytmp3', 'song'];
handler.tags = ['descargas'];
handler.help = ['ytmp3 <texto o link>', 'song <texto>'];
handler.register = true;

export default handler;