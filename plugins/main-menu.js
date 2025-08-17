import axios from 'axios';
import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
  try {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let userData = global.db.data.users[userId] || {};
    let exp = userData.exp || 0;
    let level = userData.level || 0;
    let role = userData.role || 'Sin Rango';
    let name = await conn.getName(userId);

    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;
    let totalCommands = Object.values(global.plugins).filter(v => v.help && v.tags).length;

    let hora = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Lima', hour12: true });
    let fechaObj = new Date();
    let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
    let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

    let menuText = `
*˚₊·˚₊· ͟͟͞͞➳❥  Rɪɴ͟ ɪᴛᴏsʜɪ Ɓᴏᴛ ᭃ*
*⊰᯽⊱┈──╌•|* ⊱✿⊰ *|•╌──┈⊰᯽⊱*

☁️ ${ucapan()} @${userId.split('@')[0]}

  \`[ 𝗜 𝗡 𝗙 𝗢 - 𝗨 𝗦 𝗘 𝗥 ]\`
✩⚞ ᴜsᴇʀ: *${name}*
✩⚞ ɴɪᴠᴇʟ: *${level}*
✩⚞ ᴇxᴘ ᴛᴏᴛᴀʟ: *${exp}*
✩⚞ ʀᴀɴɢᴏ: ${role}

  \`[ 𝗜 𝗡 𝗙 𝗢 - 𝗕 𝗢 𝗧 ]\`
✧⚞ 👑 ᴏᴡɴᴇʀ: *+${suittag}*
✧⚞ 🤖 ʙᴏᴛ: ${(conn.user.jid == global.conn.user.jid ? '🌟 ʙᴏᴛ ᴏғɪᴄɪᴀʟ' : '✨ sᴜʙ ʙᴏᴛ')}
✧⚞ 📚 ᴄᴏᴍᴀɴᴅᴏs: *${totalCommands}*
✧⚞ 🧑‍🤝‍🧑 ᴛᴏᴛᴀʟ ᴜsᴇʀs: *${totalreg}*
✧⚞ ⏱️ ʀᴜɴᴛɪᴍᴇ: *${uptime}*

  \`[ 𝗜 𝗡 𝗙 𝗢 - 𝗙 𝗘 𝗖 𝗛 𝗔 ]\`
✧⚞ ⚡ ʜᴏʀᴀ ᴘᴇʀᴜ: *${hora}*
✧⚞ 🍩 ғᴇᴄʜᴀ: *${fecha}*
✧⚞ ☘️ ᴅɪᴀ: *${dia}*
`.trim();

    await m.react('🧪');

    const buttons = [
      { buttonId: '.code', buttonText: { displayText: 's ᴇ ʀ ʙ ᴏ ᴛ' }, type: 1 },
      { buttonId: '.menulist', buttonText: { displayText: 'ᴍᴇɴᴜ | ʟɪsᴛ' }, type: 1 }
    ];

    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/qoh9v4.mp4' },
      caption: menuText,
      footer: '˜”*°•.˜”*°• RIN ITOSHI BOT •°*”˜.•°*”˜',
      buttons,
      headerType: 5 // <- este es el headerType correcto para video
    }, { quoted: m });

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender]
    }, { quoted: m })
  }
}

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto'];
handler.register = true;
export default handler;

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}h ${minutes}m ${seconds}s`
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH');
  let res = "ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙";
  if (time >= 5 && time < 12) res = "ʙᴜᴇɴᴏs ᴅɪᴀs ☀️";
  else if (time >= 12 && time < 18) res = "ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs 🌤️";
  else if (time >= 18) res = "ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙";
  return res;
}