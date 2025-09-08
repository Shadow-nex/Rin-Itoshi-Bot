import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.react('🕓')
  m.reply(`🌸⌗ 𝒑𝒓𝒐𝒄𝒆𝒔𝒂𝒏𝒅𝒐 𝒕𝒖 𝒔𝒐𝒍𝒊𝒄𝒊𝒕𝒖𝒅...\n\n꒰ᐢ. .ᐢ꒱っ💻 𝒊𝒏𝒊𝒄𝒊𝒂𝒏𝒅𝒐 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒄𝒊ó𝒏.`);

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `⚠️ 𝑬𝒓𝒓𝒐𝒓:\n\nNo se pudo completar la actualización.\n\n> Razón: *${err.message}*`, m);
      return;
    }

    if (stderr) {
      console.warn('Advertencia durante la actualización:', stderr);
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `🌼 𝒐𝒘𝒐~ 𝒕𝒐𝒅𝒐 𝒆𝒔𝒕𝒂 𝒂𝒍 𝒅𝒊́𝒂 🌼\n\n✨ El bot ya se encuentra en la versión más reciente.`, m);
    } else {
      conn.reply(m.chat, `・*:.｡. o(≧▽≦)o .｡.:*・\n\n🌸 𝑨𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒄𝒊𝒐́𝒏 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂 🌸\n\n\`\`\`${stdout}\`\`\``, m);
    }
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'fix'];
handler.rowner = true;

export default handler;