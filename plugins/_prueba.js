import fetch from 'node-fetch'
import sharp from 'sharp'

let handler = async (m, { conn, text }) => {
  if (!text && !m.quoted) {
    return m.reply("✨ Pásame una URL de imagen o responde a una imagen.\nEjemplo:\n.miniatura https://ejemplo.com/imagen.jpg\nO responde a una foto con: .miniatura")
  }

  try {
    let buffer

    if (text) {
      const res = await fetch(text)
      if (!res.ok) throw new Error("No se pudo descargar la imagen desde la URL")
      buffer = await res.buffer()
    } else if (m.quoted && /image/.test(m.quoted.mtype)) {
      buffer = await (await m.quoted.download())
    } else {
      throw new Error("No se detectó una imagen válida")
    }

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
      caption: `🎃 Aquí tienes tu imagen lista para WhatsApp (≤64KB)\n\n🍧 Peso: ${(thumb.length / 1024).toFixed(1)} KB\n\n\`\`\`Código Base64:\`\`\`\n${base64Thumb.substring(0,200)}...`
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("❌ Error al procesar la imagen.")
  }
}

handler.command = /^miniatura|mini$/i
export default handler