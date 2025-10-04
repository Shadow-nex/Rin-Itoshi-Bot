import fs from 'fs'

let solicitudes = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🌸 Ingresa el número de la persona.\n\nEjemplo:\n*${usedPrefix + command} 51987XXXX*`)

  let number = text.replace(/\D/g, '') + '@s.whatsapp.net'

  solicitudes[number] = m.chat

  await conn.sendMessage(number, {
    text: `🌷 *Hola!* Alguien quiere descargar tus *estados de WhatsApp*.\n\n¿Deseas compartirlos?`,
    buttons: [
      { buttonId: "estado_si", buttonText: { displayText: "✅ Sí, permitir" }, type: 1 },
      { buttonId: "estado_no", buttonText: { displayText: "❌ No, rechazar" }, type: 1 }
    ],
    headerType: 1
  })
}

handler.before = async function (m, { conn }) {
  if (!m.message) return

  const buttonResponse = m.message.buttonsResponseMessage
  if (!buttonResponse) return

  const selectedId = buttonResponse.selectedButtonId
  const number = m.key.remoteJid
  const chatDestino = solicitudes[number]
  if (!chatDestino) return

  if (selectedId === "estado_si") {
    try {
      let stories = await conn.fetchStatus(number)

      if (!stories || !stories.status || !stories.status.length) {
        await conn.sendMessage(chatDestino, { text: "😿 El usuario no tiene estados disponibles." })
      } else {
        for (let st of stories.status) {
          if (!st.mimetype) continue
          if (st.mimetype.startsWith("image")) {
            await conn.sendMessage(chatDestino, { image: st.media, caption: "📸 Estado descargado." })
          } else if (st.mimetype.startsWith("video")) {
            await conn.sendMessage(chatDestino, { video: st.media, caption: "🎥 Estado descargado." })
          }
        }
        await conn.sendMessage(chatDestino, { text: "✅ *Descarga completada con éxito.*" })
      }
    } catch (e) {
      console.error(e)
      await conn.sendMessage(chatDestino, { text: "❌ Error al intentar descargar los estados." })
    }
    delete solicitudes[number]

  } else if (selectedId === "estado_no") {
    await conn.sendMessage(chatDestino, { text: "🚫 El usuario rechazó compartir sus estados." })
    delete solicitudes[number]
  }
}

handler.help = ['descargarestado <número>']
handler.tags = ['herramientas']
handler.command = ['descargarestado', 'getestado']

export default handler