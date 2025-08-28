// plugins/stickerly.js
import fetch from 'node-fetch';
import { setTimeout as wait } from 'timers/promises';

/* =========================
   CONFIG DE API + KEYS
   ========================= */
const CONFIG = {
  API_BASE: process.env.DELIRIUS_API_BASE || 'https://delirius-apiofc.vercel.app',
  API_KEY:  process.env.DELIRIUS_API_KEY  || 'TU_KEY_AQUI', // Si tu endpoint NO requiere key, déjalo tal cual
  TIMEOUT_MS: 25_000,
  SEND_DELAY_MS: 800, // pausa entre envíos para evitar rate limit
  PREVIEW_COUNT: 5    // cuántas imágenes manda en modo normal
};

/* =========================
   UTILES
   ========================= */
const buildUrl = (packUrl) => {
  const u = new URL('/download/stickerly', CONFIG.API_BASE);
  u.searchParams.set('url', packUrl);
  // añade ?apikey= si definiste una key distinta de 'TU_KEY_AQUI'
  if (CONFIG.API_KEY && CONFIG.API_KEY !== 'TU_KEY_AQUI') {
    u.searchParams.set('apikey', CONFIG.API_KEY);
  }
  return u.toString();
};

async function fetchJson(input, { timeout = CONFIG.TIMEOUT_MS } = {}) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(input, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } finally {
    clearTimeout(id);
  }
}

function fmt(n) {
  try { return n.toLocaleString('es-PE'); } catch { return String(n); }
}

/* =========================
   HANDLER
   ========================= */
let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Soporta:
  // .stickerly <url>
  // .stickerly all <url>
  const wantsAll = args[0]?.toLowerCase() === 'all' || args[0]?.toLowerCase() === 'todo';
  const urlArg = wantsAll ? args[1] : args[0];

  if (!urlArg) {
    return m.reply(
      `✦ Uso correcto:
${usedPrefix + command} <url_del_pack>
${usedPrefix + command} all <url_del_pack>

Ejemplo:
${usedPrefix + command} https://sticker.ly/s/4I2FC0
${usedPrefix + command} all https://sticker.ly/s/4I2FC0`
    );
  }

  // Validación básica de URL
  try {
    const u = new URL(urlArg);
    if (!/sticker\.ly/.test(u.hostname)) throw new Error('URL no es de sticker.ly');
  } catch {
    return m.reply('❌ Proporciona una URL válida de *sticker.ly*');
  }

  const endpoint = buildUrl(urlArg);

  try {
    const json = await fetchJson(endpoint);

    if (!json?.status || !json?.data) {
      throw new Error('Respuesta inválida de la API');
    }

    const d = json.data;
    const head =
`🧩 *Sticker.ly Pack*
• *Nombre:* ${d.name || '-'}
• *Autor:* ${d.author || '-'}
• *Usuario:* @${d.username || '-'}
• *Seguidores:* ${fmt(d.followers ?? 0)}
• *Stickers:* ${fmt(d.total ?? (d.stickers?.length || 0))}
• *Animados:* ${d.isAnimated ? 'Sí' : 'No'}
• *Vistas:* ${fmt(d.viewCount ?? 0)}
• *Exportados:* ${fmt(d.exportCount ?? 0)}
• *Perfil:* ${d.share || '-'}
• *URL:* ${d.url || urlArg}`;

    // Enviar preview con la info
    const caption = `${head}\n\n${
      wantsAll
        ? '⏳ Enviando *todos* los stickers...'
        : `Enviando *${CONFIG.PREVIEW_COUNT}* de muestra.\nUsa: *${usedPrefix + command} all ${urlArg}* para enviarlos todos.`
    }`;

    try {
      await conn.sendMessage(
        m.chat,
        { image: { url: d.preview || d.avatar || d.stickers?.[0] }, caption, mentions: [m.sender] },
        { quoted: m }
      );
    } catch {
      // Si falla la imagen, manda solo texto
      await m.reply(caption);
    }

    // Determina cuántos enviar
    const stickers = Array.isArray(d.stickers) ? d.stickers : [];
    if (!stickers.length) return m.reply('⚠️ No se encontraron imágenes de stickers en el pack.');

    const toSend = wantsAll ? stickers : stickers.slice(0, CONFIG.PREVIEW_COUNT);

    // Enviar como imágenes PNG (rápido y compatible). Si quieres stickers .webp,
    // conviértelas con tu función de conversión antes de enviar.
    for (let i = 0; i < toSend.length; i++) {
      const url = toSend[i];
      try {
        await conn.sendMessage(
          m.chat,
          {
            image: { url },
            caption: `#${i + 1} / ${toSend.length} — ${d.name || 'Pack'}`
          },
          { quoted: m }
        );
        // pequeña pausa para evitar rate limit
        await wait(CONFIG.SEND_DELAY_MS);
      } catch (e) {
        // Si una falla, sigue con la siguiente
        await wait(400);
      }
    }

    if (!wantsAll && stickers.length > CONFIG.PREVIEW_COUNT) {
      await m.reply(`✅ Listo. Usa *${usedPrefix + command} all ${urlArg}* para enviar los ${fmt(stickers.length)} stickers.`);
    }

  } catch (err) {
    const msg =
`❌ Error obteniendo el pack.
• Detalle: ${err?.message || err}
• Endpoint: ${endpoint}

Verifica que:
1) La URL de sticker.ly es pública.
2) Tu API_BASE/KEY están correctas.
3) No hay bloqueo de red o rate-limit.`;
    return m.reply(msg);
  }
};

handler.help = ['stickerly <url>', 'stickerly all <url>'];
handler.tags = ['sticker'];
handler.command = /^stickerly$/i;

export default handler;