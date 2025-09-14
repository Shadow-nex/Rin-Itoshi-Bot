//▪CÓDIGO BY DEVBRAYAN PRROS XD▪
//▪ROXY BOT MD▪

import { writeFile, unlink, readFile } from 'fs/promises'
import { join } from 'path'
import { fileTypeFromBuffer } from 'file-type'

let handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: '☁️', key: m.key } })

  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply('🌧️ *Responde a un archivo o media para subirlo.*')

    const media = await q.download()
    if (!media) return m.reply('⛅ *Error al descargar el archivo.*')

    const uploads = []

    const up1 = await uploaderCloudStack(media).catch(() => null)
    if (up1) uploads.push({ name: '☁️ CloudStack', url: up1 })

    const up2 = await uploaderCloudGuru(media).catch(() => null)
    if (up2) uploads.push({ name: '🌀 CloudGuru', url: up2 })

    const up3 = await uploaderCloudCom(media).catch(() => null)
    if (up3) uploads.push({ name: '🌐 CloudImages', url: up3 })

    if (uploads.length === 0) throw '⛈️ *No se pudo subir a ningún servidor. Intenta de nuevo más tarde.*'

    let texto = `☁️ *Resultado de la Subida*\n*━━━━━━━━━━━━━━━━━━━━*\n\n`
    for (const up of uploads) {
      texto += `*${up.name}*\n🔗 ${up.url}\n\n`
    }

    await conn.sendMessage(m.chat, {
      text: texto.trim(),
      contextInfo: {
        externalAdReply: {
          title: 'Uploader Tools ☁️',
          body: 'Enlaces generados desde servidores externos',
          thumbnailUrl: uploads[0]?.url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: typeof e === 'string' ? e : '⛈️ *Ocurrió un error inesperado durante la subida.*',
      quoted: m
    })
  } finally {
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key } })
  }
}

handler.help = ['url']
handler.tags = ['tools']
handler.command = ['url']
handler.limit = true
handler.register = true

export default handler

// Función genérica para subir el buffer a un servidor
async function uploadTo(url, buffer) {
  const { ext, mime } = await fileTypeFromBuffer(buffer) || {}
  if (!ext || !mime) throw new Error('Formato de archivo no reconocido.')

  const tempPath = join('./tmp', `upload.${ext}`)
  await writeFile(tempPath, buffer)
  const fileData = await readFile(tempPath)

  const form = new FormData()
  form.append('file', new File([fileData], `upload.${ext}`, { type: mime }))

  try {
    const res = await fetch(url, { method: 'POST', body: form })
    const json = await res.json()
    await unlink(tempPath).catch(() => null)

    if (json?.status !== 'success' || !json?.data?.url) throw new Error('Error al subir el archivo.')
    return json.data.url
  } catch (err) {
    console.error(`Error subiendo a (${url}):`, err)
    await unlink(tempPath).catch(() => null)
    return null
  }
}

// URLs de los servicios de subida
const uploaderCloudStack = buffer =>
  uploadTo('https://phpstack-1487948-5667813.cloudwaysapps.com/upload.php', buffer)

const uploaderCloudGuru = buffer =>
  uploadTo('https://cloudkuimages.guru/upload.php', buffer)

const uploaderCloudCom = buffer =>
  uploadTo('https://cloudkuimages.com/upload.php', buffer)
