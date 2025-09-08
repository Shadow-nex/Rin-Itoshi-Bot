import fs from 'fs'

let solicitudes = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`🌸 Ingresa el número de la persona.\nEjemplo: *${usedPrefix + command} 51987XXXX*`)

    let number = text.replace(/\D/g, '') + '@s.whatsapp.net'

    solicitudes[number] = m.chat

    await conn.sendMessage(number, {
        text: `✨ Hola! Alguien quiere descargar tus *estados de WhatsApp*.\n\n¿Aceptas compartirlos?`,
        buttons: [
            { buttonId: "estado_si", buttonText: { displayText: "✅ Sí" }, type: 1 },
            { buttonId: "estado_no", buttonText: { displayText: "❌ No" }, type: 1 }
        ],
        headerType: 1
    })
}

handler.all = async function (m, { conn }) {
    if (!m.message) return
    let number = m.key.remoteJid
    if (!solicitudes[number]) return

    let respuesta = (m.text || "").toLowerCase()
    let chatDestino = solicitudes[number]

    if (respuesta.includes("sí") || m?.message?.buttonsResponseMessage?.selectedButtonId === "estado_si") {
        try {
            let stories = await conn.fetchStatus(number)
            if (!stories || !stories.status || !stories.status.length) {
                await conn.sendMessage(chatDestino, { text: "😿 El usuario no tiene estados disponibles." })
            } else {
                for (let st of stories.status) {
                    if (st.mimetype.startsWith("image")) {
                        await conn.sendMessage(chatDestino, { image: st.media, caption: "📸 Estado descargado." })
                    } else if (st.mimetype.startsWith("video")) {
                        await conn.sendMessage(chatDestino, { video: st.media, caption: "🎥 Estado descargado." })
                    }
                }
                await conn.sendMessage(chatDestino, { text: "✅ Descarga completada." })
            }
        } catch (e) {
            await conn.sendMessage(chatDestino, { text: "❌ Error al descargar estados." })
        }
        delete solicitudes[number]

    } else if (respuesta.includes("no") || m?.message?.buttonsResponseMessage?.selectedButtonId === "estado_no") {
        await conn.sendMessage(chatDestino, { text: "🚫 El usuario rechazó compartir sus estados." })
        delete solicitudes[number]
    }
}

handler.help = ['descargarestado <número>']
handler.tags = ['herramientas']
handler.command = ['descargarestado', 'getestado']

export default handler