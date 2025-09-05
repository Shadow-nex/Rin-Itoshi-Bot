import fetch from "node-fetch"

let handler = async (m, { conn, usedPrefix }) => {
  const imgurl = icono;

  let frase = "No hay datos disponibles uwu~"; 
  try {
    let res = await fetch("https://zenquotes.io/api/random"); 
    let json = await res.json();
    frase = `"${json[0].q}" — ${json[0].a}`;
  } catch (e) {
    console.log("Error cargando frase:", e);
  }

  const texto = `
╭━━━〔 🌙 ᴘᴇʀғɪʟ & ᴅᴀᴛᴇs 🌸 〕━━⬣
${'```'}
🌙・*:.｡. o(≧▽≦)o .｡.:*・🌸
${'```'}

🪐 ${usedPrefix}setbirth  
   ➳ *ᴀɢʀᴇɢᴀʀ ᴄᴜᴍᴘʟᴇᴀɴ̃ᴏꜱ* ~ nyan~

💣 ${usedPrefix}delbirth  
   ➳ *ʙᴏʀʀᴀʀ ᴄᴜᴍᴘʟᴇᴀɴ̃ᴏꜱ* ~ ʕ•́ᴥ•̀ʔっ♡

━━━━━━━━━━━━━━━━━━

📜 ${usedPrefix}setdesc  
   ➳ *ᴇsᴄʀɪʙɪʀ ʙɪᴏɢʀᴀғɪ́ᴀ* ~ uwu

🗑️ ${usedPrefix}deldesc  
   ➳ *ᴇʟɪᴍɪɴᴀʀ ʙɪᴏɢʀᴀғɪ́ᴀ* ~ senpai nooo~

━━━━━━━━━━━━━━━━━━

🎭 ${usedPrefix}setgenre  
   ➳ *ᴅᴇғɪɴɪʀ ɢᴇ́ɴᴇʀᴏ* ~ desu~☆

🛑 ${usedPrefix}delgenre  
   ➳ *ʙᴏʀʀᴀʀ ɢᴇ́ɴᴇʀᴏ* ~ (つ✧ω✧)つ

━━━━━━━━━━━━━━━━━━

💎 ${usedPrefix}marry  
   ➳ *ᴄᴀsᴀʀsᴇ ᴄᴏɴ ᴀʟɢᴜɪᴇɴ* ~ ʕ♡ᴥ♡ʔ

⚡ ${usedPrefix}divorce  
   ➳ *ᴅɪᴠᴏʀᴄɪᴀʀsᴇ* ~ (｡•́︿•̀｡)

━━━━━━━━━━━━━━━━━━
『 ${frase} 』
╰━━━──༺♡༻──━━━⬣
`;

  await conn.sendMessage(m.chat, {
    image: { url: imgurl },
    caption: texto,
    footer: '☘️ ʀɪɴ ɪᴛᴏsʜɪ MD',
    buttons: [
      { buttonId: '#menu', buttonText: { displayText: '📜 ᴍᴇɴᴜ' }, type: 1 },
      { buttonId: '#perfil', buttonText: { displayText: '👤 ᴘᴇʀғɪʟ' }, type: 1 },
    ],
    headerType: 4,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: global.packname,
        body: global.dev,
        mediaType: 1,
        renderLargerThumbnail: false,
        showAdAttribution: true,
        mediaUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
      }
    }
  }, { quoted: m });

  await m.react('👻');
};

handler.command = ['perfildates', 'menuperfil'];
handler.tags = ['rg'];
handler.help = ['perfildates'];
handler.coin = 3;

export default handler;