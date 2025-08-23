/*import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `*🌪️ Por favor, ingresa un link de Facebook.*`, fkontak, m);
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return conn.reply(m.chat, '*❌ Error al obtener el video, verifique que el enlace sea correcto*', m);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '*⚠️ No se encontraron resultados.*', m);
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return conn.reply(m.chat, '*❌ Error al enviar el video de Facebook*', m);
  }

  if (!data) {
    return conn.reply(m.chat, '*⚠️ No se encontró una resolución adecuada.*', m);
  }

  await m.react('✅');
  let video = data.url;

  try {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        caption: `\`\`\`◜Facebook - Download◞\`\`\`\n\n> 🏞️ *Calidad:* ${data.resolution}\n> ☄️ *Enlace:* ${args[0]}\n\n⟢🌲 Aquí tienes: 🌪️\n⟢🏞️ ¡Disfruta!`,
        fileName: 'fb.mp4',
        mimetype: 'video/mp4'
      },
      { quoted: fkontak }
    );
  } catch (error) {
    await m.react('❌');
    return conn.reply(m.chat, '*👻 La URL está corrupta, intenta con otra URL.*', m);
  }
};

handler.help = ['facebook'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb'];

export default handler;*/


import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*\`Ingresa El link Del vídeo a descargar ❤️‍🔥\`*', m, fake);
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return conn.reply(m.chat, '*`Error al obtener datos. Verifica el enlace.`*', m);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '*`No se encontraron resultados.`*', m);
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return conn.reply(m.chat, '*`Error al procesar los datos.`*', m);
  }

  if (!data) {
    return conn.reply(m.chat, '*`No se encontró una resolución adecuada.`*', m);
  }

  await m.react('✅');
  let video = data.url;

  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return conn.reply(m.chat, '*`Error al enviar el video.`*', m);
  await m.react('❌');
  }
};

handler.help = ['facebook'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb'];

export default handler;                                                                                                                                                                                                                                          