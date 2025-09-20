let handler = async (m, { isAdmin, isOwner, chat }) => {
    // Solo admins o dueño
    if (!(isOwner || isAdmin)) return m.reply('⚠️ Solo el dueño o admins pueden usar este comando 🌸')

    // Inicializar configuración por grupo si no existe
    if (!global.groupConfig) global.groupConfig = {}
    if (!global.groupConfig[chat]) {
        global.groupConfig[chat] = {
            welcome: true,
            antilink: false,
            antilink2: false,
            antifake: true,
            antiarab: false,
            antibots: true,
            modoadmin: false,
            avisos: true,
            detect: true
        }
    }

    let config = global.groupConfig[chat]

    // Construir mensaje bonito
    let confText = '🌸╭━━〔 ✨ Configuración del grupo ✨ 〕━━╮\n'
    for (let key in config) {
        let estado = config[key] ? 'Activado ✅' : 'Desactivado ❌'
        confText += `┃ • ${key}: ${estado}\n`
    }
    confText += '╰━━━━━━━━━━━━━━━━━━━━━━━🌸'

    m.reply(confText)
}

// --- Rin Itoshi Bot ---
handler.help = ['config']
handler.tags = ['admin','group']
handler.command = /^config$/i
handler.group = true
handler.admin = true   // Solo admins pueden usarlo

export default handler
