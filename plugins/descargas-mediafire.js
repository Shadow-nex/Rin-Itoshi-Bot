import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  const user = global.db.data.users[m.sender] || {}
  const emoji = '🌟'
  const apikey = 'proyectsV2' // 🔑 Tu API KEY definida aquí

  /* Verificación de usuarios VIP
  if (!user.premium || (user.premiumTime && user.premiumTime < Date.now())) {
    return conn.reply(
      m.chat,
      `🚩 Este comando es exclusivo para usuarios VIP.\n\n${emoji} Usa *vip* para obtener acceso.`,
      m
    )
  }
*/
  if (!text) return m.reply(`${emoji} Por favor, ingresa un link de Mediafire.`)
  
  await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } })
  
  try {
    let res = await fetch(`https://api.stellarwa.xyz/dow/mediafire?url=${encodeURIComponent(text)}&apikey=${apikey}`)
    let json = await res.json()

    if (!json.status) throw new Error("No se pudo obtener el archivo.")

    let { title, peso, fecha, tipo, dl } = json.data

    await conn.sendFile(
      m.chat,
      dl,
      title,
      `乂  *¡MEDIAFIRE - DESCARGAS!*  乂

✩ *Nombre* : ${title}
✩ *Peso* : ${peso}
✩ *Fecha* : ${fecha}
✩ *MimeType* : ${tipo}

${emoji} Archivo descargado con éxito.`,
      m
    )

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    console.error(e)
    m.reply(`❌ Error al descargar el archivo.\n${e.message}`)
  }
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mf', 'mediafire']
handler.register = true
//handler.group = true

export default handler