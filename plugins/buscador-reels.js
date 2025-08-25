import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🌱 Uso correcto:\n${usedPrefix}${command} <usuario_de_Instagram>`);

  try {
    const res = await fetch(`https://api.vreden.my.id/api/instagram/reels?query=${text}`);
    const data = await res.json();

    if (!data || !data.result || !('media' in data.result)) {
      return m.reply("⚠️ Estructura de respuesta inesperada de la API.");
    }

    const { count, media } = data.result;

    if (count === 0 || media.length === 0) {
      return m.reply(`❌ No se encontraron Reels para el usuario: ${text}`);
    }

    for (let i = 0; i < media.length; i++) {
      const reel = media[i];
      if (reel.video) {
        await conn.sendMessage(
          m.chat,
          { video: { url: reel.video }, caption: `🎬 Reel de ${text}` },
          { quoted: m }
        );
      }
    }

  } catch (err) {
    console.error(err);
    m.reply("❌ Ocurrió un error al obtener los Reels.");
  }
};

handler.help = ['reels <usuario>'];
handler.tags = ['instagram'];
handler.command = /^(reels)$/i;

export default handler;