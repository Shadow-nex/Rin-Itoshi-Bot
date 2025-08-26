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
  if (!m.quoted) return conn.reply(m.chat, '* Responde a un mensaje para reenviarlo.*', m)

  let q = m.quoted ? m.quoted : m
  let msg = await m.getQuotedObj()
  let mime = (q.msg || q).mimetype || ''
  let target = m.chat

  // Si pasa link de grupo
  if (args[0] && args[0].includes('chat.whatsapp.com')) {
    let invite = args[0].split('chat.whatsapp.com/')[1]
    try {
      let res = await conn.groupGetInviteInfo(invite)
      // Verificar si el bot está en el grupo
      let groupId = res.id
      let groups = Object.keys(await conn.groupFetchAllParticipating())
      if (!groups.includes(groupId)) {
        return conn.reply(m.chat, '⚠️ El bot no está en ese grupo, no puedo reenviar.', m)
      }
      target = groupId
    } catch (e) {
      return conn.reply(m.chat, '⚠️ No pude obtener el grupo desde el enlace.', m)
    }
  }

  // Reenvío
  if (/image|video|audio|document/.test(mime)) {
    let media = await q.download()
    await conn.sendFile(target, media, '', q.text || '', m)
  } else if (q.text) {
    await conn.sendMessage(target, { text: q.text }, { quoted: m })
  } else {
    await conn.copyNForward(target, msg, true)
  }
}

handler.help = ['reenviar', 'reenviar <linkGrupo>']
handler.tags = ['tools']
handler.command = ['reenviar', 'forward', 'rv']

export default handler