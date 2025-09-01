import acrcloud from 'acrcloud'

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || q.mediaType || ''
    
    if (!/video|audio/.test(mime)) {
      return conn.reply(m.chat, `🎵 *Usa el comando así:*\n\nEtiqueta un audio o video corto con: *${usedPrefix + command}* para intentar reconocer la canción.`, m)
    }

    const buffer = await q.download()
    if (!buffer) throw '❌ No se pudo descargar el archivo. Intenta nuevamente.'

    const result = await acr.identify(buffer)
    const { status, metadata } = result

    if (status.code !== 0) throw status.msg || '❌ No se pudo identificar la canción.'

    const music = metadata.music?.[0]
    if (!music) throw '❌ No se encontró información de la canción.'

    const { title, artists, album, genres, release_date } = music

    const info = `
╭─────────────๑🌌๑
│  *🎶 Canción detectada:*
├─────────────๑🎧๑
│ 🏷️ *Título:* ${title || 'Desconocido'}
│ 👤 *Artista:* ${artists?.map(v => v.name).join(', ') || 'Desconocido'}
│ 💿 *Álbum:* ${album?.name || 'Desconocido'}
│ 🎼 *Género:* ${genres?.map(v => v.name).join(', ') || 'Desconocido'}
│ 📅 *Lanzamiento:* ${release_date || 'Desconocida'}
╰─────────────๑✨๑
`.trim()

    await conn.reply(m.chat, info, m)
   await conn.reply(m.chat, `${album?.name || 'Desconocido'}`, m)
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `❌ Error al identificar la música:\n${e}`, m)
  }
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
handler.register = true

export default handler