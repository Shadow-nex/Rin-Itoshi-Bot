import axios from 'axios';

let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  let userData = global.db.data.users[userId] || {};
  let exp = userData.exp || 0;
  let coin = userData.coin || 0;
  let level = userData.level || 0;
  let role = userData.role || 'Sin Rango';
  let name = await conn.getName(userId);

  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);
  let totalreg = Object.keys(global.db.data.users).length;
  let totalCommands = Object.values(global.plugins).filter(v => v.help && v.tags).length;
  
  const imgRandom = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg"
  ].getRandom();

  const text = [
    "*✦ 𝐈𝐍𝐕𝐎𝐂𝐀𝐂𝐈𝐎́𝐍 𝐌𝐀𝐒𝐈𝐕𝐀 𝐁𝐘 𝐒𝐡𝐚𝐝𝐨𝐰'𝐂𝐨𝐫𝐞 ✦*",
    "⚜️ 𝐌𝐞𝐧𝐬𝐚𝐣𝐞 𝐜𝐨𝐥𝐞𝐜𝐭𝐢𝐯𝐨 𝐞𝐧 𝐜𝐮𝐫𝐬𝐨...",
    "🔮 𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚𝐧𝐝𝐨 𝐚 𝐥𝐚𝐬 𝐚𝐥𝐦𝐚𝐬 𝐩𝐞𝐫𝐝𝐢𝐝𝐚𝐬"
  ].getRandom();

  const thumbnailBuffer = Buffer.from((await axios.get(imgRandom, { responseType: 'arraybuffer' })).data);

  const shadow = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      locationMessage: {
        name: text,
        jpegThumbnail: thumbnailBuffer
      }
    },
    participant: "0@s.whatsapp.net"
  };
  
  await conn.sendMessage(m.chat, {
    text: '╭─〔 ⚙️ 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎... 〕─⬣\n┃ 🛰️ *Conectando a la base de datos...*\n┃ 📡 *Sincronizando menú principal...*\n╰───────────────⬣',
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: '               ☘️ Dev.Shadow 🇦🇱',
        body: '   🌀꙰⃟ 𖤐 𝙍𝙄𝙉 𝙄𝙏𝙊𝙎𝙃𝙄 ∞ 𝐌𝐃 𖤐🎨⃟',
        thumbnailUrl: 'https://files.catbox.moe/q8b2br',
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }, { quoted: m });

  await new Promise(resolve => setTimeout(resolve, 2000));
      
   let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
   let fechaObj = new Date();
   let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
   let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });
   
   
  let menuText = `
*˚₊·˚₊· ͟͟͞͞➳❥  Rɪɴ͟ ɪᴛᴏsʜɪ Ɓᴏᴛ ᭃ*
*⊰᯽⊱┈──╌•|* ⊱✿⊰ *|•╌──┈⊰᯽⊱*

☁️ ${ucapan()} @${userId.split('@')[0]}

  \`[ 𝗜 𝗡 𝗙 𝗢 - 𝗨 𝗦 𝗘 𝗥 ]\`
  ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊
✩⚞ ᴜsᴇʀ: *${name}*
✩⚞ ɴɪᴠᴇʟ: *${level}*
✩⚞ ᴇxᴘ ᴛᴏᴛᴀʟ: *${exp}*
✩⚞ ʀᴀɴɢᴏ: ${role}
✩⚞ ᴘʀᴏɢʀᴇsᴏ: [██████████]
─────────────────────────────

  \`[ 𝗜 𝗡 𝗙 𝗢 - 𝗕 𝗢 𝗧 ]\`
  ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊
✧⚞ ⚙️ ᴍᴏᴅᴏ: *🔒 ᴘʀɪᴠᴀᴅᴏ*
✧⚞ 👑 ᴏᴡɴᴇʀ: *+${suittag}*
✧⚞ 🤖 ʙᴏᴛ: ${(conn.user.jid == global.conn.user.jid ? '🌟 `ʙᴏᴛ ᴏғɪᴄɪᴀʟ`' : '✨ `sᴜʙ ʙᴏᴛ`')}
✧⚞ 📚 ᴄᴏᴍᴀɴᴅᴏs: *${totalCommands}*
✧⚞ 🧑‍🤝‍🧑 ᴛᴏᴛᴀʟ ᴜsᴇʀs: *${totalreg}*
✧⚞ ⏱️ ʀᴜɴᴛɪᴍᴇ: *${uptime}*
─────────────────────────────

   \`[ 𝗜 𝗡 𝗙 𝗢 - 𝗙 𝗘 𝗖 𝗛 𝗔 ]\`
  ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊
✧⚞ ⚡ ʜᴏʀᴀ ᴘᴇʀᴜ: *${hora}*
✧⚞ 🍩 ғᴇᴄʜᴀ: *${fecha}*
✧⚞ ☘️ ᴅɪᴀ: *${dia}*
──────────────────────────────
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
  🧪 *🔥 \`𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘𝗦\` ⚽* 🔋
   ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
\`१✿ᩧ┅═❏✧͚ ɪɴғᴏ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .afk [alasan]
│ ᝰ .menu
│ ᝰ .uptime
│ ᝰ .script
│ ᝰ .staff
│ ᝰ .creador
│ ᝰ .grupos
│ ᝰ .estado
│ ᝰ .infobot
│ ᝰ .sug
│ ᝰ .ping
│ ᝰ .reportar <txt>
│ ᝰ .reglas
│ ᝰ .speed
│ ᝰ .sistema
│ ᝰ .usuarios
│ ᝰ .ds
│ ᝰ .funciones
│ ᝰ .editautoresponder
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴍᴇɴᴜ ʟɪsᴛ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .menulist
│ ᝰ .dev - ᴍᴇɴᴜ ᴏᴡɴᴇʀ
│ ᝰ .menusticker - ᴍᴇɴᴜ sᴛɪᴄᴋᴇʀs
│ ᝰ .menusearch - ᴍᴇɴᴜ sᴇᴀʀᴄʜ
│ ᝰ .menudl - ᴍᴇɴᴜ ᴅᴇsᴄᴀʀɢᴀs
│ ᝰ .menulogos - ʟᴏɢᴏs
│ ᝰ .menunsfw - ᴍᴇɴᴜ 18
│ ᝰ .menugp - ᴍᴇɴᴜ ɢʀᴜᴘᴏ
│ ᝰ .menu2 - ᴍᴇɴᴜ ᴀᴜᴅɪᴏs
│ ᝰ .menurpg - ᴍᴇɴᴜ ʀᴘɢ
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ sᴇᴀʀᴄʜ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .ᴀɴɪᴍᴇɪɴғᴏ
│ ᝰ .ᴀɴɪᴍᴇsᴇᴀʀᴄʜ
│ ᝰ .ᴄᴜᴇᴠᴀɴᴀ
│ ᝰ .ɢɪᴛʜᴜʙsᴇᴀʀᴄʜ
│ ᝰ .sᴇᴀʀᴄʜʜᴇɴᴛᴀɪ
│ ᝰ .ɢᴏᴏɢʟᴇ *<ʙúsǫᴜᴇᴅᴀ>*
│ ᝰ .ɪᴍᴀɢᴇɴ *<ǫᴜᴇʀʏ>*
│ ᝰ .ɪɴғᴏᴀɴɪᴍᴇ
│ ᝰ .ɢɪᴛʜᴜʙsᴛᴀʟᴋ *<ǫᴜᴇʀʏ>*
│ ᝰ .sᴏᴜɴᴅᴄʟᴏᴜᴅsᴇᴀʀᴄʜ *<ᴛxᴛ>*
│ ᝰ .ᴘɪɴᴛᴇʀᴇsᴛ
│ ᝰ .ᴘᴏʀɴʜᴜʙsᴇᴀʀᴄʜ
│ ᝰ .sᴘᴏᴛɪғʏsᴇᴀʀᴄʜ *<ᴛᴇxᴛᴏ>*
│ ᝰ .ʏᴛsᴇᴀʀᴄʜ2 *<ᴛᴇxᴛ>*
│ ᝰ .ɴᴘᴍᴊs
│ ᝰ .ɢɴᴜʟᴀ
│ ᝰ .ᴀᴘᴋsᴇᴀʀᴄʜ
│ ᝰ .ᴡɪᴋɪs
│ ᝰ .ᴛɪᴋᴛᴏᴋsᴇᴀʀᴄʜ *<ᴛxᴛ>*
│ ᝰ .ᴛᴡᴇᴇᴛᴘᴏsᴛs
│ ᝰ .xɴxxs
│ ᝰ .xᴠsᴇᴀʀᴄʜ
│ ᝰ .ʏᴛs
│ ᝰ .ғᴅʀᴏɪᴅsᴇᴀʀᴄʜ *<ᴛéʀᴍɪɴᴏ>*
│ ᝰ .ʜᴀᴘᴘʏᴍᴏᴅsᴇᴀʀᴄʜ *<ʙúsǫᴜᴇᴅᴀ>*
│ ᝰ .ᴄɪɴᴇᴄᴀʟɪᴅᴀᴅsᴇᴀʀᴄʜ *<ʙúsǫᴜᴇᴅᴀ>*
│ ᝰ .ʏᴀʜᴏᴏsᴇᴀʀᴄʜ *<ʙúsǫᴜᴇᴅᴀ>*
│ ᝰ .ᴍᴏᴠɪᴇ *<ᴛéʀᴍɪɴᴏ>*
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ sᴜʙ ʙᴏᴛs| ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .qr
│ ᝰ .code
│ ᝰ .token
│ ᝰ .sockets
│ ᝰ .deletesesion
│ ᝰ .pausarai
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴅᴏᴡɴʟᴏᴀᴅ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .fb2
│ ᝰ .fdroid *<url>*
│ ᝰ .fb
│ ᝰ .sound
│ ᝰ .gitclone *<url git>*
│ ᝰ .gdrive
│ ᝰ .ig
│ ᝰ .mediafire *<url>*
│ ᝰ .mega
│ ᝰ .apk *<nombre>*
│ ᝰ .pinvid *<link>*
│ ᝰ .apk2 *<busqueda>*
│ ᝰ .npmdl
│ ᝰ .tt2
│ ᝰ .kwaidl
│ ᝰ .likee *<url>*
│ ᝰ .aplay2 • applemusic2
│ ᝰ .capcut *<url>*
│ ᝰ .play
│ ᝰ .play2
│ ᝰ .ytmp3doc
│ ᝰ .ytmp4doc
│ ᝰ .iaimg *<texto>*
│ ᝰ .yta
│ ᝰ .ytv
│ ᝰ .tiktokrandom
│ ᝰ .spotify
│ ᝰ .tiktokhd
│ ᝰ .tiktoktrends
│ ᝰ .snapchat *<link>*
│ ᝰ .terabox
│ ᝰ .tiktok *<url>*
│ ᝰ .tiktokmp3 *<url>*
│ ᝰ .tiktokimg *<url>*
│ ᝰ .twitter *<url>*
│ ᝰ .xvideosdl
│ ᝰ .xnxxdl
│ ᝰ .pindl
│ ᝰ .apkpure
│ ᝰ .apkpuredl
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ғᴜɴ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .gay *@tag* 
│ ᝰ .lesbiana *@tag* 
│ ᝰ .pajero *@tag* 
│ ᝰ .pajera *@tag* 
│ ᝰ .puto *@tag* 
│ ᝰ .puta *@tag* 
│ ᝰ .manco *@tag* 
│ ᝰ .manca *@tag* 
│ ᝰ .rata *@tag*
│ ᝰ .prostituta *@tag*
│ ᝰ .amigorandom
│ ᝰ .jalamela
│ ᝰ .simi
│ ᝰ .chiste
│ ᝰ .consejo
│ ᝰ .doxear *<mension>*
│ ᝰ .facto
│ ᝰ .reto
│ ᝰ .verdad
│ ᝰ .prostituto *<@tag>*
│ ᝰ .formarpareja
│ ᝰ .formarpareja5
│ ᝰ .huevo *@user*
│ ᝰ .chupalo *<mencion>*
│ ᝰ .aplauso *<mencion>*
│ ᝰ .marron *<mencion>*
│ ᝰ .suicidar
│ ᝰ .iqtest <mencion>*
│ ᝰ .meme
│ ᝰ .morse
│ ᝰ .nombreninja *<texto>*
│ ᝰ .paja
│ ᝰ .personalidad *<mencion>*
│ ᝰ .pregunta 
│ ᝰ .zodiac *2002 02 25*
│ ᝰ .ship 
│ ᝰ .sorte 
│ ᝰ .top *[texto]*
│ ᝰ .formartrio *<mencion>*
│ ᝰ .tt
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ғʀᴀᴄᴇs ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .piropo
│ ᝰ .frase
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴊᴜᴇɢᴏs ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .ahorcado
│ ᝰ .delxo
│ ᝰ .genio *<pregunta>*
│ ᝰ .math *<mode>*
│ ᝰ .ppt *texto*
│ ᝰ .pvp
│ ᝰ .sopa
│ ᝰ .acertijo
│ ᝰ .ttt *texto*
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴀɴɪᴍᴇ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .angry/enojado @tag
│ ᝰ .bath/bañarse @tag
│ ᝰ .bite/morder @tag
│ ᝰ .bleh/lengua @tag
│ ᝰ .blush/sonrojarse @tag
│ ᝰ .bored/aburrido @tag
│ ᝰ .nights/noches
│ ᝰ .dias/days
│ ᝰ .coffe/cafe @tag
│ ᝰ .cry/llorar @tag
│ ᝰ .cuddle/acurrucarse @tag
│ ᝰ .dance/bailar @tag
│ ᝰ .drunk/borracho @tag
│ ᝰ .eat/comer @tag
│ ᝰ .messi
│ ᝰ .cr7
│ ᝰ .facepalm/palmada @tag
│ ᝰ .happy/feliz @tag
│ ᝰ .hello/hola @tag
│ ᝰ .hug/abrazar @tag
│ ᝰ .kill/matar @tag
│ ᝰ .kiss2/besar2 @tag
│ ᝰ .kiss/besar @tag
│ ᝰ .laugh/reirse @tag
│ ᝰ .lick/lamer @tag
│ ᝰ .love2/enamorada @tag
│ ᝰ .patt/acariciar @tag
│ ᝰ .poke/picar @tag
│ ᝰ .pout/pucheros @tag
│ ᝰ .ppcouple
│ ᝰ .preg/embarazar @tag
│ ᝰ .punch/golpear @tag
│ ᝰ .run/correr @tag
│ ᝰ .sad/triste @tag
│ ᝰ .scared/asustada @tag
│ ᝰ .seduce/seducir @tag
│ ᝰ .shy/timida @tag
│ ᝰ .slap/bofetada @tag
│ ᝰ .sleep/dormir @tag
│ ᝰ .smoke/fumar @tag
│ ᝰ .think/pensando @tag
│ ᝰ .undress/encuerar @tag
│ ᝰ .waifu
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴘᴇʀғɪʟ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .reg
│ ᝰ .unreg
│ ᝰ .profile
│ ᝰ .perfildates
│ ᝰ .marry *[mension / etiquetar]*
│ ᝰ .divorce
│ ᝰ .setgenre *<text>*
│ ᝰ .delgenre
│ ᝰ .setbirth *<text>*
│ ᝰ .delbirth
│ ᝰ .setdesc *<text>*
│ ᝰ .deldesc
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ʟᴏɢᴏs ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .glitchtext
│ ᝰ .narutotext
│ ᝰ .dragonball
│ ᝰ .neonlight
│ ᝰ .pubglogo
│ ᝰ .harrypotter
│ ᝰ .marvel
│ ᝰ .pixelglitch
│ ᝰ .amongustext
│ ᝰ .writetext
│ ᝰ .advancedglow
│ ᝰ .typographytext
│ ᝰ .neonglitch
│ ᝰ .flagtext
│ ᝰ .flag3dtext
│ ᝰ .deletingtext
│ ᝰ .blackpinkstyle
│ ᝰ .glowingtext
│ ᝰ .underwatertext
│ ᝰ .logomaker
│ ᝰ .cartoonstyle
│ ᝰ .papercutstyle
│ ᝰ .watercolortext
│ ᝰ .effectclouds
│ ᝰ .blackpinklogo
│ ᝰ .gradienttext
│ ᝰ .summerbeach
│ ᝰ .luxurygold
│ ᝰ .multicoloredneon
│ ᝰ .sandsummer
│ ᝰ .galaxywallpaper
│ ᝰ .style
│ ᝰ .makingneon
│ ᝰ .royaltext
│ ᝰ .freecreate
│ ᝰ .galaxystyle
│ ᝰ .rainytext
│ ᝰ .graffititext
│ ᝰ .colorfulltext
│ ᝰ .equalizertext
│ ᝰ .angeltxt
│ ᝰ .starlight
│ ᝰ .steel
│ ᝰ .neoncity
│ ᝰ .cloudsky
│ ᝰ .matrix
│ ᝰ .minion
│ ᝰ .papercut3d
│ ᝰ .firetext
│ ᝰ .icecold
│ ᝰ .rainbowtext
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ sᴛᴀʟᴋ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .tiktokstalk *<usuario>*
│ ᝰ .kwaistalk *<usuario>*
│ ᝰ .telegramstalk *<nombre_usuario>*
│ ᝰ .youtubestalk *<nombre de usuario>*
│ ᝰ .instagramstalk *<usuario>*
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴘʀᴇᴍɪᴜᴍ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄 
│ ᝰ .comprarpremium
│ ᝰ .premium
│ ᝰ .vip
│ ᝰ .spamwa <number>|<mesage>|<no of messages>
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ʀᴘɢ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .aventura
│ ᝰ .baltop
│ ᝰ .bank / bal
│ ᝰ .cazar 
│ ᝰ .codigo *<cantida de coins>*
│ ᝰ .canjear *<código>*
│ ᝰ .cartera
│ ᝰ .apostar *<cantidad>*
│ ᝰ .cf
│ ᝰ .cofre
│ ᝰ .crimen
│ ᝰ .daily
│ ᝰ .depositar 
│ ᝰ .explorar
│ ᝰ .gremio
│ ᝰ .regalo
│ ᝰ .halloween
│ ᝰ .heal
│ ᝰ .inventario 
│ ᝰ .mensual
│ ᝰ .mazmorra
│ ᝰ .minar
│ ᝰ .navidad
│ ᝰ .retirar
│ ᝰ .robar
│ ᝰ .robarxp
│ ᝰ .ruleta *<cantidad> <color>*
│ ᝰ .buyall
│ ᝰ .buy
│ ᝰ .protituirse
│ ᝰ .work
│ ᝰ .pay / transfer 
│ ᝰ .semanal
│ ᝰ .levelup
│ ᝰ .lvl @user
│ ᝰ .slot *<apuesta>*
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ɢᴀᴄʜᴀ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .rw
│ ᝰ .reclamar 
│ ᝰ .harem
│ ᝰ .waifuimage
│ ᝰ .charinfo
│ ᝰ .topwaifus *[pagina]*
│ ᝰ .regalar *<nombre del personaje> @usuario*
│ ᝰ .vote *<personaje>*
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ sᴛɪᴄᴋᴇʀs ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .sticker *<img>*
│ ᝰ .sticker *<url>*
│ ᝰ .setmeta
│ ᝰ .delmeta
│ ᝰ .bratvid *<texto>*
│ ᝰ .pfp *@user*
│ ᝰ .qc
│ ᝰ .toimg *(reply)*
│ ᝰ .brat
│ ᝰ .bratvid *<texto>*
│ ᝰ .emojimix  *<emoji+emoji>*
│ ᝰ .wm *<packname>|<author>*
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴛᴏᴏʟs ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .letra *<texto>*
│ ᝰ .fake
│ ᝰ .hd
│ ᝰ .detectar
│ ᝰ .clima *<ciudad/país>*
│ ᝰ .join
│ ᝰ .nuevafotochannel
│ ᝰ .nosilenciarcanal
│ ᝰ .silenciarcanal
│ ᝰ .noseguircanal
│ ᝰ .seguircanal 
│ ᝰ .avisoschannel 
│ ᝰ .resiviravisos 
│ ᝰ .inspect 
│ ᝰ .inspeccionar 
│ ᝰ .eliminarfotochannel 
│ ᝰ .reactioneschannel 
│ ᝰ .reaccioneschannel 
│ ᝰ .nuevonombrecanal 
│ ᝰ .nuevadescchannel
│ ᝰ .setavatar
│ ᝰ .setbanner
│ ᝰ .seticono
│ ᝰ .setmoneda
│ ᝰ .setname nombre1/nombre2
│ ᝰ .cal *<ecuacion>*
│ ᝰ .horario
│ ᝰ .read
│ ᝰ .traducir <idoma>
│ ᝰ .say
│ ᝰ .whatmusic <audio/video>
│ ᝰ .paisinfo
│ ᝰ .ssweb
│ ᝰ .tamaño *<cantidad>*
│ ᝰ .document *<audio/video>*
│ ᝰ .translate
│ ᝰ .up
│ ᝰ .enhance
│ ᝰ .wikipedia
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴏɴ / ᴏғғ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄  
│ ᝰ .welcome
│ ᝰ .bienvenida
│ ᝰ .antiprivado
│ ᝰ .antiprivate
│ ᝰ .restrict
│ ᝰ .restringir
│ ᝰ .antibot
│ ᝰ .antibots
│ ᝰ .autoaceptar
│ ᝰ .aceptarauto
│ ᝰ .autorechazar
│ ᝰ .rechazarauto
│ ᝰ .autoresponder
│ ᝰ .autorespond
│ ᝰ .antisubbots
│ ᝰ .antibot2
│ ᝰ .modoadmin
│ ᝰ .soloadmin
│ ᝰ .reaction
│ ᝰ .reaccion
│ ᝰ .nsfw
│ ᝰ .modohorny
│ ᝰ .antispam
│ ᝰ .jadibotmd
│ ᝰ .modejadibot
│ ᝰ .subbots
│ ᝰ .detect
│ ᝰ .avisos
│ ᝰ .antilink
│ ᝰ .audios
│ ᝰ .antiver
│ ᝰ .antiocultar
│ ᝰ .antilink2
│ ᝰ .antiarabe
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ɢʀᴜᴘᴏs ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .admins
│ ᝰ .agregar
│ ᝰ .advertencia <@user>
│ ᝰ .delwarn
│ ᝰ .grupo abrir / cerrar
│ ᝰ .group open / close
│ ᝰ .delete
│ ᝰ .demote <@user>
│ ᝰ .promote <@user>
│ ᝰ .encuesta <text|text2>
│ ᝰ .kickfantasmas
│ ᝰ .gpbanner
│ ᝰ .gpdesc
│ ᝰ .gpname
│ ᝰ .hidetag
│ ᝰ .infogrupo
│ ᝰ .kickall
│ ᝰ .kick <@user>
│ ᝰ .kicknum
│ ᝰ .listonline
│ ᝰ .link
│ ᝰ .listadv
│ ᝰ .mute
│ ᝰ .unmute
│ ᝰ .config
│ ᝰ .restablecer
│ ᝰ .setbye
│ ᝰ .setwelcome
│ ᝰ .testwelcome
│ ᝰ .setemoji <emoji>
│ ᝰ .invocar *<mensaje opcional>*
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ɴsғᴡ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .sixnine/69 @tag
│ ᝰ .anal/culiar @tag
│ ᝰ .blowjob/mamada @tag
│ ᝰ .boobjob/rusa @tag
│ ᝰ .cum/leche @tag
│ ᝰ .fap/paja @tag
│ ᝰ .follar @tag
│ ᝰ .fuck/coger @tag
│ ᝰ .footjob/pies @tag
│ ᝰ .fuck2/coger2 @tag
│ ᝰ .grabboobs/agarrartetas @tag
│ ᝰ .grop/manosear @tag
│ ᝰ .penetrar @user
│ ᝰ .lickpussy/coño @tag
│ ᝰ .r34 <tag>
│ ᝰ .sexo/sex @tag
│ ᝰ .spank/nalgada @tag
│ ᝰ .suckboobs/chupartetas @tag
│ ᝰ .violar/perra @tag
│ ᝰ .lesbianas/tijeras @tag
│ ᝰ .pack
│ ᝰ .tetas
│ ᝰ .undress/encuerar
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴏᴡɴᴇʀ ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .addcoins *<@user>*
│ ᝰ .addowner / delowner
│ ᝰ .addprem [@user] <days>
│ ᝰ .añadirxp
│ ᝰ .copia
│ ᝰ .autoadmin
│ ᝰ .banuser *@tag <razón>*
│ ᝰ .banlist
│ ᝰ .bcgc
│ ᝰ .block / unblock
│ ᝰ .blocklist
│ ᝰ .chetar *@user* / *<número>*
│ ᝰ .cleartmp
│ ᝰ .creargc
│ ᝰ .deletefile
│ ᝰ .delprem <@user>
│ ᝰ .deschetar *@user* / *<número>*
│ ᝰ .dsowner
│ ᝰ =>
│ ᝰ >
│ ᝰ .fetch
│ ᝰ .getplugin
│ ᝰ .grouplist
│ ᝰ .salir
│ ᝰ .let
│ ᝰ .setppbot 
│ ᝰ .prefix [prefix]
│ ᝰ .quitarcoin *<@user>* / all
│ ᝰ .quitarxp *<@user>*
│ ᝰ .resetprefix
│ ᝰ .restablecerdatos
│ ᝰ .restart / reiniciar
│ ᝰ .reunion
│ ᝰ .savefile <ruta/nombre>
│ ᝰ .saveplugin
│ ᝰ .setcmd *<texto>*
│ ᝰ .delcmd
│ ᝰ .listcmd
│ ᝰ .setimage
│ ᝰ .setstatus <teks>
│ ᝰ .spam2
│ ᝰ .unbanuser <@tag>
│ ᝰ .ip <alamat ip>
│ ᝰ .update / fix
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ɪɴᴛᴇʟɪɢᴇɴᴄɪᴀs❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .dalle
│ ᝰ .demo *<texto>*
│ ᝰ .flux *<texto>*
│ ᝰ .gemini
│ ᝰ .ia
│ ᝰ .llama
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚

\`१✿ᩧ┅═❏✧͚ ᴄᴏɴᴠᴇʀᴛs ❏═┅✿ᩧ̼१\`
╭•┈┈•┈┈🌟┈•┈┈•◌ᜓ ݊ ᜒ𝅄
│ ᝰ .tourl <imagen>
│ ᝰ .catbox
│ ᝰ .tourl3
│ ᝰ .togifaud
│ ᝰ .tomp3
│ ᝰ .tovideo
│ ᝰ .tts <lang> <teks>
│ ᝰ .tts2
╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚


   🧿 *𝗖𝗥𝗘𝗔 𝗨𝗡 𝗦𝗨𝗕𝗕𝗢𝗧 𝗘𝗡 𝗦𝗘𝗚𝗨𝗡𝗗𝗢𝗦*
> 🛰️ ➊ *#qr* – Escanea un 𝖢𝗈𝖽𝗂𝗀𝗈 𝗤𝗥  
> 🔐 ➋ *#code* – Usa un 𝖢𝗈𝖽𝗂𝗀𝗈 de 8 dígitos
`.trim();

  await m.react('⚙️');
  await conn.sendMessage(
    m.chat,
    {
      image: { url: 'https://files.catbox.moe/gh3gbs.jpg' },
      caption: menuText,
      contextInfo: {
        externalAdReply: {
          title: '⚽ Rin Itoshi - MD🧪',
          body: '☯︎ Dev by Shadow\'Core',
          mediaType: 1,
          thumbnailUrl: 'https://files.catbox.moe/8ng4fs.jpg',
          mediaUrl: 'https://github.com/Yuji-XDev/SukunaUltra-MD',
          sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
          renderLargerThumbnail: false
        }
      }
    },
    { quoted: shadow }
  );
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto'];
export default handler;

function clockString(ms) {
let seconds = Math.floor((ms / 1000) % 60)
let minutes = Math.floor((ms / (1000 * 60)) % 60)
let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
return `${hours}:${minutes}:${seconds}`
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH');
  let res = "ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙";
  if (time >= 5 && time < 12) res = "ʙᴜᴇɴᴏs ᴅɪᴀs ☀️";
  else if (time >= 12 && time < 18) res = "ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs 🌤️";
  else if (time >= 18) res = "ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙";
  return res;
}