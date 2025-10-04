/*// ☘️ Código hecho por DEV.𝘚𝘏𝘈𝘋𝘖𝘞 XD
// - https://github.com/Yuji-XDev
// - Dejen créditos aunque sea gracias.
// - 𝘙𝘐𝘕 𝘐𝘛𝘖𝘚𝘏𝘐 BOT MD ⚽

import sharp from 'sharp';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🌿');
  
  try {
    const uptime = clockString(process.uptime() * 1000);
    const now = new Date();
    const hora = now.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    const fecha = now.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
    const dia = now.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

    const totalUsers = Object.keys(global.db.data.users).length;
    let totalCommands = Object.keys(global.plugins).length;
    const user = global.db.data.users[m.sender] || {};
    const taguser = '@' + (m.sender.pushname ? m.sender.pushname : m.sender.split('@s.whatsapp.net')[0])

    const menutxt = `⿻̟֟፝݊͜⃝⁩⚽꫶⃝꙰⿻͜𝐑𝐈𝐍͜ 𝐈͜𝐓𝐎𝐒༙͜ᝲ𝐇𝐈🍧⃟─̶̲̲̲̲̲̲̲̲̲֟፝͠
  🍨⃟≛⃝🫐๋⭑sʜᴀᴅᴏᴡ.xʏᴢ ⊹༙ᝲ🧪𝆺𝅥𝆹𝅥𝆬! 	✰ :

┌───────────
│□╭┄◦ৎ ˖ ࣪⊹ 𝐈𝐍𝐅𝐎 ~ 𝐁𝐎𝐓 ✧⃟ᰳᰬᰶ
│□┊≡
│□┊≡ 🍂 𝙲𝚁𝙴𝙰𝙳𝙾𝚁: *shadow.xyz*
│□┊≡ 🧸 𝙲𝙾𝙽𝚃𝙰𝙲𝚃𝙾: *wa.link/z1w9sq*
│□┊≡ 💾 𝚅𝚂: *2.2.5*
│□┊≡ 👥 𝚄𝚂𝙴𝚁𝚂: *${totalUsers}*
│□┊≡ 🧰 𝙲𝙾𝙼𝙰𝙽𝙳𝙾𝚂: *${totalCommands}*
│□┊≡ 🔐 𝙼𝙾𝙳𝙾: *Privado*
│□┊≡ 📚 𝙻𝙸𝙱𝚁𝙴𝚁𝙸𝙰: *Baileys-MD*
│□┊≡ ⏱️ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴: *${uptime}*
│□┊≡
│□╰┄┄┄┄┄◦
└────────────

┌───────────
│❏╭┄◦ৎ ˖ ࣪⊹ 𝐈𝐍𝐅𝐎 ~ 𝐔𝐒𝐄𝐑 ✧⃟ᰳᰬᰶ
│❏┊≡
│❏┊≡ 🆔 𝙸𝙳: *${conn.getName(m.sender)}*
│❏┊≡ 💸 𝙼𝙾𝚃𝙾𝙺𝙾 𝙿𝙾𝙸𝙽𝚃𝚂: *${user.coin || 0}*
│❏┊≡ 📊 𝙽𝙸𝚅𝙴𝙻: *${user.level || 0}*
│❏┊≡ ⚡ 𝙴𝚇𝙿: *${user.exp || 0}*
│❏┊≡ 👑 𝚁𝙰𝙽𝙶𝙾: ${user.role || 'Sin Rango'}
│❏┊≡
│❏╰┄┄┄┄┄◦
└────────────

┌───────────
│☆╭┄◦ৎ ˖ ࣪⊹ 𝐈𝐍𝐅𝐎 ~ 𝐅𝐄𝐂𝐇𝐀 ✧⃟ᰳᰬᰶ
│☆┊≡
│☆┊≡ 📆 𝙵𝙴𝙲𝙷𝙰: *${fecha}*
│☆┊≡ 🌱 𝙳𝙸𝙰: *${dia}*
│☆┊≡ 🕓 𝙷𝙾𝚁𝙰: *${hora}*
│☆┊≡
│☆╰┄┄┄┄┄◦
└────────────`;

    const imgUrl = icono;//'https://tinyurl.com/29d2bflx'; // cambie x su imagen xd
    const imagenBuffer = await (await fetch(imgUrl)).buffer();
    const thumb2 = await sharp(imagenBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    
    
    const imgenUrl = 'https://files.catbox.moe/rru021.jpg'; // cambie x su imagen
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
           { title: "⪛ 💥 𝐌𝐄𝐍𝐔 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎 ⪜", description: "💫 ᴠᴇʀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs", id: `${usedPrefix}menu` }
         ]
      },
      {
        title: "🌟 𝐌𝐄𝐍𝐔𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒 🔋",
        rows: [
          { 
            title: "⪛ 📥 Mᴇɴᴜ [ 𝗗𝗟 ] ⪜",
            description: "🎧 ᴅᴇsᴄᴀʀɢᴀ ᴄᴏɴᴛᴇɴɪᴅᴏ ᴅᴇ ʟᴀs ᴘʀɪɴᴄɪᴘᴀʟᴇs ʀᴇᴅᴇs: ʏᴏᴜᴛᴜʙᴇ, ғᴀᴄᴇʙᴏᴏᴋ, sᴘᴏᴛɪғʏ, ɪɢ, ᴇᴛᴄ.",
            id: `${usedPrefix}menudl`
          },       
          {
             title: "⪛ ⛏️ Mᴇɴᴜ [ 𝗥𝗣𝗚 ] ⪜", 
             description: "🎮 ᴄʀᴇᴀ ᴛᴜ ᴀᴠᴇɴᴛᴜʀᴀ, ʀᴇᴄᴏɢᴇ ʀᴇᴄᴜʀsᴏs, ɢᴀɴᴀ ᴏʀᴏ ʏ ᴅᴏᴍɪɴᴀ ᴇʟ ᴍᴜɴᴅᴏ ʀᴘɢ ⚔️.", 
             id: `${usedPrefix}menurpg` 
          },
          { 
            title: "⪛ 🔍 Mᴇɴᴜ [ 𝗦𝗘𝗔𝗥𝗖𝗛 ] ⪜", 
            description: "⟡ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐞𝐬𝐩𝐞𝐜𝐢𝐚𝐥𝐞𝐬 𝐩𝐚𝐫𝐚 𝐛𝐮𝐬𝐜𝐚𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐜𝐢𝐨́𝐧, 𝐚𝐮𝐝𝐢𝐨𝐬, 𝐯𝐢𝐝𝐞𝐨𝐬 𝐲 𝐦𝐮𝐜𝐡𝐨 𝐦𝐚́𝐬 𝐞𝐧 𝐥𝐢́𝐧𝐞𝐚 🌍.", 
            id: `${usedPrefix}menuse` 
          },
          { 
            title: "⪛ 🖍️ Mᴇɴᴜ [ 𝗢𝗪𝗡𝗘𝗥 ] ⪜", 
            description: "🧙‍♂️ 𝐯𝐞𝐫 𝐦𝐞𝐧𝐮 𝐝𝐞 𝐜𝐞𝐧𝐭𝐫𝐨 𝐝𝐞 𝐜𝐨𝐧𝐭𝐫𝐨𝐥 𝐩𝐚𝐫𝐚 𝐨𝐰𝐧𝐞𝐫.", 
            id: `${usedPrefix}dev`
          },
          { 
            title: "⪛ 🌈 Mᴇɴᴜ [ 𝗔𝗨𝗗𝗜𝗢𝗦 ] ⪜", 
            description: "🎃 𝐌𝐮𝐞𝐬𝐭𝐫𝐚 𝐞𝐥 𝐦𝐞𝐧𝐮 𝐚𝐮𝐝𝐢𝐨𝐬.", 
            id: `${usedPrefix}menu2` 
          },
          { 
             title: "⪛ ⛩️ Mᴇɴᴜ [ 𝗣𝗘𝗥𝗙𝗜𝗟 ] ⪜", 
            description: "🧩 𝙀𝙭𝙖𝙢𝙞𝙣𝙖 𝙩𝙪𝙨 𝙙𝙖𝙩𝙤𝙨, 𝙖𝙙𝙖𝙥𝙩𝙖 𝙩𝙪 𝙪𝙨𝙚𝙧 𝙖 𝙩𝙪 𝙨𝙩𝙮𝙡𝙚 𝙮 𝙢𝙖́𝙣𝙩𝙚𝙣 𝙩𝙪 𝙚𝙨𝙩𝙖𝙙𝙤 𝙖𝙘𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙙𝙤 💠", 
            id: `${usedPrefix}perfildates` 
          },
          { 
            title: "⪛ 🌞 Mᴇɴᴜ [ 𝗚𝗥𝗨𝗣𝗢 ] ⪜", 
            description: "⟡ 𝐇𝐞𝐫𝐫𝐚𝐦𝐢𝐞𝐧𝐭𝐚𝐬 𝐲 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐩𝐚𝐫𝐚 𝐥𝐚 𝐠𝐞𝐬𝐭𝐢𝐨́𝐧 𝐲 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐜𝐢𝐨́𝐧 𝐝𝐞 𝐭𝐮 𝐠𝐫𝐮𝐩𝐨 🌐", 
            id: `${usedPrefix}menugp` 
          },
          { 
            title: "⪛ 🔞 Mᴇɴᴜ [ 𝗡𝗦𝗙𝗪 ] ⪜", 
            description: "🔞✨⊹ 𝐀𝐜𝐜𝐞𝐬𝐨 𝐚 𝐥𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐍𝐒𝐅𝐖, 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐚𝐝𝐮𝐥𝐭𝐨𝐬 🍑💦⊹",
            id: `${usedPrefix}menu18` 
          },
          { 
            title: "⪛ 💖 Mᴇɴᴜ [ 𝗟𝗢𝗚𝗢𝗧𝗜𝗣𝗢𝗦 ] ⪜", 
            description: "🐥 ᴍᴇɴᴜ ʟᴏɢᴏᴛɪᴘᴏs ", 
            id: `${usedPrefix}menulogos` 
          },
          { 
            title: "⪛ 🐛 Mᴇɴᴜ [ 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 ] ⪜", 
            description: "✨ Crea stickers animados, personalizados y súper únicos para compartir con tus amigos 🔥🎨", 
            id: `${usedPrefix}menusticker` 
          },
          { 
            title: "⪛  ⭐ 𝙼𝚎𝚗𝚞𝚜 ] ⪜", 
            description: "ver lista de menus disponibles 🍂", 
            id: `${usedPrefix}menus` 
          }
        ]
      },
      {
        title: "⚽ ɪɴғᴏʀᴍᴀᴄɪᴏɴ ᴅᴇʟ ʙᴏᴛ 🧪",
        rows: [
          { title: "⪛ 𝐈𝐍𝐅𝐎 ~ 𝐒𝐘𝐒𝐓𝐄𝐌 ⪜", description: "💦 ᴠᴇʀ ᴇʟ sɪsᴛᴇᴍᴀ ᴅᴇʟ ʙᴏᴛ xᴅ", id: `${usedPrefix}sistema` },
          { title: "⪛ 𝐈𝐍𝐅𝐎 ~ 𝐒𝐓𝐀𝐓𝐔𝐒 ⪜", description: "🍩 ᴠᴇʀ ᴇsᴛᴀᴅᴏ ᴅᴇʟ ʙᴏᴛ", id: `${usedPrefix}estado` },
          { title: "⪛ 𝐈𝐍𝐅𝐎 ~ 𝐗𝐃 ⪜", description: "⚽ ᴠᴇʀ ɪɴғᴏʀᴍᴀᴄɪᴏɴ ᴅᴇʟ ʙᴏᴛ", id: `${usedPrefix}info` }
        ]
      },
      {
        title: "☘️ XD",
        highlight_label: "ɢʀᴏᴜᴘ ᴏғᴄ",
        rows: [
          { title: "⪛ 💬 𝐆𝐑𝐔𝐏𝐎 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 ⪜", description: "ɢʀᴜᴘᴏs ᴏғɪᴄɪᴀʟᴇs ᴅᴇʟ ʙᴏᴛ", id: `${usedPrefix}grupos` },
          { title: "⪛ 🍂 𝐒𝐄𝐑 ~ 𝐁𝐎𝐓 ⪜", description: "ᴄᴏɴᴇᴄᴛᴀ ᴛᴜ sᴜʙ ʙᴏᴛs xᴅ", id: `${usedPrefix}code` }
        ]
      }
    ];
    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `ꭈׁׅꪱׁׅꪀׁׅ ꪱׁׅtׁׅᨵׁׅ꯱ׁׅ֒hׁׅ֮ꪱׁׅ ϐׁׅ֒ᨵׁׅtׁׅ  ꩇׁׅ݊ժׁׅ݊`,
      mimetype: 'image/PNG',
      caption: menutxt,
      jpegThumbnail: thumb2,
      footer: '© ʀɪɴ ɪᴛᴏsʜɪ ᴜʟᴛʀᴀ ʙᴏᴛ | ° ʙʏ sʜᴀᴅᴏᴡ.xʏᴢ',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '⪛⪜🍭⃝⃗𐇵҉𝐀𝐋𝐌𝐎𝐃 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓𐇵҉⚽',
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
          newsletterJid: '120363401008003732@newsletter',
          serverMessageId: 100,
          newsletterName: '⚽𐚁 ֹ ִ Rin Itoshi - Official ୧ ֹ ִ⚽ᩚ꤬ᰍ'
        },
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: '',
          body: `${ucapan()} あ ${taguser} ✓`,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak });

  } catch (e) {
    console.error(e);
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
}*/
