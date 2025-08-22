/*import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return conn.reply(m.chat, `${emoji} Por favor, responda a una *Imagen* o *Vídeo.*`, m)
  await m.react(rwait)
  try {
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  let img = await (await fetch(`${link}`)).buffer()
  let txt = `乂  *L I N K - E N L A C E*  乂\n\n`
      txt += `*» Enlace* : ${link}\n`
      txt += `*» Acortado* : ${await shortUrl(link)}\n`
      txt += `*» Tamaño* : ${formatBytes(media.length)}\n`
      txt += `*» Expiración* : ${isTele ? 'No expira' : 'Desconocido'}\n\n`
      txt += `> *${dev}*`

await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, fkontak)
await m.react(done)
} catch {
await m.react(error)
}}
handler.help = ['tourl']
handler.tags = ['transformador']
handler.register = true
handler.command = ['tourl', 'upload']

export default handler

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function shortUrl(url) {
        let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
        return await res.text()
}*/

import uploadFile from '../lib/uploadFile.js' // Catbox
import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return conn.reply(m.chat, `🌸 Por favor, responde a una *Imagen* o *Vídeo*`, m)
  await m.react(rwait)

  try {
    let media = await q.download()
    let isMedia = /image\/(png|jpe?g|gif)/.test(mime)
    if (!isMedia) return conn.reply(m.chat, `⚠️ Solo imágenes permitidas.`, m)

    // 1) Catbox (funcional)
    let catbox = await uploadFile(media)

    // 2) PostImages (endpoint conocido pero requiere API key)
    let postimg = '(requiere tu API key y parámetros correctos)'

    // 3) FreeImageHost (API pública)
    let freeImgHost = await uploadToFreeImageHost(media)

    // 4) ImgBB (API pública)
    let imgbb = await uploadToImgBB(media)

    let txt = `乂  *L I N K S - E N L A C E S*  乂

*Catbox*
• Enlace: ${catbox}
• Tamaño: ${formatBytes(media.length)}
• Expiración: Permanente

*PostImages*
• Enlace: ${postimg}
• Tamaño: ${formatBytes(media.length)}
• Expiración: (según host)

*FreeImageHost*
• Enlace: ${freeImgHost || '(error)'}
• Tamaño: ${formatBytes(media.length)}
• Expiración: (según host)

*ImgBB*
• Enlace: ${imgbb || '(error)'}
• Tamaño: ${formatBytes(media.length)}
• Expiración: (según host)
`

    await conn.sendFile(m.chat, media, 'thumb.jpg', txt, m)
    await m.react(done)

  } catch (e) {
    console.log(e)
    await m.react(error)
  }
}

export default handler


function formatBytes(bytes) {
  if (!bytes) return '0 B'
  const sizes = ['B','KB','MB','GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}


async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return res.text()
}


async function uploadToFreeImageHost(media) {
  try {
    let form = new FormData()
    form.append('key', 'TU_API_KEY')
    form.append('action', 'upload')
    form.append('source', media, { filename: 'upload.jpg' })
    form.append('format', 'json')

    let res = await fetch('https://freeimage.host/api/1/upload/', {
      method: 'POST',
      body: form
    })
    let json = await res.json()
    return json.image?.url || null
  } catch {
    return null
  }
}

// ImgBB API v1 (más sencilla y pública) 1
async function uploadToImgBB(media) {
  try {
    let form = new FormData()
    form.append('key', 'TU_IMGBB_API_KEY')
    form.append('image', media.toString('base64'))

    let res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: form
    })
    let json = await res.json()
    return json.data?.url || null
  } catch {
    return null
  }
}