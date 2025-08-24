import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `🧪 Ingresa el nombre de la canción o un enlace de YouTube.\n\n🍂 Ejemplo: ${usedPrefix + command} DJ Malam Pagi`,
        m
      )
    }

    let search = await yts(text)
    let video = search.videos[0]
    if (!video) {
      return conn.reply(m.chat, '❌ No se encontró ningún resultado en YouTube.', m)
    }

    const apiUrl = `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(video.url)}`
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json?.result?.download?.url) {
      return conn.reply(m.chat, '❌ No se pudo obtener el audio, intenta con otro nombre o link.', m)
    }

    const meta = json.result.metadata
    const dl = json.result.download

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } })
    const textoInfo = `\`\`\`✿  𝗬𝗔𝗦𝗦𝗨 - 𝗬𝗧 𝗠𝗣𝟯 ⚽\n\n🍂 Título : ${meta.title}\n⏱️ Duración : ${meta.duration?.timestamp || video.timestamp || 'Desconocida'}\n🌱 Canal : ${meta.author?.name || video.author?.name || 'Desconocido'}\n🚀 Vistas : ${meta.views?.toLocaleString('es-PE') || video.views?.toLocaleString('es-PE') || '0'}\n🧪 Publicado : ${video.ago || 'Desconocido'}\n💨 Link : ${meta.url || video.url}
\`\`\`\n≡ Enviando, espera un momento . . .`

    await conn.sendMessage(
      m.chat,
      {
        image: { url: meta.thumbnail || video.thumbnail },
        caption: textoInfo,
        contextInfo: {
          externalAdReply: {
            title: meta.title || video.title,
            body: "🍂 Descargando desde YouTube 🧪",
            thumbnailUrl: logo,
            sourceUrl: meta.url || video.url,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: m }
    )

    const audioBuffer = await (await fetch(dl.url)).buffer()

    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      fileName: `${meta.title}.mp3`,
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: video.title,
          body: `Duracion: ${video.timestamp}`,
          mediaUrl: video.url,
          sourceUrl: video.url,
          thumbnailUrl: video.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m })

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