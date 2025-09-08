import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🍧 Ingresa el nombre o link de *SoundCloud*\n\n⭐ Ejemplo:\n${usedPrefix + command} duka`,
      m
    )
  }

  try {

    let searchUrl = `https://api.siputzx.my.id/api/s/soundcloud?query=${encodeURIComponent(text)}`
    let resSearch = await fetch(searchUrl)
    if (!resSearch.ok) throw await resSearch.text()
    let jsonSearch = await resSearch.json()

    if (!jsonSearch.status || !jsonSearch.data || jsonSearch.data.length === 0) {
      throw `❌ No se encontraron resultados para: *${text}*`
    }

    let first = jsonSearch.data[0]

    let {
      permalink = "Desconocido",
      permalink_url = "",
      artwork_url = "",
      duration = 0,
      genre = "N/A",
      playback_count = 0,
      created_at = ""
    } = first

    let downloadUrl = `https://api.siputzx.my.id/api/d/soundcloud`
    let resDl = await fetch(downloadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: permalink_url })
    })

    if (!resDl.ok) throw await resDl.text()
    let jsonDl = await resDl.json()

    if (!jsonDl.status) throw `❌ No se pudo descargar el audio.`

    let { title = permalink, url: audioUrl, thumbnail = artwork_url } = jsonDl.data

    let info = `🎶 *Título:* ${title}
👤 *Usuario:* ${permalink}
🎼 *Género:* ${genre}
⏱️ *Duración:* ${(duration / 1000).toFixed(0)}s
▶️ *Reproducciones:* ${playback_count.toLocaleString()}
📅 *Fecha:* ${created_at}
🔗 *Link:* ${permalink_url}`

    await conn.sendMessage(
      m.chat,
      { image: { url: thumbnail || artwork_url }, caption: info },
      { quoted: m }
    )

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: audioUrl },
        mimetype: 'audio/mpeg',
        fileName: title + '.mp3'
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Ocurrió un error al buscar/descargar el audio.', m)
  }
}

handler.command = ['soundcloud2']
export default handler