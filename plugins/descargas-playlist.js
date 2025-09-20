import yts from 'yt-search'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🌴 Ingresa el nombre de una playlist.\n\n👉 Ejemplo: *${usedPrefix + command} twice*`,
      m
    )
  }

  try {
    let search = await yts({ query: text, type: 'playlist' })
    if (!search.playlists || !search.playlists.length) {
      return conn.reply(m.chat, "❌ No encontré ninguna playlist.", m)
    }

    let playlists = search.playlists.slice(0, 5)
    let caption = `📀 *Playlists encontradas para:* "${text}"\n\n`

    for (let i = 0; i < playlists.length; i++) {
      let pl = playlists[i]
      caption += `*${i + 1}. ${pl.title}*\n`
      caption += `👤 Autor: ${pl.author?.name || "Desconocido"}\n`
      caption += `🎥 Videos: ${pl.videoCount}\n`
      caption += `⏱️ Duración total: ${pl.duration || "N/A"}\n`
      caption += `🔗 URL: ${pl.url}\n\n`
    }

    await conn.sendMessage(
      m.chat,
      {
        image: { url: playlists[0].thumbnail },
        caption,
        footer: " Usa los comandos para descargar",
        buttons: [
          {
            buttonId: `${usedPrefix}playlistinfo ${playlists[0].url}`,
            buttonText: { displayText: "📜 Ver Detalles" },
            type: 1
          },
          {
            buttonId: `${usedPrefix}menu`,
            buttonText: { displayText: "Menu" },
            type: 1
          }
        ]
      },
      { quoted: m }
    )
  } catch (e) {
    console.error(e)
    m.reply("Error al buscar la playlist, intenta más tarde.")
  }
}

handler.help = ['playlist <texto>']
handler.tags = ['descargas']
handler.command = ['playlist']

export default handler