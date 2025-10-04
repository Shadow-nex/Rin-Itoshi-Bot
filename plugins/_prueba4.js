import fetch from 'node-fetch'

let handler = async (m, { text }) => {
  if (!text) return m.reply('🎬 Ingresa el nombre del anime.\n\nEjemplo: *.episodios naruto*')

  try {
    // Llamada a la API
    let res = await fetch(`https://api-nv.eliasaryt.pro/api/animedl?query=${encodeURIComponent(text)}&key=hYSK8YrJpKRc9jSE`)
    let data = await res.json()

    if (!data || !data.data || data.data.length === 0)
      return m.reply('❌ No se encontraron resultados para ese anime.')

    let anime = data.data[0]
    let title = anime.title || text
    let episodes = anime.episodes || []

    if (episodes.length === 0)
      return m.reply(`📭 No hay episodios disponibles para *${title}*.`)

    let msg = `🎬 *${title}*\n\n📺 *Lista de Episodios:*\n\n`
    for (let i = 0; i < Math.min(episodes.length, 20); i++) {
      let ep = episodes[i]
      msg += `🔹 *${ep.title || `Episodio ${i + 1}`}*\n`
      if (ep.url) msg += `🔗 ${ep.url}\n`
      msg += '\n'
    }

    if (episodes.length > 20)
      msg += `...y ${episodes.length - 20} más\n`

    m.reply(msg)

  } catch (err) {
    console.error(err)
    m.reply('⚠️ Error al obtener la lista de episodios.')
  }
}

handler.help = ['episodios <nombre>']
handler.tags = ['anime']
handler.command = /^episodios$/i

export default handler
