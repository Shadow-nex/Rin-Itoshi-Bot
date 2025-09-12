let handler = async (m, { conn, args, usedPrefix, command }) => {
  let number;
  if (m.quoted?.sender) {
    number = m.quoted.sender;
  } 
  else if (m.mentionedJid?.length) {
    number = m.mentionedJid[0];
  } 
  else if (args[0]) {
    let raw = args[0].replace(/[^0-9]/g, '');
    if (raw.length < 8) {
      return conn.reply(m.chat, `❌ *Número inválido.*`, m, fake);
    }
    number = raw + '@s.whatsapp.net';
  } 
  else {
    return conn.reply(
      m.chat,
      `🍁 *Usa el comando así:*\n\n` +
      `┌ 𝘌𝘫𝘦𝘮𝘱𝘭𝘰:\n` +
      `├ ${usedPrefix + command} +51999999999\n` +
      `├ ${usedPrefix + command} @usuario\n` +
      `└ Responde a un mensaje`,
      m,
      fake
    );
  }

  try {
    let [user] = await conn.onWhatsApp(number);

    if (!user || !user.jid) {
      return conn.reply(m.chat, '❌ *El número no está registrado en WhatsApp.*', m, fake);
    }

    let name = await conn.getName(user.jid).catch(() => 'No disponible');
    let status = await conn.fetchStatus(user.jid).catch(() => null);
    let ppUrl = await conn.profilePictureUrl(user.jid, 'image').catch(() => null);
    await conn.presenceSubscribe(user.jid).catch(() => null);

    if (user.lid) {
      let textoLid = `╭━━━〔 *⚡ WHATSAPP LID* 〕━━⬣
┃ ✨ *Nombre:* ${name || 'No disponible'}
┃ 🔖 *Número:* wa.me/${user.jid.replace(/[^0-9]/g, '')}
┃ 🧩 *LID:* ${user.lid}
┃ 📛 *JID:* ${user.jid}
┃ 📝 *Estado:* ${status?.status || 'No disponible'}
┃ ⏱️ *Últ. visto:* ${status?.setAt ? new Date(status.setAt).toLocaleString('es-PE') : 'No disponible'}
┃ 📷 *Foto:* ${ppUrl ? 'Sí tiene' : 'No tiene'}
╰━━━━━━━━━━━━━━━━━━⬣`;

      await conn.reply(m.chat, textoLid, m, fake);
      await conn.reply(m.chat, user.lid, m);
    } 

    else {
      let textoNormal = `⟨ 📡 *Datos de WhatsApp* ⟩
━━━━━━━━━━━━━━━━━━━
• 👤 *Nombre:* ${name}
• 📱 *Número:* wa.me/${user.jid.replace(/[^0-9]/g, '')}
• 🗝️ *JID:* ${user.jid}
• 📜 *Estado:* ${status?.status || 'No disponible'}
• ⏳ *Últ. visto:* ${status?.setAt ? new Date(status.setAt).toLocaleString('es-PE') : 'No disponible'}
• 🖼️ *Foto:* ${ppUrl ? 'Sí tiene' : 'No tiene'}
━━━━━━━━━━━━━━━━━━━`;

      await conn.reply(m.chat, textoNormal, m, fake);
    }

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ *Ocurrió un error inesperado al obtener la información.*', m, fake);
  }
};

handler.command = ['lid'];
handler.help = ['lid'];
handler.tags = ['tools'];

export default handler;