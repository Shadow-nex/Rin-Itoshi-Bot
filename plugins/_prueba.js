// 📌 Instala dependencias antes:
// npm install node-fetch sharp

import fetch from 'node-fetch'
import sharp from 'sharp'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let urlImg = 'https://files.catbox.moe/4q363w.jpg' // 🔗 tu imagen

    // Descargar imagen
    const res = await fetch(urlImg)
    const buffer = await res.buffer()

    // Reducir a thumbnail <= 64 KB
    let quality = 80
    let thumb
    do {
      thumb = await sharp(buffer)
        .resize(200, 200, { fit: 'inside' })
        .jpeg({ quality, chromaSubsampling: '4:2:0' })
        .toBuffer()
      quality -= 10
    } while (thumb.length > 64 * 1024 && quality > 10)

    console.log(`📦 Thumbnail final: ${(thumb.length / 1024).toFixed(1)} KB`)

    // Fake message estilo Shadow
    const Shadow = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
      },
      message: {
        locationMessage: {
          name: `✅ DESCARGA COMPLETA\n[▓▓▓▓▓▓▓▓▓▓] 100%`,
          jpegThumbnail: thumb
        }
      },
      participant: "0@s.whatsapp.net"
    }

    // Enviar mensaje usando el Shadow como quoted
    await conn.sendMessage(m.chat, { text: "🌸 Aquí tu prueba con thumbnail especial" }, { quoted: Shadow })

  } catch (e) {
    console.error(e)
    m.reply("❌ Error al generar el thumbnail.")
  }
}

handler.command = /^shadowtest$/i
export default handler