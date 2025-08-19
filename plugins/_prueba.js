
import fetch from 'node-fetch'

const API_BASE = 'https://dark-core-api.vercel.app/api/download/ytmp4/v2'
const SEARCH_API = 'https://delirius-apiofc.vercel.app/search/ytsearch'
const API_KEY = process.env.DARK_CORE_KEY || 'api'

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('🎥')

  try {
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

    // Descargar video
    const endpoint = `${API_BASE}?key=${encodeURIComponent(API_KEY)}&url=${encodeURIComponent(url)}`
    const res = await fetch(endpoint)
    if (!res.ok) throw new Error(`API respondió ${res.status}`)
    const data = await res.json()
    const { title, quality, download } = data || {}
    if (!download) throw new Error('No llegó el enlace de descarga.')

    // Obtener detalles extra
    const infoRes = await fetch(`${SEARCH_API}?query=${encodeURIComponent(url)}`)
    const infoData = await infoRes.json()
    const videoInfo = infoData?.result?.[0] || {}

    const {
      title: tInfo,
      duration,
      channel,
      views,
      published,
      description,
      thumbnail
    } = videoInfo

    // Caption super detallado
    const caption =
`╭━━━〔 *📹 INFORMACIÓN DEL VIDEO* 〕━━⬣
┃🎬 *Título:* ${tInfo || title || 'Desconocido'}
┃📺 *Canal:* ${channel || 'Desconocido'}
┃🕒 *Duración:* ${duration || 'Desconocida'}
┃👁️ *Vistas:* ${views || '0'}
┃📅 *Publicado:* ${published || 'N/A'}
┃💿 *Calidad descarga:* ${quality || 'Desconocida'}
┃🔗 *Enlace:* ${url}
╰━━━━━━━━━━━━━━━━⬣

📝 *Descripción completa:*
${description ? description.slice(0, 1500) : 'Sin descripción.'}
`

    await conn.sendMessage(m.chat, {
      video: { url: download },
      mimetype: 'video/mp4',
      fileName: `${(title || 'video')}.mp4`,
      caption,
      thumbnail: thumbnail ? await (await fetch(thumbnail)).buffer() : null
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