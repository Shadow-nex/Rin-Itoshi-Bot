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

    
    const dlRes = await axios.get('https://delirius-apiofc.vercel.app/download/soundcloud', {
      params: { url: song.link }
    });

    const audio = dlRes.data.data;
    const image = audio.imageURL?.replace('t500x500', 't1080x1080') || '';

    const caption = `*✦ SOUND CLOUD ✦*\n\n` +
      `🎧 *Título:* ${audio.title || 'Desconocido'}\n` +
      `👤 *Artista:* ${audio.author?.username || 'Desconocido'}\n` +
      `🆔 *ID:* ${audio.author?.id || 'Desconocido'}\n` +
      `🌟 *Likes:* ${audio.author?.likes_count || '0'}\n` +
      `🌱 *Publicado:* ${new Date(audio.author?.created_at).toLocaleDateString() || 'Desconocido'}\n` +
      `🔗 *URL:* ${song.link || 'N/A'}`;

    await conn.sendFile(m.chat, image, 'cover.jpg', caption, m);

    await conn.sendMessage(m.chat, {
      audio: { url: audio.url },
      fileName: `${audio.title}.mp3`,
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: audio.title,
          body: `Dᴇsᴄᴀʀɢᴀ ᴄᴏᴍᴘʟᴇᴛᴀ . sᴜᴋᴜɴᴀ ᴍᴅ`,
          thumbnailUrl: image,
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

handler.command = ['sound', 'soundcloud'];
handler.help = ['soundcloud <nombre>'];
handler.tags = ['descargas'];
handler.register = true;
handler.limit = 2;

export default handler;