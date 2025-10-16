let handler = async (m, { conn }) => {
  try {
    let imageUrl = "https://shadow-xyz.vercel.app/download/ups";
    let caption = `> ${club}`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: caption
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("Error al enviar la imagen.");
  }
};

handler.command = ['baa']; 
handler.help = ['baa'];
handler.tags = ['anime'];

export default handler;