import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`🌸 Ingresa el número de la persona.\nEjemplo: *${usedPrefix + command} 51987654321*`)

    let number = text.replace(/\D/g, '') + '@s.whatsapp.net'

    // Enviar mensaje al usuario dueño del número
    await conn.sendMessage(number, { 
        text: `✨ Hola! Alguien quiere descargar tus *estados de WhatsApp*.\n\n¿Aceptas? ✅❌\n\nResponde con *sí* o *no*.`
    })

    // Esperar respuesta del usuario
    conn.ev.on('messages.upsert', async ({ messages }) => {
        let ms = messages[0]
        if (!ms.message) return
        if (ms.key.remoteJid !== number) return

        let respuesta = (ms.message.conversation || '').toLowerCase()

        if (respuesta === 'sí' || respuesta === 'si') {
            // Obtener lista de estados
            let stories = await conn.fetchStatus(number)
            if (!stories || !stories.status || !stories.status.length) {
                return conn.sendMessage(number, { text: "😿 No tienes estados disponibles para descargar." })
            }

            for (let st of stories.status) {
                if (st.mimetype.startsWith("image")) {
                    await conn.sendMessage(m.chat, { image: st.media, caption: "📸 Estado descargado." }, { quoted: m })
                } else if (st.mimetype.startsWith("video")) {
                    await conn.sendMessage(m.chat, { video: st.media, caption: "🎥 Estado descargado." }, { quoted: m })
                }
            }

            conn.sendMessage(m.chat, { text: "✅ Descarga completada." }, { quoted: m })
        } else if (respuesta === 'no') {
            conn.sendMessage(m.chat, { text: "🚫 El usuario rechazó compartir sus estados." }, { quoted: m })
        }
    })
}

handler.help = ['descargarestado <número>']
handler.tags = ['herramientas']
handler.command = ['descargarestado', 'getestado']

export default handler