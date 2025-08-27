import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `🌀 Ingresa un nombre de canción o álbum.\n\n🌱 Ejemplo:\n${usedPrefix + command} Feel Special Twice`,
        m
      );
    }

    let url = `https://delirius-apiofc.vercel.app/search/applemusic?text=${encodeURIComponent(text)}`;
    let res = await fetch(url);
    let data = await res.json();

    if (!data || data.length === 0) {
      return conn.reply(m.chat, "❌ No se encontraron resultados en Apple Music.", m);
    }

    let msg = "🍏 *Resultados en Apple Music:*\n\n";
    data.forEach((item, i) => {
      msg += `*${i + 1}.* ${item.title}\n`;
      msg += `   🎶 Tipo: ${item.tipo}\n`;
      msg += `   👤 Artistas: ${item.artistas}\n`;
      msg += `   🔗 ${item.url}\n\n`;
    });

    await conn.sendMessage(m.chat, {
      image: { url: data[0].imagen },
      caption: msg.trim()
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, "⚠️ Error al buscar en Apple Music.", m);
  }
};

handler.command = ['applemusicsearch'];
export default handler;