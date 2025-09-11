import axios from 'axios'
import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const username = conn.getName(m.sender)
  const basePrompt = `Tu nombre es ${botname} y parece haber sido creada por ${etiqueta}. Tu versión actual es ${vs}, Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, y te encanta aprender. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`

  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')

  if (isQuotedImage) {
    const q = m.quoted
    const img = await q.download?.()
    if (!img) return conn.reply(m.chat, '✘ No se pudo descargar la imagen.', m)

    try {
      const imageAnalysis = await fetchImageBuffer("Describe esta imagen", img)
      const query = `Descríbeme la imagen y explica el contexto.`
      const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`
      const description = await luminsesi(query, username, prompt)
      await conn.reply(m.chat, description, m)
    } catch (err) {
      console.error("Error al analizar imagen:", err.response?.data || err.message)
      await conn.reply(m.chat, '✘ Error analizando la imagen.', m)
    }

  } else {
    if (!text) return conn.reply(m.chat, '✨ Escribe un mensaje o envía una imagen citada.', m)

    try {
      await conn.reply(m.chat, 'Procesando tu petición, espera...', m)
      const query = text
      const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
      const response = await luminsesi(query, username, prompt)
      await conn.reply(m.chat, response, m)
    } catch (err) {
      console.error("Error en Chat:", err.response?.data || err.message)
      await conn.reply(m.chat, '✘ No puedo responder a esa pregunta.', m)
    }
  }
}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.command = ['ia', 'chatgpt', 'luminai']

export default handler

async function fetchImageBuffer(content, imageBuffer) {
  try {
    const form = new FormData()
    form.append("content", content)
    form.append("file", imageBuffer, { filename: "image.jpg" })

    const response = await axios.post("https://Luminai.my.id/analyze", form, {
      headers: form.getHeaders()
    })
    console.log("Respuesta imagen:", response.data)
    return response.data
  } catch (error) {
    console.error("Error en fetchImageBuffer:", error.response?.data || error.message)
    throw error
  }
}


async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post("https://Luminai.my.id/chat", {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false
    })
    console.log("Respuesta chat:", response.data)
    return response.data.result
  } catch (error) {
    console.error("Error en luminsesi:", error.response?.data || error.message)
    throw error
  }
}