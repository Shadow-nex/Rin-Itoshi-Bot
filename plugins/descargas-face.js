import fetch from 'node-fetch'

const CONFIG = {
  API: 'https://api.vreden.my.id/api/fbdl',
  CMD: ['fbdl', 'fb2', 'facebook2'],
  TIMEOUT: 60000
}

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, 
      `✨ *Downloader FB HD*\n\n` +
      `👉 Ingresa el enlace de Facebook a descargar.\n` +
      `Ejemplo:\n${usedPrefix + command} https://www.facebook.com/share/r/XXXXXX`, 
    m)
  }

  const url = args[0]
  await m.react('🕒')

  try {
    const res = await fetch(`${CONFIG.API}?url=${encodeURIComponent(url)}`, { timeout: CONFIG.TIMEOUT })
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
    const json = await res.json()

    if (!json?.data?.status) throw new Error('No se encontró el video 😢')

    const { title, hd_url, sd_url } = json.data
    const video = hd_url || sd_url
    if (!video) throw new Error('El API no devolvió ningún link de video.')

    const caption = 
`🔋 *FACEBOOK DL* 💥
> ⚽ *Título:* ${title || 'Sin título'}
> 🍂 *Calidad:* ${hd_url ? 'HD' : 'SD'}`

    await conn.sendMessage(m.chat, { 
      video: { url: video },
      caption,
      mimetype: 'video/mp4',
      fileName: `${(title || 'facebook').slice(0, 80)}.mp4`
    }, { quoted: m })

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    conn.reply(m.chat, `⚠️ Error al descargar:\n${e.message}`, m)
  }
}

handler.help = ['fbdl <url>']
handler.tags = ['downloader']
handler.command = new RegExp(`^(${CONFIG.CMD.join('|')})$`, 'i')

export default handler