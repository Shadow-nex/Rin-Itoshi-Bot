import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🚩 Ingresa un enlace de Facebook.\n\n📌 Ejemplo:\n${usedPrefix + command} https://www.facebook.com/share/r/15qNxR1qNh/`, m);
  }

  try {
    let api = `https://dark-core-api.vercel.app/api/download/facebook?key=api&url=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json.success) throw '❌ Error al descargar el video.';

    let { title, caption, duration, image, sdLink, hdLink } = json;

    let info = `
╭━━━〔 📥 Facebook Downloader 〕━━⬣
┃ 🔹 *Título:* ${title}
┃ 📝 *Descripción:* ${caption}
┃ ⏳ *Duración:* ${duration}
╰━━━━━━━━━━━━━━━━━━⬣
`;

    await conn.sendFile(m.chat, image, 'thumb.jpg', info, m);

    let buttons = [
      { buttonId: `${usedPrefix}get ${sdLink}`, buttonText: { displayText: "📺 Descargar SD" }, type: 1 },
      { buttonId: `${usedPrefix}get ${hdLink}`, buttonText: { displayText: "🎥 Descargar HD" }, type: 1 }
    ];

    await conn.sendMessage(m.chat, { text: "Elige la calidad 👇", buttons }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "❌ Hubo un error al obtener el video.", m);
  }
};

handler.help = ['facebook2'];
handler.tags = ['descargas'];
handler.command = /^fb2|facebook2$/i;

export default handler;