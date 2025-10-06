import os from 'os'
import moment from 'moment-timezone'
import speed from 'performance-now'
import { totalmem, freemem } from 'os'
import { sizeFormatter } from 'human-readable'
import axios from 'axios'

const format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`
})

let handler = async (m, { conn }) => {
  try {
    const totalStats = 0
    const vs = '1.0.0'
    const libreria = 'Baileys'
    const club = '© Rin Itoshi | Shadow-xyz'
    const channelRD = {
      id: '120363401008003732@newsletter',
      name: 'Rin Itoshi Updates'
    }

    let timestamp = speed()
    let latensi = speed() - timestamp
    let mentionedJid = m.mentionedJid?.[0] || m.sender
    let name = await conn.getName(m.sender)

    let uptime = clockString(process.uptime() * 1000)
    let totalCommands = Object.keys(global.plugins).length
    let totalUsers = Object.keys(global.db.data.users).length
    let registeredUsers = Object.values(global.db.data.users).filter(user => user.registered).length

    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('HH:mm:ss')
    let dia = moment.tz('America/Lima').format('dddd')

    // 🔮 Mantengo tu estilo decorado completo:
    let menuText = `
\`\`\`  ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟☁️⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`  ໍ۪۫꒰̥᷑ໍ᮫۪۫𝆬⭐ ࣮࣮᷑᷑𝐊֘𝐀۫𝐍〪࣮࣫𝐄۪۫࣫𝐊𝐈᮫࣮𝆬᷑•۫֘ ᮫𝆬ᤲ࣫𝐕֘ ᮫𝆬ᤲ࣫3֘ ᮫𝆬ᤲ࣫ 🌿᩠̥ໍ۪۫꒱̥ໍ۪۫ \`\`\`
\`\`\` ︶ִֶָ⏝︶ִֶָ⏝˖ ࣪ ୨✧୧ ࣪ ˖⏝ִֶָ︶⏝ִֶָ︶ \`\`\`

> \`\`\`${ucapan()} ᭡̵໋࡙ᮬ @${mentionedJid.split('@')[0]}\`\`\`
> ꨩ🍄ּֽ֪۪۪〫ࣳׄ ${dia} | ${fecha} | ${hora} *⃟░

  ☁️᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ᴜsᴜᴀʀɪᴏ:* ${name}
  🪷᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ᴄʀᴇᴀᴅᴏʀ:* 𝐒𝐡𝐚𝐝𝐨𝐰-𝐱𝐲𝐳
  🎋᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ᴄᴏᴍᴀɴᴅᴏs:* ${totalCommands}
  🪾᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ᴠs:* ${vs}
  🍃᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ʟɪʙʀᴇʀɪᴀ:* ${libreria}
  🪹᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ʙᴏᴛ:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}
  🌹᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ʀᴜɴᴛɪᴍᴇ:* ${uptime}
  🪴᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ʀᴇɢɪsᴛʀᴀᴅᴏs:* ${totalUsers}(${registeredUsers})
  🫟᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ɴᴏ ʀᴇɢɪsᴛʀᴀᴅᴏs:* ${totalUsers - registeredUsers}
  
  🫛᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ʟᴀᴛᴇɴᴄɪᴀ:* ${latensi.toFixed(4)} ms
  🍓᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ʀᴀᴍ ᴜsᴀᴅᴀ:* ${format(totalmem() - freemem())}
  🌲᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ʀᴀᴍ ᴛᴏᴛᴀʟ:* ${format(totalmem())}
  🕸️᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ʀᴀᴍ ʟɪʙʀᴇ:* ${format(freemem())}  
  👻᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *sᴏᴄᴋᴇᴛs ᴏɴʟɪɴᴇ:* ${totalUsers || '0'}
  🪵᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵̷໋࡙ ݊ᩞ *ᴄᴏᴍᴀɴᴅᴏꜱ ᴜꜱᴀᴅᴏꜱ:* ${toNum(totalStats)} (${totalStats})
`

    const thumbnail = (await axios.get('https://files.catbox.moe/ipahdi.jpg', { responseType: 'arraybuffer' })).data

    await conn.sendMessage(
      m.chat,
      {
        productMessage: {
          product: {
            productImage: {
              mimetype: 'image/jpeg',
              jpegThumbnail: thumbnail
            },
            title: '🌸 ʀɪɴ ɪᴛᴏsʜɪ ᴍᴇɴᴜ 🌸',
            description: '✨ Tu asistente personal - Shadowxyz ✨',
            currencyCode: 'USD',
            priceAmount1000: 100000,
            retailerId: 'menu-rin',
            productImageCount: 1
          },
          businessOwnerJid: '51919199620@s.whatsapp.net'
        }
      },
      { quoted: m }
    )

    await conn.sendMessage(
      m.chat,
      {
        text: menuText,
        footer: club,
        contextInfo: {
          mentionedJid: [mentionedJid],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 100,
            newsletterName: channelRD.name
          },
          externalAdReply: {
            title: '🌸 Rin Itoshi Menu 🌸',
            body: 'Tu asistente personal ✨',
            thumbnail,
            mediaType: 1,
            sourceUrl: 'https://github.com/Yuji-XDev',
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    )
  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al generar el menú. Revisa las variables faltantes o la conexión de la imagen.')
  }
}

handler.help = ['menup']
handler.tags = ['main']
handler.command = ['menup', 'menú', 'help']
handler.register = true
export default handler

// Funciones auxiliares
function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}ʜ ${minutes}ᴍ ${seconds}s`
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH')
  if (time >= 5 && time < 12) return 'Buenos días'
  if (time >= 12 && time < 18) return 'Buenas tardes'
  return 'Buenas noches'
}

function toNum(number) {
  if (number >= 1_000_000) return (number / 1_000_000).toFixed(1)