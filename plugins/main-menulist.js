// ☘️ Código hecho por DEV.𝘚𝘏𝘈𝘋𝘖𝘞 XD
// - https://github.com/Yuji-XDev
// - Dejen créditos aunque sea gracias.
// - 𝘙𝘐𝘕 𝘐𝘛𝘖𝘚𝘏𝘐 BOT MD ⚽
/*
import sharp from 'sharp';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🌱');
  
  try {
    const uptime = clockString(process.uptime() * 1000);
    const now = new Date();
    const hora = now.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    const fecha = now.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
    const dia = now.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

    const totalUsers = Object.keys(global.db.data.users).length;
    const totalCommands = Object.values(global.plugins).filter(p => p.help && p.tags).length;
    const user = global.db.data.users[m.sender] || {};
    const taguser = '@' + (m.sender.pushname ? m.sender.pushname : m.sender.split('@s.whatsapp.net')[0])

    const texto = `*☆═━┈◈ ╰  𝕽𝖎𝖓 𝕴𝖙𝖔𝖘𝖍𝖎 𝕭𝖔𝖙 𝕸𝕯 ╯ ◈┈━═☆*

 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ʙᴏᴛ\` 𑁭𑁘

> ┊ 🍂 𝗖ʀᴇᴀᴅᴏʀ : *Dev.Shadow*
> ┊ 🧸 𝗖ᴏɴᴛᴀᴄᴛᴏ : *wa.link/z1w9sq*
> ┊ 💾 𝗩ᴇʀꜱɪᴏɴ : *2.2.5*
> ┊ 👥 𝗨ꜱᴜᴀʀɪᴏꜱ : *${totalUsers}*
> ┊ 🧰 𝗖ᴏᴍᴀɴᴅᴏꜱ : *${totalCommands}*
> ┊ 🔐 𝗠ᴏᴅᴏ : *Privado*
> ┊ 📚 𝗟ɪʙʀᴇʀɪᴀ : *Baileys‑MD*
> ┊ ⏱️ 𝗔ᴄᴛɪᴠᴏ : *${uptime}*


 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ᴜsᴇʀ\` 𑁭𑁘

> ┊ 🆔 𝗜ᴅ: *${conn.getName(m.sender)}*
> ┊ 💸 𝗠ᴏɴᴇᴅᴀꜱ:  *${user.coin || 0}*
> ┊ 📊 𝗡ɪᴠᴇʟ:  *${user.level || 0}*
> ┊ ⚡ 𝗘xᴘ: *${user.exp || 0}*
> ┊ 👑 𝗥ᴀɴɢᴏ: *${user.role || 'Sin Rango'}*

 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ғᴇᴄʜᴀ\` 𑁭𑁘

> ┊ 📆 𝗙ᴇᴄʜᴀ: *${fecha}*
> ┊ 💎 𝗗ɪᴀ:    *${dia}*
> ┊ ⏰ 𝗛ᴏʀᴀ:  *${hora}*`;
    
    const imgUrl = 'https://files.catbox.moe/4dple4.jpg'; // cambie x su imagen xd
    const imagenBuffer = await (await fetch(imgUrl)).buffer();    
    const thumb2 = await sharp(imagenBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    
    
    const imgenUrl = 'https://files.catbox.moe/9l7hcn.jpg'; // cambie x su imagen 
    const imgBuffer = await (await fetch(imgenUrl)).buffer();
     
    const thumb = await sharp(imgBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    const docBuffer = await sharp(imagenBuffer).webp({ quality: 90 }).toBuffer();
    
    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '📞 ᴏᴡɴᴇʀ' }, type: 1 },
      { buttonId: `${usedPrefix}reg Shadow.18`, buttonText: { displayText: '💌 ᴀᴜᴛᴏ ᴠᴇʀɪғɪᴄᴀʀ' }, type: 1 }
    ];

    const sections = [
      {
         title: packname,
         highlight_label: "𝘔𝘌𝘕𝘜 𝘈𝘓𝘓",
         rows: [
           { title: "💥 𝐌𝐄𝐍𝐔 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎", description: "💫 ᴠᴇʀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs", id: `${usedPrefix}menu` }
         ]
      },
      {
        title: "🌟 𝐌𝐄𝐍𝐔𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒 🔋",
        //highlight_label: "by shadow",
        rows: [
          { 
            title: "📥 Mᴇɴᴜ [ 𝗗𝗟 ]",
            description: "🎧 ᴅᴇsᴄᴀʀɢᴀ ᴄᴏɴᴛᴇɴɪᴅᴏ ᴅᴇ ʟᴀs ᴘʀɪɴᴄɪᴘᴀʟᴇs ʀᴇᴅᴇs: ʏᴏᴜᴛᴜʙᴇ, ғᴀᴄᴇʙᴏᴏᴋ, sᴘᴏᴛɪғʏ, ɪɢ, ᴇᴛᴄ.",
            id: `${usedPrefix}menudl`
          },       
          {
             title: "⛏️ Mᴇɴᴜ [ 𝗥𝗣𝗚 ]", 
             description: "🎮 ᴄʀᴇᴀ ᴛᴜ ᴀᴠᴇɴᴛᴜʀᴀ, ʀᴇᴄᴏɢᴇ ʀᴇᴄᴜʀsᴏs, ɢᴀɴᴀ ᴏʀᴏ ʏ ᴅᴏᴍɪɴᴀ ᴇʟ ᴍᴜɴᴅᴏ ʀᴘɢ ⚔️.", 
             id: `${usedPrefix}menurpg` 
          },
          { 
            title: "🔍 Mᴇɴᴜ [ 𝗦𝗘𝗔𝗥𝗖𝗛 ]", 
            description: "⟡ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐞𝐬𝐩𝐞𝐜𝐢𝐚𝐥𝐞𝐬 𝐩𝐚𝐫𝐚 𝐛𝐮𝐬𝐜𝐚𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐜𝐢𝐨́𝐧, 𝐚𝐮𝐝𝐢𝐨𝐬, 𝐯𝐢𝐝𝐞𝐨𝐬 𝐲 𝐦𝐮𝐜𝐡𝐨 𝐦𝐚́𝐬 𝐞𝐧 𝐥𝐢́𝐧𝐞𝐚 🌍.", 
            id: `${usedPrefix}menuse` 
          },
          { 
            title: "🖍️ Mᴇɴᴜ [ 𝗢𝗪𝗡𝗘𝗥 ]", 
            description: "🧙‍♂️ 𝐯𝐞𝐫 𝐦𝐞𝐧𝐮 𝐝𝐞 𝐜𝐞𝐧𝐭𝐫𝐨 𝐝𝐞 𝐜𝐨𝐧𝐭𝐫𝐨𝐥 𝐩𝐚𝐫𝐚 𝐨𝐰𝐧𝐞𝐫.", 
            id: `${usedPrefix}dev`
          },
          { 
            title: "🌈 Mᴇɴᴜ [ 𝗔𝗨𝗗𝗜𝗢𝗦 ]", 
            description: "🎃 𝐌𝐮𝐞𝐬𝐭𝐫𝐚 𝐞𝐥 𝐦𝐞𝐧𝐮 𝐚𝐮𝐝𝐢𝐨𝐬.", 
            id: `${usedPrefix}menu2` 
          },
          { 
             title: "⛩️ Mᴇɴᴜ [ 𝗣𝗘𝗥𝗙𝗜𝗟 ]", 
            description: "🧩 𝙀𝙭𝙖𝙢𝙞𝙣𝙖 𝙩𝙪𝙨 𝙙𝙖𝙩𝙤𝙨, 𝙖𝙙𝙖𝙥𝙩𝙖 𝙩𝙪 𝙪𝙨𝙚𝙧 𝙖 𝙩𝙪 𝙨𝙩𝙮𝙡𝙚 𝙮 𝙢𝙖́𝙣𝙩𝙚𝙣 𝙩𝙪 𝙚𝙨𝙩𝙖𝙙𝙤 𝙖𝙘𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙙𝙤 💠", 
            id: `${usedPrefix}perfildates` 
          },
          { 
            title: "🌞 Mᴇɴᴜ [ 𝗚𝗥𝗨𝗣𝗢 ]", 
            description: "⟡ 𝐇𝐞𝐫𝐫𝐚𝐦𝐢𝐞𝐧𝐭𝐚𝐬 𝐲 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐩𝐚𝐫𝐚 𝐥𝐚 𝐠𝐞𝐬𝐭𝐢𝐨́𝐧 𝐲 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐜𝐢𝐨́𝐧 𝐝𝐞 𝐭𝐮 𝐠𝐫𝐮𝐩𝐨 🌐", 
            id: `${usedPrefix}menugp` 
          },
          { 
            title: "🔞 Mᴇɴᴜ [ 𝗡𝗦𝗙𝗪 ]", 
            description: "🔞✨⊹ 𝐀𝐜𝐜𝐞𝐬𝐨 𝐚 𝐥𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐍𝐒𝐅𝐖, 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐚𝐝𝐮𝐥𝐭𝐨𝐬 🍑💦⊹",
            id: `${usedPrefix}menu18` 
          },
          { 
            title: "💖 Mᴇɴᴜ [ 𝗟𝗢𝗚𝗢𝗧𝗜𝗣𝗢𝗦 ]", 
            description: "🐥 ᴍᴇɴᴜ ʟᴏɢᴏᴛɪᴘᴏs ", 
            id: `${usedPrefix}menulogos` 
          },
          { 
            title: "🐛 Mᴇɴᴜ [ 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 ]", 
            description: "✨ Crea stickers animados, personalizados y súper únicos para compartir con tus amigos 🔥🎨", 
            id: `${usedPrefix}menusticker` 
          }
        ]
      },
      {
        title: "⚽ ɪɴғᴏʀᴍᴀᴄɪᴏɴ ᴅᴇʟ ʙᴏᴛ 🧪",
        rows: [
          { title: "𝐈𝐍𝐅𝐎 - 𝐒𝐘𝐒𝐓𝐄𝐌", description: "💦 ᴠᴇʀ ᴇʟ sɪsᴛᴇᴍᴀ ᴅᴇʟ ʙᴏᴛ xᴅ", id: `${usedPrefix}sistema` },
          { title: "𝐈𝐍𝐅𝐎 - 𝐒𝐓𝐀𝐓𝐔𝐒", description: "🍩 ᴠᴇʀ ᴇsᴛᴀᴅᴏ ᴅᴇʟ ʙᴏᴛ", id: `${usedPrefix}estado` },
          { title: "𝐈𝐍𝐅𝐎 - 𝐗𝐃", description: "⚽ ᴠᴇʀ ɪɴғᴏʀᴍᴀᴄɪᴏɴ ᴅᴇʟ ʙᴏᴛ", id: `${usedPrefix}info` }
        ]
      },
      {
        title: "☘️ XD",
        highlight_label: "ɢʀᴏᴜᴘ ᴏғᴄ",
        rows: [
          { title: "💬 Grupo Oficial", description: "ɢʀᴜᴘᴏs ᴏғɪᴄɪᴀʟᴇs ᴅᴇʟ ʙᴏᴛ", id: `${usedPrefix}grupos` },
          { title: "🍂 SER BOT", description: "ᴄᴏɴᴇᴄᴛᴀ ᴛᴜ sᴜʙ ʙᴏᴛs xᴅ", id: `${usedPrefix}code` }
        ]
      }
    ];
    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `ꭈׁׅꪱׁׅꪀׁׅ ꪱׁׅtׁׅᨵׁׅ꯱ׁׅ֒hׁׅ֮ꪱׁׅ ϐׁׅ֒ᨵׁׅtׁׅ  ꩇׁׅ݊ժׁׅ݊`,
      mimetype: 'image/PNG',
      caption: texto,
      jpegThumbnail: thumb2,
      footer: '[⚙] Sistema: *RIN.EXΞ*',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '🍂 𝐀𝐋𝐌𝐎𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓 ⚽',
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
          body: `${ucapan()} あ ${taguser} あ`,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.reply(m.chat, `* [ 🧪 ] ocurrio un error al enviar el menu-list:*\n\n> ${e.message}`, m);
  }
};

handler.command = ['menulist', 'listmenu'];
handler.help = ['menulist'];
handler.tags = ['menus']; 
handler.register = true;

export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function ucapan() {
    const time = moment.tz('America/Lima').format('HH')
    let res = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌉"
    if (time >= 5) {
        res = "Bᴜᴇɴᴀ Mᴀᴅʀᴜɢᴀᴅᴀ 🏙️"
    }
    if (time > 10) {
        res = "Bᴜᴇɴ Dɪ́ᴀ 🏞️"
    }
    if (time >= 12) {
        res = "Hᴇʀᴍᴏsᴀ Tᴀʀᴅᴇ 🌆"
    }
    if (time >= 19) {
        res = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃"
    }
    return res
}
*/

