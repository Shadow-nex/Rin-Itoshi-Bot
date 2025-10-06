import fetch from "node-fetch";
import baileys from "@whiskeysockets/baileys";
const { proto, generateWAMessageFromContent, generateWAMessageContent } = baileys;

let handler = async (m, { conn }) => {
  try {
    let regex = /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i;
    let match = m.text.match(regex);
    if (!match) return;

    let url = match[0];
    await m.react("⏳");

    let api = `https://api.vreden.my.id/api/v1/download/tiktok?url=${encodeURIComponent(url)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json.status || !json.result) {
      await m.react("❌");
      return conn.reply(m.chat, "❌ No se pudo obtener el video, inténtalo nuevamente.", m);
    }

    const { title, region, duration, author, cover, stats, data, music_info } = json.result;
    const videoUrl = data.find(v => v.type === "nowatermark_hd")?.url || data[0]?.url;

    await m.react("📥");

    let description = `🌟 *TikTok Downloader*

🎬 *Title:* ${title}
🧑‍🎤 *Author:* ${author?.nickname || "-"}
⏱️ *Duration:* ${duration || "-"}   🌎 *Region:* ${region || "-"}
👁️‍🗨️ *Views:* ${stats?.views || "0"}   ❤️ *Likes:* ${stats?.likes || "0"}
💬 *Comments:* ${stats?.comment || "0"}   🔄 *Shares:* ${stats?.share || "0"}
🎶 *Audio:* ${music_info?.title || "-"} - ${music_info?.author || "-"}`;
    const videoMessage = await generateWAMessageContent({ video: { url: videoUrl }, caption: description, thumbnailUrl: cover });

    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({ text: description }),
              footer: proto.Message.InteractiveMessage.Footer.create({ text: "📥 TikTok Downloader" }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                      display_text: "📢 Canal Oficial",
                      url: "https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U",
                      merchant_url: "https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U",
                    }),
                  },
                ],
              }),
            }),
          },
        },
      },
      { quoted: m }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react("✔️");

  } catch (err) {
    console.error(err);
    await m.react("❌");
    conn.reply(m.chat, "❌ Ocurrió un error al procesar el video de TikTok.", m);
  }
};

handler.customPrefix = /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i;
handler.command = new RegExp;
export default handler;