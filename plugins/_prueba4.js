import fetch from 'node-fetch'

let handler = async (m, { text, conn, args }) => {
  try {
    // ----------------------------
    // 1️⃣ Si el comando es ".anime"
    // ----------------------------
    if (m.text.startsWith('.anime')) {
      if (!text) return m.reply('🎬 Ingresa el nombre del anime.\nEjemplo: *.anime naruto*')

      let res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`)
      let data = await res.json()
      if (!data?.data?.length) return m.reply('❌ No se encontró el anime.')

      let anime = data.data[0]
      let imagen = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url

      let traducciones = {
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

      let info = `🎬 *${anime.title}*\n\n📺 Tipo: ${tipo}\n🎞️ Episodios: ${episodios}\n🗓️ Fecha de emisión: ${fecha}\n📡 Estado: ${estado}\n⭐ Puntuación: ${puntuacion}\n\n📝 *Sinopsis:*\n${sinopsis}\n\n🔗 Más info: ${anime.url}`

      let buttons = [
        { buttonId: `.episodios ${anime.title}`, buttonText: { displayText: '📺 Ver episodios' }, type: 1 },
        { buttonId: `.descargar ${anime.title}`, buttonText: { displayText: '⬇️ Descargar anime completo' }, type: 1 }
      ]

      await conn.sendMessage(m.chat, {
        image: { url: imagen },
        caption: info,
        footer: '🌸 Rin Itoshi Bot - Sistema Anime',
        buttons,
        headerType: 4
      })
      return
    }

    // ----------------------------
    // 2️⃣ Si el comando es ".episodios"
    // ----------------------------
    if (m.text.startsWith('.episodios')) {
      if (!args || !args[0]) return m.reply('🎬 Escribe el nombre del anime.\nEjemplo: *.episodios naruto*')

      let animeName = args.join(' ')
      let res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(animeName)}&limit=1`)
      let data = await res.json()
      if (!data?.data?.length) return m.reply('❌ No se encontró el anime.')

      let anime = data.data[0]
      let id = anime.mal_id

      let epsRes = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`)
      let epsData = await epsRes.json()
      if (!epsData?.data?.length) return m.reply(`📭 No hay episodios disponibles para *${anime.title}*.`)

      let botones = epsData.data.slice(0, 10).map(ep => ({
        buttonId: `.verep ${id} ${ep.mal_id}`,
        buttonText: { displayText: `${ep.mal_id}. ${ep.title || 'Episodio'}` },
        type: 1
      }))

      await conn.sendMessage(m.chat, {
        text: `🎬 *${anime.title}*\n📺 Selecciona un episodio para verlo o descargarlo:`,
        footer: '🌸 Rin Itoshi Bot - Episodios',
        buttons: botones,
        headerType: 1
      })
      return
    }

    // ----------------------------
    // 3️⃣ Si el comando es ".verep" -> Ver episodio
    // ----------------------------
    if (m.text.startsWith('.verep')) {
      if (!args || args.length < 2) return m.reply('❌ Uso: .verep <id_anime> <num_episodio>')
      let [animeId, epNum] = args

      // Aquí simulamos el enlace MP4 (reemplazar por tu API real)
      let videoUrl = `https://example.com/anime/${animeId}/episode/${epNum}.mp4`

      let buttons = [
        { buttonId: `.descargarep ${animeId} ${epNum}`, buttonText: { displayText: '⬇️ Descargar' }, type: 1 }
      ]

      await conn.sendMessage(m.chat, {
        video: { url: videoUrl },
        caption: `🎬 Episodio ${epNum}\n📺 Anime ID: ${animeId}`,
        footer: '🌸 Rin Itoshi Bot - Anime',
        buttons,
        headerType: 4
      })
      return
    }

    // ----------------------------
    // 4️⃣ Si el comando es ".descargarep" -> Descargar episodio
    // ----------------------------
    if (m.text.startsWith('.descargarep')) {
      if (!args || args.length < 2) return m.reply('❌ Uso: .descargarep <id_anime> <num_episodio>')
      let [animeId, epNum] = args

      let videoUrl = `https://example.com/anime/${animeId}/episode/${epNum}.mp4`
      m.reply(`⬇️ Aquí está tu enlace de descarga del episodio ${epNum}:\n${videoUrl}`)
      return
    }

    // ----------------------------
    // 5️⃣ Si el comando es ".descargar" -> Descargar anime completo
    // ----------------------------
    if (m.text.startsWith('.descargar')) {
      if (!args || !args[0]) return m.reply('❌ Uso: .descargar <nombre del anime>')
      let animeName = args.join(' ')
      m.reply(`⬇️ Enlace de descarga completo de *${animeName}*:\nhttps://example.com/anime/completo/${encodeURIComponent(animeName)}.zip`)
      return
    }

  } catch (err) {
    console.error(err)
    m.reply('⚠️ Ocurrió un error en el sistema anime.')
  }
}

handler.help = ['anime <nombre>']
handler.tags = ['anime']
handler.command = /^(anime|episodios|verep|descargarep|descargar)$/i
export default handler