// ☘️ Código hecho por DEV.𝘚𝘏𝘈𝘋𝘖𝘞 XD
// - https://github.com/Yuji-XDev
// - Dejen créditos aunque sea gracias.
// - 𝘙𝘐𝘕 𝘐𝘛𝘖𝘚𝘏𝘐 BOT MD ⚽

import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('💨');
  
  try {
    const uptime = clockString(process.uptime() * 1000);
    const now = new Date();
    const hora = now.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    const fecha = now.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
    const dia = now.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

    const totalUsers = Object.keys(global.db.data.users).length;
    const totalCommands = Object.values(global.plugins).filter(p => p.help && p.tags).length;
    const user = global.db.data.users[m.sender] || {};
    const taguser = '@' + (m.sender.pushname ? m.sender.pushname : m.sender.split('@s.whatsapp.net')[0])

    const texto = `*☆═━┈◈ ╰  𝕽𝖎𝖓 𝕴𝖙𝖔𝖘𝖍𝖎 𝕭𝖔𝖙 𝕸𝕯 ╯ ◈┈━═☆*

 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ʙᴏᴛ\` 𑁭𑁘

> ┊ 🍂 𝗖ʀᴇᴀᴅᴏʀ : *Dev.Shadow*
> ┊ 🧸 𝗖ᴏɴᴛᴀᴄᴛᴏ : *wa.link/z1w9sq*
> ┊ 💾 𝗩ᴇʀꜱɪᴏɴ : *2.2.5*
> ┊ 👥 𝗨ꜱᴜᴀʀɪᴏꜱ : *${totalUsers}*
> ┊ 🧰 𝗖ᴏᴍᴀɴᴅᴏꜱ : *${totalCommands}*
> ┊ 🔐 𝗠ᴏᴅᴏ : *Privado*
> ┊ 📚 𝗟ɪʙʀᴇʀɪᴀ : *Baileys-MD*
> ┊ ⏱️ 𝗔ᴄᴛɪᴠᴏ : *${uptime}*


 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ᴜsᴇʀ\` 𑁭𑁘

> ┊ 🆔 𝗜ᴅ: *${conn.getName(m.sender)}*
> ┊ 💸 𝗠ᴏɴᴇᴅᴀꜱ:  *${user.coin || 0}*
> ┊ 📊 𝗡ɪᴠᴇʟ:  *${user.level || 0}*
> ┊ ⚡ 𝗘xᴘ: *${user.exp || 0}*
> ┊ 👑 𝗥ᴀɴɢᴏ: *${user.role || 'Sin Rango'}*

 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ғᴇᴄʜᴀ\` 𑁭𑁘

> ┊ 📆 𝗙ᴇᴄʜᴀ: *${fecha}*
> ┊ 💎 𝗗ɪᴀ:    *${dia}*
> ┊ ⏰ 𝗛ᴏʀᴀ:  *${hora}*`;
    
    const imgUrl = 'https://files.catbox.moe/4dple4.jpg'; 
    const imagenBuffer = await (await fetch(imgUrl)).buffer();    
    
    const imgenUrl = 'https://files.catbox.moe/9l7hcn.jpg'; 
    const imgBuffer = await (await fetch(imgenUrl)).buffer();
     

    const thumb2 = imagenBuffer
    const thumb = imgBuffer
    const docBuffer = imagenBuffer
    
    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '📞 ᴏᴡɴᴇʀ' }, type: 1 },
      { buttonId: `${usedPrefix}reg Shadow.18`, buttonText: { displayText: '💌 ᴀᴜᴛᴏ ᴠᴇʀɪғɪᴄᴀʀ' }, type: 1 }
    ];

    const sections = [
      {
         title: packname,
         highlight_label: "𝘔𝘌𝘕𝘜 𝘈𝘓𝘓",
         rows: [
           { title: "💥 𝐌𝐄𝐍𝐔 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎", description: "💫 ᴠᴇʀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs", id: `${usedPrefix}menu` }
         ]
      },
      {
        title: "🌟 𝐌𝐄𝐍𝐔𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒 🔋",
        rows: [
          { title: "📥 Mᴇɴᴜ [ 𝗗𝗟 ]", description: "🎧 ᴅᴇsᴄᴀʀɢᴀ ...", id: `${usedPrefix}menudl` },
          { title: "⛏️ Mᴇɴᴜ [ 𝗥𝗣𝗚 ]", description: "🎮 ...", id: `${usedPrefix}menurpg` },
          { title: "🔍 Mᴇɴᴜ [ 𝗦𝗘𝗔𝗥𝗖𝗛 ]", description: "🌍 ...", id: `${usedPrefix}menuse` },
          { title: "🖍️ Mᴇɴᴜ [ 𝗢𝗪𝗡𝗘𝗥 ]", description: "🧙‍♂️ ...", id: `${usedPrefix}dev` },
          { title: "🌈 Mᴇɴᴜ [ 𝗔𝗨𝗗𝗜𝗢𝗦 ]", description: "🎃 ...", id: `${usedPrefix}menu2` },
          { title: "⛩️ Mᴇɴᴜ [ 𝗣𝗘𝗥𝗙𝗜𝗟 ]", description: "🧩 ...", id: `${usedPrefix}perfildates` },
          { title: "🌞 Mᴇɴᴜ [ 𝗚𝗥𝗨𝗣𝗢 ]", description: "🌐 ...", id: `${usedPrefix}menugp` },
          { title: "🔞 Mᴇɴᴜ [ 𝗡𝗦𝗙𝗪 ]", description: "🍑💦 ...", id: `${usedPrefix}menu18` },
          { title: "💖 Mᴇɴᴜ [ 𝗟𝗢𝗚𝗢𝗧𝗜𝗣𝗢𝗦 ]", description: "🐥 ...", id: `${usedPrefix}menulogos` },
          { title: "🐛 Mᴇɴᴜ [ 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 ]", description: "🔥🎨 ...", id: `${usedPrefix}menusticker` }
        ]
      },
      {
        title: "⚽ ɪɴғᴏʀᴍᴀᴄɪᴏɴ ᴅᴇʟ ʙᴏᴛ 🧪",
        rows: [
          { title: "𝐈𝐍𝐅𝐎 - 𝐒𝐘𝐒𝐓𝐄𝐌", description: "💦 ...", id: `${usedPrefix}sistema` },
          { title: "𝐈𝐍𝐅𝐎 - 𝐒𝐓𝐀𝐓𝐔𝐒", description: "🍩 ...", id: `${usedPrefix}estado` },
          { title: "𝐈𝐍𝐅𝐎 - 𝐗𝐃", description: "⚽ ...", id: `${usedPrefix}info` }
        ]
      },
      {
        title: "☘️ XD",
        highlight_label: "ɢʀᴏᴜᴘ ᴏғᴄ",
        rows: [
          { title: "💬 Grupo Oficial", description: "ɢʀᴜᴘᴏs ...", id: `${usedPrefix}grupos` },
          { title: "🍂 SER BOT", description: "ᴄᴏɴᴇᴄᴛᴀ ...", id: `${usedPrefix}code` }
        ]
      }
    ];
    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `ꭈׁׅꪱׁׅꪀׁׅ ...`,
      mimetype: 'image/PNG',
      caption: texto,
      jpegThumbnail: thumb2,
      footer: '[⚙] Sistema: *RIN.EXΞ*',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '🍂 𝐀𝐋𝐌𝐎𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓 ⚽',
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
          body: `${ucapan()} あ ${taguser} あ`,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.reply(m.chat, `* [ 🧪 ] ocurrio un error al enviar el menu-list:*\n\n> ${e.message}`, m);
  }
};

handler.command = ['menulist', 'listmenu'];
handler.help = ['menulist'];
handler.tags = ['menus']; 
handler.register = true;

export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function ucapan() {
    const time = moment.tz('America/Lima').format('HH')
    let res = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌉"
    if (time >= 5) res = "Bᴜᴇɴᴀ Mᴀᴅʀᴜɢᴀᴅᴀ 🏙️"
    if (time > 10) res = "Bᴜᴇɴ Dɪ́ᴀ 🏞️"
    if (time >= 12) res = "Hᴇʀᴍᴏsᴀ Tᴀʀᴅᴇ 🌆"
    if (time >= 19) res = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃"
    return res
}