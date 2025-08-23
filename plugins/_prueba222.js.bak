// plugins/menu_sharp.js
import fetch from 'node-fetch'
import sharp from 'sharp'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Imagen de prueba
    const imgenUrl = 'https://files.catbox.moe/9l7hcn.jpg' // Cambia a tu imagen
    const imgBuffer = await (await fetch(imgenUrl)).buffer()

    // Crear miniatura JPG
    const thumb = await sharp(imgBuffer)
      .resize(400, 400)
      .jpeg({ quality: 70 })
      .toBuffer()

    // Crear versión WebP
    const docBuffer = await sharp(imgBuffer)
      .webp({ quality: 90 })
      .toBuffer()

    // Reaccionamos al mensaje
    await m.react('🌱')

    // Texto del menú
    let menuText = `
╭━━━〔 🌱 𝙈𝙀𝙉𝙐 〕━━⬣
┃🍂 Ejemplo con Sharp
┃📂 Convierte imágenes
┃🎥 Envía video + doc
╰━━━━━━━━━━━━⬣
    `.trim()

    // Mensaje con video + botones
    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/vwlhum.mp4' }, // Cambia a tu video
      caption: menuText,
      footer: '🌿 Rin Itoshi Bot',
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
          sourceUrl: "https://github.com", // pon tus redes
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    // Enviar documento (imagen procesada en webp)
    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `🌱 RinItoshiSharp.webp`,
      mimetype: 'image/webp',
      jpegThumbnail: thumb,
      mentionedJid: [m.sender],
      isForwarded: true
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