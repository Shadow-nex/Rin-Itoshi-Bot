import axios from 'axios';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('🌪️ *Por favor, ingresa el nombre de una canción o artista en SoundCloud.*');

  try {
    await m.react('⏳');

    const searchRes = await axios.get('https://delirius-apiofc.vercel.app/search/soundcloud', {
      params: { q: text, limit: 1 }
    });

    const song = searchRes.data.data[0];
    if (!song) return m.reply('❌ No se encontraron resultados en SoundCloud.');

    const dlRes = await axios.get('https://api.siputzx.my.id/api/d/soundcloud', {
      params: { url: song.link }
    });

    if (!dlRes.data.status) {
      return m.reply('❌ No se pudo descargar el audio de SoundCloud.');
    }

    const audio = dlRes.data.data;

    const caption = `*✦ SOUND CLOUD ✦*\n\n` +
      `🎧 *Título:* ${audio.title || 'Desconocido'}\n` +
      `👤 *Artista:* ${audio.user || 'Desconocido'}\n` +
      `🕒 *Duración:* ${msToTime(audio.duration) || 'Desconocido'}\n` +
      `📝 *Descripción:* ${audio.description || 'Sin descripción'}\n` +
      `🔗 *Link:* ${song.link || 'N/A'}`;

    await conn.sendFile(m.chat, audio.thumbnail, 'cover.jpg', caption, m);

    await conn.sendMessage(m.chat, {
      audio: { url: audio.url },
      fileName: `${audio.title}.mp3`,
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: audio.title,
          body: `Dᴇsᴄᴀʀɢᴀ ᴄᴏᴍᴘʟᴇᴛᴀ | ʀɪɴ ɪᴛᴏsʜɪ ᴍᴅ`,
          thumbnailUrl: audio.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await m.react('✅');
  } catch (err) {
    console.error('[SOUNDCLOUD ERROR]', err);
    m.reply('❌ Ocurrió un error al procesar la solicitud.');
    await m.react('❌');
  }
};

function msToTime(ms) {
  let seconds = Math.floor((ms / 1000) % 60),
      minutes = Math.floor((ms / (1000 * 60)) % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

handler.command = ['sound', 'soundcloud'];
handler.help = ['soundcloud <nombre>'];
handler.tags = ['descargas'];
handler.register = true;
handler.limit = 2;

export default handler;