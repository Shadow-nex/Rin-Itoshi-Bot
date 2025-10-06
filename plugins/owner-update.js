import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.reply(`*⚙️ 𝘐𝘯𝘪𝘤𝘪𝘢𝘯𝘥𝘰 𝘱𝘳𝘰𝘤𝘦𝘴𝘰 𝘥𝘦 𝘢𝘤𝘵𝘶𝘢𝘭𝘪𝘻𝘢𝘤𝘪𝘰𝘯. . . ..*`);

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `${msm} Error: No se pudo realizar la actualización.\nRazón: ${err.message}`, m);
      return;
    }

    if (stderr) {
      console.warn('Advertencia durante la actualización:', stderr);
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `${emoji4} El bot ya está actualizado.`, m);
    } else {
      conn.reply(m.chat, `*🌿 𝘈𝘤𝘵𝘶𝘢𝘭𝘪𝘻𝘢𝘤𝘪𝘰𝘯 𝘤𝘰𝘮𝘱𝘭𝘦𝘵𝘢𝘥𝘢 𝘤𝘰𝘯 𝘦𝘹𝘪𝘵𝘰.*\n\n*${stdout}*`, m);
    }
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'fix', 'actualizar'];

export default handler;