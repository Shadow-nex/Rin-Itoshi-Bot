import fetch from 'node-fetch'

//código creado por tu jefe 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
//para Hinata Bot, deja créditos pa

const handler = async (m, { conn }) => {
  let res = await fetch('https://api.waifu.pics/nsfw/waifu')
  if (!res.ok) throw 'No se pudo obtener el pack, intenta de nuevo...'
  let json = await res.json()
  await conn.sendFile(m.chat, json.url, 'pack.jpg', `Aquí tienes tu pack sucio\n¿Te gusta lo atrevido, verdad?`, m)
}

handler.command = /^pack|packpack|packsito$/i
handler.tags = ['nsfw']
handler.help = ['pack']
handler.register = true
handler.premium = false
handler.level = 0
handler.limit = false
handler.nsfw = true

export default handler
