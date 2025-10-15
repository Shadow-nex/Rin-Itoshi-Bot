import speed from 'performance-now'
import { exec } from 'child_process'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let latensi = speed() - timestamp

  const start = new Date().getTime()
  await conn.sendMessage(m.chat, { text: `*⚙️ 𝘊𝘢𝘭𝘤𝘶𝘭𝘢𝘯𝘥𝘰 𝘱𝘪𝘯𝘨...*` }, { quoted: m })
  const end = new Date().getTime()
  const latency = end - start

  const uptime = process.uptime()
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const secondsUp = Math.floor(uptime % 60)
  const uptimeFormatted = `${hours}h ${minutes}m ${secondsUp}s`

  const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  const fechaHora = moment().tz('America/Lima').format('YYYY/MM/DD, h:mm A')

  const thumbBuffer = Buffer.from(await (await fetch('https://i.pinimg.com/originals/d0/bc/19/d0bc19ccb8e9441e1b3962990bfb09a6.png')).arrayBuffer())

  exec(`neofetch --stdout`, async (error, stdout) => {
    let sysInfo = stdout.toString("utf-8").replace(/Memory:/, "Ram:")

    let response = 
` \`⚡ 𝗦 𝗧 𝗔 𝗧 𝗨 𝗦 • 𝗣 𝗜 𝗡 𝗚 🌿\`

┌ ° 🌟 *Ping:* ${latency} ms
│ ° 📡 *Latency:* ${latensi.toFixed(4)} ms
│ ° 💻 *RAM Usage:* ${usedRAM} MB
│ ° ⏳ *Uptime:* ${uptimeFormatted}
└ ° 🗓️ *Date/Time:* ${fechaHora}
\`\`\`${sysInfo.trim()}\`\`\`
> ☃️︎ ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ | 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚂𝙷𝙰𝙳𝙾𝚆-𝚇𝚈𝚉`

    await conn.sendMessage(m.chat, {
      text: response,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: ' 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐔𝐥𝐭𝐫𝐚 𝐁𝐨𝐭 |-🌹-|',
          body: '',
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