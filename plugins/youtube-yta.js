/*// Código creado por Dev.Shadow xD
// https://github.com/Yuji-XDev

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`⚡ *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://youtu.be/ZtFPexrxt4g?si=aWllBcy3adHrobOB\n✎ ✧ \`${usedPrefix + command}\` DJ malam pagi slowed`);
  }

  await m.react('💿');

  const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(text);
  let info = null;

  try {
    if (isYoutubeUrl) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (json?.resultado?.descarga?.url) {
          info = {
            title: json.resultado.metadata.title,
            author: json.resultado.metadata.author?.nombre,
            duration: json.resultado.metadata.duración?.marca_de_tiempo,
            thumb: json.resultado.metadata.image,
            download: json.resultado.descarga.url,
            filename: json.resultado.descarga.filename,
            size: json.resultado.descarga.size
          };
        }
      } catch (e) {
        console.error('Error en ytmp3:', e);
      }
    }

    if (!info) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (json?.result?.download?.url) {
          info = {
            title: json.result.metadata.title,
            author: json.result.metadata.author?.name,
            duration: json.result.metadata.duration?.timestamp,
            thumb: json.result.metadata.thumbnail,
            download: json.result.download.url,
            filename: json.result.download.filename,
            size: json.result.download.size
          };
        }
      } catch (e) {
        console.error('Error en yta:', e);
      }
    }

    if (!info) throw '❌ No se pudo obtener información de ninguna API.';
/*
    await conn.sendMessage(m.chat, {
      image: { url: info.thumb },
      caption: `╭━━━〔 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗠𝗣𝟯 〕━━⬣
┃ 🎵 *Título:* ${info.title}
┃ 👤 *Canal:* ${info.author || 'Desconocido'}
┃ ⏱️ *Duración:* ${info.duration || 'Desconocida'}
╰━━━━━━━━━━━━⬣`
    }, { quoted: m });
 

    await conn.sendMessage(m.chat, {
      audio: { url: info.download },
      fileName: info.filename,
      mimetype: 'audio/mpeg'
    }, { quoted: m });
    
    //const res = info[0]
    //const thumbUrl = `https://i.ytimg.com/vi/${res.videoId}/hqdefault.jpg`
    //const inithumb = await getBuffer(thumbUrl)
    
    await conn.sendMessage(m.chat, {
      audio: { url: info.download },
      fileName: info.filename,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: info.title,
          body: `🌱 Duracion: ${info.duration || 'Desconocida'} | canal:  ${info.author || 'Desconocido'}`,
          mediaUrl: 'https://api.vreden.my.id',
          sourceUrl: 'https://api.vreden.my.id',
          thumbnailUrl: info.thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await m.react('✅');

  } catch (err) {
    console.error(err);
    await m.reply('❌ *No se pudo obtener el MP3.* Intenta con otro título o link.');
    await m.react('❌');
  }
};

handler.command = ['yta'];
handler.help = ['yta <url o texto>'];
handler.tags = ['downloader'];

export default handler;*/


// Código creado por Dev.Shadow xD
// https://github.com/Yuji-XDev
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`⚡ *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://youtu.be/ZtFPexrxt4g?si=aWllBcy3adHrobOB\n✎ ✧ \`${usedPrefix + command}\` DJ malam pagi slowed`);
  }

  await m.react('💿');

  const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(text);
  let info = null;

  try {
    if (isYoutubeUrl) {
      try {
        const res = await fetch(`https://www.apis-anomaki.zone.id/downloader/yta?url=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (json?.result?.success && json?.result?.data?.downloadURL) {
          info = {
            title: "YouTube Audio",
            author: "Desconocido",
            duration: "Desconocida",
            thumb: `https://i.ytimg.com/vi/${text.split("v=")[1] || text.split("/").pop()}/hqdefault.jpg`,
            download: json.result.data.downloadURL,
            filename: `${command}_${Date.now()}.mp3`,
            size: "Desconocido"
          };
        }
      } catch (e) {
        console.error('Error en anomaki yta:', e);
      }
    }

    if (!info) throw '❌ No se pudo obtener información de ninguna API.';

    await conn.sendMessage(m.chat, {
      audio: { url: info.download },
      fileName: info.filename,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: info.title,
          body: `🌱 Duración: ${info.duration} | Canal: ${info.author}`,
          mediaUrl: text,
          sourceUrl: text,
          thumbnailUrl: info.thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await m.react('✅');

  } catch (err) {
    console.error(err);
    await m.reply('❌ *No se pudo obtener el MP3.* Intenta con otro título o link.');
    await m.react('❌');
  }
};

handler.command = ['yta'];
handler.help = ['yta <url o texto>'];
handler.tags = ['downloader'];

export default handler;