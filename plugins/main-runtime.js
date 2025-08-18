import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let uptime = await process.uptime()

  // 🔎 Información de la API de Internet (ejemplo: IP pública, país y hora)
  let infoNet = {}
  try {
    let res = await fetch('https://ipapi.co/json/')
    infoNet = await res.json()
  } catch (e) {
    infoNet = { ip: "No disponible", country_name: "Desconocido" }
  }

  // ⚙️ Información básica del sistema
  let os = process.platform
  let nodeVer = process.version

  let runtime = `𓆩⚝𖥔𓂃 𝐔𝐥𝐭𝐫𝐚 𝐒𝐭𝐚𝐭𝐮𝐬 𓂃𖥔⚝𓆪

╭━━━〔 ✦ 𝑹𝒊𝒏 𝑰𝒕𝒐𝒔𝒉𝒊 𝑩𝒐𝒕 ✦ 〕━━⬣
┃ ✦꒰⏳꒱ 𝐓𝐢𝐞𝐦𝐩𝐨 activo: *${rTime(uptime)}*
┃ ✦꒰📡꒱ Estado: 🟢 *En línea*
┃ ✦꒰🤖꒱ Bot: *${bot}*
┃ ✦꒰💻꒱ Sistema: *Óptimo y estable*
┃ ✦꒰⚙️꒱ Node.js: *${nodeVer}*
┃ ✦꒰🖥️꒱ Plataforma: *${os}*
┃ ✦꒰🌐꒱ IP Pública: *${infoNet.ip}*
┃ ✦꒰🏳️꒱ Ubicación: *${infoNet.country_name || 'Desconocido'}*
╰━━━━━━━━━━━━━━━━━━⬣`

  conn.reply(m.chat, runtime, m, rcanal)
}

handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime']

export default handler

// 📌 Función para convertir segundos en tiempo legible
function rTime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " día, " : " Días, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Horas, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minutos, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " Segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}