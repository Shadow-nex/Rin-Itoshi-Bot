import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `*⚡ Usa el comando así:*\n> \n\n${usedPrefix + command} WhatsApp`, m, fake)

  try {

    let res = await fetch(`https://api.stellarwa.xyz/search/mediafire?text=${encodeURIComponent(text)}&apikey=Diamond`)
    let json = await res.json()

    if (!json.status) throw `❌ No encontré resultados para: *${text}*`

    let txt = `✨ *Resultados MediaFire para:* ${text}\n\n`
    json.results.forEach((file, i) => {
      txt += `*${i + 1}.* ${file.filename}\n`
      txt += `   📦 Tamaño: ${file.filesize}\n`
      txt += `   🔗 Link: ${file.url}\n\n`
    })

    await conn.reply(m.chat, txt, m)

  } catch (err) {
    console.error(err)
    await conn.reply(m.chat, '❌ Ocurrió un error al consultar la API.', m)
  }
}

handler.help = ['mediafiresearch <texto>']
handler.tags = ['buscador']
handler.command = ['mediafiresearch', 'mfse']

export default handler