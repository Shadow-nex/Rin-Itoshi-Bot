let handler = async (m, { conn, usedPrefix }) => {
  const imgurl = icono;
  const texto = `🌙・*:.｡. o(≧▽≦)o .｡.:*・🌸

🪐 ${usedPrefix}setbirth
   ➳ *ᴀɢʀᴇɢᴀʀ ᴄᴜᴍᴘʟᴇᴀɴ̃ᴏꜱ* ~ nyan~

💣 ${usedPrefix}delbirth
   ➳ *ʙᴏʀʀᴀʀ ᴄᴜᴍᴘʟᴇᴀɴ̃ᴏꜱ* ~ ʕ•́ᴥ•̀ʔっ♡

📜 ${usedPrefix}setdesc
   ➳ *ᴇsᴄʀɪʙɪʀ ʙɪᴏɢʀᴀғɪ́ᴀ* ~ uwu

🗑️ ${usedPrefix}deldesc
   ➳ *ᴇʟɪᴍɪɴᴀʀ ʙɪᴏɢʀᴀғɪ́ᴀ* ~ senpai nooo~

🎭 ${usedPrefix}setgenre
   ➳ *ᴅᴇғɪɴɪʀ ɢᴇ́ɴᴇʀᴏ* ~ desu~☆

🛑 ${usedPrefix}delgenre
   ➳ *ʙᴏʀʀᴀʀ ɢᴇ́ɴᴇʀᴏ* ~ (つ✧ω✧)つ

💎 ${usedPrefix}marry
   ➳ *ᴄᴀsᴀʀsᴇ ᴄᴏɴ ᴀʟɢᴜɪᴇɴ* ~ ʕ♡ᴥ♡ʔ

⚡ ${usedPrefix}divorce
   ➳ *ᴅɪᴠᴏʀᴄɪᴀʀsᴇ* ~ (｡•́︿•̀｡)
`;

  await conn.sendMessage(m.chat, {
    image: { url: imgurl },
    caption: texto,
    footer: '☘️ rin itoshi MD',
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
        thumbnailUrl: global.icono || imgurl,
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