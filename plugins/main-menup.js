import os from 'os'
import moment from 'moment-timezone'
import speed from 'performance-now'
import { totalmem, freemem } from 'os'
import { sizeFormatter } from 'human-readable'
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

const format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}`
})

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const _speed = speed()
    const uptime = clockString(process.uptime() * 1000)
    const name = await conn.getName(m.sender)
    const totalUsers = Object.keys(global.db.data.users).length
    const registeredUsers = Object.values(global.db.data.users).filter(u => u.registered).length
    const totalCommands = Object.keys(global.plugins).length
    const vs = global.vs || '7.0.0'
    const libreria = 'Baileys'
    const dia = moment.tz('America/Lima').format('dddd')
    const fecha = moment.tz('America/Lima').format('DD/MM/YY')
    const hora = moment.tz('America/Lima').format('HH:mm:ss')
    const mentionedJid = m.sender
    const pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')

    const regbot = `
\`\`\`  ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟☁️⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`  ໍ۪۫꒰̥᷑ໍ᮫۪۫𝆬⭐ ࣮࣮᷑᷑𝐊֘𝐀۫𝐍〪࣮࣫𝐄۪۫࣫𝐊𝐈᮫࣮𝆬᷑•۫֘ ᮫𝆬ᤲ࣫𝐕֘ ᮫𝆬ᤲ࣫3֘ ᮫𝆬ᤲ࣫ 🌿᩠̥ໍ۪۫꒱̥ໍ۪۫ \`\`\`
\`\`\` ︶ִֶָ⏝︶ִֶָ⏝˖ ࣪ ୨✧୧ ࣪ ˖⏝ִֶָ︶⏝ִֶָ︶ \`\`\`

> \`\`\`${ucapan()} ᭡̵໋࡙ᮬ @${mentionedJid.split('@')[0]}\`\`\`
> \`\`\` ꨩ🍄ּֽ֪۪۪〫ࣳׄ ${dia} | ${fecha} | ${hora} *⃟░ \`\`\`

  ☁️ *ᴜsᴜᴀʀɪᴏ:* ${name}
  🪷 *ᴄʀᴇᴀᴅᴏʀ:* 𝐒𝐡𝐚𝐝𝐨𝐰-𝐱𝐲𝐳
  🎋 *ᴄᴏᴍᴀɴᴅᴏs:* ${totalCommands}
  🪾 *ᴠs:* ${vs}
  🍃 *ʟɪʙʀᴇʀɪᴀ:* ${libreria}
  🪹 *ʙᴏᴛ:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}
  🌹 *ʀᴜɴᴛɪᴍᴇ:* ${uptime}
  🪴 *ʀᴇɢɪsᴛʀᴀᴅᴏs:* ${totalUsers} (${registeredUsers})
  🫟 *ɴᴏ ʀᴇɢɪsᴛʀᴀᴅᴏs:* ${totalUsers - registeredUsers}

  🫛 *ʟᴀᴛᴇɴᴄɪᴀ:* ${_speed.toFixed(4)} ms
  🍓 *ʀᴀᴍ ᴜsᴀᴅᴀ:* ${format(totalmem() - freemem())}
  🌲 *ʀᴀᴍ ᴛᴏᴛᴀʟ:* ${format(totalmem())}
  🕸️ *ʀᴀᴍ ʟɪʙʀᴇ:* ${format(freemem())}
  👻 *sᴏᴄᴋᴇᴛs ᴏɴʟɪɴᴇ:* ${totalUsers || '0'}
  🪵 *ᴄᴏᴍᴀɴᴅᴏꜱ ᴜꜱᴀᴅᴏꜱ:* ${toNum(totalCommands)}
`

    const buttons = [
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '🎵 YouTube',
          id: `${usedPrefix}play4`
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '🎧 Spotify',
          id: `${usedPrefix}spotify`
        })
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: '🌸 Página Oficial',
          url: 'https://shadow-xyz.vercel.app',
          merchant_url: 'https://shadow-xyz.vercel.app'
        })
      }
    ]

    const list = [
      {
        header: '🌿 Menú Principal',
        title: '🎶 Comandos de Música',
        description: 'Buscar y reproducir canciones',
        id: `${usedPrefix}musica`
      },
      {
        header: '🪷 Información',
        title: '📊 Estado del Bot',
        description: 'Ver estadísticas del sistema',
        id: `${usedPrefix}estado`
      }
    ]

    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: { text: regbot },
              footer: { text: '🌸 ʀɪɴ ɪᴛᴏsʜɪ - ʙʏ sʜᴀᴅᴏᴡxʏᴢ 🌸' },
              header: {
                title: '🌸 ʀɪɴ ɪᴛᴏsʜɪ 🌸',
                hasMediaAttachment: true,
                imageMessage: await conn.prepareMessageMedia({ image: { url: pp } }, 'imageMessage')
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                      title: '🌸 Abrir menú',
                      sections: [
                        {
                          title: 'Selecciona una opción',
                          rows: list
                        }
                      ]
                    })
                  },
                  ...buttons
                ]
              },
              contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 2024,
                businessMessageForwardInfo: {
                  title: '🌸 ʀɪɴ ɪᴛᴏsʜɪ ᴍᴇɴᴜ 🌸',
                  description: '✨ Tu asistente personal - Shadowxyz ✨',
                  currencyCode: 'USD',
                  priceAmount1000: 100000
                },
                externalAdReply: {
                  title: '🌸 ʀɪɴ ɪᴛᴏsʜɪ 🌸',
                  body: 'Tu asistente personal ✨',
                  thumbnailUrl: pp,
                  sourceUrl: 'https://shadow-xyz.vercel.app',
                  mediaType: 1,
                  renderLargerThumbnail: true
                }
              }
            })
          }
        }
      },
      { quoted: m }
    )

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {
    console.log(e)
    m.reply('⚠️ Error al mostrar el menú.')
  }
}

handler.help = ['menupp']
handler.tags = ['main']
handler.command = /^(menupp|menú)$/i

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  const hour = moment.tz('America/Lima').hour()
  if (hour >= 5 && hour < 12) return '🌅 Buenos Días'
  if (hour >= 12 && hour < 19) return '🏙️ Buenas Tardes'
  return '🌃 Buenas Noches'
}

function toNum(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}