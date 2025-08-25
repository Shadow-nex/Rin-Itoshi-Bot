/*// Código creado por Dev.Shadow xD
// https://github.com/Yuji-XDev

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🌾 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://youtu.be/ZtFPexrxt4g?si=aWllBcy3adHrobOB\n✎ ✧ \`${usedPrefix + command}\` DJ malam pagi slowed`);
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

    await conn.sendMessage(m.chat, {
      image: { url: info.thumb },
      caption: `╭━━━〔 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰 𝙴𝙽 𝙲𝚄𝚁𝚂𝙾 ⬇️ 〕━━━⬣
┃
┃ 📥 𝙿𝚛𝚘𝚐𝚛𝚎𝚜𝚘: ▓▓▓▓▓▓░░░░░░ 50%
┃
┃ 🎵 𝚃𝚒́𝚝𝚞𝚕𝚘: *${info.title}*
┃ 👤 𝙰𝚞𝚝𝚘𝚛: *${info.author || 'Desconocido'}*
┃ ⏱️ 𝙳𝚞𝚛𝚊𝚌𝚒𝚘́𝚗: *${info.duration || 'Desconocida'}*
┃ 📦 𝚃𝚊𝚖𝚊𝚗̃𝚘: *${info.size || 'Calculando...'}*
┃ ⏳ 𝙴𝚜𝚝𝚊𝚍𝚘: *Preparando audio...*
┃
╰━━━━━━━━━━━━━━━━━━━━⬣`
    }, { quoted: m });
 

    await conn.sendMessage(m.chat, {
      audio: { url: info.download },
      fileName: info.filename,
      mimetype: 'audio/mpeg'
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


import fetch from 'node-fetch'

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) {
    return m.reply(`🌷 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://youtu.be/ZtFPexrxt4g?si=aWllBcy3adHrobOB\n✎ ✧ \`${usedPrefix + command}\` DJ malam pagi slowed`);
  }

  try {
    let api = `https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(text)}`
    let res = await fetch(api)
    if (!res.ok) throw `❌ Error al conectar con la API`
    let json = await res.json()

    if (!json.status || !json.result || !json.result.download?.url) throw `⚠️ No se pudo obtener el audio.`

    let { title, thumbnail, author, timestamp, views } = json.result.metadata
    let { url, quality } = json.result.download
    
    await m.react('💿');
    let caption = `
╭━━━〔 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗠𝗣𝟯 〕━━⬣
┃ 🎵 *Título:* ${title}
┃ 👤 *Canal:* ${author?.name || "Desconocido"}
┃ ⏱️ *Duración:* ${timestamp}
┃ 👀 *Vistas:* ${views.toLocaleString()}
┃ 🎧 *Calidad:* ${quality}
╰━━━━━━━━━━━━⬣
    `.trim()

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`
    }, { quoted: m })
   await m.react('✅')
   
  } catch (e) {
    console.error(e)
    throw `❌ Ocurrió un error al procesar tu petición.`
  }
}

handler.help = ['yta <url>']
handler.tags = ['downloader']
handler.command = ['yta']

export default handler