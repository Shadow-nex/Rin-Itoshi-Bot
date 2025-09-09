// ✦ ᴄᴏᴅɪɢᴏ ᴄʀᴇᴀᴅᴏ ᴘᴏʀ DVShadow ⚡
// ✦ ᴘᴀʀᴀ Rin Itoshi ⚽

const handler = async (m, { conn, args, participants, isAdmin, isOwner, usedPrefix, command }) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  if (!(isAdmin || isOwner)) {
    global.dfail?.('admin', m, conn);
    throw false;
  }

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🌟';
  await m.react(customEmoji);

  const mensaje = args.length ? args.join(' ') : '✨ *Sin mensaje adicional.*';
  const grupo = await conn.getName(m.chat);
  const mencionados = participants.map(p => p.id);

  let imagenGrupo;
  try {
    imagenGrupo = await conn.profilePictureUrl(m.chat, 'image');
  } catch {
    imagenGrupo = logo;
  }

  let texto = `
╭━━━〔 👑 𝑻𝒂𝒈 𝑬𝒍𝒊𝒕𝒆 👑 〕━━━⬣
│
│ 📝 𝑴𝒆𝒏𝒔𝒂𝒋𝒆:
│    ${mensaje}
│
│ 📌 𝑮𝒓𝒖𝒑𝒐: ${grupo}
│ 👥 𝑴𝒊𝒆𝒎𝒃𝒓𝒐𝒔: ${participants.length}
│
╰━━━〔 ⚡ Rin Itoshi ⚡ 〕━━━⬣
`;

  let lista = mencionados.map(u => `  ${customEmoji} \`@${u.split('@')[0]}\``).join('\n');

  await conn.sendMessage(m.chat, {
    text: texto + '\n' + lista,
    mentions: mencionados,
    contextInfo: {
      mentionedJid: mencionados,
      externalAdReply: {
        title: '🔥 Invocación Suprema',
        body: `Atención en ${grupo}`,
        thumbnailUrl: imagenGrupo,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://github.com/Yuji-XDev'
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