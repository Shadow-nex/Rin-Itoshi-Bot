import fetch from 'node-fetch'

let suscripciones = global.suscripciones || (global.suscripciones = {})

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || !args[1]) {
    return m.reply(`✘ Uso incorrecto.\n\n☘️ Ejemplo: *${usedPrefix + command} enlace 3d*  
(Usa m = minutos, h = horas, d = días, w = semanas)`)
  }

  let enlace = args[0].trim()
  let tiempoStr = args[1].toLowerCase()

  if (!enlace.startsWith('https://chat.whatsapp.com/')) {
    return m.reply('✘ Enlace no válido.')
  }

  let codigoGrupo = enlace.replace('https://chat.whatsapp.com/', '').split('?')[0].trim()
  if (!codigoGrupo) return m.reply('✘ Código de grupo no válido.')

  let cantidad = parseInt(tiempoStr)
  if (isNaN(cantidad) || cantidad < 1) {
    return m.reply('✘ Ingresa un número válido (ejemplo: 10m, 5h, 2d, 1w).')
  }

  let tiempoMs = 0
  if (tiempoStr.endsWith('m')) tiempoMs = cantidad * 60 * 1000
  else if (tiempoStr.endsWith('h')) tiempoMs = cantidad * 60 * 60 * 1000
  else if (tiempoStr.endsWith('d')) tiempoMs = cantidad * 24 * 60 * 60 * 1000
  else if (tiempoStr.endsWith('w')) tiempoMs = cantidad * 7 * 24 * 60 * 60 * 1000
  else return m.reply('✘ Unidad de tiempo no válida. Usa: m, h, d, w.')

  try {
    let groupId = await conn.groupAcceptInvite(codigoGrupo)
    let groupMetadata = await conn.groupMetadata(groupId)
    let groupName = groupMetadata.subject

    let admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id)
    let mentionList = [m.sender, ...admins]

    let url = await conn.profilePictureUrl(groupId, 'image').catch(_ => null)

    await conn.sendMessage(groupId, {
      text: `💥 El bot se ha unido a *${groupName}*.\n\n🍂 Estará aquí durante *${cantidad}${tiempoStr.replace(cantidad, '')}*.\n\n🌳 Luego saldrá automáticamente.`,
      mentions: mentionList,
      contextInfo: {
        externalAdReply: {
          title: `Hola Grupo: ${groupName}`,
          body: '☘️◌*̥₊ ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ ᴍᴅ ◌❐⚽༉',
          thumbnail: url || icono,
          sourceUrl: global.redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: global.fkontak || null })

    if (suscripciones[groupId]) clearTimeout(suscripciones[groupId])
    suscripciones[groupId] = setTimeout(async () => {
      try {
        await conn.sendMessage(groupId, { text: '⏳ Tiempo terminado. El bot saldrá del grupo.' })
        await conn.groupLeave(groupId)
        delete suscripciones[groupId]
      } catch (err) {
        console.log(`Error al salir del grupo: ${err.message}`)
      }
    }, tiempoMs)

  } catch (e) {
    console.error(e)
    m.reply(`✘ Error al unirse al grupo:\n${e?.message || 'No se pudo unir. Verifica el enlace.'}`)
  }
}

handler.help = ['suscripción <enlace> <tiempo>']
handler.tags = ['bot']
handler.command = ['comprado', 'joinfor']

export default handler