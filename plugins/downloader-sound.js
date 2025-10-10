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
    if (!json.status) throw ' No se pudo obtener el audio.'

    const { title, url, thumbnail, user } = json.data
    let msg = `
𝗜 𝗡 𝗜 𝗖 𝗜 𝗔 𝗡 𝗗 𝗢 • 𝗗 𝗘 𝗦 𝗖 𝗔 𝗥 𝗚 𝗔 
> 📌 *${title}*
> 🏔️ *${user}*`

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: msg ...rcanal }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: url },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`
    }, { quoted: fkontak })

    await m.react('✔️')

  } catch (err) {
    console.error(err)
    await m.reply('⚠️ Error al descargar el audio. Asegúrate de que el enlace sea válido o inténtalo más tarde.')
  }
}

handler.help = ['soundcloud2']
handler.tags = ['downloader']
handler.command = ['soundcloud2', 'scdl']

export default handler