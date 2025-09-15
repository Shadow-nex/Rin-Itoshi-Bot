import axios from 'axios'

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    return m.reply(`¡Introduce el link de la canción!`)
  }

  try {

await m.react("⏳")

    const down = await axios.get(`https://velyn.biz.id/api/downloader/spotifydl?url=${encodeURIComponent(text)}`)
    const download = down.data.data
    if (!download?.download) throw m.reply('❌ Error al descargar la canción.');

    await conn.sendMessage(m.chat, {
  audio: { url: download.download },
  mimetype: 'audio/mpeg',
  fileName: `${download.title} - ${download.artist}.mp3`,
}, { quoted: m })
await m.react("✅")
  } catch (e) {
    console.error(e)
    m.reply(typeof e === 'string' ? e : '❌ Se produjo un error al procesar la canción.')
    await m.react("❌")
  }
}

handler.help = ['spotifydl', 'spotify'].map(v => v + ' *<url>*')
handler.tags = ['downloader']
handler.command = ["spotifydl","spotify"]

export default handler