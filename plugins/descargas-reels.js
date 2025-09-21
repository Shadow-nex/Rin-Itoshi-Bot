import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `🎋 Ingresa un nombre para buscar *Reels de Instagram*`
    );
  }

  try {
    let res = await fetch(
      `https://api.vreden.my.id/api/v1/search/instagram/reels?query=${encodeURIComponent(text)}`
    );
    let json = await res.json();

    if (!json.status || !json.result?.search_data?.length) {
      return m.reply("❌ No se encontraron resultados.");
    }

    let reels = json.result.search_data;

    for (let r of reels) {
      let caption = `⚽ *Instagram Reels*  
🌱 Usuario: @${r.profile?.username || "desconocido"}  
🍏 ${r.caption || "Sin descripción"}  
❤️ ${r.statistics?.like_count || 0} | 🌾 ${r.statistics?.comment_count || 0} | 🌿 ${r.statistics?.play_count || 0}  

🌷 ${r.links}`;

      await conn.sendMessage(
        m.chat,
        {
          video: { url: r.reels?.url },
          caption,
        },
        { quoted: m }
      );
    }
  } catch (e) {
    console.error(e);
    m.reply("Error al obtener los Reels.");
  }
};

handler.help = ["reels <texto>"];
handler.tags = ["downloader"];
handler.command = ['reels', 'instareels'];

export default handler;