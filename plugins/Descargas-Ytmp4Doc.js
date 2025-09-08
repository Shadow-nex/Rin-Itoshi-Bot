import fetch from 'node-fetch'
import Jimp from 'jimp'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let q = args.join(" ").trim()
  if (!q) {
    return conn.sendMessage(m.chat, {
      text: `*🧪 Ingresa el nombre del video a descargar.*`
    }, { quoted: m })
  }

/*  await conn.sendMessage(m.chat, {
    text: `🎬 ¡Descargando video!

📊 Progreso: [▓▓▓▓▓░░░░░] 50%`
  }, { quoted: m })*/
  const kawaiiProgress = [
  { pct: "10%", bar: "[▓░░░░░░░░░]", emoji: "🍡", msg: "Preparando la magia ✨" },
  { pct: "25%", bar: "[▓▓▓░░░░░░░]", emoji: "🍬", msg: "Un poquito más uwu 💕" },
  { pct: "50%", bar: "[▓▓▓▓▓░░░░░]", emoji: "🍭", msg: "Ya casi a la mitad onichan~ 🌸" },
  { pct: "75%", bar: "[▓▓▓▓▓▓▓▓░░]", emoji: "🎀", msg: "Falta muy poquitooo >///< 💖" },
  { pct: "100%", bar: "[▓▓▓▓▓▓▓▓▓▓]", emoji: "🌈", msg: "¡Descarga completada! yay~ 🐰💞" }
]

function getKawaiiProgress(step) {
  return `🎶 ${kawaiiProgress[step].msg}\n\n📊 Progreso: ${kawaiiProgress[step].bar} ${kawaiiProgress[step].emoji} ${kawaiiProgress[step].pct}`
}

console.log(getKawaiiProgress(2))

  try {

    let res = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(q)}`)
    let json = await res.json()

    if (!json.status || !json.data || !json.data.length) {
      return conn.sendMessage(m.chat, { text: `❌ No encontré resultados para *${q}*.` }, { quoted: m })
    }

    let vid = json.data[0]

    let dl = await fetch(`https://api.starlights.uk/api/downloader/youtube?url=${encodeURIComponent(vid.url)}`)
    let info = await dl.json()

    if (!info.status || !info.mp4) {
      return conn.sendMessage(m.chat, { text: `⚠️ No se pudo obtener el video de *${vid.title}*.` }, { quoted: m })
    }

    let { mp4 } = info

    let caption = `
= 💎 *${vid.title}*
= 🌱 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${vid.duration}
= ☘️ 𝐂𝐚𝐧𝐚𝐥: ${vid.author?.name || "Desconocido"}
= 💥 𝐓𝐚𝐦𝐚𝐧̃𝐨: ${mp4.size}
= 💖 𝐂𝐚𝐥𝐢𝐝𝐚𝐝: ${mp4.quality}
= 🍧 𝐋𝐢𝐧𝐤: ${vid.url}
`.trim()

    let thumb = null
    try {
      const img = await Jimp.read(mp4.thumbnail || vid.thumbnail || "")
      img.resize(300, Jimp.AUTO)
      thumb = await img.getBufferAsync(Jimp.MIME_JPEG)
    } catch (err) {
      console.log("⚠️ Error al procesar miniatura:", err)
    }

    await conn.sendMessage(m.chat, {
      document: { url: mp4.dl_url },
      //video: { url: mp4.dl_url },
      mimetype: "video/mp4",
      fileName: `${vid.title}.mp4`,
      caption,
      ...(thumb ? { jpegThumbnail: thumb } : {}),
      contextInfo: {
        externalAdReply: {
          title: vid.title,
          body: "🚀 YouTube Video 💖",
          mediaUrl: vid.url,
          sourceUrl: vid.url,
          thumbnailUrl: mp4.thumbnail || vid.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (err) {
    console.error("Error en ytmp4:", err)
    conn.sendMessage(m.chat, { text: `💀 Error: ${err.message}` }, { quoted: m })
  }
}

handler.command = ['ytmp4doc', 'ytvdoc', 'ytdoc']
handler.help = ['ytmp4doc']
handler.tags = ['descargas']

export default handler