import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) {
    return m.reply(`✧ Ejemplo de uso:\n${usedPrefix}${command} https://music.apple.com/us/album/glimpse-of-us/1625328890?i=1625328892`);
  }

  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

  try {
    const response = await fetch(`https://fastrestapis.fasturl.cloud/downup/applemusicdown?url=${encodeURIComponent(text)}`);
    const data = await response.json();

    if (!data.result || !data.result.downloadUrl) {
      return m.reply('❌ No se encontró la URL del audio. Verifica el enlace.');
    }

    const { downloadUrl, title, artist, thumbnail } = data.result;

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: title || 'Apple Music',
          body: artist || '🎵 Música descargada',
          mediaUrl: text,
          sourceUrl: text,
          thumbnail: await (await fetch(thumbnail)).buffer(),
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error('[ERROR APPLEMUSIC]', error);
    m.reply('❌ Hubo un error al descargar la música. Intenta con otro enlace o más tarde.');
  }
};

handler.help = ['applemusic <link>'];
handler.tags = ['downloader'];
handler.command = ['applemusic'];

export default handler;