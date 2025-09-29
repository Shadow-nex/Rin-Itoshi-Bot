export function before(m) {
  if (!m || !m.sender) return true
  const user = global.db.data.users[m.sender] || {}

  if (user.afk > -1) {
    const tiempo = Date.now() - user.afk
    const tiempoTexto = msToTime(tiempo)
    conn.reply(
      m.chat,
      `🌙 Dejaste de estar inactivo.\n${user.afkReason ? '📌 Motivo: ' + user.afkReason : ''}\n\n⏳ Tiempo inactivo: *${tiempoTexto}*`,
      m
    )
    user.afk = -1
    user.afkReason = ''
  }

  const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (const jid of jids) {
    const afkUser = global.db.data.users[jid]
    if (!afkUser) continue
    if (!afkUser.afk || afkUser.afk < 0) continue

    const tiempo = Date.now() - afkUser.afk
    const tiempoTexto = msToTime(tiempo)
    conn.reply(
      m.chat,
      `😴 El usuario está inactivo, no lo etiquetes.\n${afkUser.afkReason ? '📌 Motivo: ' + afkUser.afkReason : ''}\n\n⏳ Tiempo: *${tiempoTexto}*`,
      m
    )
  }

  return true
}

function msToTime(ms) {
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  let days = Math.floor(hours / 24)

  seconds %= 60
  minutes %= 60
  hours %= 24

  return (
    (days ? days + "d " : "") +
    (hours ? hours + "h " : "") +
    (minutes ? minutes + "m " : "") +
    (seconds ? seconds + "s" : "")
  ).trim()
}