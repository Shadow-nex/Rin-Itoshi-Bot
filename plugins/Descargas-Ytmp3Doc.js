import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'aac', 'flac', 'opus', 'ogg', 'wav'];

const ddownr = {
  download: async (url, format) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return downloadUrl;
      } else {
        throw new Error('Fallo al obtener los detalles del video.');
      }
    } catch (error) {
      throw error;
    }
  },

  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      throw error;
    }
  }
};

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `*🧪 Ingresa el nombre del video a descargar.*`, m, rcanal);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('❌ No se encontraron resultados para tu búsqueda.');
    }
    
    const videoInfo = search.all[0];
    const { title, url, image, timestamp: duration } = videoInfo;
    const format = 'mp3';
    const downloadUrl = await ddownr.download(url, format);
    const size = await getSize(downloadUrl);
    const sizeStr = size ? await formatSize(size) : 'Desconocido';
 
  await conn.sendMessage(m.chat, { react: { text: '📀', key: m.key }});
  await conn.sendMessage(m.chat, {
    text: `🍂 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗘𝗡 𝗠𝗔𝗥𝗖𝗔 𝗣𝗥𝗢𝗚𝗥𝗘𝗦𝗢

°^☘️ [▓▓▓▓▓░░░░░░░] 50% Completado

= 🌱 *Título :* ${title}
= ⏰ *Duración :* ${duration}
= 📦 *Tamaño :* ${sizeStr}
= ⚡ *Link :* ${url}

= ⌛ *Estado:* Preparando el audio, espera un momento...`,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: title,
        thumbnailUrl: image,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
    
    if (downloadUrl) {
      const fileName = `${title.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/ +/g, '_')}.${format}`;
      const caption = `⚡ Descarga Completa: *${title}*`;

      await conn.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName,
        mimetype: 'audio/mpeg',
        caption,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: `🧪 YOUTUBE DOC 💎`,
            mediaUrl: url,
            sourceUrl: url,
            thumbnailUrl: image,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      }, { quoted: m });

     await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
    } else {
      return m.reply(`⚠️ No se pudo descargar el audio.`);
    }
  } catch (error) {
    console.error(error);
    return m.reply(`❌ Ocurrió un error: ${error.message}`);
  }
};

handler.command = ['ytmp3doc', 'ytadoc'];
handler.help = ['ytmp3doc'];
handler.tags = ['descargas'];

export default handler;

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
/*
  
  
import fetch from 'node-fetch'

function formatBytes(bytes) {
  if (!bytes || isNaN(bytes)) return "Desconocido"
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

function translateViews(str) {
  if (!str) return str
  return str
    .replace(/visualizações/gi, "visitas")
    .replace(/\bmi\b/gi, "M")
    .replace(/\bbi\b/gi, "B")
}

function translatePublished(str) {
  if (!str) return str
  return str
    .replace(/há/gi, "hace")
    .replace(/anos?/gi, "años")
    .replace(/meses?/gi, "meses")
    .replace(/dias?/gi, "días")
    .replace(/semanas?/gi, "semanas")
    .replace(/horas?/gi, "horas")
    .replace(/minutos?/gi, "minutos")
    .replace(/segundos?/gi, "segundos")
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🌸 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` stay`)
  }

  try {
    let api = `https://api.nexfuture.com.br/api/downloads/youtube/playaudio/v2?query=${encodeURIComponent(text)}`
    let res = await fetch(api)
    if (!res.ok) throw new Error(`❌ Error al obtener datos de la API (${res.status})`)

    let json = await res.json()
    if (!json.status || !json.resultado?.result) throw new Error("⚠️ No se encontraron resultados.")

    let info = json.resultado.result
    let video = info.video
    let channel = info.channel
    let downloads = info.downloads?.audio

    let title = video.title
    let url = video.url
    let duration = video.duration
    let views = translateViews(video.shortViewCount || video.views)
    let published = translatePublished(video.published)
    let thumbnail = video.thumbnails?.[1]?.url || video.thumbnails?.[0]?.url
    let downloadUrl = downloads?.config || downloads?.any4k
    let fileName = `${title}.mp3`

    let sizeStr = "Desconocido"
    try {
      let head = await fetch(downloadUrl, { method: "HEAD" })
      let size = head.headers.get("content-length")
      if (size) sizeStr = formatBytes(parseInt(size))
    } catch (e) {
      console.log("❌ No se pudo obtener tamaño:", e.message)
    }

    let caption = `🍂 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗘𝗡 𝗠𝗔𝗥𝗖𝗔 𝗣𝗥𝗢𝗚𝗥𝗘𝗦𝗢

°^☘️ [▓▓▓▓▓░░░░░░░] 50% Completado

= 🌱 *Título :* ${title}
= 🍂 *Canal:* ${channel.name}
= ⏰ *Duración :* ${duration}
= ⚡ *Vistas:* ${views}
= 🧪 *Publicado:* ${published}
= 📦 *Tamaño :* ${sizeStr}
= ⚡ *Link :* ${url}

= ⌛ *Estado:* Preparando el audio, espera un momento...
`

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: caption,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: channel.name,
          mediaType: 1,
          thumbnailUrl: thumbnail,
          sourceUrl: url
        }
      }
    }, { quoted: m })


    if (downloadUrl) {
      await conn.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName,
        mimetype: 'audio/mpeg',
        caption: `🎵 ${title}`,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: `🧪 YOUTUBE DOC 💎`,
            mediaUrl: url,
            sourceUrl: url,
            thumbnailUrl: thumbnail,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      }, { quoted: m })
    } else {
      m.reply("⚠️ No se encontró enlace de descarga para el audio.")
    }

  } catch (err) {
    console.error(err)
    m.reply(`❌ Ocurrió un error:\n${err.message}`)
  }
}

handler.help = ['ytmp3doc <texto>']
handler.tags = ['downloader']
handler.command = ['ytmp3doc']

export default handler*/