// ☘️ Código hecho por DEV.𝘚𝘏𝘈𝘋𝘖𝘞 XD
// - https://github.com/Yuji-XDev
// - Dejen créditos aunque sea gracias.
// - 𝘙𝘐𝘕 𝘐𝘛𝘖𝘚𝘏𝘐 BOT MD ⚽

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
    const taguser = '@' + (m.sender.pushname ? m.sender.pushname : m.sender.split('@s.whatsapp.net')[0]);

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

    // Imagen principal
    let imgURL = 'https://files.catbox.moe/4dple4.jpg';
    let thumb, docBuffer;
    try {
      thumb = await (await fetch(imgURL)).buffer();
      docBuffer = thumb;
    } catch {
      console.warn('✖️ No se pudo cargar la imagen principal, usando fallback.');
      thumb = await (await fetch('https://telegra.ph/file/36f2a1bd2aaf902e4d1ff.jpg')).buffer();
      docBuffer = thumb;
    }

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
      }
      // ... (dejé tu mismo bloque de sections sin cambios)
    ];

    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `ꭈׁׅꪱׁׅꪀׁׅ ꪱׁׅtׁׅᨵׁׅ꯱ׁׅ֒hׁׅ֮ꪱׁׅ ϐׁׅ֒ᨵׁׅtׁׅ  ꩇׁׅ݊ժׁׅ݊`,
      mimetype: 'image/png',
      caption: texto,
      jpegThumbnail: thumb,
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
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
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
    await conn.reply(m.chat, `* [ 🧪 ] ocurrió un error al enviar el menu-list:*\n\n> ${e.message}`, m);
  }
};

handler.command = ['menulist2', 'listmenu2'];
handler.help = ['menulist2'];
handler.tags = ['menus']; 
handler.register = true;

export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import moment from 'moment-timezone';
function ucapan() {
    const time = moment.tz('America/Lima').format('HH')
    let res = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌉"
    if (time >= 5) res = "Bᴜᴇɴᴀ Mᴀᴅʀᴜɢᴀᴅᴀ 🏙️"
    if (time > 10) res = "Bᴜᴇɴ Dɪ́ᴀ 🏞️"
    if (time >= 12) res = "Hᴇʀᴍᴏsᴀ Tᴀʀᴅᴇ 🌆"
    if (time >= 19) res = "Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃"
    return res
}