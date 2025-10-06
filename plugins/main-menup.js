import moment from 'moment-timezone'
import { totalmem, freemem } from 'os'
import { sizeFormatter } from 'human-readable'
import speed from 'performance-now'

const format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false
})

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const _speed = speed()
    const uptime = clockString(process.uptime() * 1000)
    const totalUsers = Object.keys(global.db.data.users).length
    const registeredUsers = Object.values(global.db.data.users).filter(u => u.registered).length
    const name = await conn.getName(m.sender)
    const date = moment.tz('America/Lima').format('DD/MM/YYYY')
    const time = moment.tz('America/Lima').format('HH:mm:ss')

    const menu = `
\`\`\`  ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟☁️⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`  ໍ۪۫꒰̥᷑ໍ᮫۪۫𝆬⭐ ࣮࣮᷑᷑𝐊֘𝐀۫𝐍〪࣮࣫𝐄۪۫࣫𝐊𝐈᮫࣮𝆬᷑•۫֘ ᮫𝆬ᤲ࣫𝐕֘ ᮫𝆬ᤲ࣫3֘ ᮫𝆬ᤲ࣫ 🌿᩠̥ໍ۪۫꒱̥ໍ۪۫ \`\`\`
\`\`\` ︶ִֶָ⏝︶ִֶָ⏝˖ ࣪ ୨✧୧ ࣪ ˖⏝ִֶָ︶⏝ִֶָ︶ \`\`\`

> \`\`\`✨ ${name}\`\`\`
> \`\`\`📅 ${date} | 🕒 ${time}\`\`\`

☁️ *Usuario:* ${name}
🪷 *Creador:* Shadow-xyz
🪹 *Bot:* Rin Itoshi
🪴 *Runtime:* ${uptime}
🪾 *Usuarios:* ${totalUsers} (${registeredUsers} reg.)
🍃 *RAM usada:* ${format(totalmem() - freemem())}
🌲 *RAM total:* ${format(totalmem())}
🕸️ *RAM libre:* ${format(freemem())}
🫛 *Latencia:* ${_speed.toFixed(4)} ms
`

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/rru021.jpg' },
      caption: menu,
      footer: '🌸 ʀɪɴ ɪᴛᴏsʜɪ 🌸',
      buttons: [
        { buttonId: usedPrefix + 'menu', buttonText: { displayText: '🌸 Menú Principal' }, type: 1 },
        { buttonId: usedPrefix + 'info', buttonText: { displayText: '📜 Información' }, type: 1 }
      ],
      headerType: 4,
      contextInfo: {
        businessMessageForwardInfo: {
          title: '🌸 ʀɪɴ ɪᴛᴏsʜɪ ᴍᴇɴᴜ 🌸',
          description: '✨ Tu asistente personal - Shadowxyz ✨',
          currencyCode: 'USD',
          priceAmount1000: 10
        },
        externalAdReply: {
          title: '🌸 ʀɪɴ ɪᴛᴏsʜɪ ᴍᴇɴᴜ 🌸',
          body: '✨ Tu asistente personal - Shadowxyz ✨',
          thumbnailUrl: 'https://files.catbox.moe/rru021.jpg',
          sourceUrl: 'https://shadow-xyz.vercel.app',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.log(e)
    m.reply('❌ Error al enviar el menú.')
  }
}

handler.help = ['menup']
handler.tags = ['main']
handler.command = ['menup', 'menú', 'help']

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}