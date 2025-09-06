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

import { generateWAMessageFromContent, proto } from "@whiskeysockets/baileys"
import fs from "fs"

let handler = async (m, { conn }) => {
  try {
    const secret = `WHOI-ZUMI`

    const shadow_xyz = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        productMessage: {
          product: {
            productImage: {
              mimetype: "image/jpeg",
              jpegThumbnail: fs.readFileSync("./src/catalogo.jpg")
            },
            title: "⚡ PRUEBA | RIN ITOSHI ⚡",
            description: "Funciones y comandos disponibles",
            currencyCode: "USD",
            priceAmount1000: 5000,
            retailerId: "menu-funciones",
            productImageCount: 1
          },
          businessOwnerJid: "51919199620@s.whatsapp.net"
        }
      }
    }

    const msg = generateWAMessageFromContent(
      m.chat,
      proto.Message.fromObject({
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: '✨ *CÓDIGO DE VINCULACIÓN* 🌱' },
              footer: { text: `𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 | \`𝚂𝙷𝙰𝙳𝙾𝚆.𝚇𝚈𝚉\`` },
              header: { hasMediaAttachment: false },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                      display_text: "📋 Copiar el código para vincular a subbot",
                      copy_code: secret
                    })
                  }
                ]
              }
            }
          }
        }
      }),
      { quoted: shadow_xyz }
    )

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, "❌ Hubo un error al generar el código de vinculación.", m)
  }
}

handler.command = ['codigo', 'vincular']
handler.tags = ['tools']
handler.help = ['codigo', 'vincular']

export default handler