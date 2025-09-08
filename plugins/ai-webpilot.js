import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`✨ Ingresa un texto\n\nEjemplo:\n${usedPrefix + command} Hello`);

  try {
    let url = `https://api.nekolabs.my.id/ai/webpilot-ai?text=${encodeURIComponent(text)}`;
    let res = await fetch(url);
    let data = await res.json();

    if (!data.status) throw `❌ Error en la API`;

    let respuesta = `💬 *Respuesta de WebPilot AI:*\n${data.result.chat}\n\n`;

    if (data.result.source?.length) {
      respuesta += `🍧 *Fuentes relacionadas:*\n`;
      data.result.source.forEach((src, i) => {
        respuesta += `\n${i + 1}. ${src.title}\n🔗 ${src.link}\n`;
      });
    }

    await conn.reply(m.chat, respuesta, m);

  } catch (e) {
    console.error(e);
    m.reply("⚠️ Error al obtener respuesta de la API");
  }
};

handler.help = ["webpilot <texto>"];
handler.tags = ["ai"];
handler.command = ["webpilot", "pilotai"];

export default handler;