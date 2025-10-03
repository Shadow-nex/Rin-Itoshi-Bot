/*import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🍂 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://open.spotify.com/track/0RmVGwfIgezMi7EKB3lU0B\n\n✎ ✧ \`${usedPrefix + command}\` TWICE - I CAN'T STOP ME`)
  }

  try {
    let info, json

    if (text.includes("spotify.com/track")) {
      const url1 = `https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(text)}`
      const res1 = await fetch(url1)
      if (!res1.ok) throw await res1.text()
      const j1 = await res1.json()
      if (!j1 || !j1.data || !j1.data.url) throw "No pude obtener la descarga"

      json = {
        title: j1.data.title,
        author: j1.data.author,
        image: j1.data.image,
        duration: j1.data.duration,
        url: j1.data.url
      }

      const query = encodeURIComponent(j1.data.title + " " + j1.data.author)
      const resInfo = await fetch(`https://api.yupra.my.id/api/search/spotify?q=${query}`)
      if (resInfo.ok) {
        const jInfo = await resInfo.json()
        info = jInfo.result?.[0] || null
      }

    } else {

      const resSearch = await fetch(`https://api.yupra.my.id/api/search/spotify?q=${encodeURIComponent(text)}`)
      if (!resSearch.ok) throw await resSearch.text()
      const jSearch = await resSearch.json()
      if (!jSearch.result || !jSearch.result[0]) throw "No encontré resultados"

      info = jSearch.result[0]

      const previewUrl = info.spotify_preview
      const resDl = await fetch(`https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(previewUrl)}`)
      if (!resDl.ok) throw await resDl.text()
      const jDl = await resDl.json()
      if (!jDl || !jDl.data || !jDl.data.url) throw "No pude obtener la descarga"

      json = {
        title: jDl.data.title,
        author: jDl.data.author,
        image: jDl.data.image,
        duration: jDl.data.duration,
        url: jDl.data.url
      }
    }

    const name = json.title || "Desconocido"
    const author = json.author || "Desconocido"
    const download = json.url
    const durationMs = json.duration || 0
    const duration = durationMs > 0 ? 
      new Date(durationMs).toISOString().substr(14, 5) : 
      "Desconocido"

    await conn.sendMessage(m.chat, { react: { text: '🕓', key: m.key } })

    let moreInfo = info ? `
🎶 Álbum: ${info.album_name || "Desconocido"}
📀 Release: ${info.release_date || "N/A"}
🔗 Preview: ${info.spotify_preview || "N/A"}` : ""

    let caption = `\`\`\`🧪 Título: ${name}
👤 Artista: ${author}
⏱️ Duración: ${duration}\`\`\`${moreInfo}`

    await conn.sendMessage(m.chat, {
      text: '🍂 *B U S C A N D O. . . ...*',
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ ᴅᴠ.sʜᴀᴅᴏᴡ 🪴',
          body: name,
          mediaType: 1,
          thumbnailUrl: json.image,
          renderLargerThumbnail: true,
          sourceUrl: text
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      document: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      caption: caption
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${name}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: name,
          body: "Spotify",
          mediaType: 2,
          thumbnailUrl: json.image,
          renderLargerThumbnail: true,
          sourceUrl: text
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("`❌ Error al procesar la descarga de Spotify.`")
  }
}

handler.help = ['music <url|nombre>']
handler.tags = ['dl']
handler.command = ['music']

export default handler*/


// - By ShadowCore 🎋

import axios from "axios"
import * as cheerio from "cheerio"

const client_id = "acc6302297e040aeb6e4ac1fbdfd62c3"
const client_secret = "0e8439a1280a43aba9a5bc0a16f3f009"
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"

const getToken = async () => {
  const res = await axios.post(
    TOKEN_ENDPOINT,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: "Basic " + basic,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
  return res.data.access_token
}

const searchTrack = async (query, token) => {
  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  if (res.data.tracks.items.length === 0) throw new Error("Canción no encontrada.")
  return res.data.tracks.items[0]
}

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("🌴 Ingresa el nombre de una canción o una URL de Spotify.")

  await conn.sendMessage(m.chat, { react: { text: "🍁", key: m.key } })

  try {
    let track
    const token = await getToken()

    if (/https?:\/\/(open\.)?spotify\.com\/track\/[a-zA-Z0-9]+/.test(text)) {
      const id = text.split("/track/")[1].split("?")[0]
      const res = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      track = res.data
    } else {

      track = await searchTrack(text, token)
    }

    const image = track.album.images[0]?.url || null
    const caption = `╭─🎧 *Spotify Music Info*
│💿 *Título:* ${track.name}
│🎨 *Artista:* ${track.artists.map((a) => a.name).join(", ")}
│📚 *Álbum:* ${track.album.name}
│📅 *Fecha:* ${track.album.release_date}
│⏱️ *Duración:* ${(track.duration_ms / 60000).toFixed(2)} min
│🔗 *Link:* ${track.external_urls.spotify}
╰─────────────`

    await conn.sendMessage(
      m.chat,
      {
        image: { url: image },
        caption,
        contextInfo: {
          externalAdReply: {
            title: track.name,
            body: `Artista: ${track.artists.map((a) => a.name).join(", ")}`,
            thumbnailUrl: image,
            mediaUrl: track.external_urls.spotify,
            sourceUrl: track.external_urls.spotify,
            mediaType: 1,
          },
        },
      },
      { quoted: m }
    )

    const data = new SpotMate()
    const info = await data.convert(track.external_urls.spotify)

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: info.url },
        mimetype: "audio/mpeg",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: track.name,
            body: `Álbum: ${track.album.name}`,
            thumbnailUrl: image,
            mediaUrl: track.external_urls.spotify,
            sourceUrl: track.external_urls.spotify,
            mediaType: 1,
          },
        },
      },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, { react: { text: "💥", key: m.key } })
  } catch (err) {
    console.error(err)
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
    m.reply("❌ No se pudo obtener la canción. Intenta de nuevo más tarde.\n\n" + err.message)
  }
}

handler.help = ["music"]
handler.tags = ["descargas"]
handler.command = ["music"]

export default handler


class SpotMate {
  constructor() {
    this._cookie = null
    this._token = null
  }

  async _visit() {
    try {
      const response = await axios.get("https://spotmate.online/en", {
        headers: { "user-agent": "Mozilla/5.0" },
      })

      const setCookieHeader = response.headers["set-cookie"]
      if (setCookieHeader) {
        this._cookie = setCookieHeader.map((c) => c.split(";")[0]).join("; ")
      }

      const $ = cheerio.load(response.data)
      this._token = $('meta[name="csrf-token"]').attr("content")

      if (!this._token) throw new Error("Token CSRF no encontrado.")
    } catch (error) {
      throw new Error(`Error visitando SpotMate: ${error.message}`)
    }
  }

  async convert(spotifyUrl) {
    if (!this._cookie || !this._token) await this._visit()

    try {
      const response = await axios.post(
        "https://spotmate.online/convert",
        { urls: spotifyUrl },
        { headers: this._getHeaders() }
      )
      return response.data
    } catch (error) {
      throw new Error(`Error al convertir canción: ${error.message}`)
    }
  }

  _getHeaders() {
    return {
      accept: "*/*",
      "content-type": "application/json",
      cookie: this._cookie,
      origin: "https://spotmate.online",
      referer: "https://spotmate.online/en",
      "user-agent": "Mozilla/5.0",
      "x-csrf-token": this._token,
    }
  }
}