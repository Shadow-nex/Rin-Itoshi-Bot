import axios from "axios"

let handler = async (m, { conn, args }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => global.icon)
  try {
    // Si el usuario pasa un ID de grupo, lo usamos, sino tomamos el actual
    let id = args?.[0]?.match(/\d+\-\d+@g.us/)?.[0] || m.chat

    // Obtenemos mensajes del grupo si existen
    let mensajes = conn.chats[id]?.messages || {}

    // Extraemos participantes de cada mensaje (si existe)
    const participantesUnicos = Object.values(mensajes)
      .map(item => item?.key?.participant) // aseguramos que no sea undefined
      .filter(Boolean) // quitamos null o undefined
      .filter((value, index, self) => self.indexOf(value) === index) // quitamos duplicados

    // Ordenamos
    const participantesOrdenados = participantesUnicos.sort((a, b) => {
      if (a && b) {
        return a.split("@")[0].localeCompare(b.split("@")[0])
      }
      return 0
    })

    // Generamos lista
    const listaEnLinea =
      participantesOrdenados.length > 0
        ? participantesOrdenados.map(k => `*●* @${k.split("@")[0]}`).join("\n")
        : "✧ No hay usuarios en línea en este momento."

    await conn.sendMessage(
      m.chat,
      {
        image: { url: pp },
        caption: `*❀ Lista de usuarios en línea:*\n\n${listaEnLinea}\n\n> ${global.dev || "Bot"}`,
        contextInfo: { mentionedJid: participantesOrdenados },
      },
      { quoted: m }
    )

    await m.react("✅")
  } catch (error) {
    await m.reply(`⚠︎ Ocurrió un error: ${error.message}`)
  }
}

handler.help = ["listonline"]
handler.tags = ["owner"]
handler.command = ["listonline", "online", "linea", "enlinea"]
handler.group = true

export default handler