import fetch from 'node-fetch'
import { Sticker } from 'wa-sticker-formatter'

const wm = 'RinBot'

let handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`Ejemplo: .${command} Gatitos`)

  try {

    const searchRes = await fetch(`https://zenzxz.dpdns.org/search/stickerlysearch?query=${encodeURIComponent(text)}`)
    const searchJson = await searchRes.json()

    if (!searchJson.status || !Array.isArray(searchJson.data) || searchJson.data.length === 0) {
      return m.reply('No hay stickers aquí')
    }

    const pick = searchJson.data[Math.floor(Math.random() * searchJson.data.length)]


    const detailUrl = `https://zenzxz.dpdns.org/tools/stickerlydetail?url=${encodeURIComponent(pick.url)}`
    const detailRes = await fetch(detailUrl)
    const detailJson = await detailRes.json()

    if (!detailJson.status || !detailJson.data || !Array.isArray(detailJson.data.stickers) || detailJson.data.stickers.length === 0) {
      return m.reply('Error al tomar los stickers')
    }

    const packName = detailJson.data.name
    const authorName = detailJson.data.author?.name || 'unknown'

    m.reply(`Encontré ${detailJson.data.stickers.length} sticker(s)`)


    const stickersToSend = detailJson.data.stickers.slice(0, 10)

    for (const img of stickersToSend) {

      const sticker = new Sticker(img.imageUrl, {
        pack: packName || wm,
        author: authorName,
        type: 'full',
        categories: ['😏'],
        id: 'zenzxd'
      })
      const buffer = await sticker.toBuffer()
      await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
    }

  } catch (e) {
    console.error(e)
    m.reply('Error al procesar los stickers')
  }
}

handler.help = ['stikerly *<consulta>*']
handler.tags = ['sticker']
handler.command = ['stikerly']
export default handler