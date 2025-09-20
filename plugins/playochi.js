Aver agrega este 

import yts from 'yt-search'
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

    const caption = 
`
🎶 *Título:* ${res.title}
📺 *Canal:* ${res.author.name}
👀 *Vistas:* ${res.views}
⏱️ *Duración:* ${res.timestamp}
🔗 *Enlace:* ${res.url}

⏳ Enviando audio...
`
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
    
    const audioUrl = `https://ochinpo-helper.hf.space/download?url=${encodeURIComponent(res.url)}&type=audio`

    const nt = await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: `${res.title}.mp3`,
      ptt: true
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: '🎶', key: nt.key } })

  } catch (err) {
    console.error(err)
    m.reply(`❌ Ocurrió un error: ${err.message}`)
  }
}

handler.help = ['playochi <texto|link>', 'ytaudioochi <texto|link>']
handler.tags = ['downloader']
handler.command = /^playochi|ytaudioochi$/i

export default handler
