import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `🎵 Ingresa el título de una canción para buscar.`, m);

  await conn.reply(m.chat, `🌴 Buscando resultados, espera un momento...`, m);

  try {
    const results = await search(args.join(" "));
    const video = results[0];
    if (!video) throw 'No se encontró ningún resultado.';

    const caption = `🎵 *PLAY LIST* 🎵

💫 *Título:* ${video.title}
📅 *Publicado:* ${video.ago}
⏱️ *Duración:* ${secondString(video.duration.seconds)}
🔗 *Link:* ${video.url}`;

    const listSections = [{
      title: `𔒝 𝐋𝐈𝐒𝐓 𝐃𝐄 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 𔒝`,
      rows: [
        {
          title: "🔎 Buscar más",
          description: "Buscar más canciones relacionadas.",
          rowId: `${usedPrefix}play5 ${text}`
        },
        {
          title: "🎧 Descargar audio",
          description: "Descargar solo el audio.",
          rowId: `${usedPrefix}ytmp3 ${video.url}`
        },
        {
          title: "🎞 Descargar video",
          description: "Descargar solo el video.",
          rowId: `${usedPrefix}ytmp4 ${video.url}`
        },
        {
          title: "📄 Audio como documento",
          description: "Descargar el audio en documento.",
          rowId: `${usedPrefix}ytmp3doc ${video.url}`
        },
        {
          title: "📄 Video como documento",
          description: "Descargar el video en documento.",
          rowId: `${usedPrefix}ytmp4doc ${video.url}`
        },
      ]
    }];

    await conn.sendMessage(m.chat, {
      text: caption,
      footer: '📂 Opciones de descarga:',
      title: '',
      buttonText: '🌴 Ver opciones',
      sections: listSections,
      contextInfo: {
        externalAdReply: {
          title: video.title,
          body: 'Resultado encontrado',
          thumbnailUrl: video.thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: video.url
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, `⚠️ Error al buscar el video. Intenta nuevamente.`, m);
  }
};

handler.command = ['play5'];
handler.register = true;
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

function secondString(seconds) {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const hDisplay = h > 0 ? h + 'h ' : '';
  const mDisplay = m > 0 ? m + 'm ' : '';
  const sDisplay = s > 0 ? s + 's' : '';
  return hDisplay + mDisplay + sDisplay;
}