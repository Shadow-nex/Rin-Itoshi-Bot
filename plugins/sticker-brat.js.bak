import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const fetchSticker = async (text, attempt = 1) => {
  try {
    const response = await axios.get(`https://api.zenzxz.my.id/maker/brat`, { params: { text }, responseType: 'arraybuffer' })
    return response.data
  } catch (error) {
    if (error.response?.status === 429 && attempt <= 3) {
      const retryAfter = error.response.headers['retry-after'] || 5
      await delay(retryAfter * 1000)
      return fetchSticker(text, attempt + 1)
    }
    throw error
  }
}

const handler = async (m, { conn, text }) => {
  try {
    let userId = m.sender
    let packstickers = global.db.data.users[userId] || {}
    let texto1 = packstickers.text1 || global.packsticker
    let texto2 = packstickers.text2 || global.packsticker2

    switch (m.command) {
      case 'brat': {
        text = m.quoted?.text || text
        if (!text) return conn.sendMessage(m.chat, { text: '🎋 Por favor, responde a un mensaje o ingresa un texto para crear el Sticker.' }, { quoted: m })
        await m.react('🕒')
        const buffer = await fetchSticker(text)
        const stiker = await sticker(buffer, false, texto1, texto2)
        if (!stiker) throw new Error('ꕥ No se pudo generar el sticker.')
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        await m.react('✔️')
        break
      }
    }
  } catch (e) {
    await m.react('✖️')
    conn.sendMessage(m.chat, { text: `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}` }, { quoted: m })
  }
}

handler.tags = ['sticker']
handler.help = ['brat']
handler.command = ['brat']

export default handler