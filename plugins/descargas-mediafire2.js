import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  const user = global.db.data.users[m.sender] || {}

  if (!text) return m.reply(`*${emojis} Por favor, ingresa un link de Mediafire.*`)
  
  await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } })
      await conn.sendMessage(m.chat, {
      text: ' 🄸 🄽 🄸 🄲 🄸 🄰 🄽 🄳 🄾 ᴅᴇsᴄᴀʀɢᴀ\n> *ᴘʀᴏᴄᴇsᴀɴᴅᴏ ᴅᴇsᴄᴀʀɢᴀ ᴇsᴘᴇʀᴇ ᴜɴ ᴍᴏɴᴇɴᴛᴏ ᴜᴡᴜ.*',
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🧢 🆁🄸🅽 • 🄸🆃🄾🆂🄷🅸 💊',
          body: '',
          thumbnailUrl: global.logo,
          sourceUrl: '',
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

🌾 *Nombre* : ${title}
⚡ *Peso* : ${peso}
☃️ *Fecha* : ${fecha}
🌳 *MimeType* : ${tipo}

${emoji} Archivo descargado con éxito.`,
      m
    )

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    console.error(e)
    m.reply(`Error al descargar el archivo.\n${e.message}`)
  }
}

handler.help = ['mediafire2']
handler.tags = ['descargas']
handler.command = ['mf2', 'mediafire2']
handler.register = true
handler.group = true
handler.coin = 10

export default handler

