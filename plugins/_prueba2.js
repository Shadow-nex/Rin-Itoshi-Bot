/*//codigo creado x dv.shadow xd

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

export default handler;*/

import fs from 'fs'

let handler = async (m, { conn }) => {
  try {
    // Imagen que quieres enviar
    let imgUrl = 'https://files.catbox.moe/4q363w.jpg'

    // Texto del mensaje
    let rtx2 = `✨ Hola @${m.sender.split('@')[0]}, disfruta de este contenido!`

    // Ejemplo de objeto del canal
    let channelRD = {
      id: "120363305873983242@newsletter", // ID del canal
      name: "📢 Canal Oficial Rin Itoshi", // Nombre del canal
      link: "https://whatsapp.com/channel/0029Va0000abc" // Link real del canal
    }

    // Quoted de ejemplo (contacto ficticio)
    let fkontak = {
      key: { participant: "0@s.whatsapp.net" },
      message: {
        contactMessage: { displayName: "Rin Itoshi" }
      }
    }

    // Función para crear un "botón" personalizado
    function customButton(texto, url) {
      return {
        externalAdReply: {
          title: texto, // Texto personalizado (en vez de "Ver canal")
          body: channelRD.name,
          thumbnailUrl: imgUrl,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }

    // Enviar el mensaje con botón personalizado
    await conn.sendMessage(m.chat, {
      image: { url: imgUrl },
      caption: rtx2,
      contextInfo: {
        mentionedJid: [m.sender],
        ...customButton("✨ Ir al Canal Oficial", channelRD.link)
      }
    }, { quoted: fkontak })

  } catch (e) {
    console.error(e)
    m.reply("⚠️ Ocurrió un error al enviar el mensaje.")
  }
}

handler.command = /^prueba$/i
export default handler