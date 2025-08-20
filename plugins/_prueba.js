let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let rtx2 = "✨ Aquí tienes tu código secreto";
    let secret = Math.random().toString(36).substring(2, 10).toUpperCase(); // Ejemplo de código aleatorio
    let imgUrl = "https://telegra.ph/file/9f1c4c9f5a20c2a9f8f9e.jpg"; // Imagen decorativa

    // Primer mensaje con texto + imagen
    let txtCode = await conn.sendMessage(m.chat, {
      image: { url: imgUrl },
      caption: rtx2,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true
      }
    }, { quoted: m });

    // Segundo mensaje respondiendo al anterior con el código secreto
    let codeBot = await conn.reply(
      m.chat,
      `\`🔐 ${secret}\``,
      txtCode, // responde al mensaje con imagen
      { contextInfo: { mentionedJid: [m.sender] } }
    );

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "❌ Error al generar el código.", m);
  }
};

handler.command = /^code|codigo$/i;
export default handler;