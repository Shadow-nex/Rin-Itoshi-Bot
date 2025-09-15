import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(
    `☁️ Ingresa el nombre de la canción o video que quieres buscar.\n\nEjemplo:\n*${usedPrefix + command} DJ Malam Pagi Slowed*`
  )
  await conn.sendMessage(m.chat, {
    text: `૮₍｡˃ ᵕ ˂ ｡₎ა 🫛 *¡Descargando tu video!*`
  }, { quoted: m })

  try {
    let api = `https://api.vreden.my.id/api/ytplaymp4?query=${encodeURIComponent(text)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.result?.status) return m.reply('❌ No se pudo obtener el video.')

    let meta = json.result.metadata
    let down = json.result.download

    let caption = `⊜─⌈ 📻 ◜YouTube MP4◞ 📻 ⌋─⊜
≡ 🌿 *Título:* ${meta.title || '-'}
≡ 🌷 *Autor:* ${meta.author?.name || '-'}
≡ 🌱 *Duración:* ${meta.duration?.timestamp || meta.timestamp || '-'}
≡ 🌤️ *Publicado:* ${meta.ago || '-'}
≡ ⭐ *Vistas:* ${meta.views?.toLocaleString() || '-'}
≡ 🎋 *Calidad:* ${down.quality || '-'}
≡ 🍏 *URL:* ${meta.url || '-'}`

    let head = await fetch(down.url, { method: "HEAD" })
    let fileSize = head.headers.get("content-length") || 0
    let fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2)

    if (fileSizeMB >= 50) {
      await conn.sendMessage(m.chat, {
        document: { url: down.url },
        fileName: down.filename || `${meta.title || 'video'}.mp4`,
        mimetype: 'video/mp4',
        caption: `${caption}\n\n≡ 📦 *Peso:* ${fileSizeMB} MB\n📂 Enviado como documento por superar 50 MB`
      }, { quoted: m })
    } else {
      await conn.sendMessage(m.chat, {
        video: { url: down.url },
        fileName: down.filename || 'video.mp4',
        mimetype: 'video/mp4',
        caption: `${caption}\n\n≡ 📦 *Peso:* ${fileSizeMB} MB`
      }, { quoted: m })
    }

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al procesar la solicitud, intenta nuevamente.')
  }
}

handler.help = ['ytmp4 *<texto>*']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'playmp4']

export default handler