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
    const vs = '1.0.0'
    const libreria = 'Baileys'
    const club = '© Rin Itoshi | Shadow-xyz'
    const channelRD = {
      id: '120363401008003732@newsletter',
      name: 'Rin Itoshi Updates'
    }

    // Datos del sistema
    let timestamp = speed()
    let mentionedJid = m.mentionedJid?.[0] || m.sender
    let name = await conn.getName(m.sender)
    let uptime = clockString(process.uptime() * 1000)
    let totalCommands = Object.keys(global.plugins).length
    let totalUsers = Object.keys(global.db.data.users).length
    let registeredUsers = Object.values(global.db.data.users).filter(u => u.registered).length
    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('HH:mm:ss')
    let dia = moment.tz('America/Lima').format('dddd')
    let _speed = speed() - timestamp

    // 🩵 Texto principal
    let menuText = `
\`\`\`  ༺🌸 ʀɪɴ ɪᴛᴏsʜɪ ᴍᴇɴᴜ 🌸༻ \`\`\`

> ${ucapan()} ᭡̵໋࡙ᮬ @${mentionedJid.split('@')[0]}
> ${dia} | ${fecha} | ${hora}

☁️ *Usuario:* ${name}  
🪷 *Creador:* 𝐒𝐡𝐚𝐝𝐨𝐰-𝐱𝐲𝐳  
🎋 *Comandos:* ${totalCommands}  
🪾 *Versión:* ${vs}  
🍃 *Librería:* ${libreria}  
🪹 *Bot:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}  
🌹 *Runtime:* ${uptime}  
🪴 *Registrados:* ${totalUsers} (${registeredUsers})  
🫛 *Latencia:* ${_speed.toFixed(4)} ms  
🍓 *RAM usada:* ${format(totalmem() - freemem())}  
🌲 *RAM total:* ${format(totalmem())}  
🕸️ *RAM libre:* ${format(freemem())}
`

    // 🖼️ Imagen del producto
    const thumbnail = (await axios.get('https://files.catbox.moe/rru021.jpg', { responseType: 'arraybuffer' })).data

    // 📦 Enviar mensaje tipo producto
    await conn.sendMessage(
      m.chat,
      {
        productMessage: {
          product: {
            title: '🌸 ʀɪɴ ɪᴛᴏsʜɪ ᴍᴇɴᴜ 🌸',
            description: '✨ Tu asistente personal - Shadowxyz ✨',
            currencyCode: 'USD',
            priceAmount1000: 100000,
            retailerId: 'menu-rin',
            productImageCount: 1,
            productImage: {
              url: 'https://files.catbox.moe/rru021.jpg'
            },
            businessOwnerJid: '51919199620@s.whatsapp.net'
          },
          businessOwnerJid: '51919199620@s.whatsapp.net',
          messageContextInfo: {
            messageType: 'product',
            isForwarded: true
          },
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
              mediaType: 1,
              thumbnail,
              sourceUrl: 'https://github.com/Yuji-XDev',
              renderLargerThumbnail: true
            }
          }
        }
      },
      { quoted: m }
    )

    // 💬 Enviar el texto principal con footer
    await conn.sendMessage(
      m.chat,
      {
        text: menuText,
        footer: club,
        contextInfo: {
          mentionedJid: [mentionedJid],
          externalAdReply: {
            title: '🌸 Rin Itoshi Menu 🌸',
            body: 'Tu asistente personal ✨',
            mediaType: 1,
            thumbnail,
            sourceUrl: 'https://github.com/Yuji-XDev',
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    )
  } catch (e) {
    console.error(e)
    await m.reply('⚠️ Error al generar el menú. Verifica la conexión o el formato del mensaje.')
  }
}

handler.help = ['menup']
handler.tags = ['main']
handler.command = ['menup', 'menú', 'help']
handler.register = true
export default handler

// 🔧 Funciones auxiliares
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