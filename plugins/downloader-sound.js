import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🎧 *Ingresa un enlace válido de SoundCloud.*`)

  await m.react('🎶')

  try {
    const res = await fetch('https://api.siputzx.my.id/api/d/soundcloud', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: text })
    })

    const json = await res.json()
    if (!json.status || !json.data) throw '❌ No se pudo obtener el audio.'

    const { title, url, thumbnail, user } = json.data

    const caption = `
 🎧 𝐒𝐎𝐔𝐍𝐃𝐂𝐋𝐎𝐔𝐃 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🍏

> 🌿 *Título:* ${title}
> 🎋 *Artista:* ${user}
> 🌐 *Enlace:* ${url}

📌 *Preparando audio...*
    `.trim()

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: caption
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`
    }, { quoted: m })

    await m.react('✅')

  } catch (err) {
    console.error(err)
    await m.reply(' *Error al descargar el audio.*\nVerifica el enlace o inténtalo más tarde.')
  }
}

handler.help = ['soundcloud2']
handler.tags = ['downloader']
handler.command = ['soundcloud2', 'scdl']

export default handler