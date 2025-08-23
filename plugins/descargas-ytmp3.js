import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `🌱 Ingresa el nombre de la canción o un enlace de YouTube.\n\n. Ejemplo: ${usedPrefix + command} DJ Malam Pagi`,
        m
      )
    }

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } })

    // 🔍 Buscar en YouTube con yt-search
    let search = await yts(text)
    let video = search.videos[0] // el primer resultado
    if (!video) {
      return conn.reply(m.chat, '❌ No se encontró ningún resultado en YouTube.', m)
    }

    // 🎵 Llamar a la API usando el título del video
    const apiUrl = `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(video.url)}`
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json?.resultado?.descargar?.url) {
      return conn.reply(m.chat, '❌ No se pudo obtener el audio, intenta con otro nombre o link.', m)
    }

    const meta = json.resultado.metadatos
    const dl = json.resultado.descargar

    const textoInfo = `✿  𝗬𝗔𝗦𝗦𝗨 - 𝗬𝗧 𝗠𝗣𝟯 🌲

🍂 *Título:* ${meta.title}
⏱️ *Duración:* ${meta.duración?.marca_de_tiempo || video.timestamp || 'Desconocida'}
🍰 *Canal:* ${meta.autor?.nombre || video.author?.name || 'Desconocido'}
👀 *Vistas:* ${meta.vistas?.toLocaleString('es-PE') || video.views?.toLocaleString('es-PE') || '0'}
🌱 *Publicado:* ${meta.ago || video.ago || 'Desconocido'}
🔗 *Link:* ${meta.url || video.url}

*➤ El audio está en camino... 🌸💖*`

    await conn.sendMessage(
      m.chat,
      {
        text: textoInfo,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: meta.title || video.title,
            body: "📥 Descargando desde YouTube",
            thumbnailUrl: meta.imagen || video.thumbnail,
            sourceUrl: meta.url || video.url,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    )

    // 📥 Enviar audio
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: dl.url },
        fileName: dl.filename || `${meta.title}.mp3`,
        mimetype: 'audio/mpeg',
        contextInfo: { isForwarded: true }
      },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    console.error('❌ Error en ytplaymp3:', e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    await conn.reply(m.chat, `❌ *Error:* ${e.message}`, m)
  }
}

handler.command = ['ytmp3', 'song']
handler.tags = ['descargas']
handler.help = ['ytmp3 <texto o link>', 'song <texto>']

export default handler