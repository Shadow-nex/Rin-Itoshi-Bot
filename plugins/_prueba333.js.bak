/*let handler = async (m, { conn, args }) => {
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
handler.command = ['reenviar', 'forward']

export default handler*/


let handler = async (m, { conn, args }) => {
  if (!m.quoted) return conn.reply(m.chat, '*⚽ Responde a un mensaje para reenviarlo.*', m)

  let q = m.quoted ? m.quoted : m
  let msg = await m.getQuotedObj()
  let mime = (q.msg || q).mimetype || ''
  let modo = (args[0] || '').toLowerCase()

  let target = m.chat

  if (args[0]) {
    if (/^\d+$/.test(args[0])) {
      target = args[0] + '@s.whatsapp.net'
    } else if (args[0].includes('chat.whatsapp.com')) {
      let invite = args[0].split('chat.whatsapp.com/')[1]
      try {
        let res = await conn.groupGetInviteInfo(invite)
        target = res.id
      } catch (e) {
        return conn.reply(m.chat, '⚠️ No pude obtener el grupo desde el enlace.', m)
      }
    } else if (args[0].includes('whatsapp.com/channel/')) {
      let invite = args[0].split('whatsapp.com/channel/')[1]
      try {
        let res = await conn.newsletterMetadata(invite)
        target = res.id
      } catch (e) {
        return conn.reply(m.chat, '⚠️ No pude obtener el canal desde el enlace.', m)
      }
    }
  }

  if (modo === 'bot' && target === m.chat) {
    if (/image|video|audio|document/.test(mime)) {
      let media = await q.download()
      await conn.sendFile(target, media, '', q.text || '', m)
    } else if (q.text) {
      await conn.sendMessage(target, { text: q.text }, { quoted: m })
    }
  } else {
    await conn.copyNForward(target, msg, true)
  }
}

handler.help = ['reenviar', 'reenviar <numero|linkGrupo|linkCanal>']
handler.tags = ['tools']
handler.command = ['reenviar', 'forward', 'rv']

export default handler