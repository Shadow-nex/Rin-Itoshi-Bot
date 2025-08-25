/*import { makeWASocket } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) return m.reply(`${emoji} Te faltó la imagen para el perfil del grupo.`);

    try {
      await conn.updateProfilePicture(m.chat, img);
      m.reply(`${emoji} Perfecto.`);
      m.react(done)
    } catch (e) {
      m.reply(`︎${msm} Ocurrió un error: ${e.message}`);
    }
  } else {
    return m.reply(`${emoji} Te faltó la imagen para cambiar el perfil del grupo.`);
  }
};

handler.command = ['gpbanner', 'groupimg'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;*/

import { makeWASocket } from '@whiskeysockets/baileys';
import sharp from 'sharp';

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) return m.reply(`☘️ Te faltó la imagen para el perfil del grupo.`);

    try {
      let buffer = await sharp(img).jpeg().toBuffer();

      await conn.updateProfilePicture(m.chat, buffer);

      m.reply(`🌷 Imagen de grupo actualizada correctamente.`);
      m.react('👌');
    } catch (e) {
      m.reply(`🌂Ocurrió un error: ${e.message}`);
    }
  } else {
    return m.reply(`🐁 Te faltó la imagen para cambiar el perfil del grupo.`);
  }
};

handler.command = ['gpbanner', 'groupimg'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;