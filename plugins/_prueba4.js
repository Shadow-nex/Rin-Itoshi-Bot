import fetch from 'node-fetch'

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('🎬 Escribe el nombre del anime.\n\nEjemplo: *.episodios naruto*')

  try {
    // Buscamos el anime por nombre
    let res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`)
    let data = await res.json()

    if (!data || !data.data || data.data.length === 0)
      return m.reply('❌ No se encontró ese anime.')

    let anime = data.data[0]
    let id = anime.mal_id
    let title = anime.title

    // Ahora pedimos la lista de episodios
    let epsRes = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`)
    let epsData = await epsRes.json()

    if (!epsData || !epsData.data || epsData.data.length === 0)
      return m.reply(`📭 No hay episodios listados para *${title}*.`)

    // Creamos el mensaje con los primeros 15 episodios
    let episodios = epsData.data.slice(0, 15)
    let mensaje = `🎬 *${title}*\n\n📺 *Lista de episodios disponibles:*\n\n`

    for (let ep of episodios) {
      mensaje += `🔹 *${ep.mal_id ? `Episodio ${ep.mal_id}` : ep.title}*\n`
      mensaje += ep.title ? `📘 ${ep.title}\n` : ''
      mensaje += ep.aired ? `🗓️ ${ep.aired}\n` : ''
      mensaje += '\n'
    }

    if (epsData.pagination.has_next_page) {
      mensaje += `...y hay más episodios disponibles.\nUsa: *.episodios ${title}* para ver más.\n`
    }

    // Enviar mensaje
    await conn.sendMessage(m.chat, {
      text: mensaje.trim(),
      footer: '🌸 Rin Itoshi Bot - Lista de episodios',
      buttons: [
        {
          buttonId: `.descargar ${title}`,
          buttonText: { displayText: '⬇️ Descargar este anime' },
          type: 1
        }
      ],
      headerType: 1
    })

  } catch (err) {
    console.error(err)
    m.reply('⚠️ Error al obtener los episodios del anime.')
  }
}

handler.help = ['episodios <nombre>']
handler.tags = ['anime']
handler.command = /^episodios$/i

export default handler
