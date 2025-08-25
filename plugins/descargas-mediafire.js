import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🌷 Ejemplo de uso:\n\n✎ ✧ \`${usedPrefix + command}\` https://www.mediafire.com/file/wllf4m0dsnsikuh/C6_Bank_1.0.zip/file`);
  }

  try {
    let api = `https://api.nexfuture.com.br/api/downloads/mediafire/dl?url=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json.status || !json.resultado?.url) {
      return m.reply("⚠️ No se pudo obtener el archivo, revisa el enlace.");
    }

    let { nome, mime, size, url } = json.resultado;

    let caption = `
╭━━━〔 📂 𝙈𝙚𝙙𝙞𝙖𝙛𝙞𝙧𝙚 〕━━⬣
┃ ✦ *Nombre:* ${nome}
┃ ✦ *Tipo:* ${mime}
┃ ✦ *Tamaño:* ${size}
┃ ✦ *Servidor:* NexFuture API
╰━━━〔 ✅ 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙 〕━━⬣
`;

    await conn.sendMessage(m.chat, {
      document: { url },
      mimetype: mime || "application/octet-stream",
      fileName: nome || "archivo",
      caption,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Error al procesar el enlace.");
  }
};

handler.command = ["mediafire", "mf"];
export default handler;