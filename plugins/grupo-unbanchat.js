let handler = async (m, { conn, usedPrefix, command, args }) => {
  let chat = global.db.data.chats[m.chat];
  if (!(m.chat in global.db.data.chats)) {
    return conn.reply(m.chat, `✧ *𝐄𝐒𝐓𝐄 𝐓𝐄𝐑𝐑𝐄𝐍𝐎 𝐀Ú𝐍 𝐍𝐎 𝐄𝐒 𝐃𝐄 𝐑𝐈𝐍 𝐈𝐓𝐎𝐒𝐇𝐈...* ⚽`, m);
  }

  if (command === 'bot') {
    if (args.length === 0) {
      const estado = chat.isBanned ? '✘ 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎' : '✔ 𝐀𝐂𝐓𝐈𝐕𝐎';
      const info = `╭───〔 ⚙️ 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 𝐃𝐄 𝐑𝐈𝐍 𝐈𝐓𝐎𝐒𝐇𝐈 〕───⬣
┃ 🧩 *𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐝𝐢𝐫𝐞𝐜𝐭𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐜𝐨𝐧𝐭𝐫𝐨𝐥𝐚𝐫 𝐚 𝐑𝐢𝐧.*
┃
┣━〔 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 〕━⬣
┃ ⚡ ${usedPrefix}bot on ➤ *Activar Bot*
┃ 🔕 ${usedPrefix}bot off ➤ *Desactivar Bot*
┃
┣━〔 𝐄𝐒𝐓𝐀𝐃𝐎 〕━⬣
┃ 📶 Rin Itoshi ➤ ${estado}
┃
╰───〔 ⚽ 𝐄𝐋 𝐆𝐄𝐍𝐈𝐎 𝐃𝐄𝐋 𝐂𝐀𝐌𝐏𝐎 ⚽ 〕───⬣`;
      return conn.reply(m.chat, info, fkontak, fake);
    }

    if (args[0] === 'off') {
      if (chat.isBanned) {
        return conn.reply(m.chat, `🔕 *𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐲𝐚 𝐞𝐬𝐭𝐚́ 𝐢𝐧𝐚𝐜𝐭𝐢𝐯𝐨 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐜𝐚𝐦𝐩𝐨...*`, m);
      }
      chat.isBanned = true;
      return conn.reply(m.chat, `🛑 *𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐡𝐚 𝐬𝐚𝐥𝐢𝐝𝐨 𝐝𝐞𝐥 𝐣𝐮𝐞𝐠𝐨, 𝐞𝐬𝐭𝐞 𝐜𝐚𝐦𝐩𝐨 𝐪𝐮𝐞𝐝𝐚 𝐜𝐚𝐥𝐦𝐚𝐝𝐨...*`, m);
    } else if (args[0] === 'on') {
      if (!chat.isBanned) {
        return conn.reply(m.chat, `✔ *𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐲𝐚 𝐞𝐬𝐭𝐚́ 𝐞𝐧 𝐞𝐥 𝐜𝐚𝐦𝐩𝐨, 𝐝𝐢𝐫𝐢𝐠𝐢𝐞𝐧𝐝𝐨 𝐞𝐥 𝐣𝐮𝐞𝐠𝐨.*`, m);
      }
      chat.isBanned = false;
      return conn.reply(m.chat, `⚡ *𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐯𝐮𝐞𝐥𝐯𝐞 𝐚𝐥 𝐣𝐮𝐞𝐠𝐨, 𝐥𝐢𝐬𝐭𝐨 𝐩𝐚𝐫𝐚 𝐝𝐨𝐦𝐢𝐧𝐚𝐫 𝐞𝐥 𝐜𝐚𝐦𝐩𝐨.*`, m);
    }
  }
};

handler.help = ['bot'];
handler.tags = ['grupo'];
handler.command = ['bot'];
handler.admin = true;

export default handler;