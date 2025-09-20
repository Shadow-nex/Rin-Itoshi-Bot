import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✨ Ingresa el nombre de una playlist\n\n👉 Ejemplo: *${usedPrefix + command} twice*`

  let search = await yts({ query: text, type: 'playlist' })
  if (!search.playlists || !search.playlists.length) throw '😿 No encontré ninguna playlist'

  let playlists = search.playlists.slice(0, 5) // máximo 5 resultados

  // Armamos la descripción general
  let info = `✨ Resultados de *${text}*  
Se encontraron ${playlists.length} playlists en YouTube.`

  // Creamos items para la lista
  let sections = playlists.map((pl, i) => ({
    header: '📀 Playlist',
    title: pl.title,
    description: `👤 Autor: ${pl.author?.name || 'Desconocido'}\n🎥 Videos: ${pl.videoCount}\n⏱️ Duración: ${pl.duration || 'N/A'}`,
    id: `${usedPrefix}playlistinfo ${pl.url}`
  }))

  // Usamos la miniatura de la primera playlist
  let msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: '🎧 Playlists Encontradas',
            hasMediaAttachment: true,
            ...await prepareWAMessageMedia({ image: { url: playlists[0].thumbnail } }, { upload: conn.waUploadToServer })
          },
          body: { text: info },
          footer: { text: '📌 Selecciona una playlist para más opciones' },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: '🎶 Ver Playlists',
                  sections: [
                    {
                      title: 'Resultados',
                      highlight_label: 'Playlists',
                      rows: sections
                    }
                  ]
                })
              }
            ]
          }
        }
      }
    }
  }, { userJid: conn.user.id, quoted: m })

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.help = ['playlist <texto>']
handler.tags = ['downloader']
handler.command = /^playlist|ytplaylist$/i

export default handler