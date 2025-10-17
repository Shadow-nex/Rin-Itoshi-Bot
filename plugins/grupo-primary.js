
import ws from "ws"

let handler = async (m, { conn, command }) => {
  const chat = global.db.data.chats[m.chat]
  const allConns = global.conns || []
  const activeBots = [
    ...new Set(
      allConns
        .filter(c => c.user && c.ws.socket && c.ws.socket.readyState !== ws.CLOSED)
        .map(c => c.user.jid)
    ),
  ]

  if (!activeBots.includes(global.conn.user.jid))
    activeBots.push(global.conn.user.jid)

  const who =
    m?.message?.extendedTextMessage?.contextInfo?.participant ||
    m?.mentionedJid?.[0] ||
    m?.quoted?.sender

  if (command === "setprimary") {
    if (!who)
      return conn.reply(
        m.chat,
        "*✿ Por favor menciona un sub-bot para establecerlo como primario.*",
        m
      )

    if (!activeBots.includes(who))
      return conn.reply(m.chat, "✿ El usuario mencionado no es un sub-bot activo.", m)

    if (chat.primaryBot === who)
      return conn.reply(
        m.chat,
        `❀ @${who.split`@`[0]} ya es el bot primario de este grupo.`,
        m,
        { mentions: [who] }
      )

    try {
      chat.primaryBot = who
      conn.reply(
        m.chat,
        `✿ Se ha establecido a @${who.split`@`[0]} como bot primario del grupo.`,
        m,
        { mentions: [who] }
      )
    } catch (e) {
      conn.reply(m.chat, "Error al establecer el bot primario.", m)
      console.error(e)
    }
  }

  if (command === "delprimary") {
    if (!chat.primaryBot)
      return conn.reply(
        m.chat,
        "✿ No hay un bot primario establecido en este grupo.",
        m
      )

    try {
      const prev = chat.primaryBot
      chat.primaryBot = null
      conn.reply(
        m.chat,
        `▶ @${prev.split`@`[0]} ha sido eliminado como bot primario.`,
        m,
        { mentions: [prev] }
      )
    } catch (e) {
      conn.reply(m.chat, "❌ Error al eliminar el bot primario.", m)
      console.error(e)
    }
  }
}

handler.help = ["setprimary", "delprimary"]
handler.tags = ["group"]
handler.command = ["setprimary", "delprimary"]
handler.admin = true

export default handler