import fetch from 'node-fetch';
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🎋 Ingresa el nombre de la búsqueda en YouTube.\nEjemplo: ${usedPrefix + command} DJ Remix`);

  await m.react("⏳"); // reacciona con reloj

  try {
    // Llamada a la API de Shadow-XYZ
    let res = await fetch(`https://shadow-xyz.vercel.app/se.html?q=${encodeURIComponent(text)}`);
    let data = await res.json();

    if (!data || !data.result || data.result.length === 0) {
      return m.reply("❌ No se encontraron resultados.");
    }

    // Crear lista de resultados (máx 5)
    let list = data.result.slice(0, 5).map((vid, i) => ({
      title: `${i + 1}. ${vid.title}`,
      rowId: `${usedPrefix}play ${vid.url}`, // comando para reproducir
      description: `${vid.duration || "Desconocido"} • ${vid.views || "0"} vistas`
    }));

    let sections = [{ title: "Resultados de YouTube", rows: list }];

    // Mensaje tipo lista
    let listMessage = {
      text: `🎶 Resultados para: *${text}*`,
      footer: "Shadow-XYZ YouTube Search",
      title: "🔎 YouTube Search",
      buttonText: "Ver resultados",
      sections
    };

    // Enviar lista
    await conn.sendMessage(m.chat, { listMessage }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply("❌ Ocurrió un error al buscar en YouTube.");
  }
};

// Comando: !ytsearch o !youtube
handler.command = /^(ytsearch|youtube)$/i;

export default handler;