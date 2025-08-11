

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `🌲 *Ingresa un enlace válido de Facebook.*\n\nEjemplo:\n${usedPrefix + command} https://www.facebook.com/share/v/12DoEUCoFji/`, m, rcanal);
  }

  await m.react('🕒');

  const url = args[0];

  
  if (url.startsWith('https://') && url.includes('token=')) {
    try {
      await conn.sendMessage(m.chat, {
        video: { url },
        caption: '╭━━━〔 SUKUNA.OFC 〕━━━╮\n┃ ✅ Video descargado exitosamente.\n╰━━━━━━━━━━━━━━━━━╯'
      }, { quoted: m });
      return;
    } catch (e) {
      console.error(e);
      return conn.reply(m.chat, '⚠️ No se pudo enviar el video. Es posible que sea demasiado grande.', m);
    }
  }

 
  if (!url.startsWith('http')) {
    return conn.reply(m.chat, '❗ Enlace no válido.', m);
  }

  try {
    const res = await fetch(`https://api.dorratz.com/fbvideo?url=${url}`);
    const json = await res.json();

    if (!json || !Array.isArray(json) || json.length === 0) {
      return conn.reply(m.chat, '⚠️ No se encontraron videos o la API falló.', m);
    }

    const thumbnail = 'https://i.imgur.com/JP52fdP.jpeg';

    const listSections = [{
      title: "🧩 Selecciona la resolución",
      rows: json.map(video => ({
        title: video.resolution,
        description: `🎞️ Descargar en ${video.resolution}`,
        rowId: `${usedPrefix + command} ${video.url}`
      }))
    }];

    const listMessage = {
      text: `┃➤ 🎬 *Facebook Video Detectado*\n╰━━━━━━━━━━━━━━━━━╯`,
      footer: `Selecciona una resolución para descargar el video.`,
      title: `╭━━━〔 SUKUNA MD 〕━━━╮\n┃➤🎞️ Resultado Encontrado\n┃`,
      buttonText: "📥 Descargar resolución",
      sections: listSections,
      jpegThumbnail: await (await fetch(thumbnail)).buffer()
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: m });
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, '❌ Error al procesar el video. Intenta con otro enlace.', m);
  }
};

handler.command = ['fb2'];
handler.help = ['fb2 <enlace>'];
handler.tags = ['downloader'];

export default handler;