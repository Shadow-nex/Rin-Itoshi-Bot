// - Código hecho x dv.shadow 🌱
// - Rin Itoshi ⚽

import fetch from "node-fetch";

const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    info: "/v2/info",
    download: "/download"
  },
  headers: {
    'accept': '*/*',
    'content-type': 'application/json',
    'origin': 'https://yt.savetube.me',
    'referer': 'https://yt.savetube.me/',
    'user-agent': 'Postify/1.0.0'
  },
  formats: ['mp3']
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `⚡ *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://youtu.be/ZtFPexrxt4g?si=aWllBcy3adHrobOB\n✎ ✧ \`${usedPrefix + command}\` DJ malam pagi slowed`,
        m
      );
    }

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    const infoRes = await fetch(`${savetube.api.base}${savetube.api.info}?url=${encodeURIComponent(text)}`, {
      method: "GET",
      headers: savetube.headers
    });

    if (!infoRes.ok) throw new Error("❌ Error al obtener la información del video.");
    const info = await infoRes.json();

    const video = {
      title: info.title,
      url: info.url,
      thumbnail: info.thumbnail,
      timestamp: info.duration
    };

    const downloadRes = await fetch(`${savetube.api.base}${savetube.api.download}`, {
      method: "POST",
      headers: savetube.headers,
      body: JSON.stringify({
        url: text,
        format: "mp3"
      })
    });

    if (!downloadRes.ok) throw new Error("❌ Error al generar link de descarga.");
    const downloadData = await downloadRes.json();

    const audioUrl = downloadData?.url;
    if (!audioUrl) throw new Error("⚠️ No se pudo generar el link de descarga.");

    await conn.sendMessage(m.chat, { react: { text: "🎶", key: m.key } });

    const audioRes = await fetch(audioUrl);
    const audioBuffer = await audioRes.arrayBuffer();

    await conn.sendMessage(
      m.chat,
      {
        audio: Buffer.from(audioBuffer),
        fileName: `${video.title}.mp3`,
        mimetype: "audio/mpeg",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: video.title,
            body: `Duración: ${video.timestamp}`,
            mediaUrl: video.url,
            sourceUrl: video.url,
            thumbnailUrl: video.thumbnail,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "Ocurrió un error al procesar tu solicitud.", m);
  }
};

handler.help = ["yta <url|texto>"];
handler.tags = ["downloader"];
handler.command = /^yta$/i;

export default handler;