import os from 'os'

let handler = async (m, { usedPrefix, command }) => {
  let uptime = process.uptime()
  let memUsage = process.memoryUsage()
  let totalMem = os.totalmem()
  let freeMem = os.freemem()
  let usedMem = totalMem - freeMem
  let platform = os.platform()
  let nodeVersion = process.version
  let cpuModel = os.cpus()[0].model
  let cpuCores = os.cpus().length

  const dd = new Date(new Date + 3600000);
  const time = dd.toLocaleString('es-ES', { 
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true 
  });

  let runtime = `
╭━━━〔 🛰️ 𝗜𝗡𝗙𝗢 𝗕𝗢𝗧 〕━━⬣
┃👑 𝗡𝗼𝗺𝗯𝗿𝗲: *${global.botname}*
┃🚀 𝗧𝗶𝗲𝗺𝗽𝗼 𝗮𝗰𝘁𝗶𝘃𝗼: *${rTime(uptime)}*
┃⏰ 𝗛𝗼𝗿𝗮 𝗮𝗰𝘁𝘂𝗮𝗹: *${time}*
┃💻 𝗦𝗢: *${platform}*
┃⚡ 𝗡𝗼𝗱𝗲.𝗷𝘀: *${nodeVersion}*
┃🧠 𝗠𝗲𝗺𝗼𝗿𝗶𝗮 𝘂𝘀𝗮𝗱𝗮: *${(usedMem / 1024 / 1024).toFixed(2)} MB*
┃📦 𝗠𝗲𝗺𝗼𝗿𝗶𝗮 𝘁𝗼𝘁𝗮𝗹: *${(totalMem / 1024 / 1024).toFixed(2)} MB*
┃🔩 𝗖𝗣𝗨: *${cpuModel} (${cpuCores} núcleos)*
╰━━━━━━━━━━━━━━━⬣
`

  conn.reply(m.chat, runtime, m, rcanal)
}
handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime']

export default handler

function rTime(seconds) {
  seconds = Number(seconds);
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor(seconds % 60);

  let dDisplay = d > 0 ? d + (d == 1 ? " día, " : " días, ") : "";
  let hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " horas, ") : "";
  let mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minutos, ") : "";
  let sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " segundos") : "";

  return dDisplay + hDisplay + mDisplay + sDisplay;
}