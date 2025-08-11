import sharp from 'sharp';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🌳');
  
  try {
    const uptime = clockString(process.uptime() * 1000);
    const now = new Date();
    const hora = now.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    const fecha = now.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
    const dia = now.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

    const totalUsers = Object.keys(global.db.data.users).length;
    const totalCommands = Object.values(global.plugins).filter(p => p.help && p.tags).length;
    const user = global.db.data.users[m.sender] || {};

    const texto = `╭──⌁˚ ₊˚୨୧˚₊˚⌁──╮
│     🌟 𝗜𝗡𝗙𝗢 𝗗𝗘𝗟 𝗕𝗢𝗧 🌟
╰──⌁˚ ₊˚୨୧˚₊˚⌁──╯
🎀 𝗖ʀᴇᴀᴅᴏʀ: *Dev.Shadow*
🧸 𝗖ᴏɴᴛᴀᴄᴛᴏ: *wa.link/z1w9sq*
💾 𝗩ᴇʀꜱɪᴏɴ: *2.2.5*
👥 𝗨ꜱᴜᴀʀɪᴏꜱ: *${totalUsers}*
🧰 𝗖ᴏᴍᴀɴᴅᴏꜱ: *${totalCommands}*
🔐 𝗠ᴏᴅᴏ: *Privado*
📚 𝗟ɪʙʀᴇʀɪᴀ: *Baileys-MD*
⏱️ 𝗔ᴄᴛɪᴠᴏ: *${uptime}*


╭──⌁˚ ₊˚୨୧˚₊˚⌁──╮
│      💖 𝗧𝗨 𝗣𝗘𝗥𝗙𝗜𝗟 💖
╰──⌁˚ ₊˚୨୧˚₊˚⌁──╯
🆔 𝗜ᴅ: *${conn.getName(m.sender)}*
💸 𝗠ᴏɴᴇᴅᴀꜱ:  *${user.coin || 0}*
📊 𝗡ɪᴠᴇʟ:  *${user.level || 0}*
⚡ 𝗘xᴘ: *${user.exp || 0}*
👑 𝗥ᴀɴɢᴏ: *${user.role || 'Sin Rango'}*


╭──⌁˚ ₊˚୨୧˚₊˚⌁──╮
│     📅 𝗙𝗘𝗖𝗛𝗔 & 𝗛𝗢𝗥𝗔 🕒
╰──⌁˚ ₊˚୨୧˚₊˚⌁──╯
📆 𝗙ᴇᴄʜᴀ: *${fecha}*
📅 𝗗ɪᴀ:    *${dia}*
⏰ 𝗛ᴏʀᴀ:  *${hora}*`;
    
    const imgUrl = 'https://files.catbox.moe/4dple4.jpg';
    const imagenBuffer = await (await fetch(imgUrl)).buffer();    
    const thumb2 = await sharp(imagenBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    
    
    const imgenUrl = 'https://files.catbox.moe/9l7hcn.jpg';
    const imgBuffer = await (await fetch(imgenUrl)).buffer();
     
    const thumb = await sharp(imgBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    const docBuffer = await sharp(imagenBuffer).webp({ quality: 90 }).toBuffer();
    
    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '📞 Creador' }, type: 1 },
      { buttonId: `${usedPrefix}reg dv.Shadow.18`, buttonText: { displayText: '👤 Auto Verificar' }, type: 1 },
      { buttonId: `${usedPrefix}sistema`, buttonText: { displayText: '🌾 Ver Sistema del Bot' }, type: 1 }
    ];

    const sections = [
      {
         title: "💖 menu list",
         highlight_label: "dv.shadow",
         rows: [
           { title: "🌟 menu All", description: "menu completo", id: `${usedPrefix}menu`, footer: "Hola soy shadow" }
         ]
      },
      {
        title: "🌟 Comandos Principales",
        //highlight_label: "by shadow",
        rows: [
          { 
            title: "📥 Mᴇɴᴜ [ 𝗗𝗟 ]",
            description: "🎧 ᴠᴇʀ ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ᴅᴇsᴄᴀʀɢᴀs",
            id: `${usedPrefix}menudl`
          },       
          {
             title: "⛏️ Mᴇɴᴜ [ 𝗥𝗣𝗚 ]", 
             description: "🎮 ᴠᴇʀ ᴍᴇɴᴜ ʀᴘɢ", 
             id: `${usedPrefix}menurpg` 
          },
          { 
            title: "🔍 Mᴇɴᴜ [ 𝗦𝗘𝗔𝗥𝗖𝗛 ]", 
            description: "🌾 ʙᴜsᴄᴀʀ ᴄᴏɴᴛᴇɴɪᴅᴏ", 
            id: `${usedPrefix}menuse` 
          },
          { 
            title: "🖍️ Mᴇɴᴜ [ 𝗢𝗪𝗡𝗘𝗥 ]", 
            description: "🧙‍♂️ ᴘᴀʀᴀ ᴏᴡɴᴇʀ", 
            id: `${usedPrefix}dev`
          },
          { 
            title: "🌈 Mᴇɴᴜ [ 𝗔𝗨𝗗𝗜𝗢𝗦 ]", 
            description: "🎃 sᴏɴɪᴅᴏs ᴅɪᴠᴇʀᴛɪᴅᴏs", 
            id: `${usedPrefix}menu2` 
          },
          { 
             title: "⛩️ Mᴇɴᴜ [ 𝗣𝗘𝗥𝗙𝗜𝗟 ]", 
            description: "☂️ ᴄᴜᴇɴᴛᴀs ʏ ᴇsᴛᴀᴅᴏs", 
            id: `${usedPrefix}perfildates` 
          },
          { 
            title: "🌞 Mᴇɴᴜ [ 𝗚𝗥𝗨𝗣𝗢 ]", 
            description: "💫 ᴀᴅᴍɪɴ ʏ ᴄᴏɴᴛʀᴏʟ", 
            id: `${usedPrefix}menugp` 
          },
          { 
            title: "🔞 Mᴇɴᴜ [ 𝗡𝗦𝗙𝗪 ]", 
            description: "💨 ᴄᴏɴᴛᴇɴɪᴅᴏ ᴘʀɪᴠᴀᴅᴏ",
            id: `${usedPrefix}menu18` 
          },
          { 
            title: "💖 Mᴇɴᴜ [ 𝗟𝗢𝗚𝗢𝗧𝗜𝗣𝗢𝗦 ]", 
            description: "🐥 ᴄʀᴇᴀ ᴛᴜ ʟᴏɢᴏ", 
            id: `${usedPrefix}menulogos` 
          },
          { 
            title: "🐛 Mᴇɴᴜ [ 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 ]", 
            description: "🐾 ᴘᴇɢᴀᴛɪɴᴀs ᴅɪᴠᴇʀᴛɪᴅᴀs", 
            id: `${usedPrefix}menusticker` 
          }
        ]
      },
      {
        title: "💖 sukuna proyect",
        highlight_label: "soporte",
        rows: [
          { title: "🌟 Doar via Pix", description: "Ajude o projeto con su contribución!", id: `${usedPrefix}donar` }
        ]
      },
      {
        title: "📢 Comunidade Fenrys",
        highlight_label: "Fique por dentro!",
        rows: [
          { title: "💬 Grupo Oficial", description: "Participe do nosso grupo!", id: `${usedPrefix}grupos` },
          { title: "🤝 Parcerias", description: "Seja um parceiro do projeto!", id: `${usedPrefix}alv` }
        ]
      }
    ];
    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `SUKUNA ULTRA 💚`,
      mimetype: 'image/webp',
      caption: texto,
      jpegThumbnail: thumb2,
      footer: '[⚙] Sistema: *SU₭Ʉ₦₳.EXΞ*',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '🌳 MENU - LIST ☘️',
              sections
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: '',
          body: `あ ${global.namebot} あ`,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.reply(m.chat, `❌ *Error al mostrar el menú.*\n${e.message}`, m);
  }
};

handler.command = ['menulist'];
handler.help = ['menulist'];
handler.tags = ['menus'];
export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}