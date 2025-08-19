// ytv-v2.js
// by dv.shadow - https://github.com/Yuji-XDev
// Usa la API: https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=API_KEY&url=YOUTUBE_URL

import fetch from 'node-fetch'

const API_BASE = 'https://dark-core-api.vercel.app/api/download/ytmp4/v2'
const API_KEY = process.env.DARK_CORE_KEY || 'api' // <-- cambia 'api' por tu key si tienes una

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('🎥')

  try {
    // Validación básica
    const url = (text || '').trim()
    if (!url) {
      return m.reply(
        `✦ 𝙐𝙎𝙊 𝘿𝙀 𝙔𝙏𝙑-𝙑2\n` +
        `• Envia:  *${usedPrefix + command} <link de YouTube>*\n` +
        `• Ej:  *${usedPrefix + command} https://youtu.be/ryVgEcaJhwM*`
      )
    }
    if (!/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url)) {
      return m.reply('⚠️ Proporciona un enlace válido de YouTube.')
    }

    // Llamada a la API
    const endpoint = `${API_BASE}?key=${encodeURIComponent(API_KEY)}&url=${encodeURIComponent(url)}`
    const res = await fetch(endpoint)
    if (!res.ok) throw new Error(`API respondió ${res.status}`)
    const data = await res.json()

    // Se espera: { title, quality, download }
    const { title, quality, download } = data || {}
    if (!download) throw new Error('No llegó el enlace de descarga.')

    // Enviar el video
    const caption =
      `╭━━━〔 𝙔𝙏𝙑 - 𝙑2 〕━━⬣\n` +
      `┃🎬 *Título:* ${title || 'Desconocido'}\n` +
      `┃📺 *Calidad:* ${quality || 'Desconocida'}\n` +
      `┃🔗 *Origen:* ${url}\n` +
      `╰━━━━━━━━━━━━━━━━⬣`

    await conn.sendMessage(m.chat, {
      video: { url: download },
      mimetype: 'video/mp4',
      fileName: `${(title || 'video')}.mp4`,
      caption,
      // Si usas newsletter/Canal, descomenta y ajusta:
      // contextInfo: {
      //   mentionedJid: [m.sender],
      //   isForwarded: true,
      //   forwardedNewsletterMessageInfo: {
      //     newsletterJid: channelRD.id,
      //     serverMessageId: 100,
      //     newsletterName: channelRD.name
      //   }
      // }
    }, { quoted: m })

    await m.react('✅')
  } catch (e) {
    console.error('ytv-v2 error:', e)
    await m.react('❌')
    return m.reply(
      `*[ 🧪 ] Ocurrió un error con ytv-v2:*\n` +
      `> ${e?.message || e}\n\n` +
      `• Intenta con otro link o más tarde.`
    )
  }
}

handler.help = ['ytv-v2 <url>']
handler.tags = ['downloader']
handler.command = /^ytv-v2$/i

export default handler