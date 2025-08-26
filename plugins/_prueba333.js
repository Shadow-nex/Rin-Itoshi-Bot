let handler = async (m, { conn, args }) => {
  if (!m.quoted) return conn.reply(m.chat, '*🌱 Responde a un mensaje para reenviarlo.*', m)

  let q = m.quoted ? m.quoted : m
  let msg = await m.getQuotedObj()
  let mime = (q.msg || q).mimetype || ''
  let modo = (args[0] || '').toLowerCase()

  if (modo === 'bot') {
    if (/image|video|audio|document/.test(mime)) {
      let media = await q.download()
      await conn.sendFile(m.chat, media, '', q.text || '', m)
    } else if (q.text) {
      await conn.sendMessage(m.chat, { text: q.text }, { quoted: m })
    }
  } else {
    await conn.copyNForward(m.chat, msg, true)
  }
}

handler.help = ['reenviar']
handler.tags = ['tools']
handler.command = ['reenviar', 'forward', 'rv']

export default handler