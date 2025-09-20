let handler = async (m, { conn, participants, isAdmin, isOwner }) => {

    let users = participants.filter(u => !u.admin).map(u => u.id)
    if (!users.length) return m.reply('👀 No hay miembros para disparar la ruleta')

    let elegido = users[Math.floor(Math.random() * users.length)]
    await m.reply('🎲 Girando la Ruleta Ninja del Destino... ¡Sharingan decide!')

    setTimeout(async () => {
        if (Math.random() < 0.25) { // 25% de probabilidad de expulsión
            try {
                await conn.groupParticipantsUpdate(m.chat, [elegido], "remove")
                await conn.sendMessage(m.chat, {
                    text: `💥 BANG! @${elegido.split('@')[0]} ha sido expulsado del clan 😈`,
                    mentions: [elegido]
                })
            } catch {
                m.reply('❌ No pude expulsar al usuario. Soy admin?')
            }
        } else {
            await conn.sendMessage(m.chat, {
                text: `😎 CLICK! @${elegido.split('@')[0]} sobrevivió esta vez 🐾`,
                mentions: [elegido]
            })
        }
    }, 2000)
}


handler.help = ['ruletaban']
handler.tags = ['anime','fun','group']
handler.command = ['ruletaban']
handler.group = true
handler.admin = true

export default handler
