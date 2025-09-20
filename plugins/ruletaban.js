let handler = async (m, { conn, participants, isAdmin, isOwner }) => {
    // Solo admins pueden usarlo
    if (!(isAdmin || isOwner)) {
        return m.reply('⚠️ Solo los *Jounin/Admins* del grupo pueden usar la ruleta del destino 🌀')
    }

    // Filtrar miembros que no sean admins
    let users = participants.filter(u => !u.admin).map(u => u.id)
    if (users.length === 0) return m.reply('👀 Todos son Jounin, nadie para disparar la ruleta...')

    // Elegir víctima al azar
    let elegido = users[Math.floor(Math.random() * users.length)]

    // Mensaje dramático estilo anime
    await m.reply('🎲 Girando la *Ruleta Ninja del Destino*... 🌀\n¡Que el Sharingan decida!')

    // Espera épica antes del resultado
    setTimeout(async () => {
        let bala = Math.random() < 0.5 // 50% de chance de ban
        if (bala) {
            try {
                // Expulsar al usuario del grupo
                await conn.groupParticipantsUpdate(m.chat, [elegido], "remove")
                await conn.sendMessage(m.chat, {
                    text: `💥 *BANG!* El destino fue cruel... @${elegido.split('@')[0]} ha sido expulsado del clan 😈`,
                    mentions: [elegido]
                })
            } catch (e) {
                m.reply('❌ No pude expulsar al shinobi. Asegúrate que soy *Hokage/Admin* del grupo.')
            }
        } else {
            await conn.sendMessage(m.chat, {
                text: `😎 *CLICK!* La bala falló… @${elegido.split('@')[0]} sobrevivió esta vez 🐾`,
                mentions: [elegido]
            })
        }
    }, 3000)
}

// --- Rin Itoshi Bot ---
handler.help = ['ruletaban']
handler.tags = ['anime', 'fun', 'group']
handler.command = /^ruletaban$/i
handler.group = true       // Solo grupos
handler.admin = true       // Solo admins
export default handler
