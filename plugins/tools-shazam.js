// plugins/shazam_acr.js
// Reconocimiento musical SOLO con ACRCloud + conversión a MP3
// Requiere: npm i node-fetch form-data crypto fluent-ffmpeg @ffmpeg-installer/ffmpeg

import fetch from 'node-fetch';
import FormData from 'form-data';
import crypto from 'crypto';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { Readable } from 'stream';

ffmpeg.setFfmpegPath(ffmpegPath.path);

// === ENV / CONFIG ===
const ACR_HOST   = process.env.ACR_HOST   || 'identify-xxx.acrcloud.com'; // p.ej: identify-eu-west-1.acrcloud.com
const ACR_KEY    = process.env.ACR_KEY    || 'TU_ACCESS_KEY';
const ACR_SECRET = process.env.ACR_SECRET || 'TU_ACCESS_SECRET';

// Convierte cualquier buffer de audio a MP3 (ffmpeg detecta formato automáticamente)
async function toMp3(buffer) {
  return new Promise((resolve, reject) => {
    const inputStream = Readable.from(buffer);
    const chunks = [];
    const proc = ffmpeg()
      .input(inputStream)
      .inputOptions(['-hide_banner', '-loglevel', 'error'])
      .audioCodec('libmp3lame')
      .format('mp3')
      .on('error', reject)
      .on('end', () => resolve(Buffer.concat(chunks)))
      .pipe();

    proc.on('data', (c) => chunks.push(c));
  });
}

// Llama a ACRCloud /v1/identify con firma HMAC
async function recognizeACR(bufferMp3) {
  const httpMethod = 'POST';
  const httpUri = '/v1/identify';
  const dataType = 'audio';
  const signatureVersion = '1';
  const timestamp = Math.floor(Date.now() / 1000);

  const stringToSign = [
    httpMethod, httpUri, ACR_KEY, dataType, signatureVersion, timestamp
  ].join('\n');

  const signature = crypto
    .createHmac('sha1', ACR_SECRET)
    .update(stringToSign)
    .digest('base64');

  const form = new FormData();
  form.append('sample', bufferMp3, { filename: 'audio.mp3' });
  form.append('access_key', ACR_KEY);
  form.append('data_type', dataType);
  form.append('signature_version', signatureVersion);
  form.append('signature', signature);
  form.append('sample_bytes', bufferMp3.length);
  form.append('timestamp', timestamp);

  const res = await fetch(`https://${ACR_HOST}${httpUri}`, { method: 'POST', body: form });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  if (json.status?.code === 0 && json.metadata?.music?.length) {
    return json.metadata.music[0];
  }
  throw new Error(json.status?.msg || 'ACRCloud no encontró resultado');
}

function buildReplyFromACR(music) {
  const title  = music.title || 'Desconocido';
  const artists = music.artists?.map(a => a.name).join(', ') || 'Desconocido';
  const album = music.album?.name || '—';
  const release = music.release_date || music.release_date_text || '—';

  // Enlaces externos si existen (pueden no venir)
  const ext = music.external_metadata || {};
  const links = [];
  if (ext.spotify?.track?.id) links.push(`🟢 Spotify: https://open.spotify.com/track/${ext.spotify.track.id}`);
  if (ext.apple_music?.url)  links.push(` Apple Music: ${ext.apple_music.url}`);
  if (ext.deezer?.track?.id) links.push(`🔵 Deezer: https://www.deezer.com/track/${ext.deezer.track.id}`);

  return `
╭━━━〔  𝐒𝐇𝐀𝐙𝐀𝐌 • ACR  〕━━⬣
🎵 *Título:* ${title}
👤 *Artista:* ${artists}
💿 *Álbum:* ${album}
📅 *Lanzamiento:* ${release}

${links.length ? links.join('\n') : 'No se hallaron enlaces.'}
╰━━━━━━━━━━━━━━━━━━━━⬣`.trim();
}

// === Handler del comando ===
let handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted || m;
  const mime = q.mimetype || q.msg?.mimetype || '';
  const isAudio = /audio|ogg|opus|mp4|m4a|mpeg|x-mpegurl|wav|webm/i.test(mime) || q.audio || q.ptt;

  if (!isAudio) {
    throw `🎧 Responde a un *audio/nota de voz* con: *${usedPrefix}${command}*`;
  }

  // Descarga del audio
  let raw;
  try {
    raw = typeof q.download === 'function' ? await q.download() : await conn.downloadMediaMessage(q);
  } catch (e) {
    console.error('Descarga falló:', e);
    throw '⚠️ No pude descargar el audio. Reenvía como nota de voz, por favor.';
  }
  if (!raw || !raw.length) throw '⚠️ Audio vacío o no soportado.';

  // Convertir a MP3 para máxima compatibilidad
  let mp3;
  try {
    mp3 = await toMp3(raw);
  } catch (e) {
    console.error('ffmpeg error:', e);
    throw '⚠️ Error al convertir el audio. Verifica que ffmpeg esté instalado correctamente.';
  }

  // Reconocer
  let music;
  try {
    music = await recognizeACR(mp3);
  } catch (e) {
    console.error('ACR error:', e);
    throw '❌ No pude reconocer la canción con ACRCloud. Intenta con un fragmento más claro (5–15s).';
  }

  const reply = buildReplyFromACR(music);
  await conn.reply(m.chat, reply, m);
};

handler.help = ['shazam', 'acr'];
handler.tags = ['music', 'tools'];
handler.command = /^shazam|acr(song)?$/i;

export default handler;