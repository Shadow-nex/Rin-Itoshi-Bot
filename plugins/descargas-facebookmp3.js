// fbmp3.js
import fetch from 'node-fetch'; // Asegúrate de tenerlo instalado: npm i node-fetch

const API_BASE = 'https://api.nexfuture.com.br/api/downloads/facebook/mp3?url=';

// --- Utils ---
const isFacebookUrl = (u = '') =>
  /(?:https?:\/\/)?(?:www\.)?(m\.)?facebook\.com|fb\.watch|fb\.com|^https?:\/\/l\.facebook\.com/i.test(u);

const safe = (v, d = '') => (v === undefined || v === null ? d : String(v));

/**
 * Llama a NexFuture y normaliza la respuesta (título, tamaño, url de audio, miniatura, etc.)
 */
async function getFbMp3(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000); // 25s

  const endpoint = `${API_BASE}${encodeURIComponent(url)}`;
  let res;
  try {
    res = await fetch(endpoint, { signal: controller.signal });
  } catch (err) {
    clearTimeout(timeout);
    throw new Error(`No se pudo conectar con la API: ${err?.message || err}`);
  }
  clearTimeout(timeout);

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`API respondió ${res.status}. ${txt?.slice(0, 200)}`);
  }

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error('No se pudo leer JSON de la API.');
  }

  // Acepta varias estructuras posibles
  const root = json?.resultado || json?.result || json || {};
  const statusOk =
    json?.status === true ||
    json?.status === 200 ||
    root?.status === true ||
    root?.success === true ||
    json?.código === 200;

  if (!statusOk) {
    const msg = root?.message || json?.message || 'La API no devolvió estado OK.';
    throw new Error(msg);
  }

  // Intentar encontrar la URL del MP3 en diferentes rutas comunes
  const audioUrl =
    root?.url ||
    root?.link ||
    root?.download ||
    root?.audio ||
    root?.musica ||
    root?.mp3 ||
    root?.data?.url ||
    root?.data?.audio ||
    null;

  if (!audioUrl || typeof audioUrl !== 'string') {
    throw new Error('No se encontró la URL del MP3 en la respuesta.');
  }

  const title =
    safe(root?.title) ||
    safe(root?.titulo) ||
    safe(root?.name) ||
    safe(root?.metadata?.title) ||
    'Audio de Facebook';

  const size =
    safe(root?.size) ||
    safe(root?.filesize) ||
    safe(root?.metadata?.size) ||
    '';

  const thumb =
    root?.thumbnail ||
    root?.thumb ||
    root?.miniatura ||
    root?.image ||
    root?.metadata?.thumbnail ||
    null;

  return { audioUrl, title, size, thumb, raw: json };
}

// --- Handler para Baileys ---
let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return m.reply(
        `🌷 *Ejemplo de uso:*\n\n` +
        `✎ ✧ \`${usedPrefix + command}\` https://www.facebook.com/share/v/16DHD5t541/`
      );
    }

    const url = text.trim();
    if (!isFacebookUrl(url)) {
      return m.reply('⚠️ Proporciona un enlace válido de Facebook.');
    }

    // Mensaje de progreso bonito
    const header = '╭━━━〔  𝗙𝗕 𝗔𝗨𝗗𝗜𝗢 〕━━⬣';
    const loadingMsg =
      `${header}\n` +
      `┃ ⏳ Preparando descarga MP3...\n` +
      `┃ 📎 *Enlace:* ${url}\n` +
      `╰━━━━━━━━━━━━━━━━━━━━⬣`;
    const statusMsg = await conn.reply(m.chat, loadingMsg, m);

    // Llamar API
    const info = await getFbMp3(url);

    // Armar caption
    const caption =
      `${header}\n` +
      `┃ 🎵 *Título:* ${info.title}\n` +
      (info.size ? `┃ 💾 *Tamaño:* ${info.size}\n` : '') +
      `┃ 🔗 *Fuente:* Facebook\n` +
      `╰━━━━━━━━━━━━━━━━━━━━⬣`;

    // Enviar audio
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: info.audioUrl },
        mimetype: 'audio/mpeg',
        fileName: `${info.title.replace(/[\\/:*?"<>|]/g, '').slice(0, 80) || 'facebook'}.mp3`,
        contextInfo: info.thumb
          ? {
              externalAdReply: {
                title: info.title,
                body: 'FB MP3 — NexFuture API',
                thumbnailUrl: info.thumb,
                mediaType: 1,
                renderLargerThumbnail: true,
                sourceUrl: url
              }
            }
          : undefined
      },
      { quoted: m }
    );

    // Opcional: confirmar envío
    await conn.reply(
      m.chat,
      `✅ *Listo.* Tu audio fue enviado.\n` +
      `📥 Si el archivo no reproduce, reenvíalo o usa \`${usedPrefix + command}\` nuevamente.`,
      m
    );

    // Opcional: borrar el mensaje de “cargando”
    if (statusMsg?.key) {
      try { await conn.sendMessage(m.chat, { delete: statusMsg.key }); } catch {}
    }
  } catch (e) {
    // Errores legibles para el usuario
    const msg =
      '❌ *Error al descargar el MP3 de Facebook.*\n' +
      `• Detalle: ${e?.message || e}\n` +
      '• Verifica que el enlace sea público o inténtalo otra vez.';
    return m.reply(msg);
  }
};

handler.help = ['fbmp3 <url>'];
handler.tags = ['descargas'];
handler.command = /^fbmp3$/i;

export default handler;