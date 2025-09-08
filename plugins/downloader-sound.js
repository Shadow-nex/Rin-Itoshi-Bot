import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🍧 Ingresa el link de *SoundCloud*\n\n⭐ Ejemplo:\n${usedPrefix + command} https://soundcloud.com/...`, m)

  try {

    let url = `https://api.siputzx.my.id/api/d/soundcloud`

    let res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: text })
    })

    if (!res.ok) throw await res.text()
    let json = await res.json()

    if (!json.status) throw `❌ No se encontró el audio.`

    let { title, url: audioUrl, thumbnail, duration, user } = json.data

    let info = `🎶 *Título:* ${title}\n👤 *Usuario:* ${user}\n⏱️ *Duración:* ${(duration/1000).toFixed(0)}s`

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: info }, { quoted: m })

    await conn.sendMessage(m.chat, { 
      audio: { url: audioUrl }, 
      mimetype: 'audio/mpeg',
      fileName: title + '.mp3'
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Ocurrió un error al descargar el audio.', m)
  }
}

handler.command = ['soundcloud2']
export default handler