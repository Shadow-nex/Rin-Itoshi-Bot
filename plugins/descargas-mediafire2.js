import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  const user = global.db.data.users[m.sender] || {}

  if (!text) return m.reply(`*${emojis} Por favor, ingresa un link de Mediafire.*`)

  await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } })
  await conn.sendMessage(m.chat, {
    text: '🄸 🄽 🄸 🄲 🄸 🄰 🄽 🄳 🄾 • 🄳🄴🅂🄲🄰🅁🄶🄰\n> *Procesando descarga, por favor espere... ⏳*',
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: '📦 Rin Itoshi • Mediafire Downloader',
        body: 'Obteniendo datos del archivo...',
        thumbnailUrl: global.logo,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  try {
 
    let res1 = await fetch(`https://api.siputzx.my.id/api/d/mediafire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: text })
    })
    let json1 = await res1.json()

    if (json1.status && json1.data?.downloadLink) {
      let d = json1.data
      let meta = d.meta || {}

      let info = `乂  *MEDIAFIRE - DESCARGA EXITOSA*  乂

📦 *Nombre:* ${d.fileName}
📁 *Tamaño:* ${d.fileSize}
🗓️ *Fecha de subida:* ${d.uploadDate}
🧩 *Tipo:* ${d.fileType}
💻 *Compatibilidad:* ${d.compatibility}
📂 *Extensión:* ${d.fileExtension}

📝 *Descripción:* ${d.description}

🔗 *Enlace de descarga directa:*
${d.downloadLink}

🌐 *Información Meta:*
• URL: ${meta.url || 'N/A'}
• Título: ${meta.title || 'N/A'}
• Imagen: ${meta.image || 'N/A'}
• App ID: ${meta.app_id || 'N/A'}
`

      await conn.sendFile(m.chat, d.downloadLink, d.fileName, info, m)
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
      return
    }

    let res2 = await fetch(`https://api.stellarwa.xyz/dow/mediafire?url=${encodeURIComponent(text)}&apikey=Shadow_Core`)
    let json2 = await res2.json()

    if (!json2.status || !json2.data?.dl)
      throw new Error('No se pudo obtener el archivo desde ninguna API.')

    let { title, peso, fecha, tipo, dl } = json2.data

    await conn.sendFile(
      m.chat,
      dl,
      title,
      `乂  *MEDIAFIRE - DESCARGA EXITOSA*  乂

📦 *Nombre:* ${title}
📁 *Tamaño:* ${peso}
🗓️ *Fecha:* ${fecha}
🧩 *Tipo:* ${tipo}

✅ Archivo descargado correctamente.
🔗 *Enlace directo:* ${dl}`,
      m
    )
    await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } })

  } catch (e) {
    console.error(e)
    m.reply(`*Error al procesar la descarga:*\n${e.message}`)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
  }
}

handler.help = ['mediafire2']
handler.tags = ['descargas']
handler.command = ['mf2', 'mediafire2']
handler.register = true
handler.group = true
handler.coin = 10

export default handler