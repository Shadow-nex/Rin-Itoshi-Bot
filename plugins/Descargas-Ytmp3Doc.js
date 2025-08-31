import axios from "axios"
import fs from "fs"

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✦ 𝙐𝙨𝙤 𝙘𝙤𝙧𝙧𝙚𝙘𝙩𝙤:\n${usedPrefix + command} https://youtu.be/TdrL3QxjyVw`

  try {
    let url = args[0]
    let api = `https://delirius-apiofc.vercel.app/download/ytmp3?url=${url}`
    let { data } = await axios.get(api)

    if (!data.status) throw `⚠️ No se pudo descargar el audio.`

    let {
      creator,
      status,
      data: {
        title,
        id,
        author,
        image,
        image_max_resolution,
        private: isPrivate,
        views,
        likes,
        comments,
        category,
        duration,
        download
      }
    } = data

    let {
      filename,
      quality,
      size,
      bytes_size,
      extension,
      url: downloadUrl
    } = download

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
    let thumb = (await axios.get(image, { responseType: "arraybuffer" })).data

    await conn.sendMessage(m.chat, {
      document: { url: downloadUrl },
      mimetype: "audio/mpeg",
      fileName: filename,
      jpegThumbnail: thumb,
      caption: `🎵 ${title}`
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