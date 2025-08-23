// plugins/menu_sharp.js
import fetch from 'node-fetch'
import sharp from 'sharp'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    // Imagen de prueba
    const imgenUrl = logo // define tu variable logo en config.js o cámbiala a una URL directa
    const imgBuffer = await (await fetch(imgenUrl)).buffer()

    // Crear miniatura JPG
    const thumb = await sharp(imgBuffer)
      .resize(400, 400)
      .jpeg({ quality: 70 })
      .toBuffer()

    // Crear versión WebP (será el documento)
    const docBuffer = await sharp(imgBuffer)
      .webp({ quality: 90 })
      .toBuffer()

    // Reacción al mensaje
    await m.react('🌷')

    // Texto del menú
    let menuText = `
╭━━━〔 🌱 𝙈𝙀𝙉𝙐 〕━━⬣
┃🍂 Ejemplo con Sharp
┃📂 Convierte imágenes
┃🎥 Envía video + doc
╰━━━━━━━━━━━━⬣
    `.trim()

    // Un solo mensaje con video + documento + botones
    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/uzi4do.mp4' }, // cambia a tu video
      document: docBuffer, // manda el buffer como documento
      fileName: `🌱 RinItoshiSharp.webp`,
      mimetype: 'image/webp',
      caption: menuText,
      footer: '🌿 Rin Itoshi Bot',
      jpegThumbnail: thumb,
      buttons: [
        { buttonId: `${usedPrefix}code`, buttonText: { displayText: "🌱 s ᴇ ʀ ʙ ᴏ ᴛ" }, type: 1 },
        { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "🍂 ᴏ ᴡ ɴ ᴇ ʀ" }, type: 1 }
      ],
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: "Ejemplo Sharp",
          body: "Procesando imágenes con Node.js",
          thumbnailUrl: imgenUrl,
          sourceUrl: "https://github.com", // cambia a tus redes
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender]
    }, { quoted: m })
  }
}

handler.command = ['men']
export default handler