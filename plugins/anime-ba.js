import fetch from "node-fetch";

let handler = async (m, { conn }) => {
  try {
    let res = await fetch(`https://api.zenzxz.my.id/random/ba`);
    if (!res.ok) throw await res.text();
    let result = await res.json();

    let image = result.url || result.result || result; 

    await conn.sendMessage(m.chat, {
      image: { url: image },
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