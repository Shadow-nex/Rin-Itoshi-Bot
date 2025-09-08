import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `✨ Ingresa un texto para hablar con *Llama AI*.`, m)

    try {
        let api = await fetch(`https://api.siputzx.my.id/api/ai/llama33?query=${encodeURIComponent(text)}`)
        let json = await api.json()

        let responseMessage = json.data || "Lo siento, no pude generar una respuesta.";
        responseMessage = `${responseMessage}`

        await conn.sendMessage(m.chat, {
            text: responseMessage
        }, { quoted: m })

    } catch (error) {
        console.error(error)
        conn.reply(m.chat, "⚠️ Ocurrió un error al conectar con Llama AI.", m)
    }
}

handler.command = ['llama', 'meta']
export default handler