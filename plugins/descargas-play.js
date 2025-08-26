import fetch from "node-fetch"
import yts from "yt-search"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) return conn.reply(m.chat, `*⚽ Por favor, ingresa el nombre o enlace del video.*`, m, fake)

    let videoIdMatch = text.match(youtubeRegexID)
    let search = await yts(videoIdMatch ? 'https://youtu.be/' + videoIdMatch[1] : text)
    let video = videoIdMatch
      ? search.all.find(v => v.videoId === videoIdMatch[1]) || search.videos.find(v => v.videoId === videoIdMatch[1])
      : search.videos?.[0]

    if (!video) return conn.reply(m.chat, '✧ No se encontraron resultados para tu búsqueda.', m)

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const vistas = formatNumber(views)
    const canal = author?.name || 'Desconocido'
    await m.react('⏱️');

    const infoMessage = `🌷 \`Titulo:\`  *<${title || 'Desconocido'}>*\n\n` +
      `> 📺 \`Canal\` » *${canal}*\n` +
      `> 👁️ \`Vistas\` » *${vistas || 'Desconocido'}*\n` +
      `> ⏱ \`Duración\` » *${timestamp || 'Desconocido'}*\n` +
      `> 📆 \`Publicado\` » *${ago || 'Desconocido'}*\n` +
      `> 🔗 \`Link\` » ${url}`

    const thumb = (await conn.getFile(thumbnail))?.data
    const external = {
      contextInfo: {
        externalAdReply: {
          title: title,
          body: '🎶 Descarga en curso...',
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true
        }
      }
    }

    await conn.reply(m.chat, infoMessage, m, external)

    if (['playaudio'].includes(command)) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)
        const json = await res.json()
        if (!json.result?.download?.url) throw '⚠ No se obtuvo un enlace válido.'

        await m.react('✅');
        await conn.sendMessage(m.chat, {
          audio: { url: json.result.download.url },
          mimetype: 'audio/mpeg',
          fileName: `${json.result.title}.mp3`,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: '⚽ RIN ITOSHI - IA 🌀',
              mediaType: 1,
              thumbnail: thumb,
              mediaUrl: url,
              sourceUrl: url,
              renderLargerThumbnail: false
            }
          }
        }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el audio. El archivo podría ser demasiado pesado o hubo un error en la generación del enlace.', m)
      }
    }
    
    else if (['playvideo'].includes(command)) {
      try {
        const res = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`)
        const json = await res.json()

        if (!json.status || !json.data?.download?.url) throw '⚠ No se obtuvo enlace de video.'

        await m.react('✅');

        let caption = `\`\`\`╭━━━〔  📹  DESCARGA COMPLETA 〕━━⬣
┃ ✦ *Título:* ${json.data.title}
┃ ✦ *Canal:* ${json.data.author}
┃ ✦ *Categoría:* ${json.data.category || "Desconocida"}
┃ ✦ *Duración:* ${formatTime(json.data.duration)}
┃ ✦ *Vistas:* ${formatNumber(json.data.views)}
┃ ✦ *Likes:* ${formatNumber(json.data.likes) || "No disponible"}
┃ ✦ *Comentarios:* ${formatNumber(json.data.comments) || "No disponible"}
╰━━━━━━━━━━━━━━━━━━⬣
🔗 *Enlace:* https://youtu.be/${json.data.id}\`\`\`
        `.trim()

        await conn.sendFile(
          m.chat,
          json.data.download.url,
          `${json.data.title || 'video'}.mp4`,
          caption,
          m
        )
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el video. El archivo podría ser muy pesado o hubo un error en el enlace.', m)
      }
    }

    else {
      return conn.reply(m.chat, '✧︎ Comando no reconocido.', m)
    }

  } catch (err) {
    return m.reply(`⚠︎ Ocurrió un error:\n${err}`)
  }
}

handler.command = handler.help = ['playaudio', 'playvideo']
handler.tags = ['descargas']

export default handler


function formatNumber(num) {
  if (!num) return "No disponible"
  return num.toLocaleString("es-ES")
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}