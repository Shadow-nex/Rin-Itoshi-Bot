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
    
    let info = `╭━━━〔 \`𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢́𝗡 - 𝗕𝗢𝗧\` 〕━━⬣\n`
    info += `┃🧩 *Prefijo:* ${usedPrefix}\n`
    info += `┃📦 *Plugins activos:* ${totalf}\n`
    info += `┃📊 *Comandos usados:* ${toNum(totalStats)} (${totalStats})\n`
    info += `┃🌲 *SubBots conectados:* ${subBots}\n`
    info += `╰━━━━━━━━━━━━━━━━━━━━⬣\n\n`
    info += `╭━━━〔 \`𝗦𝗜𝗦𝗧𝗘𝗠𝗔 𝗛𝗢𝗦𝗧\` 〕━━⬣\n`
    info += `┃🖥️ *Plataforma:* ${platform()}\n`
    info += `┃🌐 *Servidor:* ${hostname()}\n`
    info += `┃💾 *RAM usada:* ${format(totalmem() - freemem())} / ${format(totalmem())}\n`
    info += `┃📉 *RAM libre:* ${format(freemem())}\n`
    info += `╰━━━━━━━━━━━━━━━━━━━━⬣\n\n`
    info += `╭━━━〔 \`𝗠𝗘𝗠𝗢𝗥𝗜𝗔 𝗗𝗘 𝗡𝗢𝗗𝗘𝗝𝗦\` 〕━━⬣\n`
    info += `${'```' + Object.keys(process.memoryUsage()).map((key) => `${key}: ${format(process.memoryUsage()[key])}`).join('\n') + '```'}`

    let imagenURL = 'https://files.catbox.moe/b4b495.jpg'

    await conn.sendFile(
        m.chat,
        imagenURL,
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