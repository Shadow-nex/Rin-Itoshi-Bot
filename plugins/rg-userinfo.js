import fetch from "node-fetch";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`🍧 Ingresa un número\n\nEjemplo:\n${usedPrefix + command} 51919XXXXXX`);

  try {
    let url = `https://api.nekolabs.my.id/downloader/whatsapp?number=${args[0]}`;
    let res = await fetch(url);
    let data = await res.json();

    if (!data.status) throw "❌ No se encontró información para ese número.";

    let info = `
📞 *Información de WhatsApp*  
━━━━━━━━━━━━━━━
👤 *Número:* ${args[0]}
📝 *Datos:* ${JSON.stringify(data.result, null, 2)}
`;

    await conn.reply(m.chat, info, m);
  } catch (e) {
    console.error(e);
    m.reply("⚠️ Error al obtener datos del usuario.");
  }
};

handler.help = ["infouser <número>"];
handler.tags = ["tools"];
handler.command = ["infouser", "wainfo", "whatsappinfo"];

export default handler;