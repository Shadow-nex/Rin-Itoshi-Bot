import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*✎ y el link?*`)

  try {
    let api = `https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(text)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.status || !json.result?.download?.url) throw new Error('❌ No se pudo obtener el video.')

    await m.reply('*🌱 Descargando, por favor espera...*')

    let { metadata, download } = json.result
    let caption = `\`\`\`✦ Título: ${metadata.title}
✦ Duración: ${metadata.duration.timestamp}
✦ Vistas: ${metadata.views.toLocaleString()}
✦ Canal: ${metadata.author.name}
✦ Calidad: ${download.quality}\`\`\``.trim()

    let thumbBuffer = null
    if (metadata.thumbnail) {
      try {
        const resp = await fetch(metadata.thumbnail)
        thumbBuffer = Buffer.from(await resp.arrayBuffer())
      } catch (err) {
        console.log('No se pudo obtener la miniatura:', err.message)
      }
    }

    await conn.sendMessage(m.chat, {
      document: { url: download.url },
      caption: caption,
      mimetype: 'video/mp4',
      fileName: download.filename,
      jpegThumbnail: thumbBuffer
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al descargar el video.')
  }
}

handler.help = ['ytv-v2 <url>']
handler.tags = ['downloader']
handler.command = ['ytv-v2']

export default handler