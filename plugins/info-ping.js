import speed from 'performance-now'
import { exec } from 'child_process'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let latensi = speed() - timestamp

  const start = new Date().getTime()
  await conn.sendMessage(m.chat, { text: `*🍂 Calculando ping...*` }, { quoted: m })
  const end = new Date().getTime()
  const latency = end - start

  const uptime = process.uptime()
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const secondsUp = Math.floor(uptime % 60)
  const uptimeFormatted = `${hours}h ${minutes}m ${secondsUp}s`

  const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  const fechaHora = moment().tz('America/Lima').format('YYYY/MM/DD, h:mm A')

  const thumbBuffer = Buffer.from(await (await fetch('https://n.uguu.se/vqJnHBPm.jpg')).arrayBuffer())

  exec(`neofetch --stdout`, async (error, stdout) => {
    let sysInfo = stdout.toString("utf-8").replace(/Memory:/, "Ram:")

    let response = 
`╭━━━〔 🍄 𝙎𝙩𝙖𝙩𝙪𝙨 𝙋𝙞𝙣𝙜 🪴 〕━━⬣
│ 🌷 *\`Ping:\`* ${latency} ms
│ 🍁 *\`Latencia:\`* ${latensi.toFixed(4)} ms
│ 🕸 *\`RAM usada:\`* ${usedRAM} MB
│ 🍧 *\`Uptime:\`* ${uptimeFormatted}
│ ⏰ *\`Fecha/Hora:\`* ${fechaHora}
╰━━━〔 🪷 𝙍𝙞𝙣 𝙄𝙩𝙤𝙨𝙝𝙞 〕━━⬣
\`\`\`${sysInfo.trim()}\`\`\`
> кαиєкι вσт ν3 | 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚂𝙷𝙰𝙳𝙾𝚆-𝚇𝚈𝚉`

    await conn.sendMessage(m.chat, {
      text: response,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ ᴅᴠ.sʜᴀᴅᴏᴡ 🪴',
          body: club,
          thumbnail: thumbBuffer,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak })
  })
}

handler.help = ['ping', 'p']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler