/*import yts from 'yt-search'
import fetch from 'node-fetch'

const getBuffer = async (url) => {
  const res = await fetch(url)
  return await res.buffer()
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return m.reply(
        `🍂 Ingresa el nombre de la canción o un link de YouTube.\n\n` +
        `✎ Ejemplo: *${usedPrefix + command}* Fade Alan Walker`
      )
    }

    await conn.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } })

    // Buscar en YouTube
    const busqueda = await yts(text)
    const data = busqueda.all.filter(v => v.type === 'video')
    if (data.length === 0) return m.reply("❌ No encontré resultados.")

    const res = data[0]
    const thumbUrl = `https://i.ytimg.com/vi/${res.videoId}/hqdefault.jpg`
    const inithumb = await getBuffer(thumbUrl)

    // Mensaje decorado
    const caption = 
`╔◡╍┅•.⊹︵᷼𖥓┅╲۪⦙᷼᷼͝͝⦙╱𖥓 ︵᷼⊹┅╍◡╗
┋ ⣿̶⃚̶̸〪ׅ⃕݊⃧͝ *DESCARGA DE AUDIO YOUTUBE* ┋
╚◠┅┅˙•⊹.⁀𖥓 ╍╲۪ ⦙᷼᷼͝͝⦙ ╱𖥓 ◠˙⁀⊹˙╍┅◠╝

🎶 *Título:* ${res.title}
📺 *Canal:* ${res.author.name}
👀 *Vistas:* ${res.views}
⏱️ *Duración:* ${res.timestamp}
🔗 *Enlace:* ${res.url}

⏳ Enviando audio...
`

    // Enviar preview con thumbnail
    await conn.sendMessage(m.chat, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: '🎵 ' + res.title,
          body: '⏱️ ' + new Date().toLocaleString(),
          mediaType: 2,
          renderLargerThumbnail: true,
          thumbnail: inithumb,
          mediaUrl: res.url,
          sourceUrl: res.url
        }
      },
      image: { url: thumbUrl },
      caption
    }, { quoted: m })

    // Descargar audio desde la API
    const audioUrl = `https://ochinpo-helper.hf.space/download?url=${encodeURIComponent(res.url)}&type=audio`

    const nt = await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: `${res.title}.mp3`,
      ptt: true // si quieres que sea nota de voz
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: '🎶', key: nt.key } })

  } catch (err) {
    console.error(err)
    m.reply(`❌ Ocurrió un error: ${err.message}`)
  }
}*/

import fetch from 'node-fetch'

function formatBytes(bytes) {
  if (!bytes || isNaN(bytes)) return "Desconocido"
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

function translateViews(str) {
  if (!str) return str
  return str
    .replace(/visualizações/gi, "visitas")
    .replace(/\bmi\b/gi, "M")
    .replace(/\bbi\b/gi, "B")
}

function translatePublished(str) {
  if (!str) return str
  return str
    .replace(/há/gi, "hace")
    .replace(/anos?/gi, "años")
    .replace(/meses?/gi, "meses")
    .replace(/dias?/gi, "días")
    .replace(/semanas?/gi, "semanas")
    .replace(/horas?/gi, "horas")
    .replace(/minutos?/gi, "minutos")
    .replace(/segundos?/gi, "segundos")
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🌸 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` stay`)
  }

  try {
    let api = `https://api.nexfuture.com.br/api/downloads/youtube/playaudio/v2?query=${encodeURIComponent(text)}`
    let res = await fetch(api)
    if (!res.ok) throw new Error(`❌ Error al obtener datos de la API (${res.status})`)

    let json = await res.json()
    if (!json.status || !json.resultado?.result) throw new Error("⚠️ No se encontraron resultados.")

    let info = json.resultado.result
    let video = info.video
    let channel = info.channel
    let downloads = info.downloads?.audio

    let title = video.title
    let url = video.url
    let duration = video.duration
    let views = translateViews(video.shortViewCount || video.views)
    let published = translatePublished(video.published)
    let thumbnail = video.thumbnails?.[1]?.url || video.thumbnails?.[0]?.url
    let downloadUrl = downloads?.config || downloads?.any4k
    let fileName = `${title}.mp3`

    let sizeStr = "Desconocido"
    try {
      let head = await fetch(downloadUrl, { method: "HEAD" })
      let size = head.headers.get("content-length")
      if (size) sizeStr = formatBytes(parseInt(size))
    } catch (e) {
      console.log("❌ No se pudo obtener tamaño:", e.message)
    }

    let caption = `🍂 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗘𝗡 𝗠𝗔𝗥𝗖𝗔 𝗣𝗥𝗢𝗚𝗥𝗘𝗦𝗢

°^☘️ [▓▓▓▓▓░░░░░░░] 50% Completado

= 🌱 *Título :* ${title}
= 🍂 *Canal:* ${channel.name}
= ⏰ *Duración :* ${duration}
= ⚡ *Vistas:* ${views}
= 🧪 *Publicado:* ${published}
= 📦 *Tamaño :* ${sizeStr}
= ⚡ *Link :* ${url}

= ⌛ *Estado:* Preparando el audio, espera un momento...
`

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: caption,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: channel.name,
          mediaType: 1,
          thumbnailUrl: thumbnail,
          sourceUrl: url
        }
      }
    }, { quoted: m })


    if (downloadUrl) {
      await conn.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName,
        mimetype: 'audio/mpeg',
        caption: `🎵 ${title}`,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: `🧪 YOUTUBE DOC 💎`,
            mediaUrl: url,
            sourceUrl: url,
            thumbnailUrl: thumbnail,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      }, { quoted: m })
    } else {
      m.reply("⚠️ No se encontró enlace de descarga para el audio.")
    }

  } catch (err) {
    console.error(err)
    m.reply(`❌ Ocurrió un error:\n${err.message}`)
  }
}

handler.help = ['playochi <texto|link>', 'ytaudioochi <texto|link>']
handler.tags = ['downloader']
handler.command = /^playochi|ytaudioochi$/i

export default handler