// plugins/shazam.js
// Reconocer canción de un audio/nota de voz usando AudD
// Requiere: npm i node-fetch form-data
// Opcional (si quieres convertir formatos raros): npm i fluent-ffmpeg @ffmpeg-installer/ffmpeg

import fetch from 'node-fetch';
import FormData from 'form-data';

const AUDD_API_KEY = process.env.AUDD_API_KEY || '18a49217b6dea2e9ce6a143ad7a1d530'; // <- cámbialo o usa variables de entorno

let handler = async (m, { conn, usedPrefix, command }) => {
  // Toma el mensaje citado o el propio
  const q = m.quoted || m;
  const mime =
    (q.msg && (q.msg.mimetype || q.msg.mtype || q.mtype)) ||
    q.mimetype ||
    '';

  if (!/audio|ptt|voice|ogg|opus/i.test(mime) && !(q.audio || q.ptt)) {
    throw `🎧 Responde a un *audio/nota de voz* con: *${usedPrefix}${command}*`;
  }

  // Descargar el audio a Buffer
  let buffer;
  try {
    // Muchos frameworks ya exponen .download()
    if (typeof q.download === 'function') {
      buffer = await q.download();
    } else if (q.mediaMessage) {
      buffer = await conn.downloadMediaMessage(q);
    } else {
      // Último recurso (algunas bases)
      buffer = await conn.downloadMediaMessage(m);
    }
  } catch (e) {
    console.error('Error descargando audio:', e);
    throw '⚠️ No pude descargar el audio. Intenta reenviarlo como nota de voz.';
  }

  if (!buffer || !buffer.length) throw '⚠️ Audio vacío o no soportado.';

  // Enviar a AudD
  let result;
  try {
    const form = new FormData();
    form.append('api_token', AUDD_API_KEY);
    form.append('return', 'timecode,apple_music,spotify,deezer');
    // nombre de archivo “neutro”; AudD detecta el formato automáticamente
    form.append('file', buffer, { filename: 'audio.ogg' });

    const res = await fetch('https://api.audd.io/', {
      method: 'POST',
      body: form,
      // form-data pone cabeceras necesarias automáticamente
    });

    const json = await res.json();
    if (!json || !json.result) {
      console.log('Respuesta AudD:', json);
      throw new Error(json?.error?.error_message || 'Sin resultados');
    }
    result = json.result;
  } catch (e) {
    console.error('Error AudD:', e);
    throw '😔 No pude reconocer la canción. Vuelve a intentar con un audio más claro (5–15s).';
  }

  // Armar respuesta
  const {
    title,
    artist,
    album,
    release_date,
    timecode,
    song_link,
    apple_music,
    spotify,
    deezer
  } = result;

  const links = [];
  if (song_link) links.push(`🔗 ${song_link}`);
  if (apple_music?.url) links.push(` Apple Music: ${apple_music.url}`);
  if (spotify?.external_urls?.spotify) links.push(`🟢 Spotify: ${spotify.external_urls.spotify}`);
  if (deezer?.link) links.push(`🔵 Deezer: ${deezer.link}`);

  const decorTop = '╭━━━〔  𝐒𝐇𝐀𝐙𝐀𝐌  〕━━⬣';
  const decorBot = '╰━━━━━━━━━━━━━━━━━━━━⬣';

  const msg =
`${decorTop}
🎵 *Título:* ${title || 'Desconocido'}
👤 *Artista:* ${artist || 'Desconocido'}
💿 *Álbum:* ${album || '—'}
📅 *Lanzamiento:* ${release_date || '—'}
⏱️ *Timecode:* ${timecode || '—'}

${links.length ? links.join('\n') : 'No se hallaron enlaces.'}
${decorBot}`;

  await conn.reply(m.chat, msg, m);
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
handler.register = true;

export default handler;

