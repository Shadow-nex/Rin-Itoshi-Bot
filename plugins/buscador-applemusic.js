import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🌀 Ingresa un nombre de canción o álbum.\n\n🌱 \`Ejemplo:\`\n> ${usedPrefix + command} Feel Special Twice`);
  }

  try {
    let res, json;

    try {
      res = await fetch(`https://api.delirius.store/search/applemusic?text=${encodeURIComponent(text)}`);
      json = await res.json();

      if (!Array.isArray(json) || json.length === 0) throw new Error("Sin resultados API 1");
    } catch (e) {

      res = await fetch(`https://api.delirius.store/search/applemusicv2?query=${encodeURIComponent(text)}`);
      let alt = await res.json();

      if (!alt?.data || alt.data.length === 0) throw new Error("Sin resultados API 2");

      json = alt.data.map(v => ({
        title: v.title,
        type: "Canción",
        artists: v.artist,
        url: v.url,
        image: v.image
      }));
    }

    let result = json.slice(0, 5); // Limitar a 5 resultados

    for (let item of result) {
      let msg = `🍏 Apple Music 🍄
> 👾 *Título:* ${item.title}
> 👤 *Artista:* ${item.artists}
> 🌱 *Tipo:* ${item.type || "Desconocido"}
> 🌐 *Enlace:* ${item.url}`;

      await conn.sendMessage(m.chat, {
        image: { url: item.image },
        caption: msg
      }, { quoted: m });
    }

  } catch (err) {
    console.error(err);
    m.reply("Ocurrió un error al buscar en Apple Music.");
  }
};

handler.help = ["applemusicsearch <canción>"];
handler.tags = ["buscadores"];
handler.command = ['applemusicsearch'];

export default handler;