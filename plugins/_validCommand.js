import fetch from 'node-fetch';

export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
  
  const thumbRes = await fetch("https://files.catbox.moe/xydiwe.jpg");
  const thumbBuffer = await thumbRes.buffer();
  const fkontak = {
        key: {
           participants: "0@s.whatsapp.net",
           remoteJid: "status@broadcast",
           fromMe: false,
           id: "Halo"
        },
        message: {
            locationMessage: {
                name: `❏ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐃𝐄𝐒𝐂𝐎𝐍𝐎𝐂𝐈𝐃𝐎 ❐`,
                jpegThumbnail: thumbBuffer
            }
        },
        participant: "0@s.whatsapp.net"
  };

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
      const avisoDesactivado = `     🔒 𝐁𝐎𝐓 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎
🚫 *${bot}* 𝑒𝑠𝑡𝑎 *desactivado* 𝑒𝑛 𝑒𝑠𝑡𝑒 𝑔𝑟𝑢𝑝𝑜.
🎮 𝑆𝑖𝑛 𝑒𝑙 𝑠𝑖𝑠𝑡𝑒𝑚𝑎 𝑎𝑐𝑡𝑖𝑣𝑜, 𝑛𝑜 𝑝𝑢𝑒𝑑𝑒𝑠 𝑢𝑠𝑎𝑟 𝑐𝑜𝑚𝑎𝑛𝑑𝑜𝑠.
🧃 𝐒𝐨𝐥𝐨 𝐮𝐧 *administrador* 𝐩𝐮𝐞𝐝𝐞 𝐯𝐨𝐥𝐯𝐞𝐫 𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨.
✅ 𝐔𝐬𝐚: *${usedPrefix}bot on*`;

      await conn.sendMessage(m.chat, {
        text: avisoDesactivado,
        mentions: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: '◌*̥₊ 𝗥𝗶𝗻 𝗜𝘁𝗼𝘀𝗵𝗶 𝗕𝗼𝘁 𝗠𝗗 ◌🍧༉',
            body: '',
            thumbnailUrl: 'https://files.catbox.moe/mez710.jpg',
            sourceUrl: '',
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

  //await m.react('💔');
  const mensajesNoEncontrado = [
    `> ⌗ El comando *"${command}"* no se reconoce.
> ⌗ Menú disponible: *${usedPrefix}menu*`,

    `✧ *"${command}"* no forma parte del sistema.
 ✧ Consulta: *${usedPrefix}menu*`,

    `❐ *"${command}"* no está registrado.
❐ Usa *${usedPrefix}menu* para ver opciones.`,

    `🍧 El comando *"${command}"* no existe.
🌤️ Consulta el menú: *${usedPrefix}menu*`,

    `🍏 *"${command}"* no está disponible.
🌿 Menú: *${usedPrefix}menu*`,

    `🎊 Comando: *"${command}"* inválido.
🎋 Usa: *${usedPrefix}menu* para ver todos los comandos disponibles.`
  ];

  const texto = mensajesNoEncontrado[Math.floor(Math.random() * mensajesNoEncontrado.length)];
  const thumb = 'https://files.catbox.moe/6fj9u7.jpg';

  const rcanal = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: '',
        newsletterName: channelRD.name
      },
      externalAdReply: {
        title: botname,
        body: dev,
        mediaUrl: null,
        description: null,
        previewType: 'PHOTO',
        thumbnail: await (await fetch(icono)).buffer(),
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      },
      mentionedJid: null
    }
  }
  
  await conn.sendMessage(m.chat, {
    text: texto,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: ' 🎃 𝙍𝙞𝙣 𝙄𝙩𝙤𝙨𝙝𝙞 𝘽𝙤𝙩 𝙐𝙡𝙩𝙧𝙖 🍧',
        body: '',
        thumbnailUrl: thumb,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
      },
      ...rcanal.contextInfo
    }
  }, { quoted: fkontak });
}