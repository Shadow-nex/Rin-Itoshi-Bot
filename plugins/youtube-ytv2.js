import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🌷 Ejemplo de uso:\n\n✎ ✧ \`${usedPrefix + command}\` https://youtu.be/KHgllosZ3kA`)

  try {
    let api = `https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(text)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.status || !json.result?.download?.url) throw new Error('❌ No se pudo obtener el video.')

    let { metadata, download } = json.result
    let caption = `
╭━━━〔 🎥 *YouTube Video* 〕━━⬣
┃ ✦ *Título:* ${metadata.title}
┃ ✦ *Duración:* ${metadata.duration.timestamp}
┃ ✦ *Vistas:* ${metadata.views.toLocaleString()}
┃ ✦ *Canal:* ${metadata.author.name}
┃ ✦ *Calidad:* ${download.quality}
╰━━━━━━━━━━━━━━━━━━⬣
`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: metadata.thumbnail },
      caption
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      document: { url: download.url },
      mimetype: 'video/mp4',
      fileName: download.filename
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al descargar el video.')
  }
}

handler.help = ['ytv-v2 <url>']
handler.tags = ['downloader']
handler.command = /^ytv-v2$/i

export default handler