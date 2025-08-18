import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `🌲 *Ingresa un enlace o palabra clave de Facebook.*\n\nEjemplo:\n${usedPrefix + command} gatitos`, m);
  }

  await m.react('🕒');

  const query = args.join(' ');

  try {
    // Buscar videos (usando la API de Dorratz para búsqueda)
    const res = await fetch(`https://api.dorratz.com/fbvideo/search?query=${encodeURIComponent(query)}&limit=5`);
    const json = await res.json();

    if (!json || !Array.isArray(json) || json.length === 0) {
      return conn.reply(m.chat, '⚠️ No se encontraron videos para tu búsqueda.', m);
    }

    const thumbnail = logo;


    const listSections = [{
      title: "🧩 Selecciona el video",
      rows: json.map((video, index) => ({
        title: `🎬 ${video.title || `Video ${index + 1}`}`,
        description: `📏 Duración: ${video.duration || 'Desconocida'}\n🌐 URL: ${video.url}`,
        rowId: `${usedPrefix + command} ${video.url}` // Reutilizamos el comando para seleccionar
      }))
    }];

    const listMessage = {
      text: `┃➤ 🔍 *Resultados de Facebook*\n╰━━━━━━━━━━━━━━━━━╯`,
      footer: `Selecciona un video para continuar con la descarga.`,
      title: `╭━━━〔 SUKUNA MD 〕━━━╮\n┃➤🎞️ Resultados Encontrados\n┃`,
      buttonText: "📥 Seleccionar video",
      sections: listSections,
      jpegThumbnail: await (await fetch(thumbnail)).buffer()
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: m });

  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, '❌ Error al buscar los videos. Intenta con otra palabra clave o enlace.', m);
  }
};

handler.command = ['fb2'];
handler.help = ['fb2 <enlace o búsqueda>'];
handler.tags = ['downloader'];

export default handler;