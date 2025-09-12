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
    return conn.reply(m.chat, `🍁 *Usa el comando así:*\n\n┌ 𝘌𝘫𝘦𝘮𝘱𝘭𝘰:\n├ ${usedPrefix + command} +51999999999\n├ ${usedPrefix + command} @usuario\n└ Responde a un mensaje`, m, fake);
  }

  try {
    let [user] = await conn.onWhatsApp(number);

    if (!user?.lid) {
      return conn.reply(m.chat, '❌ *No se pudo obtener el LID.* Asegúrate de que el número esté registrado en WhatsApp.', m);
    }

    let name = await conn.getName(user.jid);
    let status = await conn.fetchStatus(user.jid).catch(() => null);
    let ppUrl = await conn.profilePictureUrl(user.jid, 'image').catch(() => null);
    let presence = await conn.presenceSubscribe(user.jid).catch(() => null);

    let texto = `╭━━━〔 *⚡ WHATSAPP LID* 〕━━⬣
┃ ✨ *Nombre:* ${name || 'No disponible'}
┃ 🔖 *Número:* wa.me/${user.jid.replace(/[^0-9]/g, '')}
┃ 🧩 *LID:* ${user.lid}
┃ 📛 *JID:* ${user.jid}
┃ 📝 *Estado:* ${status?.status || 'No disponible'}
┃ ⏱️ *Últ. visto:* ${status?.setAt ? new Date(status.setAt).toLocaleString('es-PE') : 'No disponible'}
┃ 📷 *Foto:* ${ppUrl ? 'Sí tiene' : 'No tiene'}
╰━━━━━━━━━━━━━━━━━━⬣`;

    conn.reply(m.chat, texto, m, fake);
    conn.reply(m.chat, user.lid, m);
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ *Ocurrió un error inesperado al obtener el LID.*', m);
  }
};

handler.command = ['lid'];
handler.help = ['lid'];
handler.tags = ['tools'];

export default handler;