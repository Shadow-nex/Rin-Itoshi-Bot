let handler = async (m, { isAdmin, isOwner, chat }) => {
 
    global.groupConfig = global.groupConfig || {}
    if (!global.groupConfig[chat]) {
        // Config por defecto para grupos
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
    let confText = '🌸╭━━〔 ✨ Configuración de este grupo ✨ 〕━━╮\n'
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
handler.command = ['config']
handler.group = true       // Solo grupos
handler.admin = true       // Solo admins pueden usarlo

export default handler