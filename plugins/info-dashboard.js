let handler = async (m, { conn, command }) => {

    if (['dash', 'dashboard', 'views'].includes(command)) {
        let stats = Object.entries(db.data.stats).map(([key, val]) => {
            let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help.join(', ') : plugins[key]?.help || key
            if (/exec/.test(name)) return
            return { name, ...val }
        }).filter(Boolean)

        stats = stats.sort((a, b) => b.total - a.total).slice(0, 10)

        let txt = `╭━━━〔 *Top Comandos* 〕━━━╮\n\n`
        txt += stats.map(({ name, total }, i) => 
            `*${i + 1}.* ${name}\n   ➥ Usos: *${total}*`).join('\n\n')
        txt += `\n\n╰━━━━━━━━━━━━━━━━━━━━╯`

        conn.reply(m.chat, txt, m, rcanal)
    }

    if (['database', 'usuarios', 'user'].includes(command)) {
        let totalUsers = Object.keys(global.db.data.users).length
        let registeredUsers = Object.values(global.db.data.users).filter(user => user.registered).length

        let txt = `
╭━━〔 *Estadísticas de Usuarios* 〕━━╮
┃
┃➤ ⚽ *Registrados:* ${registeredUsers}
┃➤ 🧪 *No Registrados:* ${totalUsers - registeredUsers}
┃➤ ⛅ *Total de Usuarios:* ${totalUsers}
┃
╰═══◉◉◉═════❖`.trim()

        conn.reply(m.chat, txt, m, rcanal)
    }

}

handler.help = ['dash', 'dashboard', 'views', 'database', 'usuarios', 'user']
handler.tags = ['info']
handler.command = ['dashboard', 'dash', 'views', 'database', 'usuarios', 'user']
handler.register = true

export default handler