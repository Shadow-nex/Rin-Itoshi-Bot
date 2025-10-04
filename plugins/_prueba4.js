import fetch from 'node-fetch'

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('🎬 Ingresa el nombre del anime.\n\nEjemplo: *.anime naruto*')

  try {
    // Llamada principal a la API de MyAnimeList
    let res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`)
    let data = await res.json()

    if (!data || !data.data || data.data.length === 0)
      return m.reply('❌ No se encontraron resultados para ese anime.')

    let anime = data.data[0]

    // Traducciones básicas
    const traducciones = {
      "TV": "Serie de TV",
      "Movie": "Película",
      "OVA": "OVA",
      "ONA": "ONA (Web)",
      "Special": "Especial",
      "Finished Airing": "Finalizado",
      "Currently Airing": "En emisión",
      "Not yet aired": "Aún no emitido"
    }

    let tipo = traducciones[anime.type] || anime.type || 'Desconocido'
    let estado = traducciones[anime.status] || anime.status || 'Desconocido'
    let episodios = anime.episodes ? `${anime.episodes} episodio(s)` : 'Desconocido'
    let puntuacion = anime.score ? `${anime.score}/10` : 'Sin puntuación'
    let fecha = anime.aired?.string ? anime.aired.string.replace('to', 'a') : 'No disponible'
    let sinopsis = anime.synopsis ? anime.synopsis.replace(/&#039;|&quot;/g, "'") : 'Sin descripción disponible'
    let imagen = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url

    let info = `🎬 *${anime.title}*\n\n`
    info += `📺 Tipo: ${tipo}\n`
    info += `🎞️ Episodios: ${episodios}\n`
    info += `🗓️ Fecha de emisión: ${fecha}\n`
    info += `📡 Estado: ${estado}\n`
    info += `⭐ Puntuación: ${puntuacion}\n\n`
    info += `📝 *Sinopsis:*\n${sinopsis}\n`

    // Botones interactivos
    let buttons = [
      {
        buttonId: `.episodios ${anime.title}`,
        buttonText: { displayText: '📺 Ver episodios' },
        type: 1
      },
      {
        buttonId: `.descargar ${anime.title}`,
        buttonText: { displayText: '⬇️ Descargar anime' },
        type: 1
      }
    ]

    await conn.sendMessage(m.chat, {
      image: { url: imagen },
      caption: info,
      footer: '🌸 Rin Itoshi Bot - Sistema Anime',
      buttons,
      headerType: 4
    })

  } catch (err) {
    console.error(err)
    m.reply('⚠️ Ocurrió un error al obtener los datos del anime.')
  }
}

handler.help = ['anime <nombre>']
handler.tags = ['anime']
handler.command = /^anime$/i

export default handler
