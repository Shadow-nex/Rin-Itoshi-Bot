import fetch from 'node-fetch'
import Jimp from 'jimp'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let q = args.join(" ").trim()
  if (!q) {
    return conn.sendMessage(m.chat, {
      text: `*🧪 Ingresa el nombre del video a descargar.*`
    }, { quoted: m })
  }

  await conn.sendMessage(m.chat, {
    text: `🌸≽───────≼🌸
૮₍｡˃ ᵕ ˂ ｡₎ა 🎶 *¡Descargando tu archiwito kawaii!*
  
˚₊· ͟͟͞͞➳❥ 📊 Progresito:  
[▓▓▓▓▓░░░░░] 50% 🍬💗  
🌸≽───────≼🌸`
  }, { quoted: m })

  try {
    let res = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(q)}`)
    let json = await res.json()

    if (!json.status || !json.data || !json.data.length) {
      return conn.sendMessage(m.chat, { text: `❌ No encontré resultados para *${q}*.` }, { quoted: m })
    }

    let vid = json.data[0]

    let dl = await fetch(`https://api.starlights.uk/api/downloader/youtube?url=${encodeURIComponent(vid.url)}`)
    let info = await dl.json()

    if (!info.status || !info.mp3) {
      return conn.sendMessage(m.chat, { text: `⚠️ No se pudo obtener el audio de *${vid.title}*.` }, { quoted: m })
    }

    let { mp3 } = info

    let caption = `
= 📀 *${mp3.title}*
= ⏱️ 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${vid.duration}
= ⚡ 𝐂𝐚𝐧𝐚𝐥: ${vid.author?.name || "Desconocido"}
= 🍧 𝐂𝐚𝐥𝐢𝐝𝐚𝐝: ${mp3.quality}
= 🍂 𝐓𝐚𝐦𝐚𝐧̃𝐨: ${mp3.size}
= 🔗 𝐋𝐢𝐧𝐤: ${vid.url}
`.trim()

    let thumb = null
    try {
      const img = await Jimp.read(mp3.thumbnail)
      img.resize(300, Jimp.AUTO)
      thumb = await img.getBufferAsync(Jimp.MIME_JPEG)
    } catch (err) {
      console.log("⚠️ Error al procesar miniatura:", err)
    }

    await conn.sendMessage(m.chat, {
      document: { url: mp3.dl_url },
      mimetype: "audio/mpeg",
      fileName: `${mp3.title}.mp3`,
      caption,
      ...(thumb ? { jpegThumbnail: thumb } : {}),
      contextInfo: {
        externalAdReply: {
          title: mp3.title,
          body: "𝚈𝙾𝚄𝚃𝚄𝙱𝙴 ~ 𝙼𝙿3 ~ 𝙳𝙾𝙲 ",
          mediaUrl: vid.url,
          sourceUrl: vid.url,
          thumbnailUrl: mp3.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (err) {
    console.error("Error en playdoc:", err)
    conn.sendMessage(m.chat, { text: `💀 Error: ${err.message}` }, { quoted: m })
  }
}

handler.command = ['ytmp3doc', 'ytadoc']
handler.help = ['ytmp3doc <texto>']
handler.tags = ['descargas']

export default handler