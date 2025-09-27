import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*✎ Ingresa un título o link de YouTube*`)

  try {
    let url = ''
    let title = ''

    if (/^https?:\/\/(www\.)?youtu/.test(text)) {
      url = text
    } else {
      let search = await yts(text)
      if (!search.videos.length) return m.reply('❌ No encontré resultados.')
      url = search.videos[0].url
      title = search.videos[0].title
    }

    await m.reply('*🌿 Buscando...*')

    let videoInfo = await yts({ videoId: url.split('v=')[1] || url.split('/').pop() })
    let thumb = videoInfo?.thumbnail || null
    let videoTitle = videoInfo?.title || title || 'Video'

    let caption = `\`\`\`✦ Título: ${videoTitle}
✦ Selecciona la calidad para descargar:\`\`\``

    let buttons = [
      { buttonId: `${usedPrefix + command} ${url} 360`, buttonText: { displayText: "📹 360p" }, type: 1 },
      { buttonId: `${usedPrefix + command} ${url} 480`, buttonText: { displayText: "🎥 480p" }, type: 1 },
      { buttonId: `${usedPrefix + command} ${url} 720`, buttonText: { displayText: "📺 720p" }, type: 1 }
    ]

    await conn.sendMessage(m.chat, {
      image: { url: thumb },
      caption,
      footer: "🌸 Usa los botones para elegir calidad",
      buttons,
      headerType: 4
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al procesar la búsqueda.')
  }
}

let downloadHandler = async (m, { conn, args }) => {
  if (!args[0]) return
  let url = args[0]
  let quality = args[1] || "480"

  try {
    await m.reply(`*📥 Descargando en ${quality}p, espera un momento...*\n> Soy muy lento 😢`)

    let api = `https://api.sylphy.xyz/download/ytmp4v2?url=${encodeURIComponent(url)}&q=${quality}&apikey=sylphy-8ff8`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.status || !json.result?.dl_url) throw new Error("No se pudo descargar el video")

    let { result } = json

    await conn.sendMessage(m.chat, {
      document: { url: result.dl_url },
      caption: `\`\`\`✦ Título: ${result.title}
✦ Calidad: ${result.format}\`\`\``,
      mimetype: 'video/mp4',
      fileName: `${result.title || 'video'}.mp4`
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    m.reply("⚠️ Error al descargar el video.")
  }
}

handler.help = ['ytv-v2 <url|título>']
handler.tags = ['downloader']
handler.command = ['ytv-v2']

// segundo handler para cuando se presiona el botón jsjsj
downloadHandler.command = ['ytv-v2']
downloadHandler.tags = ['downloader']
downloadHandler.help = ['ytv-v2 <url> <calidad>']

export default handler