import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('Formato no soportado, verifica la lista de formatos disponibles.');
    }

    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id, title, info } = response.data;
        const { image } = info;
        const downloadUrl = await ddownr.cekProgress(id);

        return {
          id: id,
          image: image,
          title: title,
          downloadUrl: downloadUrl
        };
      } else {
        throw new Error('Fallo al obtener los detalles del video.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝚂𝙴𝚁𝚃𝙴 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙼𝙰𝚂 𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 / 𝙻𝙸𝙽𝙺 𝙳𝙴 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝙳𝙴 𝚈𝙾𝚄𝚃𝚄𝙱𝙴 🎄*`, m, rcanal);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('*[❗] 𝙴𝚁𝚁𝙾𝚁 𝙽𝙾 𝙵𝚄𝙴 𝙿𝙾𝚂𝙸𝙱𝙻𝙴 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝙴𝙻 𝚅𝙸𝙳𝙴𝙾*');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, views, url } = videoInfo;
    const thumb = (await conn.getFile(thumbnail))?.data;
    
    const sukunaurl = 'https://files.catbox.moe/kjh6ga.jpg';
    const infoMessage = `➤ ▢ *𝚃𝙸𝚃𝚄𝙻𝙾:*\n> ${title}\n➤ ▢ *𝚅𝙸𝚂𝚃𝙰𝚂:*\n> ${formatViews(views)}\n➤ ▢ *𝙴𝙽𝙻𝙰𝙲𝙴:*\n> ${url}\n> 🎧 𝑬𝒔𝒕𝒐𝒚 𝒑𝒓𝒐𝒄𝒆𝒔𝒂𝒏𝒅𝒐 𝒕𝒖 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂....`;

    await conn.sendFile(m.chat, sukunaurl, 'sukuna.jpg', infoMessage, m);

    if (command === 'audio') {
      const api = await ddownr.download(url, 'mp3');
      const result = api.downloadUrl;

      await conn.sendMessage(m.chat, {
        audio: { url: result },
        mimetype: "audio/mpeg",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: 'YouTube - MP3',
            mediaUrl: url,
            sourceUrl: url,
            thumbnail: thumb,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

    } else if (command === 'video') {
      let sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      let success = false;
      for (let source of sources) {
        try {
          const res = await fetch(source);
          const { data, result, downloads } = await res.json();
          let downloadUrl = data?.dl || result?.download?.url || downloads?.url || data?.download?.url;

          if (downloadUrl) {
            success = true;
            await conn.sendMessage(m.chat, {
              video: { url: downloadUrl },
              fileName: `${title}.mp4`,
              mimetype: 'video/mp4',
              caption: `▢ 𝚃𝙸𝚃𝚄𝙻𝙾: ${title}`,
              thumbnail: thumb,
              contextInfo: {
                externalAdReply: {
                  title: title,
                  body: videoInfo.author.name || 'YouTube',
                  mediaUrl: url,
                  sourceUrl: url,
                  thumbnail: thumb,
                  mediaType: 1,
                  renderLargerThumbnail: true
                }
              }
            }, { quoted: m });
            break;
          }
        } catch (e) {
          console.error(`Error con la fuente ${source}:`, e.message);
        }
      }

      if (!success) {
        return m.reply(`*No se pudo descargar el video:* No se encontró un enlace de descarga válido.`);
      }
    } else {
      throw "Comando no reconocido.";
    }

  } catch (error) {
    return m.reply(`*Error:* ${error.message}`);
  }
};

handler.help = ['audio', 'video'];
handler.tags = ['descargas'];
handler.command = ['audio', 'video'];
//handler.group = true;
export default handler;

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else {
    return views.toString();
  }
}