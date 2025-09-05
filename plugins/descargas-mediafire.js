import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  const user = global.db.data.users[m.sender] || {}

  if (!text) return m.reply(`*${emojis} Por favor, ingresa un link de Mediafire.*`)
  
  await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } })
      await conn.sendMessage(m.chat, {
      text: '🍂 *D E S C A R G A N D O. . . ...*\n> 𝙴𝚂𝙿𝙴𝚁𝙴 𝚄𝙽 𝙼𝙾𝙼𝙴𝙽𝚃𝙸𝚃𝙾 𝚄𝚆𝚄',
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ sʜᴀᴅᴏᴡ.xʏᴢ 🪴',
          body: club,
          thumbnailUrl: global.logo,
          sourceUrl: 'https://Instagram.com',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
  }, { quoted: m })
  
  try {
    let res = await fetch(`https://api.stellarwa.xyz/dow/mediafire?url=${encodeURIComponent(text)}&apikey=proyectsV2`)
    let json = await res.json()

    if (!json.status) throw new Error("No se pudo obtener el archivo.")

    let { title, peso, fecha, tipo, dl } = json.data

    await conn.sendFile(
      m.chat,
      dl,
      title,
      `乂  *¡MEDIAFIRE - DESCARGAS!*  乂

🌱 *Nombre* : ${title}
⚡ *Peso* : ${peso}
💖 *Fecha* : ${fecha}
🌳 *MimeType* : ${tipo}

${emoji} Archivo descargado con éxito.`,
      m
    )

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    console.error(e)
    m.reply(`❌ Error al descargar el archivo.\n${e.message}`)
  }
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mf', 'mediafire']
handler.register = true
handler.group = true

export default handler