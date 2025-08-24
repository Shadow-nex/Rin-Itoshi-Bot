export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};

  if (m.chat === '120363401008003732@newsletter') return true;

  // Prefijos de países árabes
  const arabPrefixes = ['+212', '+971', '+20', '+966', '+964', '+963', '+973', '+968', '+974'];
  
  const senderNumber = '+' + m.sender.split('@')[0];
  const isArab = arabPrefixes.some(prefix => senderNumber.startsWith(prefix));

  if (bot.antiarabe && !isOwner && !isROwner && isArab) {
    let msg = `
╭━━━〔 🚫 𝐀𝐍𝐓𝐈 - 𝐀𝐑𝐀𝐁𝐄 🚫 〕━━⬣
┃ 🌱 Hola *@${m.sender.split('@')[0]}*
┃ Tu número ha sido detectado como 
┃ perteneciente a un país restringido.
┃ 
┃ 💨 Por seguridad este bot solo está 
┃ disponible para ciertos países.
╰━━━━━━━━━━━━━━━━━━⬣
    `.trim();

    await m.reply(msg, null, { mentions: [m.sender] });
    await this.updateBlockStatus(m.chat, 'block');
  }

  return false;
}