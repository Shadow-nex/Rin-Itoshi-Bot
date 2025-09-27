// --- VALORES NECESARIOS PARA LA NUEVA FUNCIONALIDAD ---
const newsletterJid = '120363401008003732@newsletter';
const newsletterName = '⸸ 🌿︎「 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 ✦ 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 」🎋︎ ⸸࣭';
const packname = '⸙͎۪۫ ࣭࿐ ✿ ˚.🍧 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 ⌗ 𝐁𝐨𝐭 ♡⚡ ࿐ ۪۫⸙͎';
const dev = '𓏲⍣⃝🌙꙰꙳ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑺ʜᴀᴅᴏᴡ 𝑪𝒐𝒓𝒆 ꙳⍣⃝ ☻⋆͙̈✫.🪷';


// Array de miniaturas
const iconos = [
      'https://files.catbox.moe/ceotf9.jpg',
      'https://files.catbox.moe/fft2hr.jpg',
      'https://files.catbox.moe/i97oje.jpg',
      'https://files.catbox.moe/js2plu.jpg',
      'https://d.uguu.se/GmSLPtrU.png',
      'https://h.uguu.se/kbNQSQxM.jpg',
      'https://h.uguu.se/wzOFAoph.png',
      'https://h.uguu.se/UGUwjmCs.jpg',
      'https://n.uguu.se/vqJnHBPm.jpg',
      'https://n.uguu.se/DlsupQkP.jpg',
      'https://i.pinimg.com/originals/e0/98/ba/e098bac73c8ae72243f66c7bf712045a.jpg',
];

// Función para obtener una aleatoria
const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

/**
 * Plugin centralizado para manejar todos los mensajes de error de permisos.
 */
const handler = (type, conn, m, comando) => {
  const msg = {
  rowner: `*\`【${global.comando2}】 ᴇs ᴜɴᴀ ғᴜɴᴄɪóɴ ᴇxᴄʟᴜsɪᴠᴀ ᴅᴇ ʟᴏs ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏs ᴘʀɪɴᴄɪᴘᴀʟᴇs. ᴛᴜ ᴀᴄᴄᴇsᴏ ɴᴏ ᴇsᴛá ᴀᴜᴛᴏʀɪᴢᴀᴅᴏ.\`*`,
  
  owner: `*\`【${global.comando2}】 sᴏʟᴏ ᴘᴜᴇᴅᴇ sᴇʀ ᴇᴊᴇᴄᴜᴛᴀᴅᴏ ᴘᴏʀ ʟᴏs ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs. ɴᴏ ᴛɪᴇɴᴇs ʟᴏs ᴘᴇʀᴍɪsᴏs ɴᴇᴄᴇsᴀʀɪᴏs.\`*`,
  
  mods: `*\`【${global.comando2}】 ᴇsᴛá ʀᴇsᴇʀᴠᴀᴅᴏ ᴘᴀʀᴀ ᴍᴏᴅᴇʀᴀᴅᴏʀᴇs. ᴛᴜ ᴘᴇʀғɪʟ ɴᴏ ᴄᴜᴍᴘʟᴇ ᴄᴏɴ ʟᴏs ʀᴇϙᴜɪsɪᴛᴏs.\`*`,
  
  premium: `*\`【${global.comando2}】 ᴇs ᴜɴ ʙᴇɴᴇғɪᴄɪᴏ ᴇxᴄʟᴜsɪᴠᴏ ᴘᴀʀᴀ ᴜsᴜᴀʀɪᴏs ᴘʀᴇᴍɪᴜᴍ. ᴇsᴛᴇ ᴘʀɪᴠɪʟᴇɢɪᴏ ᴀúɴ ɴᴏ ᴛᴇ ᴄᴏʀʀᴇsᴘᴏɴᴅᴇ.\`*`,
  
  group: `*\`【${global.comando2}】 sᴏʟᴏ ᴇsᴛá ᴅɪsᴘᴏɴɪʙʟᴇ ᴇɴ ɢʀᴜᴘᴏs. ᴇsᴛᴇ ᴇɴᴛᴏʀɴᴏ ɴᴏ ᴇs ᴠáʟɪᴅᴏ.\`*`,
  
  private: `*\`【${global.comando2}】 ᴅᴇʙᴇ ᴜᴛɪʟɪᴢᴀʀsᴇ ᴇɴ ᴜɴ ᴄʜᴀᴛ ᴘʀɪᴠᴀᴅᴏ.\`*`,
  
  admin: `*\`【${global.comando2}】 ʀᴇϙᴜɪᴇʀᴇ ᴘᴇʀᴍɪsᴏs ᴅᴇ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ. ᴀᴄᴄᴇsᴏ ᴅᴇɴᴇɢᴀᴅᴏ.\`*`,
  
  botAdmin: `*\`ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ 【${global.comando2}】, ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ. ᴘᴏʀ ғᴀᴠᴏʀ, ᴀᴄᴛᴜᴀʟɪᴢᴀ ʟᴏs ᴘᴇʀᴍɪsᴏs.\`*`,
  
  unreg: `🎋 *☆ 𝙽𝙾 𝚃𝙴 𝙴𝙽𝙲𝚄𝙴𝙽𝚃𝚁𝙰𝚂 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝙳𝙾(𝙰) ☆*
 *- 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝚃𝙴 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙰 𝙵𝚄𝙽𝙲𝙸𝙾𝙽.*
 
• 🍏 */ʀᴇɢ <ɴᴏᴍʙʀᴇ.ᴇᴅᴀᴅ>*

> 🌿 \`- 🅄 🅂 🄰 -\`
> _#${global.verifyaleatorio} ${global.user2}.${global.edadaleatoria}_
> ꒰ ─┈ ⫶ 𝐁𝐋𝐔𝐄 𝐋𝐎𝐂𝐊  ፝͜͡⚽`,

  restrict: `🚫 — Esta característica está deshabilitada.`
  }[type];

  if (msg) {
    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      },
      externalAdReply: {
        title: packname,
        body: dev,
        thumbnailUrl: getRandomIcono(), // ← aleatoria
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    };

    return conn.reply(m.chat, msg, m, { contextInfo }).then(_ => m.react('✖️'));
  }

  return true;
};

export default handler;