let handler = async (m, { conn, participants, isAdmin, isOwner }) => {
    if (!(isAdmin || isOwner)) return m.reply('⚠️ Solo admins pueden usar la ruleta 🌀')

    let users = participants.filter(u => !u.admin).map(u => u.id)
    if (!users.length) return m.reply('👀 No hay miembros para disparar la ruleta')

    let elegido = users[Math.floor(Math.random() * users.length)]
    await m.reply('🎲 Girando la Ruleta Ninja... ¡Sharingan decide!')

    setTimeout(async () => {
        if (Math.random() < 0.5) {
            try {
                await conn.groupParticipantsUpdate(m.chat, [elegido], "remove")
                await conn.sendMessage(m.chat, { text: `💥 BANG! @${elegido.split('@')[0]} ha sido expulsado 😈`, mentions: [elegido] })
            } catch {
                m.reply('❌ No pude expulsar al usuario. Soy admin?')
            }
        } else {
            await conn.sendMessage(m.chat, { text: `😎 CLICK! @${elegido.split('@')[0]} sobrevivió 🐾`, mentions: [elegido] })
        }
    }, 2000)
}

// --- Rin Itoshi Bot ---
handler.help = ['ruletaban']
handler.tags = ['anime','fun','group']
handler.command = /^ruletaban$/i
handler.group = true
handler.admin = true

export default handler
