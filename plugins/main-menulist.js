import sharp from 'sharp';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🌱');

  try {
    const uptime = clockString(process.uptime() * 1000);
    const now = new Date();
    const hora = now.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    const fecha = now.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
    const dia = now.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

    const totalUsers = Object.keys(global.db.data.users).length;
    const totalCommands = Object.keys(global.plugins).length;
    const user = global.db.data.users[m.sender] || {};
    const taguser = '@' + (m.sender.split('@')[0]);

    const menutxt = `✨ Hola ${taguser}\n👥 Users: ${totalUsers}\n🛠️ Comandos: ${totalCommands}\n⏱️ Uptime: ${uptime}\n📆 Fecha: ${fecha}\n🕓 Hora: ${hora}\n🌱 Día: ${dia}`;

    // --- IMÁGENES ---
    const imgUrl = 'https://tinyurl.com/29d2bflx';
    const imagenBuffer = await (await fetch(imgUrl)).buffer();
    const docBuffer = await sharp(imagenBuffer).webp({ quality: 90 }).toBuffer();
    const thumb = await sharp(imagenBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();

    // --- BOTONES ---
    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '📞 Owner' }, type: 1 },
      { buttonId: `${usedPrefix}reg Shadow.18`, buttonText: { displayText: '💌 Auto Verificar' }, type: 1 }
    ];

    // --- SECTIONS ---
    const sections = [
      {
        title: "Menú Principal",
        rows: [
          { title: "💥 Menu Completo", description: "Ver lista de comandos", id: `${usedPrefix}menu` }
        ]
      }
    ];

    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `Menu_RinItoshi.pdf`,
      mimetype: 'application/pdf',
      caption: menutxt,
      jpegThumbnail: thumb,
      footer: '© Rin Itoshi Bot',
      buttons: buttons,
      headerType: 1,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '',
          body: `Hola ${taguser}`,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, `*Ocurrió un error al enviar el menú:*\n> ${e.message}`, m);
  }
};

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

export default handler;