let handler = async (m, { conn, usedPrefix, command, isOwner }) => {

  let media = m.quoted ? m.quoted : m;
  let mime = (media.msg || media).mimetype || '';
  if (!/image\/(jpe?g|png)/i.test(mime)) {
    return conn.reply(m.chat, `📸 Envía o responde una imagen con el comando:\n\n*${usedPrefix + command}*`, m, fake);
  }

  try {
    let img = await media.download();
    await conn.updateProfilePicture(conn.user.jid, img);
    await conn.reply(m.chat, '✅ Foto de perfil actualizada con éxito.', m, fake);
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ Ocurrió un error al actualizar la foto de perfil.', m);
  }
};

handler.help = ['setppbot'];
handler.tags = ['owner'];
handler.command = ['setppbot'];
handler.owner = true;

export default handler;

/*
let handler = async (m, { conn, usedPrefix, command, isOwner }) => {
  try {
    if (command === 'setppbot') {
      let media = m.quoted ? m.quoted : m;
      let mime = (media.msg || media).mimetype || '';
      if (!/image\/(jpe?g|png)/i.test(mime)) {
        return conn.reply(m.chat, `📸 Envía o responde una imagen con el comando:\n\n*${usedPrefix + command}*`, m, fake);
      }
      let img = await media.download();
      await conn.updateProfilePicture(conn.user.jid, img);
      await conn.reply(m.chat, '✅ Foto de perfil actualizada con éxito.', m, fake);

    } else if (['delppbot', 'removeppbot', 'deleteppbot'].includes(command)) {
      await conn.updateProfilePicture(conn.user.jid, Buffer.alloc(0));
      await conn.reply(m.chat, '✅ Foto de perfil eliminada con éxito.', m, fake);
    }
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ Ocurrió un error al procesar el comando.', m);
  }
};

handler.help = ['setppbot', 'delppbot'];
handler.tags = ['owner'];
handler.command = ['setppbot', 'delppbot', 'removeppbot', 'deleteppbot'];
handler.owner = true;

export default handler;*/