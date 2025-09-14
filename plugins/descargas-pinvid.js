import fetch from 'node-fetch'

function safeGet(obj, path, defaultVal) {
  const parts = path.split('.')
  let cur = obj
  for (const p of parts) {
    if (cur && Object.prototype.hasOwnProperty.call(cur, p)) {
      cur = cur[p]
    } else return defaultVal
  }
  return cur
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.sendMessage(m.chat, {
      text: `🌿 Uso correcto: *${usedPrefix + command}* <url>\n\nEjemplo:\n${usedPrefix + command} https://pin.it/21xLCbx4d`
    }, { quoted: m })
  }

  const requestUrl = `https://gokublack.xyz/download/pin?url=${encodeURIComponent(args[0])}`

  try {
    const res = await fetch(requestUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()

    const parsed = {
      status: safeGet(json, 'status', false),
      statusCode: safeGet(json, 'statusCode', 500),
      creator: safeGet(json, 'creator', 'unknown'),
      data: {
        status: safeGet(json, 'data.status', false),
        data: {
          type: safeGet(json, 'data.data.type', 'unknown'),
          size: safeGet(json, 'data.data.size', '-'),
          url: safeGet(json, 'data.data.url', null)
        }
      }
    }

    const infoText = `
⊜─⌈ 🔎 ◜Parse Result◞ 🔎 ⌋─⊜

≡ 📊 status: *${parsed.status}*
≡ 🆔 statusCode: *${parsed.statusCode}*
≡ 👤 creator: *Shadow'Core*

≡ ✅ data.status: *${parsed.data.status}*
≡ 🎬 type: *${parsed.data.data.type}*
≡ 📦 size: *${parsed.data.data.size}*
≡ 🔗 url: ${parsed.data.data.url ? parsed.data.data.url : 'No disponible'}
    `.trim()

    await conn.sendMessage(m.chat, { text: infoText }, { quoted: m })

    if (parsed.data.data.url) {
      try {
        await conn.sendMessage(m.chat, {
          video: { url: parsed.data.data.url },
          caption: `🌷 Video detectado\n• Tipo: ${parsed.data.data.type}\n• Peso: ${parsed.data.data.size}`
        }, { quoted: m })
      } catch {
        await conn.sendMessage(m.chat, { text: `⚠️ No pude enviar el video. Aquí tienes el enlace:\n${parsed.data.data.url}` }, { quoted: m })
      }
    }

  } catch (err) {
    console.error(err)
    await conn.sendMessage(m.chat, {
      text: `*Error al parsear:*\n${err.message}`
    }, { quoted: m })
  }
}

handler.help = ['pinvideo *<link>*']
handler.tags = ['descargas']
handler.command = ['pinvideo', 'pinv']

export default handler