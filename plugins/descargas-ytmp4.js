import fetch from 'node-fetch'
import yts from 'yt-search'

function formatDuration(seconds) {
  let h = Math.floor(seconds / 3600)
  let m = Math.floor((seconds % 3600) / 60)
  let s = seconds % 60
  return [h, m, s]
    .map(v => v.toString().padStart(2, '0'))
    .join(':')
}

function formatViews(views) {
  return Intl.NumberFormat('en-US').format(views)
}

function formatSize(bytes) {
  if (!bytes) return 'Desconocido'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let q = args[0]
  if (!q) {
    return conn.sendMessage(m.chat, {
      text: `✨ Ingresa la URL de YouTube.\n\n🌿 Ejemplo:\n> *${usedPrefix + command} https://youtube.com/watch?v=nlXqp3FVrq8*`
    }, { quoted: m })
  }

  try {
    let search = await yts({ videoId: q.split('v=')[1] || q })
    let video = search && search.url ? search : (await yts(q)).videos[0]
    if (!video) throw new Error('❌ No se encontró el video.')

    let api = `https://gokublack.xyz/download/ytmp4?url=${encodeURIComponent(video.url)}`
    let res = await fetch(api)
    if (!res.ok) throw await res.text()

    let json = await res.json()
    if (!json.status || !json.data?.downloadURL) {
      throw new Error('No se pudo obtener el video.')
    }

    let { title, format, downloadURL } = json.data

    let info = `
⊜─⌈ 📻 ◜YouTube MP4◞ 📻 ⌋─⊜

≡ 🎵 Título : ${video.title}
≡ 📺 Canal : ${video.author?.name || "Desconocido"}
≡ ⏳ Duración : ${formatDuration(video.duration.seconds)}
≡ 👀 Vistas : ${formatViews(video.views)}
≡ 📅 Publicado : ${video.ago}
≡ 🍂 Peso : ${formatSize(json.data.size || 0)}
≡ 🔗 Enlace : ${video.url}
≡ 🌳 Calidad : 360p
    `.trim()

    await conn.sendMessage(m.chat, {
      video: { url: downloadURL },
      mimetype: 'video/mp4',
      fileName: `${title}.${format}`,
      caption: info
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    conn.sendMessage(m.chat, {
      text: `Error al procesar el video.\n\nIntenta con otro link.`
    }, { quoted: m })
  }
}

handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
handler.command = ['ytmp4']

export default handler