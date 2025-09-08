//codigo creado x dv.shadow xd

import fetch from 'node-fetch';

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    return m.reply(`✨ Ingresa una descripción para generar imágenes.\n\nEjemplo:\n.${command} anime alya`);
  }

  try {
    let res = await fetch(`https://api.dorratz.com/v2/pix-ai?prompt=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json || !json.images || json.images.length === 0) {
      return m.reply("⚠️ No se generaron imágenes, intenta con otra descripción.");
    }

    let caption = `╭━━━〔 🎨 PIX-AI 〕━━⬣
┃✨ *Prompt:* ${text}
┃📀 *By:* ${dev}
╰━━━━━━━━━━━━━━━━⬣`;

    await conn.sendMessage(m.chat, {
      image: { url: json.images[0] },
      caption
    }, { quoted: m });

    for (let i = 1; i < json.images.length; i++) {
      await conn.sendMessage(m.chat, {
        image: { url: json.images[i] }
      }, { quoted: m });
    }

  } catch (e) {
    console.error(e);
    m.reply("❌ Error al generar la imagen.");
  }
};

handler.help = ["aiimg <texto>"];
handler.tags = ["ai", "imagenes"];
handler.command = /^aiimg$/i;

export default handler;