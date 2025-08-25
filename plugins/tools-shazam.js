import acrcloud from 'acrcloud'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import { tmpdir } from 'os'
import path from 'path'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (!/video|audio/.test(mime)) 
    return conn.reply(m.chat, `🌷 Etiqueta un *audio o video corto* con *${usedPrefix + command}* para reconocer la música.`, m)

  let buffer = await q.download()
  if (!buffer) return conn.reply(m.chat, "❌ No pude descargar el archivo.", m)

  let tmpInput = path.join(tmpdir(), `input_${Date.now()}.mp4`)
  let tmpOutput = path.join(tmpdir(), `sample_${Date.now()}.mp3`)
  fs.writeFileSync(tmpInput, buffer)

  await new Promise((resolve, reject) => {
    ffmpeg(tmpInput)
      .audioCodec('libmp3lame')
      .duration(15)
      .save(tmpOutput)
      .on('end', resolve)
      .on('error', reject)
  })

  let sample = fs.readFileSync(tmpOutput)

  let res
  try {
    res = await acr.identify(sample)
  } catch (e) {
    return conn.reply(m.chat, `⚠️ Error al contactar con ACRCloud: ${e.message}`, m)
  }

  let { status, metadata } = res
  if (status.code !== 0 || !metadata?.music?.length)
    return conn.reply(m.chat, "❌ No se pudo reconocer la canción.", m)

  let { title, artists, album, genres, release_date } = metadata.music[0]
  let txt = `╭─⬣「 *Whatmusic Tools* 」⬣
│  🎵 *Titulo:* ${title}
│  👤 *Artista:* ${artists?.map(v => v.name).join(', ') || 'Desconocido'}
│  📚 *Álbum:* ${album?.name || 'Desconocido'}
│  🪴 *Género:* ${genres?.map(v => v.name).join(', ') || 'N/A'}
│  📅 *Fecha:* ${release_date || 'N/A'}
╰─⬣`

  conn.reply(m.chat, txt, m)

  fs.unlinkSync(tmpInput)
  fs.unlinkSync(tmpOutput)
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
handler.register = true
export default handler