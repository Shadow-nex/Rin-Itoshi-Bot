import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `*🔍 Ingrese el nombre de usuario de Instagram.*\n\nEjemplo:\n> *${usedPrefix + command}* xrljose`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/igstalk?username=${text}`);
    const json = await res.json();

    if (!json.data) {
      await m.react('✖️');
      return await conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda.', m);
    }

    const { username, full_name: fullName, followers, following, posts, profile_picture: profilePic, verified } = json.data;

    let txt = '`乂  I N S T A G R A M  -  S T A L K`\n\n';
    txt += `  ✩   *Usuario* : ${username}\n`;
    txt += `  ✩   *Nombre completo* : ${fullName}\n`;
    txt += `  ✩   *Seguidores* : ${followers}\n`;
    txt += `  ✩   *Siguiendo* : ${following}\n`;
    txt += `  ✩   *Publicaciones* : ${posts}\n`;
    txt += `  ✩   *Verificado* : ${verified ? 'Sí' : 'No'}\n`;
    txt += `  ✩   *Perfil* : https://instagram.com/${username}\n`;

    await conn.sendFile(m.chat, profilePic, 'thumbnail.jpg', txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['instagramstalk <usuario>'];
handler.tags = ['tools'];
handler.command = ['instagramstalk', 'stalkinstagram', 'igstalk'];
handler.register = true;

export default handler;