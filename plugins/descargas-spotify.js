// - By Shadow-xyz
// -51919199620

import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🎋 *Por favor, proporciona el nombre de una canción o artista.*`, m, fake)

  try {
    let searchUrl = `https://api.delirius.store/search/spotify?q=${encodeURIComponent(text)}&limit=1`
    let search = await axios.get(searchUrl, { timeout: 15000 })

    if (!search.data.status || !search.data.data || search.data.data.length === 0) {
      throw new Error('No se encontró resultado.')
    }

    let data = search.data.data[0]
    let { title, artist, album, duration, popularity, publish, url: spotifyUrl, image } = data

    let caption = `「✦」Descargando *<${title}>*\n\n` +
      `> ꕥ Autor » *${artist}*\n` +
      (album ? `> ❑ Álbum » *${album}*\n` : '') +
      (duration ? `> ⴵ Duración » *${duration}*\n` : '') +
      (popularity ? `> ✰ Popularidad » *${popularity}*\n` : '') +
      (publish ? `> ☁︎ Publicado » *${publish}*\n` : '') +
      (spotifyUrl ? `> 🜸 Enlace » ${spotifyUrl}` : '')

    await conn.sendMessage(m.chat, {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: '🕸️ ✧ s⍴᥆𝗍і𝖿ᥡ • mᥙsіᥴ ✧ 🌿',
          body: artist,
          thumbnailUrl: image,
          sourceUrl: spotifyUrl,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    let downloadUrl = null
    let serverUsed = 'Desconocido'

    try {
      let apiV1 = `https://api.nekolabs.my.id/downloader/spotify/v1?url=${encodeURIComponent(spotifyUrl)}`
      let dl1 = await axios.get(apiV1, { timeout: 20000 })
      if (dl1?.data?.result?.downloadUrl) {
        downloadUrl = dl1.data.result.downloadUrl
        serverUsed = 'Nekolabs'
      }
    } catch { }

    if (!downloadUrl || downloadUrl.includes('undefined')) {
      try {
        let apiSylphy = `https://api.sylphy.xyz/download/spotify?url=${encodeURIComponent(spotifyUrl)}&apikey=sylphy-c519`
        let dlSylphy = await axios.get(apiSylphy, { timeout: 20000 })
        if (dlSylphy?.data?.status && dlSylphy?.data?.data?.dl_url) {
          downloadUrl = dlSylphy.data.data.dl_url
          serverUsed = 'Sylphy'
        }
      } catch { }
    }

    if (!downloadUrl || downloadUrl.includes('undefined')) {
      try {
        let apiV3 = `https://api.neoxr.eu/api/spotify?url=${encodeURIComponent(spotifyUrl)}&apikey=russellxz`
        let dl3 = await fetch(apiV3)
        let json3 = await dl3.json()
        if (json3?.status && json3?.data?.url) {
          downloadUrl = json3.data.url
          serverUsed = 'Neoxr'
        }
      } catch { }
    }

    if (downloadUrl) {
      let audio = await fetch(downloadUrl)
      let buffer = await audio.buffer()

      await conn.sendMessage(m.chat, {
        audio: buffer,
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: "✎ 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖.",
            body: `✿ 𝙎𝙚𝙧𝙫𝙞𝙙𝙤𝙧: ${serverUsed}`,
            thumbnailUrl: image,
            sourceUrl: spotifyUrl,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      }, { quoted: fkontak })

    } else {
      conn.reply(m.chat, `No se encontró un link de descarga válido para esta canción.`, m)
    }

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `❌ Error al buscar o descargar la canción.`, m)
  }
}

handler.help = ["spotify"]
handler.tags = ["download"]
handler.command = ["spotify", "splay"]
handler.group = true
handler.register = true

export default handler