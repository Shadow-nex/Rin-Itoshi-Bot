// ✦ ᴄᴏᴅɪɢᴏ ᴄʀᴇᴀᴅᴏ ᴘᴏʀ ᴅᴠꜱʜᴀᴅᴏᴡ ⚡
// ✦ ᴘᴀʀᴀ ʀɪɴ ɪᴛᴏꜱʜɪ ⚽

import fetch from 'node-fetch';

const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🔥';
  await m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail?.('admin', m, conn);
    throw false;
  }

  const mensaje = args.length ? args.join(' ') : '⚠️ *Ningún mensaje fue escrito.*';
  const grupo = await conn.getName(m.chat);
  const wm = club;
  const mencionados = participants.map(p => p.id);

  let textoFinal = [
    `╭─〔 ⚔️ 𝐓𝐀𝐆𝐆𝐄𝐑 𝐒𝐔𝐏𝐑𝐄𝐌𝐎 ⚔️ 〕─╮`,
    `│ 🪐 *Conexión interdimensional abierta...*`,
    `│`,
    `│ 📢 *Anuncio del Guardián:*`,
    `│    ➤ ${mensaje}`,
    `│`,
    `│ 🏰 *Dominio:* ${grupo}`,
    `│ 👥 *Invocados:* ${participants.length}`,
    `╰───────────⟢⟣──────────╯`
  ];

  for (const user of participants) {
    textoFinal.push(` ➥ ${customEmoji} @${user.id.split('@')[0]}`);
  }

  textoFinal.push(`\n「 ${wm} 」`);

  await conn.sendMessage(m.chat, {
    text: textoFinal.join('\n'),
    mentions: mencionados,
    contextInfo: {
      mentionedJid: mencionados,
      externalAdReply: {
        title: '⚡ 𝐀𝐥𝐦𝐚𝐬 𝐄𝐧𝐥𝐚𝐳𝐚𝐝𝐚𝐬 🌌',
        body: `Grupo: ${grupo}`,
        thumbnailUrl: 'https://files.catbox.moe/9z0g6r.jpg', // pon tu imagen preferida
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: redes
      }
    }
  }, { quoted: m });
};

handler.help = ['todos *<mensaje>*'];
handler.tags = ['grupo'];
handler.command = ['todos', 'invocar', 'tagall', 'marcar', 'llamar'];
handler.admin = true;
handler.group = true;

export default handler;