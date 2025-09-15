import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(
    `☁️ Ingresa el nombre de la canción o video que quieres buscar.\n\nEjemplo:\n*${usedPrefix + command} DJ Malam Pagi Slowed*`
  )

  try {
    let api = `https://api.vreden.my.id/api/ytplaymp4?query=${encodeURIComponent(text)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.result?.status) return m.reply('No se pudo obtener el video.')

    let meta = json.result.metadata
    let down = json.result.download

    let caption = `
⊜─⌈ 📻 ◜YouTube MP4◞ 📻 ⌋─⊜
≡ 🌿 *Título:* ${meta.title || '-'}
≡ 🌷 *Autor:* ${meta.author?.name || '-'}
≡ 🌱 *Duración:* ${meta.duration?.timestamp || meta.timestamp || '-'}
≡ 🌤️ *Publicado:* ${meta.ago || '-'}
≡ ⭐ *Vistas:* ${meta.views?.toLocaleString() || '-'}
≡ 🎋 *Calidad:* ${down.quality || '-'}
≡ 🍏 *URL:* ${meta.url || '-'}`

    await conn.sendMessage(m.chat, {
      image: { url: meta.thumbnail || meta.image },
      caption,
      contextInfo: {
        externalAdReply: {
          title: meta.title,
          body: `Autor: ${meta.author?.name || 'Desconocido'}`,
          thumbnailUrl: meta.thumbnail,
          mediaType: 1,
          showAdAttribution: true,
          sourceUrl: meta.url
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      video: { url: down.url },
      fileName: down.filename || 'video.mp4',
      mimetype: 'video/mp4',
      caption: `✅ Aquí tienes tu video en ${down.quality || 'desconocida'}`
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al procesar la solicitud, intenta nuevamente.')
  }
}

handler.help = ['ytmp4 *<texto>*']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'playmp4']

export default handler
