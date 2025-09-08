import fetch from "node-fetch";

let handler = async (m, { text }) => {
  if (!text) return m.reply("✨ Ingresa un texto para usar la IA.");

  try {
    let url = `https://api.nekolabs.my.id/ai/copilot?text=${encodeURIComponent(text)}`;
    let res = await fetch(url);
    let data = await res.json();

    if (!data.status) throw new Error("❌ Error en la API");

    let reply = `🤖 *IA Copilot*\n\n${data.result.text}`;
    await m.reply(reply);
  } catch (e) {
    console.error(e);
    m.reply("⚠️ Error al obtener respuesta de la IA.");
  }
};

handler.command = ["copilot"];
export default handler;