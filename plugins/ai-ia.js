import axios from 'axios'

const botConfig = {
    apiURL: 'https://api.delirius.store/ia/gptprompt'
}

async function queryDelirius(text, username) {
    try {
        const prompt = `Tu nombre es ${botname} y parece haber sido creada por ${etiqueta}. Tu versión actual es ${vs}, Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertido, y te encanta aprender. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`.trim()

        const response = await axios.get(botConfig.apiURL, {
            params: {
                text,
                prompt
            }
        })

        if (response.data && response.data.status) {
            return response.data.data
        } else {
            return `${error} No se obtuvo respuesta de la IA.`
        }
    } catch (err) {
        console.error('Error al consultar Delirius API:', err)
        return `${error} Ocurrió un error al procesar tu solicitud.`
    }
}

let handler = async (m, { conn, text }) => {
    const username = conn.getName(m.sender)

    if (!text) {
        return conn.reply(m.chat, `${emoji} Ingrese una petición para que el ChatGPT lo responda.`, m)
    }

    await conn.sendMessage(m.chat, { text: `${rwait} Procesando tu petición...` }, { quoted: m })

    const response = await queryDelirius(text, username)
    await conn.sendMessage(m.chat, { text: response }, { quoted: m })
}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.command = ['ia', 'chatgpt', 'delirius']
handler.group = true
handler.register = true

export default handler