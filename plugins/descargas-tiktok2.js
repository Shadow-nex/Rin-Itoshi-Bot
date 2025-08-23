import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { conn }) => {
  let regex = /(https?:\/\/(?:www\.)?tiktok\.com\/[^\s]+)/i;
  let match = m.text.match(regex);
  if (!match) return;

  let url = match[0];
  try {
    await m.react("🕒");

    const videoResult = await ttsave.video(url);
    const { type, nickname, username, description, videoInfo, slides } = videoResult;

    let message = `
╭━〔 *📥 TIKTOK DOWNLOADER* 〕━⬣
┃ 👤 *Nombre:* ${nickname || "-"}
┃ 🆔 *Usuario:* ${username || "-"}
┃ 📝 *Descripción:* ${description || "Sin descripción disponible..."}
`.trim();

    if (type === "slide") {
      message += `\n┃ 🖼️ *Tipo:* Presentación (Imágenes)\n╰━━━━━━━━━━━━⬣`;
      await conn.reply(m.chat, message, m);

      for (let slide of slides) {
        await m.react("🍁");
        await conn.sendFile(m.chat, slide.url, `slide-${slide.number}.jpg`, "", m);
      }

    } else if (type === "video") {
      message += `\n┃ 🎬 *Tipo:* Video\n╰━━━━━━━━━━━━⬣`;

      if (videoInfo.nowm) {
        await m.react("🍓");
        await conn.sendMessage(
          m.chat,
          {
            video: { url: videoInfo.nowm },
            caption: message,
          },
          { quoted: m }
        );
      } else {
        conn.reply(m.chat, "⚠️ No se pudo obtener el video sin marca de agua.", m);
      }
    }

  } catch (error) {
    console.error(error);
    conn.reply(
      m.chat,
      `❌ *Ocurrió un error al procesar el enlace.*\n\n📌 Verifica que el enlace sea válido.`,
      m
    );
  }
};

handler.customPrefix = /https?:\/\/(?:www\.)?tiktok\.com\/[^\s]+/i;
handler.command = new RegExp();

export default handler;


// =======================
//   Scraper ttsave.app
// =======================

const headers = {
  authority: "ttsave.app",
  accept: "application/json, text/plain, */*",
  origin: "https://ttsave.app",
  referer: "https://ttsave.app/en",
  "user-agent": "Postify/1.0.0",
};

const ttsave = {
  submit: async function (url, referer) {
    const headerx = { ...headers, referer };
    const data = { query: url, language_id: "1" };
    return axios.post("https://ttsave.app/download", data, { headers: headerx });
  },

  parse: function ($) {
    const uniqueId = $("#unique-id").val();
    const nickname = $("h2.font-extrabold").text();
    const profilePic = $("img.rounded-full").attr("src");
    const username = $("a.font-extrabold.text-blue-400").text();
    const description = $("p.text-gray-600").text();

    const dlink = {
      nowm: $("a.w-full.text-white.font-bold").first().attr("href"),
      wm: $("a.w-full.text-white.font-bold").eq(1).attr("href"),
      audio: $("a[type='audio']").attr("href"),
      profilePic: $("a[type='profile']").attr("href"),
      cover: $("a[type='cover']").attr("href"),
    };

    const slides = $("a[type='slide']")
      .map((i, el) => ({
        number: i + 1,
        url: $(el).attr("href"),
      }))
      .get();

    return { uniqueId, nickname, profilePic, username, description, dlink, slides };
  },

  video: async function (link) {
    try {
      const response = await this.submit(link, "https://ttsave.app/en");
      const $ = cheerio.load(response.data);
      const result = this.parse($);

      if (result.slides && result.slides.length > 0) {
        return { type: "slide", ...result };
      }

      return {
        type: "video",
        ...result,
        videoInfo: {
          nowm: result.dlink.nowm,
          wm: result.dlink.wm,
        },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};