import fetch from 'node-fetch'

let suscripciones = global.suscripciones || (global.suscripciones = {})

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || !args[1]) {
    return m.reply(`✘ Uso incorrecto.\n\n🌷 Ejemplo:\n*${usedPrefix + command} enlace 3d*  
\n📚 Unidades válidas:
m = minutos | h = horas | d = días | w = semanas`)
  }

  let enlace = args[0].trim()
  let tiempoStr = args[1].toLowerCase()

  if (!enlace.startsWith('https://chat.whatsapp.com/')) {
    return m.reply('✘ Enlace no válido. Debe empezar con *https://chat.whatsapp.com/*')
  }
  
  let codigoGrupo = enlace.split('https://chat.whatsapp.com/')[1]?.trim()
  if (!codigoGrupo) return m.reply('✘ Código de invitación no válido.')

  let tiempoMs = 0
  let cantidad = parseInt(tiempoStr)
  let unidad = tiempoStr.replace(cantidad, '').trim()

  if (isNaN(cantidad) || cantidad < 1) {
    return m.reply('✘ Ingresa un número válido (ejemplo: 10m, 5h, 2d, 1w).')
  }

  switch (unidad) {
    case 'm': tiempoMs = cantidad * 60 * 1000; break
    case 'h': tiempoMs = cantidad * 60 * 60 * 1000; break
    case 'd': tiempoMs = cantidad * 24 * 60 * 60 * 1000; break
    case 'w': tiempoMs = cantidad * 7 * 24 * 60 * 60 * 1000; break
    default:
      return m.reply('✘ Unidad de tiempo no válida.\nUsa: m = minutos, h = horas, d = días, w = semanas.')
  }

  await m.reply('⏳ *Uniéndome al grupo, espera unos segundos...*')

  try {

    let groupId = await conn.groupAcceptInvite(codigoGrupo).catch(e => null)
    if (!groupId) throw new Error('No se pudo unir. Verifica que el enlace no esté vencido o el grupo lleno.')

    let groupMetadata = await conn.groupMetadata(groupId)
    let groupName = groupMetadata.subject
    let owner = groupMetadata.owner || m.sender
    let admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id)

    let pfp = await conn.profilePictureUrl(groupId, 'image').catch(_ => global.imagen1)
    let tiempoTexto = `${cantidad}${unidad}`.replace('m',' minutos').replace('h',' horas').replace('d',' días').replace('w',' semanas')

    await conn.sendMessage(groupId, {
      text: `╭━━━〔 𝑺𝑼𝑺𝑪𝑹𝑰𝑷𝑪𝑰𝑶́𝑵 𝑨𝑪𝑻𝑰𝑽𝑨 〕━━⬣
│ 🏷️ *Grupo:* ${groupName}
│ 👑 *Solicitado por:* @${m.sender.split('@')[0]}
│ 🕒 *Duración:* ${tiempoTexto}
│ 📅 *Salida automática al finalizar el tiempo.*
╰━━━━━━━━━━━━━━━━━━⬣`,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: `🌸 ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ - Suscripción activa`,
          body: `El bot permanecerá en este grupo durante ${tiempoTexto}.`,
          thumbnailUrl: pfp,
          sourceUrl: global.redes || 'https://whatsapp.com',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })

    await conn.sendMessage(global.owner[0] + '@s.whatsapp.net', {
      text: `✅ *Nueva suscripción activada*\n\n📌 Grupo: ${groupName}\n👤 Solicitado por: @${m.sender.split('@')[0]}\n🕒 Tiempo: ${tiempoTexto}`,
      mentions: [m.sender]
    })

    if (suscripciones[groupId]) clearTimeout(suscripciones[groupId])
    suscripciones[groupId] = setTimeout(async () => {
      try {
        await conn.sendMessage(groupId, { text: '⏰ *El tiempo de suscripción ha finalizado. ¡Adiós grupo!* 🌸' })
        await conn.groupLeave(groupId)
        delete suscripciones[groupId]
      } catch (err) {
        console.error(`Error al salir del grupo: ${err.message}`)
      }
    }, tiempoMs)

  } catch (e) {
    console.error(e)
    return m.reply(`❌ *Error al unirse al grupo:*\n${e.message || 'No se pudo procesar la solicitud.'}`)
  }
}

handler.help = ['suscripción <enlace> <tiempo>']
handler.tags = ['bot']
handler.command = ['comprado', 'joinfor']

export default handler