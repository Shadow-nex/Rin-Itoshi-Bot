import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let handler = async (m, { conn }) => {
  let timestamp = speed();
  let latensi = speed() - timestamp;
  exec(`neofetch --stdout`, async (error, stdout, stderr) => {
    let child = stdout.toString("utf-8");
    let ssd = child.replace(/Memory:/, "Ram:");
    
    let pingtxt = `╭─ 𝑷𝒊𝒏𝒈 - 𝑹𝒊𝒏𝑰𝒕𝒐𝒔𝒉𝒊-𝑩𝒐𝒕
│
│ ☆ 🌱 \`ᴛɪᴇᴍᴘᴏ:\` ${latensi.toFixed(4)}ms
│
╰─`;

    await m.reply('*🍂 Calculando ping?*');
    await conn.sendMessage(m.chat, {
      text: pingtxt.trim(),
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ ᴅᴠ.sʜᴀᴅᴏᴡ 🪴',
          body: club,
          thumbnailUrl: avatar,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  });
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler