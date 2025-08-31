import axios from "axios"

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✦ Uso correcto:\n${usedPrefix + command} https://youtu.be/TdrL3QxjyVw`

  try {
    let url = args[0]
    let api = `https://delirius-apiofc.vercel.app/download/ytmp3?url=${url}`
    let { data } = await axios.get(api)

    if (!data.status) throw `⚠️ No se pudo descargar el audio.`

    let {
      title,
      author,
      image,
      views,
      likes,
      comments,
      category,
      duration,
      download
    } = data.data

    let { filename, quality, size, url: downloadUrl } = download

    let info = `*[YOUTUBE - YTMP3DOC]*
> ✦ *Título:* ${title}
> ✦ *Autor:* ${author}
> ✦ *Duración:* ${duration}s
> ✦ *Calidad:* ${quality}
> ✦ *Tamaño:* ${size}
> ✦ *Vistas:* ${views}
> ✦ *Likes:* ${likes}
> ✦ *Comentarios:* ${comments}
> ✦ *Categoría:* ${category}
> ✦ *Archivo:* ${filename}
    `.trim()

    await conn.sendMessage(m.chat, { text: info }, { quoted: m })

    let response = await axios.get(downloadUrl, { responseType: "arraybuffer" })
    let buffer = response.data
    let thumb = (await axios.get(image, { responseType: "arraybuffer" })).data

    await conn.sendMessage(m.chat, {
      document: buffer,
      mimetype: "audio/mpeg",
      fileName: filename,
      jpegThumbnail: thumb,
      caption: ` ${title}`
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    throw `❌ Error: ${e.message}`
  }
}

handler.help = ["ytmp3doc"]
handler.tags = ["downloader"]
handler.command = ["ytmp3doc"]

export default handler