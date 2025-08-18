import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {

  let saludos = [
    "¡Hey! Únete a los grupos oficiales del Bot y comparte con la comunidad...",
    "¡Hola! Ven y forma parte de nuestros grupos oficiales, la comunidad te espera...",
    "¡Saludos! No te pierdas los grupos oficiales del Bot, interactúa con todos..."
  ]
  let separadores = [
    "*✧─✧─✧─✧─✧*",
    "*⭑⭒⭑⭒⭑*",
    "*❀❀❀❀*"
  ]
  let emojis = ["❀","✿","🌸","⚘","💮"]

  let saludo = saludos[Math.floor(Math.random() * saludos.length)]
  let separador = separadores[Math.floor(Math.random() * separadores.length)]
  let em = emojis[Math.floor(Math.random() * emojis.length)]

  let grupos = `
${saludo}

- ${namegrupo}
> *${em}* ${gp1}

${namecomu}
> *${em}* ${comunidad1}

${separador}

⚘ Enlace anulado? entra aquí! 

- ${namechannel}
> *${em}* ${channel}

> ${dev}`

  await conn.sendFile(m.chat, 'https://files.catbox.moe/r2ixaj.jpg', "grupos.jpg", grupos, m)
  await m.react(em)

}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler