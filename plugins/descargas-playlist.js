import fetch from "node-fetch";
import { generateWAMessageFromContent, proto } from "@whiskeysockets/baileys";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🌴 Ingresa el nombre de la canción.\n\nEjemplo:\n*${usedPrefix + command} Twice*`;

  try {
    let res = await fetch(`https://api.delirius.store/search/ytsearch?q=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.status || !json.data.length) throw "No se encontraron resultados.";

    let sections = [
      {
        title: "📀 Resultados encontrados",
        highlight_label: "Resultados",
        rows: json.data.map((v, i) => ({
          header: v.title,
          title: `📹 Autor: ${v.author?.name || "Desconocido"}`,
          description: `⏳ ${v.duration} | 👁️ ${v.views.toLocaleString()} vistas`,
          id: v.url
        }))
      }
    ];

    let listMessage = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `✨ Resultados de *${text}*`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "🌴 Rin Itoshi Bot"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: "🎶 Playlist encontrada",
              subtitle: "Pulsa un resultado para abrirlo en YouTube",
              hasMediaAttachment: false
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: JSON.stringify({
                    title: "🎵 Selecciona un video",
                    sections
                  })
                }
              ]
            })
          })
        }
      }
    }, { userJid: m.chat, quoted: m });

    await conn.relayMessage(m.chat, listMessage.message, { messageId: listMessage.key.id });

  } catch (e) {
    console.error(e);
    throw "⚠️ Error al buscar resultados.";
  }
};

handler.help = ["playlist <texto>"];
handler.tags = ["search"];
handler.command = ["playlist"];

export default handler;