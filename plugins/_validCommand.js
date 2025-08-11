

export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  const isValidCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      const cmdList = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      if (cmdList.includes(command)) return true;
    }
    return false;
  };

  if (isValidCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    if (chat?.isBanned) {
      const avisoDesactivado = `╭─⭑❨ 🔒 𝐁𝐎𝐓 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎 ❩⭑─╮
│ 🚫 *${bot}* está *desactivado* en este grupo.
│ 🎮 Sin el sistema activo, no puedes usar comandos.
│ 🧃 Solo un *administrador* puede volver a activarlo.
│ ✅ Usa: *${usedPrefix}bot on*
╰────────────────────────╯`;

      await conn.sendMessage(m.chat, {
        text: avisoDesactivado,
        mentions: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: 'Dev.Shadow 🇦🇱',
            body: '🌾◌*̥₊ ʀɪɴ ɪᴛᴏsʜɪ ᴀɪ ◌❐🎋༉',
            thumbnailUrl: 'https://files.catbox.moe/mez710.jpg',
            sourceUrl: 'https://github.com/Yuji-XDev',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak });
      return;
    }

    if (!user.commands) user.commands = 0;
    user.commands += 1;
    return;
  }


  await m.react('💔');

  const mensajesNoEncontrado = [
    `╭━━━〔 🚫 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐈𝐍𝐄𝐗𝐈𝐒𝐓𝐄𝐍𝐓𝐄 〕━━━⬣
┃ ✦ El comando *"${command}"* no se reconoce.
┃ ✦ Menú disponible: *${usedPrefix}menu*
╰━━━━━━━━━━━━━━━━━━━━━⬣`,

    `╭─❖〔 ⚠️ 𝐄𝐑𝐑𝐎𝐑 𝐃𝐄 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 〕❖─╮
│ ✧ *"${command}"* no forma parte del sistema.
│ ✧ Consulta: *${usedPrefix}menu*
╰───────────────────────╯`,

    `┏━━━❀ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐍𝐎 𝐄𝐍𝐂𝐎𝐍𝐓𝐑𝐀𝐃𝐎 ❀━━━┓
┃ 🖋️ *"${command}"* no está registrado.
┃ 📜 Usa *${usedPrefix}menu* para ver opciones.
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`,

    `╔══❖•ೋ🌸ೋ•❖══╗
  📌 El comando *"${command}"* no existe.
  📖 Consulta el menú: *${usedPrefix}menu*
╚══❖•ೋ🌸ೋ•❖══╝`,

    `╭─〔 ⛔ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐃𝐄𝐒𝐂𝐎𝐍𝐎𝐂𝐈𝐃𝐎 〕─╮
│ 🪶 *"${command}"* no está disponible.
│ 📂 Menú: *${usedPrefix}menu*
╰──────────────────────────╯`,

    `✦━━━━━━🌺━━━━━━✦
❌ Comando: *"${command}"* inválido.
📜 Usa: *${usedPrefix}menu* para ver todos.
✦━━━━━━🌺━━━━━━✦`
  ];

  const texto = mensajesNoEncontrado[Math.floor(Math.random() * mensajesNoEncontrado.length)];
  const imgurl = 'https://files.catbox.moe/jyz3f8.jpg';
/*
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/js2plu.jpg' },
    caption: texto,
    footer: '\nseleccione una opcion para obtener ayuda',
    buttons: [
      { buttonId: '#menu', buttonText: { displayText: '🌳 Menu Principal' }, type: 1 },
      { buttonId: '#info', buttonText: { displayText: '🌷 Información del Bot' }, type: 1 },
      { buttonId: '#estado', buttonText: { displayText: '🌾 Estado del Bot' }, type: 1 },
    ],
    headerType: 4,
    contextInfo: {
      externalAdReply: {
        title: '🌸 Dev.Shadow 🌸',
        body: '🌾◌*̥₊ 𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 𝑀𝐷 ◌❐🎋༉',
        thumbnailUrl: imgurl,
        mediaType: 1,
        renderLargerThumbnail: false,
        showAdAttribution: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
      }
    }
  }, { quoted: fkontak });*/
  
  await conn.sendMessage(m.chat, {
    text: texto,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: '☘️ Dev.Shadow 🌸',
        body: '🌾◌*̥₊ ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ ᴍᴅ ◌❐🎋༉',
        thumbnailUrl: imgurl,
        sourceUrl: 'https://github.com/Yuji-XDev',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: fkontak });
}