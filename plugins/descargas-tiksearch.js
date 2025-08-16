import fetch from 'node-fetch';

let tiktokSessions = new Map();

let handler = async (m, { conn, args, command, usedPrefix }) => {
  let query = args.join(" ").trim();

  if (command === 'tksearch') {
    if (!query) {
      return m.reply(`✍️ Escribe lo que quieres buscar\n\n🌀 Ejemplo:\n${usedPrefix}tksearch edits de rin itoshi`);
    }

    // Limpiar la sesión anterior
    tiktokSessions.set(m.chat, {
      videos: [],
      currentIndex: 0,
      query
    });

    try {
      const res = await fetch(`https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(query)}`);
      const json = await res.json();

      if (!json.meta || !json.meta.length) return m.reply('❌ No se encontraron videos.');

      let session = {
        videos: json.meta,
        currentIndex: 0,
        query
      };
      tiktokSessions.set(m.chat, session);

      return await sendTikTokVideo(session, m, conn, usedPrefix);
    } catch (e) {
      console.error(e);
      return m.reply('❌ Error al buscar videos.');
    }
  }

  if (command === 'tkseguir') {
    let session = tiktokSessions.get(m.chat);
    if (!session || !session.videos.length) return m.reply('❌ Usa primero el comando .tksearch');

    if (session.currentIndex + 1 >= session.videos.length) return m.reply('✅ No hay más resultados. Vuelve a buscar.');

    session.currentIndex += 1;
    return await sendTikTokVideo(session, m, conn, usedPrefix);
  }
};

async function sendTikTokVideo(session, m, conn, usedPrefix) {
  const video = session.videos[session.currentIndex];

  const text = `🎥 *Resultado ${session.currentIndex + 1}/${session.videos.length}*\n🔍 _${session.query}_\n\n✅ Usa el botón para ver más videos.`;

  const buttons = [
    {
      buttonId: `${usedPrefix}tkseguir`,
      buttonText: { displayText: "▶️ Siguiente Video" },
      type: 1
    }
  ];

  try {
    await conn.sendMessage(m.chat, {
      video: { url: video.hd },
      caption: text,
      footer: 'TIKTOK SEARCH 🎵',
      buttons,
      headerType: 5
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al enviar el video.');
  }
}

handler.command = ['tksearch', 'tkseguir'];
handler.help = ['tksearch <texto>', 'tkseguir'];
handler.tags = ['tiktok'];

export default handler;
