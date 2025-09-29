/* Codigo de "La Suki Bot"  
---> Modificado por SoyMaycol  
---> Estilizado al estilo ✦ Rin Itoshi ✦ */
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import FormData from 'form-data'
import { promisify } from 'util'
import { pipeline } from 'stream'
import { downloadContentFromMessage } from '@whiskeysockets/baileys'
import yts from 'yt-search'

const streamPipeline = promisify(pipeline)

const handler = async (msg, { conn }) => {
  const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
  if (!quotedMsg || (!quotedMsg.audioMessage && !quotedMsg.videoMessage)) {
    await conn.sendMessage(msg.key.remoteJid, {
      text: `╭━━━〔 ✦ Rin Itoshi ✦ 〕━━⬣
┃ 🎵 Responde a un *audio*, *nota de voz* o *video*  
┃ para que lo analice y te diga qué canción es.  
╰━━━━━━━━━━━━━━⬣`
    }, { quoted: msg })
    return
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: '🎶', key: msg.key }
  })

  try {
    const tmpDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir)
    const fileExt = quotedMsg.audioMessage ? 'mp3' : 'mp4'
    const inputPath = path.join(tmpDir, `${Date.now()}.${fileExt}`)

    const stream = await downloadContentFromMessage(
      quotedMsg.audioMessage || quotedMsg.videoMessage,
      quotedMsg.audioMessage ? 'audio' : 'video'
    )
    const writer = fs.createWriteStream(inputPath)
    for await (const chunk of stream) writer.write(chunk)
    writer.end()

    const form = new FormData()
    form.append('reqtype', 'fileupload')
    form.append('fileToUpload', fs.createReadStream(inputPath))

    const upload = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders()
    })
    if (!upload.data || typeof upload.data !== 'string' || !upload.data.startsWith('http')) {
      throw new Error('El archivo no quiso mostrarse en Catbox…')
    }

    const apiURL = `https://api.neoxr.eu/api/whatmusic?url=${encodeURIComponent(upload.data)}&apikey=russellxz`
    const res = await axios.get(apiURL).catch(() => ({ data: {} }))
    if (!res.data.status || !res.data.data) {
      throw new Error('No logré identificar esta melodía…')
    }

    const { title, artist, album, release } = res.data.data
    const ytSearch = await yts(`${title} ${artist}`)
    const video = ytSearch.videos[0]
    if (!video) throw new Error('No encontré esa canción en YouTube…')

    const banner = `
╭━━━〔 ✦ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 - 𝚄𝙻𝚃𝚁𝙰 ✦ 〕━━⬣
┃ ✧ 𝐂𝐚𝐧𝐜𝐢ó𝐧 𝐝𝐞𝐭𝐞𝐜𝐭𝐚𝐝𝐚 ✧  
┃────────────────────
┃ 📌 *𝐓𝐢𝐭𝐮𝐥𝐨:* ${title}
┃ 👤 *𝐀𝐫𝐭𝐢𝐬𝐭𝐚:* ${artist}
┃ 💿 *𝐀𝐥𝐛𝐮𝐦:* ${album}
┃ 📅 *𝐋𝐚𝐧𝐳𝐚𝐦𝐢𝐧𝐞𝐭𝐨:* ${release}
┃────────────────────
┃ 🔎 *Encontrado en YouTube:*  
┃ 🎥 𝐁𝐮𝐬𝐜𝐚𝐧𝐝𝐨: ${video.title}
┃ ⏱ 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${video.timestamp}
┃ 👁 𝐕𝐢𝐬𝐭𝐚𝐬: ${video.views.toLocaleString()}
┃ 📺 𝐂𝐚𝐧𝐚𝐥: ${video.author.name}
┃ 🔗 𝐋𝐢𝐧𝐤: ${video.url}
╰━━━━━━━━━━━━━━⬣↓`

    await conn.sendMessage(msg.key.remoteJid, {
      image: { url: video.thumbnail },
      caption: banner
    }, { quoted: msg })

    const ytRes = await axios.get(`https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(video.url)}&type=audio&quality=128kbps&apikey=russellxz`).catch(() => ({ data: {} }))
    if (!ytRes.data || !ytRes.data.data || !ytRes.data.data.url) throw new Error('No pude conseguir el audio de YouTube 😣')

    const audioURL = ytRes.data.data.url
    const rawPath = path.join(tmpDir, `${Date.now()}_raw.m4a`)
    const finalPath = path.join(tmpDir, `${Date.now()}_final.mp3`)

    const audioRes = await axios.get(audioURL, { responseType: 'stream' })
    await streamPipeline(audioRes.data, fs.createWriteStream(rawPath))

    await new Promise((resolve, reject) => {
      ffmpeg(rawPath)
        .audioCodec('libmp3lame')
        .audioBitrate('128k')
        .save(finalPath)
        .on('end', resolve)
        .on('error', reject)
    })

    await conn.sendMessage(msg.key.remoteJid, {
      audio: fs.readFileSync(finalPath),
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`
    }, { quoted: msg })

    fs.unlinkSync(inputPath)
    fs.unlinkSync(rawPath)
    fs.unlinkSync(finalPath)

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '✅', key: msg.key }
    })

  } catch (err) {
    await conn.sendMessage(msg.key.remoteJid, {
      text: `❌ Error: ${err.message}`
    }, { quoted: msg })
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '💢', key: msg.key }
    })
  }
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
handler.register = true

export default handler