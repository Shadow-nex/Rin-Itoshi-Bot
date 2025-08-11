export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};

  if (m.chat === '120363416409380841@newsletter') return true;
  const arabPrefixes = ['+212', '+971', '+20', '+966', '+964', '+963', '+973', '+968', '+974'];
  
  const senderNumber = '+' + m.sender.split('@')[0];
  const isArab = arabPrefixes.some(prefix => senderNumber.startsWith(prefix));

  if (bot.antiarabe && !isOwner && !isROwner && isArab) {
    await m.reply(
      `🚫 Hola @${m.sender.split`@`[0]}, los números árabes no tienen permitido escribir al bot por privado.\n\n por lo cual sera bloqueado.`,
      false,
      { mentions: [m.sender] }
    );
    await this.updateBlockStatus(m.chat, 'block');
  }

  return false;
}