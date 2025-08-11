let handler = async (m, { usedPrefix, command }) => {
let uptime = await process.uptime()
let runtime = `𓆩✦𖥔𓂃 𝑈𝓁𝓉𝓇𝒶 𝒮𝓉𝒶𝓉𝓊𝓈 𓂃𖥔✦𓆪

╭━━━〔 🍁 𝑹𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊 𝑩𝒐𝒕 𝑼𝑷𝑻𝑰𝑴𝑬 🍁 〕━━⬣
┃ ✧︎꒰🍁꒱ 𝑻𝒊𝒆𝒎𝒑𝒐 𝒆𝒏 𝒂𝒄𝒕𝒊𝒗𝒐: *${rTime(uptime)}*
┃ ⭓꒰💫꒱ 𝑬𝒔𝒕𝒂𝒅𝒐: 🟢 *Operativo*
┃ ⭓꒰⚙️꒱ 𝑩𝒐𝒕: 🤖 *${bot}*
┃ ⭓꒰🌳꒱ 𝑺𝒊𝒔𝒕𝒆𝒎𝒂: *100% Estable*
╰━━━━━━━━━━━━━━━━━━⬣`
conn.reply(m.chat, runtime, m, rcanal)
}
handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime']

export default handler

const dd = new Date(new Date + 3600000);
const time = dd.toLocaleString('en-US', { 
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true 
    });

function rTime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " dia, " : " Dias, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Horas, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minutos, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " Segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};