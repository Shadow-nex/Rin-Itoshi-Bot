import fetch from "node-fetch";
import baileys from "@whiskeysockets/baileys";
const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = baileys;

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

    const videoBuffer = Buffer.from(await fetch(videoUrl).then(r => r.arrayBuffer()));

    const media = await prepareWAMessageMedia({ video: videoBuffer, jpegThumbnail: await (await fetch(cover)).arrayBuffer() }, { upload: conn.waUploadToServer });

    let description = `🌟 *TikTok Downloader*

🎬 *Title:* ${title}
🧑‍🎤 *Author:* ${author?.nickname || "-"}
⏱️ *Duration:* ${duration || "-"}   🌎 *Region:* ${region || "-"}
👁️‍🗨️ *Views:* ${stats?.views || "0"}   ❤️ *Likes:* ${stats?.likes || "0"}
💬 *Comments:* ${stats?.comment || "0"}   🔄 *Shares:* ${stats?.share || "0"}
🎶 *Audio:* ${music_info?.title || "-"} - ${music_info?.author || "-"}`;

    const template = generateWAMessageFromContent(
      m.chat,
      {
        hydratedTemplate: {
          hydratedContentText: description,
          videoMessage: media.videoMessage,
          footerText: "📥 TikTok Downloader",
          hydratedButtons: [
            {
              urlButton: {
                displayText: "📢 Canal Oficial",
                url: "https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U",
              },
            },
          ],
        },
      },
      { quoted: m }
    );

    await conn.relayMessage(m.chat, template.message, { messageId: template.key.id });
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