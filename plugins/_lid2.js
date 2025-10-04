import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let number

    if (m.quoted?.sender) {
      number = m.quoted.sender
    } else if (m.mentionedJid?.length) {
      number = m.mentionedJid[0]
    } else if (args[0]) {
      let raw = args[0].replace(/[^0-9]/g, '')
      if (raw.length < 8) return conn.reply(m.chat, `❌ *Número inválido.*`, m)
      number = raw + '@s.whatsapp.net'
    } else {
      return conn.reply(
        m.chat,
        `🍁 *Usa el comando correctamente:*\n\n📌 Ejemplos:\n- ${usedPrefix + command} +51999999999\n- ${usedPrefix + command} @usuario\n- O responde a un mensaje.`,
        m
      )
    }

    let [user] = await conn.onWhatsApp(number)
    if (!user?.jid) return conn.reply(m.chat, '❌ *El número no está registrado en WhatsApp.*', m)

    let name = await conn.getName(user.jid)
    let ppUrl = await conn.profilePictureUrl(user.jid, 'image').catch(() => null)

    let info = `╭━━━〔 ⚡ *WHATSAPP LID* 〕━━⬣
┃ 🪪 *Nombre:* ${name || 'No disponible'}
┃ ☎️ *Número:* wa.me/${user.jid.replace(/[^0-9]/g, '')}
┃ 🧩 *LID:* ${user.lid || 'No disponible'}
┃ 🔖 *JID:* ${user.jid}
╰━━━━━━━━━━━━━━━━━━⬣`

    if (ppUrl) {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: ppUrl },
          caption: info,
          ...rcanal
        },
        { quoted: fkontak }
      )
    } else {
      await conn.sendMessage(m.chat, { text: info, ...rcanal }, { quoted: fkontak })
    }

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ *Error al obtener el LID o la información del usuario.*', m)
  }
}

handler.command = ['lid']
handler.help = ['lid']
handler.tags = ['tools']

export default handler