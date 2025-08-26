import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🍂 *Ejemplo de uso:*\n\n✎ ✧ ${usedPrefix + command} https://www.youtube.com/watch?v=C8mJ8943X80`)
  }

  try {
    const apiUrl = `https://api.betabotz.eu.org/api/download/ytmp4?url=${encodeURIComponent(text)}&apikey=Btz-2ZnpC`


    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`Error en la API: ${res.statusText}`)

    const data = await res.json()

    if (!data.status || !data.result) {
      return m.reply('⚠️ No se pudo obtener el video, intenta con otro link.')
    }

    const { title, description, id, thumb, source, duration, mp3, mp4, error } = data.result

    if (error) return m.reply(`❌ Error: ${error}`)

    let caption = `
╭━━━〔 🎥 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 〕━━⬣
┃ 📝 *Título:* ${title || 'Sin título'}
┃ 📄 *Descripción:* ${description || 'No disponible'}
┃ ⏳ *Duración:* ${duration || 'No disponible'}
┃ 🔗 *Fuente:* ${source}
┃ 🆔 *ID:* ${id}
╰━━━━━━━━━━━━━━━━━━⬣
`
    await conn.sendFile(m.chat, mp4, `${id}.mp4`, caption, m, false, { thumbnail: thumb })

  } catch (e) {
    console.error(e)
    m.reply(`❌ Error al procesar el comando:\n\n${e.message}`)
  }
}

handler.help = ['mp4']
handler.tags = ['descargas']
handler.command = ['mp4']

export default handler