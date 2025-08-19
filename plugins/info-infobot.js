import db from '../lib/database.js'
import { cpus as _cpus, totalmem, freemem, platform, hostname } from 'os'
import speed from 'performance-now'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix }) => {
    let bot = global.db.data.settings[conn.user.jid]
    let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0)
    let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    let subBots = Object.keys(global.conns).length
    
    let info = `
╔══❖═══⟪ ✦ 𝑰𝑵𝑭𝑶 𝑩𝑶𝑻 ✦ ⟫══❖═══╗
║ 🧩 𝐏𝐫𝐞𝐟𝐢𝐣𝐨: ${usedPrefix}
║ 📦 𝐏𝐥𝐮𝐠𝐢𝐧𝐬 𝐚𝐜𝐭𝐢𝐯𝐨𝐬: ${totalf}
║ 📊 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐮𝐬𝐚𝐝𝐨𝐬: ${toNum(totalStats)} (${totalStats})
║ 🌲 𝐒𝐮𝐛𝐁𝐨𝐭𝐬 𝐜𝐨𝐧𝐞𝐜𝐭𝐚𝐝𝐨𝐬: ${subBots}
╚═══════════════════════════╝

╔══❖═⟪ ⚙️ 𝑺𝑰𝑺𝑻𝑬𝑴𝑨 𝑯𝑶𝑺𝑻 ⚙️ ⟫═❖══╗
║ 🖥️ 𝐏𝐥𝐚𝐭𝐚𝐟𝐨𝐫𝐦𝐚: ${platform()}
║ 🌐 𝐒𝐞𝐫𝐯𝐢𝐝𝐨𝐫: ${hostname()}
║ 💾 𝐑𝐀𝐌 𝐮𝐬𝐚𝐝𝐚: ${format(totalmem() - freemem())} / ${format(totalmem())}
║ 📉 𝐑𝐀𝐌 𝐥𝐢𝐛𝐫𝐞: ${format(freemem())}
╚═══════════════════════════╝

╔═❖═⟪ 🔬 𝑴𝑬𝑴𝑶𝑹𝑰𝑨 𝑵𝑶𝑫𝑬.𝑱𝑺 🔬 ⟫═❖═╗
${'```' + Object.keys(process.memoryUsage())
   .map((key) => `${key}: ${format(process.memoryUsage()[key])}`)
   .join('\n║ 🍂 ') + '```'}
╚══════════════════════════╝`

    await conn.sendFile(
        m.chat,
        banner,
        'info.jpg',
        info,
        fkontak,
        false,
        { contextInfo: { mentionedJid: [owner[0][0] + '@s.whatsapp.net'] } }
    )
}

handler.help = ['botinfo']
handler.tags = ['info']
handler.command = ['info', 'botinfo', 'infobot']

export default handler

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
}