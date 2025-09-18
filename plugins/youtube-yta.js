// - Código hecho x dv.shadow 🌱
// - Rin Itoshi ⚽

import fetch from "node-fetch";
import crypto from "crypto";

const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    cdn: "/random-cdn",
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
  secretKey: 'C5D58EF67A7584E4A29F6C35BBC4EB12',

  decrypt(enc) {
    const data = Buffer.from(enc, 'base64');
    const iv = data.slice(0, 16);
    const content = data.slice(16);
    const key = Buffer.from(this.secretKey, 'hex');

    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(content);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
  },

  async getCDN() {
    const res = await fetch(this.api.base + this.api.cdn, { headers: this.headers });
    const json = await res.json();
    return json?.cdn || null;
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `⚡ *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://youtu.be/ZtFPexrxt4g\n✎ ✧ \`${usedPrefix + command}\` DJ malam pagi slowed`,
        m
      );
    }

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    // Obtener CDN válido
    const cdn = await savetube.getCDN();
    if (!cdn) throw new Error("❌ No se pudo obtener un CDN válido.");

    // Info del video
    const infoRes = await fetch(`https://${cdn}${savetube.api.info}`, {
      method: "POST",
      headers: savetube.headers,
      body: JSON.stringify({ url: text })
    });
    const info = await infoRes.json();

    const decrypted = savetube.decrypt(info.data);

    // Descargar audio
    const dlRes = await fetch(`https://${cdn}${savetube.api.download}`, {
      method: "POST",
      headers: savetube.headers,
      body: JSON.stringify({
        id: decrypted.id,
        downloadType: "audio",
        quality: "128",
        key: decrypted.key
      })
    });

    const dl = await dlRes.json();
    const audioUrl = dl?.data?.downloadUrl;
    if (!audioUrl) throw new Error("⚠️ No se pudo generar el link de descarga.");

    await conn.sendMessage(m.chat, { react: { text: "🎶", key: m.key } });

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: audioUrl },
        fileName: `${decrypted.title}.mp3`,
        mimetype: "audio/mpeg",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: decrypted.title,
            body: `Duración: ${decrypted.duration}`,
            mediaUrl: text,
            sourceUrl: text,
            thumbnailUrl: decrypted.thumbnail,
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
handler.command = ['yta';

export default handler;