let handler = async function (m, { conn, groupMetadata }) {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos.')

  const participantes = groupMetadata?.participants || []

  const tarjetas = participantes.map((p, index) => {
    const jid = p.id || 'N/A'
    const username = '@' + jid.split('@')[0]
    const estado = p.admin === 'superadmin' ? '👑 *Propietario*' :
                   p.admin === 'admin' ? '🛡️ *Administrador*' :
                   '👤 *Miembro*'

    return [
      '╭─✿ *Usuario ' + (index + 1) + '* ✿',
      `│  *Nombre:* ${username}`,
      `│  *JID:* ${jid}`,
      `│  *Rol:* ${estado}`,
      '╰───────────────✿'
    ].join('\n')
  })

  const contenido = tarjetas.join('\n\n')
  const mencionados = participantes.map(p => p.id).filter(Boolean)

  const mensajeFinal = `╭━━━❖『 *Lista de Participantes* 』❖━━━╮
👥 *Grupo:* ${groupMetadata.subject}
🔢 *Total:* ${participantes.length} miembros
╰━━━━━━━━━━━━━━━━━━━━━━╯

${contenido}`

  return conn.reply(m.chat, mensajeFinal, m, { mentions: mencionados })
}

handler.command = ['lid']
handler.help = ['lid']
handler.tags = ['group']
handler.group = true

export default handler