import fs from 'fs'

let handler = async (m, { conn }) => {
  try {
    m.reply(`🌀 REINICIANDO SYSTEM......`)

    fs.writeFileSync('./restarting.txt', m.chat)

    setTimeout(() => {
      process.exit(0)
    }, 3000)

  } catch (error) {
    console.error(error)
    conn.reply(m.chat, `❌ Error: ${error}`, m)
  }
}

setTimeout(async () => {
  const fs = await import('fs')
  const path = './restarting.txt'
  if (fs.existsSync(path)) {
    const chatId = fs.readFileSync(path, 'utf-8')
    global.conn?.sendMessage?.(chatId, {
      text: '「✅」 El bot ya está online!',
    }).catch(console.error)
    fs.unlinkSync(path)
  }
}, 3000)

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar']
handler.rowner = true

export default handler