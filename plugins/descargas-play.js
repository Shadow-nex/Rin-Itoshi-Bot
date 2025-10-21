import fetch from "node-fetch"
import yts from "yt-search"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim())
      return conn.reply(m.chat, `⚽ *Por favor, ingresa el nombre o enlace del video.*`, m)

    let videoIdMatch = text.match(youtubeRegexID)
    let search = await yts(videoIdMatch ? 'https://youtu.be/' + videoIdMatch[1] : text)
    let video = videoIdMatch
      ? search.all.find(v => v.videoId === videoIdMatch[1]) || search.videos.find(v => v.videoId === videoIdMatch[1])
      : search.videos?.[0]

    if (!video) return conn.reply(m.chat, '✧ No se encontraron resultados para tu búsqueda.', m)

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const vistas = formatViews(views)
    const canal = author?.name || 'Desconocido'

    const infoMessage = `
🕸️ *Titulo:* *${title}*
🌿 *Canal:* ${canal}
🍋 *Vistas:* ${vistas}
🍃 *Duración:* ${timestamp || 'Desconocido'}
📆 *Publicado:* ${ago || 'Desconocido'}
🚀 *Enlace:* ${url}`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: infoMessage,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: "",
          thumbnailUrl: thumbnail,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m })

    if (command === 'play' || command === 'playaudio') {
      try {
        const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=128`
        const res = await fetch(apiUrl)
        const json = await res.json()

        if (!json.status || !json.result?.download?.url)
          throw '*⚠ No se obtuvo un enlace de audio válido.*'

        const audioUrl = json.result.download.url
        const titulo = json.result.metadata.title || title
        const cover = json.result.metadata.thumbnail || thumbnail

        await conn.sendMessage(m.chat, {
          audio: { url: audioUrl },
          mimetype: 'audio/mpeg',
          fileName: `${titulo}.mp3`,
          contextInfo: {
            externalAdReply: {
              title: titulo,
              body: '',
              mediaType: 1,
              thumbnailUrl: cover,
              sourceUrl: url,
              renderLargerThumbnail: false
            }
          }
        }, { quoted: m })

        await m.react('🎶')
      } catch (e) {
        console.error(e)
        return conn.reply(m.chat, '*⚠ No se pudo enviar el audio. Puede ser muy pesado o hubo un error en la API.*', m)
      }
    }

    else if (command === 'playvideo' || command === 'play2') {
      try {
        const apiUrl = `https://api.stellarwa.xyz/dow/ytmp4?url=${encodeURIComponent(url)}&apikey=Shadow_Core`
        const res = await fetch(apiUrl)
        const json = await res.json()

        if (!json.status || !json.data?.dl)
          throw '⚠ No se obtuvo enlace de video válido.'

        const videoUrl = json.data.dl
        const titulo = json.data.title || title

        const caption = `> ♻️ *Título:* ${titulo}
> 🎋 *Duración:* ${timestamp || 'Desconocido'}`.trim()

        await conn.sendMessage(m.chat, {
          video: { url: videoUrl },
          caption,
          mimetype: 'video/mp4',
          fileName: `${titulo}.mp4`,
          contextInfo: {
            externalAdReply: {
              title: titulo,
              body: '',
              thumbnailUrl: thumbnail,
              sourceUrl: url,
              mediaType: 1,
              renderLargerThumbnail: false
            }
          }
        }, { quoted: m })

        await m.react('🎥')
      } catch (e) {
        console.error(e)
        return conn.reply(m.chat, '⚠ No se pudo enviar el video. Puede ser muy pesado o hubo un error en la API.', m)
      }
    }

    else {
      return conn.reply(m.chat, '✧ Comando no reconocido.', m)
    }

  } catch (err) {
    console.error(err)
    return m.reply(`⚠ Ocurrió un error:\n${err}`)
  }
}

handler.command = ['play', 'playaudio', 'playvideo', 'play2']
handler.help = ['play', 'playaudio', 'playvideo', 'play2']
handler.tags = ['descargas']
export default handler

function formatViews(views) {
  if (views === undefined) return "No disponible"
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K (${views.toLocaleString()})`
  return views.toString()
}