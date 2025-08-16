import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `*${xsticker} Por favor, ingresa un texto para realizar tu sticker.*`, m, rcanal)
    }

    await m.react('☁️')

    const url = `https://api.nekorinn.my.id/maker/brat-v2?text=${encodeURIComponent(text)}`
    const stiker = await sticker(null, url, packname, author)

    if (!stiker) throw 'Error al generar el sticker.'

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', fkontak)
    await m.react('✅')
  } catch (err) {
    console.error(err)
    await m.react('✖️')
    m.reply(typeof err === 'string' ? err : 'Ocurrió un error al generar el sticker.')
  }
}

handler.help = ['brat <texto>']
handler.tags = ['sticker']
handler.command = /^brat$/i

export default handler