/*import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🌾 Ingresa el nombre de un template de *CapCut*.\n\n🌿 Ejemplo:\n> ${usedPrefix + command} DJ netizen rahmatahalu`);
  }

  try {
    let res = await fetch(`https://api.vreden.my.id/api/v1/search/capcut?query=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.status || !json.result || !json.result.search_data?.length) {
      return m.reply("No encontré resultados en CapCut.");
    }

    let resultados = json.result.search_data;
    let mensaje = `╭━━━〔 📹 𝐂𝐀𝐏𝐂𝐔𝐓 𝐒𝐄𝐀𝐑𝐂𝐇 〕━━⬣\n`;
    mensaje += `┃ ✦ 𝗕𝘂𝘀𝗾𝘂𝗲𝗱𝗮: *${json.result.query}*\n`;
    mensaje += `┃ ✦ 𝗧𝗼𝘁𝗮𝗹: *${json.result.count}*\n`;
    mensaje += `╰━━━━━━━━━━━━━━━━━━⬣\n\n`;

    for (let i = 0; i < resultados.length; i++) {
      let r = resultados[i];
      mensaje += `╭─❏ *${i + 1}. ${r.title}*\n`;
      mensaje += `│ ✿ 𝗦𝗵𝗼𝗿𝘁: ${r.short_title || "N/A"}\n`;
      mensaje += `│ ⏳ 𝗗𝘂𝗿𝗮𝗰𝗶𝗼́𝗻: ${(r.duration_ms / 1000).toFixed(0)}s\n`;
      mensaje += `│ 👤 𝗔𝘂𝘁𝗼𝗿: ${r.author.full_name} (@${r.author.username})\n`;
      mensaje += `│ 📝 𝗕𝗶𝗼: ${r.author.description || "Sin descripción"}\n`;
      mensaje += `│ 📅 𝗖𝗿𝗲𝗮𝗱𝗼: ${new Date(r.created_at * 1000).toLocaleString()}\n`;
      mensaje += `│\n`;
      mensaje += `│ 📊 *Estadísticas:*\n`;
      mensaje += `│   ❤ Likes: ${r.statistics.like}\n`;
      mensaje += `│   ⭐ Favoritos: ${r.statistics.favorite}\n`;
      mensaje += `│   👁️ Plays: ${r.statistics.play}\n`;
      mensaje += `│   💬 Comentarios: ${r.statistics.comment}\n`;
      mensaje += `│   🔄 Usos: ${r.statistics.usage}\n`;
      mensaje += `│\n`;
      mensaje += `│ 📥 *Descargas:*\n`;
      mensaje += `│   🎞 Original: ${r.download.video_original}\n`;
      mensaje += `│   💧 Watermark: ${r.download.video_watermark}\n`;
      mensaje += `╰──────────────⬣\n\n`;
    }

    await conn.sendFile(
      m.chat,
      resultados[0].cover_url,
      "capcut.jpg",
      mensaje,
      m
    );
  } catch (e) {
    console.error(e);
    m.reply("Error al buscar el template de CapCut.");
  }
};

handler.help = ["capcut <texto>"];
handler.tags = ["downloader"];
handler.command = ["capcutsearch", "capcutse"];

export default handler;*/

import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `🌾 Ingresa el nombre de un template de *CapCut*.\n\n🌿 Ejemplo:\n> ${usedPrefix + command} DJ netizen rahmatahalu`
    );
  }

  try {
    // Avisar que está buscando
    await m.reply("🔎 Buscando videos en *CapCut*...");

    let res = await fetch(
      `https://api.vreden.my.id/api/v1/search/capcut?query=${encodeURIComponent(text)}`
    );
    let json = await res.json();

    if (!json.status || !json.result || !json.result.search_data?.length) {
      return m.reply("❌ No encontré resultados en CapCut.");
    }

    let resultados = json.result.search_data;

    // Enviar portada + info general
    let mensaje = `╭━━━〔 📹 𝐂𝐀𝐏𝐂𝐔𝐓 𝐒𝐄𝐀𝐑𝐂𝐇 〕━━⬣\n`;
    mensaje += `┃ ✦ 𝗕𝘂𝘀𝗾𝘂𝗲𝗱𝗮: *${json.result.query}*\n`;
    mensaje += `┃ ✦ 𝗧𝗼𝘁𝗮𝗹: *${json.result.count}*\n`;
    mensaje += `╰━━━━━━━━━━━━━━━━━━⬣\n\n`;

    await conn.sendFile(m.chat, resultados[0].cover_url, "capcut.jpg", mensaje, m);

    // Enviar hasta 5 resultados con su video original
    for (let r of resultados.slice(0, 5)) {
      if (r.download?.video_original) {
        let caption = `🎬 *${r.title}*\n` +
                      `✿ Short: ${r.short_title || "N/A"}\n` +
                      `⏳ Duración: ${(r.duration_ms / 1000).toFixed(0)}s\n` +
                      `👤 Autor: ${r.author.full_name} (@${r.author.username})\n` +
                      `📊 Likes: ${r.statistics.like} | ⭐ Fav: ${r.statistics.favorite}\n` +
                      `👁️ Plays: ${r.statistics.play} | 🔄 Usos: ${r.statistics.usage}`;

        await conn.sendMessage(m.chat, {
          video: { url: r.download.video_original },
          caption,
        });
      }
    }
  } catch (e) {
    console.error(e);
    m.reply("❌ Error al buscar el template de CapCut.");
  }
};

handler.help = ["capcut <texto>"];
handler.tags = ["downloader"];
handler.command = ["capcutsearch", "capcutse"];

export default handler;