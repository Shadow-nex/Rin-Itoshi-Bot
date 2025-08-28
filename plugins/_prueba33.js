import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

  API_BASE: 'https://delirius-apiofc.vercel.app',
  TIMEOUT_MS: 25_000,
  SEND_DELAY_MS: 800,
};

const buildUrl = (packUrl) => {
  const u = new URL('/download/stickerly', CONFIG.API_BASE);
  u.searchParams.set('url', packUrl);
  return u.toString();
};

async function fetchJson(url) {
  const res = await fetch(url, { timeout: CONFIG.TIMEOUT_MS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function fmt(n) {
  try { return n.toLocaleString('es-PE'); } catch { return String(n); }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(
`✦ Uso correcto:
${usedPrefix + command} <url_stickerly> [nombre_pack] [autor_pack]

Ejemplo:
${usedPrefix + command} https://sticker.ly/s/4I2FC0
${usedPrefix + command} https://sticker.ly/s/4I2FC0 "Cute Pack" "Rin Itoshi"`)
  }

  let urlArg = args[0]
  let packName = args[1] || 'Stickerly Pack'
  let packAuthor = args[2] || 'Bot'

  try {
    const u = new URL(urlArg)
    if (!/sticker\.ly/.test(u.hostname)) throw new Error('URL no es de sticker.ly')
  } catch {
    return m.reply('❌ Proporciona una URL válida de *sticker.ly*')
  }

  const endpoint = buildUrl(urlArg)

  try {
    const json = await fetchJson(endpoint)
    if (!json?.status || !json?.data) throw new Error('Respuesta inválida de la API')

    const d = json.data
    const stickers = d.stickers || []
    if (!stickers.length) return m.reply('⚠️ No se encontraron stickers en el pack.')

    const info =
`🧩 *Sticker.ly Pack*
• *Nombre:* ${d.name}
• *Autor:* ${d.author}
• *Usuario:* @${d.username}
• *Seguidores:* ${fmt(d.followers)}
• *Stickers:* ${fmt(d.total)}
• *Vistas:* ${fmt(d.viewCount)}
• *Exportados:* ${fmt(d.exportCount)}
• *URL:* ${d.url}`

    await conn.sendMessage(
      m.chat,
      { image: { url: d.preview || d.avatar || stickers[0] }, caption: info },
      { quoted: m }
    )

    for (let i = 0; i < stickers.length; i++) {
      try {
        let url = stickers[i]
        let stiker = await sticker(null, url, packName, packAuthor)
        if (stiker) {
          await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
        }
      } catch {}
      await new Promise(res => setTimeout(res, CONFIG.SEND_DELAY_MS))
    }

    await m.reply(`✅ Pack completo enviado (${stickers.length} stickers)  *${packName}* | *${packAuthor}*`)

  } catch (err) {
    return m.reply(`❌ Error: ${err.message || err}`)
  }
}

handler.help = ['stickerly <url> [nombre] [autor]']
handler.tags = ['sticker']
handler.command = /^stickerly$/i

export default handler