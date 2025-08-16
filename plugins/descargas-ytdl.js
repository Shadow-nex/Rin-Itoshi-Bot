import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('Formato no soportado, revisa la lista de formatos disponibles.');
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

        return { id, image, title, downloadUrl };
      } else {
        throw new Error('No se pudieron obtener los detalles del video.');
      }
    } catch (error) {
      console.error('Error en download:', error);
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
      console.error('Error en cekProgress:', error);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text || !text.trim()) {
      return conn.reply(m.chat, `🌸 Onichan~ debes poner el comando más un enlace de YouTube uwu 💕\n\nEjemplo:\n*${usedPrefix + command} https://youtu.be/xxxx*`, m, global.rcanal);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('❌ Nyaa~ No encontré resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, views, url } = videoInfo;

    const rinurl = global.logo || "https://files.catbox.moe/g2of9q.jpg";
    const thumb = (await conn.getFile(thumbnail || rinurl))?.data;

    const infoMessage = `╭─❍⃟🌸 𝐎𝐧𝐢𝐜𝐡𝐚𝐚𝐚𝐧~ 💗  
┃ 🎶 *Título:* ${title}  
┃ 👁️ *Vistas:* ${formatViews(views)}  
┃ 🔗 *Enlace:* ${url}  
┃  
┃ ⏳ Estoy preparando tu descarga nya~ 💖  
╰─⟦ 🌈 Espera un momentito uwu ⟧`;

    await conn.sendFile(m.chat, rinurl, 'rin.jpg', infoMessage, m);

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
      await m.reply("⏳ Buscando la mejor fuente de descarga... 🎥✨");

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
              caption: `╭─❍⃟🎥 𝐕𝐢𝐝𝐞𝐨 𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨  
┃ 📺 *Título:* ${title}  
╰──────────────⬣`,
              thumbnail: thumb,
              contextInfo: {
                externalAdReply: {
                  title: title,
                  body: videoInfo.author?.name || 'YouTube',
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
        return m.reply('❌ No se pudo descargar el video nya~ 😿');
      }
    } else {
      throw "Comando no reconocido.";
    }

  } catch (error) {
    return m.reply(`❌ Error: ${error.message}`);
  }
};

handler.help = ['audio <yt_link>', 'video <yt_link>'];
handler.tags = ['descargas'];
handler.command = ['audio', 'video'];
handler.group = true;
export default handler;

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else {
    return views.toString();
  }
}