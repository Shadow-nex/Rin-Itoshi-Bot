import os from 'os'
import { performance } from 'perf_hooks'

let handler = async (m, { conn, usedPrefix }) => {
  
  // 📸 Lista de imágenes aleatorias
  const imgs = [
    "https://files.catbox.moe/wwo7th.jpg",
    "https://files.catbox.moe/wwo7th.jpg",
    "https://files.catbox.moe/wwo7th.jpg",
    "https://files.catbox.moe/wwo7th.jpg"
  ]
  let randomImg = imgs[Math.floor(Math.random() * imgs.length)]

  // 🕒 Fecha y hora en Perú (GMT-5)
  let fecha = new Date()
  let fechaStr = fecha.toLocaleDateString('es-PE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    timeZone: "America/Lima" 
  })
  let hora = fecha.toLocaleTimeString('es-PE', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false, 
    timeZone: "America/Lima" 
  })

  // ⏳ Uptime del bot
  let uptimeSeg = Math.floor(process.uptime())
  let uptimeStr = convertirTiempo(uptimeSeg)

  // 🖥️ RAM info en GB
  let memoriaTotal = os.totalmem() / 1024 / 1024 / 1024
  let memoriaLibre = os.freemem() / 1024 / 1024 / 1024
  let memoriaUsada = memoriaTotal - memoriaLibre

  // ⚙️ Plugins/comandos
  let totalPlugins = Object.keys(conn?.plugins || {}).length

  // 📝 Menú
  let menuTexto = `
╭━━━〔 ⚽ *MAGNOSBOT MENU* ⚽ 〕━━⬣
┃ 📅 *Fecha:* ${fechaStr}
┃ 🕒 *Hora Perú:* ${hora}
┃ ⏳ *Tiempo activo:* ${uptimeStr}
┃ 💾 *RAM usada:* ${memoriaUsada.toFixed(2)} GB
┃ 📦 *RAM total:* ${memoriaTotal.toFixed(2)} GB
┃ ⚙️ *Plugins:* ${totalPlugins}
┃
╰━━━━━━━━━━━━━━━━━━⬣
`

  await conn.sendMessage(m.chat, {
    text: menuTexto,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: { 
        newsletterName: 'MagnosBot | CHANNEL', 
        newsletterJid: "120363422169517881@newsletter" 
      },
      externalAdReply: {
        title: `© MagnosBot`,
        body: 'Multipropósito - IA, Descargas, Juegos y más',
        thumbnailUrl: randomImg,
        sourceUrl: 'https://github.com/OmarGranda',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: fkontak })
}

// Función para convertir segundos a formato hh:mm:ss
function convertirTiempo(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let seg = segundos % 60
  return [horas, minutos, seg]
    .map(v => v.toString().padStart(2, '0'))
    .join(':')
}

handler.command = ['inicio', 'menu', 'help']
export default handler