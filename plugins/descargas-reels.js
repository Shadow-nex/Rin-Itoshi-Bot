import fetch from "node-fetch";
import baileys from "@whiskeysockets/baileys";

const { generateWAMessageFromContent, proto } = baileys;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🎋 Ingresa un nombre para buscar *Reels de Instagram*`);
  }

  await m.react("⏳");
  await conn.sendMessage(m.chat, { text: "*🔎 Buscando Reels de Instagram...* 🗿" }, { quoted: m });

  try {
    let res = await fetch(
      `https://api.vreden.my.id/api/v1/search/instagram/reels?query=${encodeURIComponent(text)}`
    );
    let json = await res.json();

    if (!json.status || !json.result?.search_data?.length) {
      await m.react("❌");
      return m.reply("No se encontraron resultados.");
    }

    let reels = json.result.search_data;

    // Máximo 6 reels para no saturar
    let cards = reels.slice(0, 6).map((r, i) => {
      return {
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `🌱 Usuario: @${r.profile?.username || "desconocido"}\n🍏 ${
            r.caption || "Sin descripción"
          }\n❤️ ${r.statistics?.like_count || 0} | 🌾 ${
            r.statistics?.comment_count || 0
          } | 🌿 ${r.statistics?.play_count || 0}`,
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "⚽ Instagram Reels",
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: "📹 Reel #" + (i + 1),
          hasMediaAttachment: true,
          videoMessage: proto.Message.VideoMessage.fromObject({
            url: r.reels?.url,
          }),
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "📢 Canal official",
                url: "https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U",
                merchant_url: "https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U",
              }),
            },
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌷 Ver en Instagram",
                url: r.links,
                merchant_url: r.links,
              }),
            },
          ],
        }),
      };
    });

    let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: "✨ Resultados encontrados:",
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "⚽ Instagram Reels Downloader",
              }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                cards,
              }),
            }),
          },
        },
      },
      { quoted: m }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await m.react("✅");
  } catch (e) {
    console.error(e);
    await m.react("❌");
    m.reply("Error al obtener los Reels.");
  }
};

handler.help = ["reels <texto>"];
handler.tags = ["downloader"];
handler.command = ["reels", "instareels"];

export default handler;