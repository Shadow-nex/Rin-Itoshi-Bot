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
    const taguser = '@' + (m.sender.pushname ? m.sender.pushname : m.sender.split('@s.whatsapp.net')[0])

    const texto = `*☆═━┈◈ ╰  𝕽𝖎𝖓 𝕴𝖙𝖔𝖘𝖍𝖎 𝕭𝖔𝖙 𝕸𝕯 ╯ ◈┈━═☆*

 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ʙᴏᴛ\` 𑁭𑁘

> ┊ 🎀 𝗖ʀᴇᴀᴅᴏʀ: *Dev.Shadow*
> ┊ 🧸 𝗖ᴏɴᴛᴀᴄᴛᴏ: *wa.link/z1w9sq*
> ┊ 💾 𝗩ᴇʀꜱɪᴏɴ: *2.2.5*
> ┊ 👥 𝗨ꜱᴜᴀʀɪᴏꜱ: *${totalUsers}*
> ┊ 🧰 𝗖ᴏᴍᴀɴᴅᴏꜱ: *${totalCommands}*
> ┊ 🔐 𝗠ᴏᴅᴏ: *Privado*
> ┊ 📚 𝗟ɪʙʀᴇʀɪᴀ: *Baileys‑MD*
> ┊ ⏱️ 𝗔ᴄᴛɪᴠᴏ: *${uptime}*


 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ᴜsᴇʀ\` 𑁭𑁘

> ┊ 🆔 𝗜ᴅ: *${conn.getName(m.sender)}*
> ┊ 💸 𝗠ᴏɴᴇᴅᴀꜱ:  *${user.coin || 0}*
> ┊ 📊 𝗡ɪᴠᴇʟ:  *${user.level || 0}*
> ┊ ⚡ 𝗘xᴘ: *${user.exp || 0}*
> ┊ 👑 𝗥ᴀɴɢᴏ: *${user.role || 'Sin Rango'}*

 ─·˚₊· ͟͟͞͞꒰➳ \`ɪɴғᴏ - ғᴇᴄʜᴀ\` 𑁭𑁘

> ┊ 📆 𝗙ᴇᴄʜᴀ: *${fecha}*
> ┊ 📅 𝗗ɪᴀ:    *${dia}*
> ┊ ⏰ 𝗛ᴏʀᴀ:  *${hora}*`;
    
    const imgUrl = 'https://files.catbox.moe/4dple4.jpg';
    const imagenBuffer = await (await fetch(imgUrl)).buffer();    
    const thumb2 = await sharp(imagenBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    
    
    const imgenUrl = 'https://files.catbox.moe/9l7hcn.jpg';
    const imgBuffer = await (await fetch(imgenUrl)).buffer();
     
    const thumb = await sharp(imgBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    const docBuffer = await sharp(imagenBuffer).webp({ quality: 90 }).toBuffer();
    
    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '📞 ᴏᴡɴᴇʀ' }, type: 1 },
      { buttonId: `${usedPrefix}reg dv.Shadow.18`, buttonText: { displayText: '💌 ᴀᴜᴛᴏ ᴠᴇʀɪғɪᴄᴀʀ' }, type: 1 },
      { buttonId: `${usedPrefix}estado`, buttonText: { displayText: '🔋 ᴇsᴛᴀᴅᴏ ᴅᴇʟ ʙᴏᴛ' }, type: 1 }
    ];

    const sections = [
      {
         title: packname,
         highlight_label: "𝘋𝘝.𝘚𝘏𝘈𝘋𝘖𝘞 𝘊𝘖𝘙𝘌",
         rows: [
           { title: "💥 𝐌𝐄𝐍𝐔 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎", description: "💫 ᴠᴇʀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs", id: `${usedPrefix}menu` }
         ]
      },
      {
        title: "🌟 𝐌𝐄𝐍𝐔𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒",
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
        title: "💖 𝐑𝐈𝐍 𝐈𝐓𝐎𝐒𝐇𝐈",
        highlight_label: "BY SHADOW",
        rows: [
          { title: "SUB BOTS ONLINE", description: "💦 ᴠᴇʀ ʟɪsᴛᴀ ᴅᴇ sᴜʙʙᴏᴛs ᴀᴄᴛɪᴠᴏs", id: `${usedPrefix}bots` }
        ]
      },
      {
        title: "📢 GRUPOS",
        highlight_label: "LINLS",
        rows: [
          { title: "💬 Grupo Oficial", description: "ɢʀᴜᴘᴏs ᴏғɪᴄɪᴀʟᴇs ᴅᴇʟ ʙᴏᴛ", id: `${usedPrefix}grupos` },
          { title: "🤝 SER BOT", description: "ᴄᴏɴᴇᴄᴛᴀ ᴛᴜ sᴜʙ ʙᴏᴛs xᴅ", id: `${usedPrefix}code` }
        ]
      }
    ];
    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `ꭈׁׅꪱׁׅꪀׁׅ ꪱׁׅtׁׅᨵׁׅ꯱ׁׅ֒hׁׅ֮ꪱׁׅ ϐׁׅ֒ᨵׁׅtׁׅ  ꩇׁׅ݊ժׁׅ݊`,
      mimetype: 'image/webp',
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
