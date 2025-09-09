import fetch from "node-fetch";

const STICKERLY_API = "https://delirius-apiofc.vercel.app/search/stickerly"; // URL base de la API
const DEFAULT_QUERY = "My melody"; // Texto por defecto si el usuario no pone nada

let handler = async (m, { conn, args }) => {
  try {
    // Si el usuario no pone búsqueda, usamos el query por defecto
    let query = args.length > 0 ? args.join(" ") : DEFAULT_QUERY;

    // Construir la URL
    let url = `${STICKERLY_API}?query=${encodeURIComponent(query)}`;

    // Petición a la API
    let res = await fetch(url);
    if (!res.ok) throw new Error(`❌ Error al conectar con la API: ${res.status}`);
    let json = await res.json();

    if (!json.status || !json.data || json.data.length === 0) {
      return m.reply(`⚠️ No encontré resultados para *${query}*`);
    }

    // Elegir un sticker aleatorio de los resultados
    let sticker = json.data[Math.floor(Math.random() * json.data.length)];

    let caption = `
╭━━━〔 🌸 *STICKERLY* 🌸 〕━━⬣
┃ ✨ *Nombre:* ${sticker.name}
┃ 👤 *Autor:* ${sticker.author}
┃ 🧩 *Stickers:* ${sticker.sticker_count}
┃ 👀 *Vistas:* ${sticker.view_count}
┃ 📤 *Exportados:* ${sticker.export_count}
┃ 🎭 *Animado:* ${sticker.isAnimated ? "Sí" : "No"}
┃ 💵 *Premium:* ${sticker.isPaid ? "Sí" : "No"}
╰━━━━━━━━━━━━━━━━━━⬣
🔗 *Enlace:* ${sticker.url}
    `.trim();

    // Enviar preview con el link del pack
    await conn.sendMessage(m.chat, {
      image: { url: sticker.preview },
      caption
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Ocurrió un error al buscar el pack de stickers.");
  }
};

// Definir comando
handler.help = ["stickerly <texto>"];
handler.tags = ["sticker"];
handler.command = /^stickerly$/i;

export default handler;