import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m, { conn, usedPrefix, command }) => {
  const quoted = m.quoted ? m.quoted : m
  const mime = quoted.mimetype || quoted.msg?.mimetype || ''

  if (!/image\/(jpe?g|png|webp)/i.test(mime)) {
    await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } })
    return m.reply(`⚽ Por favor, envíe una imagen o responda a la imagen utilizando el comando.`)
  }

  try {
    const startTime = Date.now() // ⏱ Inicia conteo

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    conn.reply(m.chat, `*✧ Mejorando la calidad de la imagen...*`, m, rcanal)  

    // Descargar imagen original
    const media = await quoted.download()
    const ext = mime.split('/')[1]
    const filename = `upscaled_${Date.now()}.${ext}`

    // Peso antes
    const inputBytes = Buffer.byteLength(media)
    const inputKB = (inputBytes / 1024).toFixed(2)
    const inputMB = (inputBytes / (1024 * 1024)).toFixed(2)

    // Preparar form para la API
    const form = new FormData()
    form.append('image', media, { filename, contentType: mime })
    form.append('scale', '2')

    const headers = {
      ...form.getHeaders(),
      'accept': 'application/json',
      'x-client-version': 'web',
      'x-locale': 'en'
    }

    // Llamada a Pixelcut
    const res = await fetch('https://api2.pixelcut.app/image/upscale/v1', {
      method: 'POST',
      headers,
      body: form
    })

    const statusCode = res.status // 🔑 Status de la API
    const json = await res.json()
    if (!json?.result_url || !json.result_url.startsWith('http')) {
      throw new Error('No se pudo obtener el resultado del servidor Pixelcut.')
    }

    // Descargar imagen mejorada
    const resultRes = await fetch(json.result_url)
    const resultBuffer = await resultRes.buffer()

    // Peso después
    const outputBytes = Buffer.byteLength(resultBuffer)
    const outputKB = (outputBytes / 1024).toFixed(2)
    const outputMB = (outputBytes / (1024 * 1024)).toFixed(2)

    // Detectar formato de salida por URL
    let outputFormat = json.result_url.split('.').pop().split('?')[0].toUpperCase()

    // Tiempo de proceso
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(2)

    // Armar caption con más info
    let caption = `
☆ *𝙸𝙼𝙰𝙶𝙴𝙽 𝙼𝙴𝙹𝙾𝚁𝙰𝙳𝙰 𝙴𝙽 𝙷𝙳* 🍂

🔹 *Servidor:* Pixelcut API
🔹 *Estado API:* ${statusCode}
🔹 *Formato entrada:* ${ext.toUpperCase()}
🔹 *Formato salida:* ${outputFormat || 'DESCONOCIDO'}

📂 *Peso antes:* ${inputKB} KB (${inputMB} MB)
📂 *Peso ahora:* ${outputKB} KB (${outputMB} MB)

⏱ *Tiempo de proceso:* ${duration} segundos
🌐 *URL salida:* ${json.result_url}
`.trim()

    // Enviar resultado
    await conn.sendMessage(m.chat, {
      image: resultBuffer,
      caption
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (err) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    m.reply(`❌ Ocurrió un error:\n${err.message || err}`)
  }
}

handler.help = ["hd"]
handler.tags = ["tools"]
handler.command = ["remini", "hd", "enhance"]

export default handler