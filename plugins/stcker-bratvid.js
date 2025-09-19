import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchBratVid = async (text, attempt = 1) => {
  try {
    const response = await axios.get(`https://api.zenzxz.my.id/maker/bratvid`, {
      params: { text: encodeURIComponent(text) },
      responseType: 'arraybuffer'
    })
    return response.data
  } catch (error) {
    if (error.response?.status === 429 && attempt <= 3) {
      const retryAfter = error.response.headers['retry-after'] || 5
      await delay(retryAfter * 1000)
      return fetchBratVid(text, attempt + 1)
    }
    throw error
  }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text && !m.quoted?.text) {
      return conn.sendMessage(m.chat, { text: `🎋 Ejemplo: *${usedPrefix + command} Hola*` }, { quoted: m })
    }

    const inputText = m.quoted?.text || text
    await m.react('🕒')

    const buffer = await fetchBratVid(inputText)

    let packstickers = global.db.data.users[m.sender] || {}
    let texto1 = packstickers.text1 || global.packsticker || 'Pack'
    let texto2 = packstickers.text2 || global.packsticker2 || 'Bot'

    const stiker = await sticker(buffer, false, texto1, texto2, { asSticker: true })
    if (!stiker) throw new Error('No se pudo generar el sticker animado.')

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    await m.react('✔️')
  } catch (e) {
    await m.react('✖️')
    conn.sendMessage(m.chat, {
      text: `⚠︎ Ocurrió un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`
    }, { quoted: m })
  }
}

handler.tags = ['sticker']
handler.help = ['bratvid <texto>']
handler.command = ['bratvid']

export default handler