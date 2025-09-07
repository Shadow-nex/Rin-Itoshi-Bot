let handler = async (m, { conn, command }) => {
  try {
    let url = `https://dark-core-api.vercel.app/api/random/tiktok?key=api`

    let nicknames = ["kohai", "onii-chan", "hime-sama", "kawaii-chan", "senpai"]
    let randomNick = nicknames[Math.floor(Math.random() * nicknames.length)]

    let userTag = '@' + m.sender.split('@')[0]

    let texto = `
╭━━━〔 🎀 *TikTok Random Sempai* 🎀 〕━━⬣
┃ ✨ Aquí tienes tu video, ${userTag}~  
┃ 🐾 Disfruta, *${randomNick}* ❤️
╰━━━━━━━━━━━━━━━━━━⬣
`

    let emojis = ["🎬", "🌸", "🐾", "❤️", "✨", "🔥"]
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
    
    let footers = [
      `🌸 UwU, disfruta ${randomNick} 🌸`,
      `💖 Ara Ara~ ${randomNick} 💖`,
      `✨ Senpai notice me~ ${randomNick} ✨`,
      `🐾 Onii-chan~ ${randomNick} 🐾`,
      `🎀 Kawaii mode activated ${randomNick} 🎀`
    ]
    let randomFooter = footers[Math.floor(Math.random() * footers.length)]

    await conn.sendMessage(m.chat, {
      video: { url },
      caption: texto,
      footer: randomFooter,
      buttons: [
        { buttonId: `.${command}`, buttonText: { displayText: '💖 Dame otro Sempai!' }, type: 1 }
      ],
      headerType: 5,
      mentions: [m.sender]
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      react: {
        text: randomEmoji,
        key: m.key
      }
    })

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al obtener el video, onii-chan~ 💔')
  }
}

handler.help = ['tiktokrandom2']
handler.tags = ['descargas']
handler.command = ['tiktokrandom2', 'tiktokrdm', 'tiktokrand']

export default handler