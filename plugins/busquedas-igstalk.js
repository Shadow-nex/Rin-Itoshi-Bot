import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🌸✨ Ingresa un nombre de usuario de Instagram ✨🌸\n\nEjemplo:\n*${usedPrefix + command} Shadow.XYZ*`,
      m
    );
  }

  try {
    // URL pública del perfil de Instagram
    const url = `https://www.instagram.com/${encodeURIComponent(text)}/?__a=1`;

    // Realizamos la solicitud con un encabezado User-Agent
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    // Verificamos si la respuesta es exitosa
    if (!res.ok) {
      return conn.reply(m.chat, '❌ Usuario no encontrado 🌸', m);
    }

    // Parseamos la respuesta JSON
    const json = await res.json();
    const user = json.graphql.user;

    // Construimos el mensaje con la información obtenida
    const info = `
🌸✨ Perfil Instagram ✨🌸
👤 Usuario: @${user.username}
🌐 Link: https://instagram.com/${user.username}
    `.trim();

    // Enviamos la foto de perfil y el mensaje al chat
    await conn.sendMessage(m.chat, {
      image: { url: user.profile_pic_url_hd },
      caption: info,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al obtener el perfil 🌸', m);
  }
};

handler.help = ['igstalk'].map((v) => v + ' <usuario>');
handler.tags = ['tools', 'anime', 'otaku'];
handler.command = ['igstalk'];
handler.register = true;

export default handler;
