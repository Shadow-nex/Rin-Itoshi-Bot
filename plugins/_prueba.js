// codigo bug xd

import fetch from 'node-fetch'
import sharp from 'sharp'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✨ Pásame la URL de la imagen.\nEjemplo: .miniatura https://ejemplo.com/imagen.jpg")

  try {
    const res = await fetch(text)
    if (!res.ok) throw new Error("No se pudo descargar la imagen")
    const buffer = await res.buffer()

    let quality = 80
    let thumb
    do {
      thumb = await sharp(buffer)
        .resize(200, 200, { fit: 'inside' })
        .jpeg({ quality, chromaSubsampling: '4:2:0' })
        .toBuffer()
      quality -= 10
    } while (thumb.length > 64 * 1024 && quality > 10)

    const base64Thumb = thumb.toString("base64")

    await conn.sendMessage(m.chat, {
      image: thumb,
      caption: `✅ Aquí tienes tu imagen lista para WhatsApp (≤64KB)\n\n📦 Peso: ${(thumb.length / 1024).toFixed(1)} KB\n\n\`\`\`Código Base64:\`\`\`\n${base64Thumb.substring(0,200)}...`
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("❌ Error al procesar la imagen.")
  }
}

handler.command = /^miniatura|mini$/i
export default handler
/*


import fetch from 'node-fetch'
import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("🌱 Pásame la URL de la imagen.\nEjemplo: .miniatura https://ejemplo.com/imagen.jpg")

  try {
    const res = await fetch(text)
    if (!res.ok) throw new Error("No se pudo descargar la imagen")
    const buffer = await res.buffer()

    const img = await loadImage(buffer)

    const maxWidth = 200
    const maxHeight = 200
    let width = img.width
    let height = img.height

    if (width > maxWidth || height > maxHeight) {
      const scale = Math.min(maxWidth / width, maxHeight / height)
      width = Math.round(width * scale)
      height = Math.round(height * scale)
    }

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height)

    let quality = 0.8
    let thumb
    do {
      thumb = canvas.toBuffer('image/jpeg', { quality })
      quality -= 0.1
    } while (thumb.length > 64 * 1024 && quality > 0.1)

    const base64Thumb = thumb.toString("base64")

    await conn.sendMessage(m.chat, {
      image: thumb,
      caption: `🌷 Aquí tienes tu imagen lista para WhatsApp (≤64KB)\n\n📦 Peso: ${(thumb.length / 1024).toFixed(1)} KB\n\n\`\`\`Código Base64:\`\`\`\n${base64Thumb.substring(0,200)}...`
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("❌ Error al procesar la imagen.")
  }
}

handler.command = /^miniatura|mini$/i
export default handler*/