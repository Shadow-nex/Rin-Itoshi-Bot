import fs from 'fs'
import pkg from '@whiskeysockets/baileys'
const { proto } = pkg

let handler = async (m, { conn, usedPrefix }) => {
  const sections = [
    {
      title: "📂 𝗠𝗘𝗡𝗨𝗦 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘𝗦",
      rows: [
        { 
          title: "📥 Mᴇɴᴜ [ 𝗗𝗟 ]",
          description: "🎧 Descarga contenido de las principales redes: YouTube, Facebook, Spotify, IG, etc.",
          rowId: `${usedPrefix}menudl`
        },       
        {
          title: "⛏️ Mᴇɴᴜ [ 𝗥𝗣𝗚 ]", 
          description: "🎮 Crea tu aventura, recoge recursos, gana oro y domina el mundo RPG ⚔️.", 
          rowId: `${usedPrefix}menurpg` 
        }
      ]
    }
  ]

  const listMessage = {
    text: `╭━━━〔 𝗠𝗘𝗡𝗨𝗦 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘𝗦 〕━━⬣
┃  ✦ 𝗘𝗹𝗶𝗴𝗲 𝘂𝗻𝗮 𝗼𝗽𝗰𝗶𝗼́𝗻 𝗱𝗲𝗹 𝗺𝗲𝗻𝘂́ 👇
╰━━━━━━━━━━━━━━━━⬣`,
    footer: "☘️ Rin Itoshi Bot 💨",
    title: "「 📜 𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 」",
    buttonText: "📂 𝗔𝗕𝗥𝗜𝗥 𝗠𝗘𝗡𝗨𝗦",
    sections
  }

  // enviar lista + preview
  await conn.sendMessage(
    m.chat,
    {
      listMessage,
      contextInfo: {
        externalAdReply: {
          title: "☘️ Rin Itoshi Bot",
          body: "📂 Elige tu menú favorito",
          thumbnail: fs.readFileSync('https://files.catbox.moe/ha863t.jpg'),
          sourceUrl: "https://github.com/Yuji-XDev"
        }
      }
    },
    { quoted: m }
  )

  // reacción
  await conn.sendMessage(m.chat, { react: { text: '🔋', key: m.key } })
}

handler.command = ['menutest']
export default handler