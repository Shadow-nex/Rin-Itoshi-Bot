import fetch from "node-fetch"
import axios from "axios"

let handler = async (m, { conn, text }) => {
  try {
    if (!text)
      return conn.reply(m.chat, `🚫 *Por favor, ingresa la URL del vídeo de YouTube.*`, m)

    if (!/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(text))
      return m.reply(`⚠️ *Enlace inválido. Asegúrate de colocar un enlace válido de YouTube.*`)

    await m.react('🕒')

    // 🔹 Obtener información del video desde la API
    const infoAPI = `https://api.ymcdn.org/api/v1/video?url=${encodeURIComponent(text)}`
    const res = await fetch(infoAPI)
    const data = await res.json()

    if (!data || !data.url) throw new Error("No se pudo obtener el enlace de descarga.")

    const meta = data
    const url = meta.url
    const fileName = `${meta.title || "video"}.mp4`
    const thumbnail = meta.thumbnail || meta.image || "https://i.imgur.com/0Z2Z7KX.jpg"

    // 🔹 Obtener tamaño real del archivo
    const size = await getSize(url)
    const sizeStr = size ? await formatSize(size) : 'Desconocido'

    // 🔹 Crear mensaje decorado
    const caption = `
🎶 *ＹＯＵＴＵＢＥ • ＭＰ4* 🍎
────────────────────
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. 𝐓𝐈𝐓𝐔𝐋𝐎: *${meta.title || '-'}*
> °𓃉𐇽ܳ𓏸🌿ᮬᩬִּ〫᪲۟. 𝐃𝐔𝐑𝐀𝐂𝐈𝐎𝐍: *${meta.duration || '-'}*
> °𓃉𐇽ܳ𓏸🍏ᮬᩬִּ〫᪲۟. 𝐂𝐀𝐍𝐀𝐋: *${meta.channel || meta.author || '-'}*
> °𓃉𐇽ܳ𓏸🍄ᮬᩬִּ〫᪲۟. 𝐕𝐈𝐒𝐓𝐀𝐒: *${meta.views || '-'}*
> °𓃉𐇽ܳ𓏸⚽ᮬᩬִּ〫᪲۟. 𝐓𝐀𝐌𝐀Ñ𝐎: *${sizeStr}*
> °𓃉𐇽ܳ𓏸☁️ᮬᩬִּ〫᪲۟. 𝐂𝐀𝐋𝐈𝐃𝐀𝐃: *480p*
> °𓃉𐇽ܳ𓏸🌷ᮬᩬִּ〫᪲۟. 𝐏𝐔𝐁𝐋𝐈𝐂𝐀𝐃𝐎: *${meta.uploaded || meta.publish || '-'}*
> °𓃉𐇽ܳ𓏸🕸️ᮬᩬִּ〫᪲۟. 𝐋𝐈𝐍𝐊: *${meta.link || text}*
> °𓃉𐇽ܳ𓏸⚙️ᮬᩬִּ〫᪲۟. 𝐒𝐄𝐑𝐕𝐈𝐃𝐎𝐑: *ymcdn.org*
────────────────────
`

    // 🔹 Comprobación de tamaño para envío
    const head = await fetch(url, { method: "HEAD" })
    const fileSize = head.headers.get("content-length") || 0
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2)

    if (fileSizeMB >= 100) {
      // 📦 Enviar como documento
      await conn.sendMessage(m.chat, {
        document: { url },
        mimetype: 'video/mp4',
        fileName,
        caption: `${caption}\n\n> 😔 *Enviado como documento por superar 100 MB*`,
        contextInfo: {
          externalAdReply: {
            title: meta.title,
            body: '💦 ᥡ᥆ᥙ𝗍ᥙᑲᥱ ძ᥆ᥴ | ʀɪɴ ɪᴛᴏsʜɪ 🌾',
            mediaUrl: text,
            sourceUrl: text,
            thumbnailUrl: thumbnail,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m })
    } else {
      // 🎥 Enviar como video
      await conn.sendMessage(m.chat, {
        video: { url },
        mimetype: 'video/mp4',
        fileName,
        caption,
        contextInfo: {
          externalAdReply: {
            title: meta.title,
            body: '✅ Descarga completa',
            mediaUrl: text,
            sourceUrl: text,
            thumbnailUrl: thumbnail,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m })
    }

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    await m.reply(`❌ *Ocurrió un error al procesar tu solicitud:*\n\n${e.message}`)
  }
}

handler.help = ['ytmp4']
handler.command = ['ytmp4']
handler.tags = ['descargas']
export default handler

// 🔹 Obtener tamaño del archivo
async function getSize(url) {
  try {
    const res = await axios.head(url)
    const length = res.headers['content-length']
    return length ? parseInt(length, 10) : null
  } catch (e) {
    console.log("Error obteniendo tamaño:", e.message)
    return null
  }
}

// 🔹 Formatear bytes a MB/GB
async function formatSize(bytes) {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}