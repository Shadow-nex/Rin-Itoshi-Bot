import fetch from 'node-fetch'

//código creado por tu jefe 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
//deja créditos pa

const handler = async (m, { conn }) => {
  let res = await fetch('https://api.waifu.pics/nsfw/waifu')
  if (!res.ok) throw 'No se pudo obtener el pack, intenta de nuevo...'
  let json = await res.json()
  await conn.sendFile(m.chat, json.url, 'pack.jpg', `Aqui tienes tu pack`, m)
}

handler.command = ['pack2']
handler.tags = ['nsfw']
handler.help = ['pack2']
handler.level = 10
handler.register = true
handler.premium = true

export default handler
