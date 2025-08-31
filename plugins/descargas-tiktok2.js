import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🚫 *Formato incorrecto.*\n\n🍂 \`Usa:\` ${usedPrefix + command} <enlace de TikTok>`,
      m
    );
  }

  try {
    await m.react("🕒");
    let url = `https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(text)}`;
    let { data } = await axios.get(url);

    if (!data.status) {
      return conn.reply(m.chat, "⚠️ No se pudo descargar el video.", m);
    }

    const {
      id,
      region,
      title,
      duration,
      repro,
      like,
      share,
      comment,
      download,
      published,
      author,
      music,
      meta
    } = data.data;

    const { org, hd, wm, size_org, size_hd } = meta.media[0];

    // Armamos el caption
    let caption = ` 🜸✧ TIKTOK DOWNLOADER ✧🜸
> ❏ \`Título:\` *${title || "-"}*
> ⌬ \`Autor:\` *${author?.nickname || "-"} (${author?.username || "@"})*
> ⬡ \`ID:\` *${id}*
> ✧ \`Región:\` *${region}*
> 🜸 \`Duración:\` *${duration || 0}s*
> ❏ \`Publicado:\` *${published}*
> ⌬ \`Audio:\` *${music?.title || "-"} - ${music?.author || "-"}*
>
> ⬡ \`Reproducciones:\` *${repro}*
> ✧ \`Likes:\` *${like}*
> 🜸 \`Comentarios:\` *${comment}*
> ❏ \`Compartidos:\` *${share}*
> ⌬ \`Descargas:\` *${download}*`.trim();

    // Enviamos el video con botones
    await conn.sendMessage(
      m.chat,
      {
        video: { url: org },
        caption,
        footer: "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ sʜᴀᴅᴏᴡ.xʏᴢ | ʀɪɴ ɪᴛᴏsʜɪ",
        buttons: [
          {
            buttonId: `.tiktokmp3 ${text}`,
            buttonText: { displayText: "🎧 Extraer Audio" },
            type: 1,
          },
          {
            buttonId: `.tiktokhd ${hd}`,
            buttonText: { displayText: "📺 Descargar en HD" },
            type: 1,
          },
        ],
        headerType: 4,
      },
      { quoted: m }
    );

    await m.react("✅");
  } catch (error) {
    console.error(error);
    conn.reply(
      m.chat,
      `❌ *Ocurrió un error al procesar el enlace.*\n\n📌 Asegúrate de que el enlace de TikTok sea válido y vuelve a intentarlo.`,
      m
    );
  }
};

handler.help = ["tiktok2 *<url>*"];
handler.tags = ["descargas"];
handler.command = ["tt2", "tiktok2"];
export default handler;