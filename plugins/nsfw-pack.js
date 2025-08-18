import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://api.waifu.pics/nsfw/waifu')
    if (!res.ok) throw new Error('No se pudo obtener el pack, intenta de nuevo...')

    const json = await res.json()
    if (!json.url) throw new Error('La API no devolvi¨® una URL v¨¢lida')

    await conn.sendFile(m.chat, json.url, 'pack.jpg', '\`Aqu¨ª tienes tu pack\`', m)
  } catch (error) {
    console.error(error)
    m.reply('? Ocurri¨® un error al obtener el pack, intenta m¨¢s tarde.')
  }
}

handler.command = ['pack2']
handler.tags = ['nsfw']
handler.help = ['pack2']
handler.level = 10
handler.register = true
handler.premium = true

export default handler