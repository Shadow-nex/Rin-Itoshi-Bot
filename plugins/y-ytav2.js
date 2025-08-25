import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(text)) {
    return m.reply('❌ *Envía una URL válida de YouTube.*');
  }

  await m.react('⏱️');

  let info = null;

  try {

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
          url: json.resultado.metadata.url || text
        };
      }
    } catch (e) {
      console.error('Error en ytmp3:', e);
    }
    
    if (!info) {
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
          url: json.result.metadata.url || text
        };
      }
    }

    if (!info) throw '❌ No se pudo obtener la información del audio.';

    let sizeStr = 'Desconocido';
    try {
      const head = await fetch(info.download, { method: 'HEAD' });
      const size = head.headers.get('content-length');
      if (size) {
        const bytes = parseInt(size);
        const formatBytes = (bytes, decimals = 2) => {
          if (bytes === 0) return '0 Bytes';
          const k = 1024;
          const dm = decimals < 0 ? 0 : decimals;
          const sizes = ['Bytes', 'KB', 'MB', 'GB'];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        };
        sizeStr = formatBytes(bytes);
      }
    } catch (e) {
      console.error('Error al obtener el tamaño del archivo:', e);
    }
/*    
    await conn.sendMessage(m.chat, {
      image: { url: info.thumb },
      caption: `🎵 𝚃𝚒́𝚝𝚞𝚕𝚘: *${info.title}*\n👤 𝙰𝚞𝚝𝚘𝚛: *${info.author || 'Desconocido'}*\n⏱️ 𝙳𝚞𝚛𝚊𝚌𝚒𝚘́𝚗: *${info.duration || 'Desconocida'}*\n📦 𝚃𝚊𝚖𝚊𝚗̃𝚘: *${sizeStr}*`
    }, { quoted: m });*/

    const fileName = `${info.title.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/ +/g, '_')}.mp3`;

    await conn.sendMessage(m.chat, {
      document: { url: info.download },
      fileName,
      mimetype: 'audio/mpeg',
      caption: `🎵 𝚃𝚒́𝚝𝚞𝚕𝚘: *${info.title}*\n> ${club}`,
      contextInfo: {
        externalAdReply: {
          title: info.title,
          body: '🎧 YOUTUBE DOC ☘️',
          mediaUrl: info.url,
          sourceUrl: info.url,
          thumbnailUrl: info.thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await m.react('✅');

  } catch (err) {
    console.error(err);
    await m.reply('❌ *No se pudo obtener el MP3.* Intenta con otro enlace.');
    await m.react('❌');
  }
};

handler.command = ['yta-v2'];
handler.help = ['yta-v2 <url de YouTube>'];
handler.tags = ['downloader'];

export default handler;