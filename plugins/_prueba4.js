import fetch from 'node-fetch'

let handler = async (m, { text }) => {
  if (!text) return m.reply('🎬 Ingresa el nombre del anime.\n\nEjemplo: *.anime naruto*')

  try {
    // API de Jikan (MyAnimeList)
    let res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`)
    let data = await res.json()

    if (!data || !data.data || data.data.length === 0)
      return m.reply('❌ No se encontraron resultados para ese anime.')

    let anime = data.data[0]

    let info = `🎬 *${anime.title}*\n`
    if (anime.title_japanese) info += `🇯🇵 Título japonés: ${anime.title_japanese}\n`
    if (anime.type) info += `📺 Tipo: ${anime.type}\n`
    if (anime.episodes) info += `🎞️ Episodios: ${anime.episodes}\n`
    if (anime.aired?.string) info += `🗓️ Emitido: ${anime.aired.string}\n`
    if (anime.status) info += `📡 Estado: ${anime.status}\n`
    if (anime.score) info += `⭐ Puntuación: ${anime.score}\n`
    if (anime.synopsis) info += `\n📝 *Sinopsis:*\n${anime.synopsis}\n`
    if (anime.url) info += `\n🔗 *Más info:* ${anime.url}`

    // Imagen del anime
    let img = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url

    await m.conn.sendFile(m.chat, img, 'anime.jpg', info, m)
  } catch (err) {
    console.error(err)
    m.reply('⚠️ Error al obtener la información del anime.')
  }
}

handler.help = ['anime <nombre>']
handler.tags = ['anime']
handler.command = /^anime$/i

export default handler
