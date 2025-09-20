import fetch from "node-fetch";

let handler = async (m, { conn }) => {
  try {
    let res = await fetch("https://api.zenzxz.my.id/random/ba");
    if (!res.ok) throw await res.text();

    let image = await res.text();

    await conn.sendMessage(m.chat, {
      image: { url: image.trim() },
      caption: `> ${club}`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("Error al obtener la imagen.");
  }
};

handler.help = ["ba"];
handler.tags = ["anime"];
handler.command = ["ba"];

export default handler;