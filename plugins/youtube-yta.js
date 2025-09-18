import axios from 'axios';
import crypto from 'crypto';

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

  crypto: {
    hexToBuffer: (hexString) => Buffer.from(hexString.match(/.{1,2}/g).join(''), 'hex'),

    decrypt: async (enc) => {
      const secretKey = 'C5D58EF67A7584E4A29F6C35BBC4EB12';
      const data = Buffer.from(enc, 'base64');
      const iv = data.slice(0, 16);
      const content = data.slice(16);
      const key = savetube.crypto.hexToBuffer(secretKey);

      const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
      let decrypted = decipher.update(content);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return JSON.parse(decrypted.toString());
    }
  },

  isUrl: (str) => {
    try { new URL(str); return true; } catch { return false; }
  },

  youtube: (url) => {
    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    for (let r of patterns) if (r.test(url)) return url.match(r)[1];
    return null;
  },

  request: async (endpoint, data = {}, method = 'post') => {
    try {
      const { data: response } = await axios({
        method,
        url: `${endpoint.startsWith('http') ? '' : savetube.api.base}${endpoint}`,
        data: method === 'post' ? data : undefined,
        params: method === 'get' ? data : undefined,
        headers: savetube.headers
      });
      return { status: true, data: response };
    } catch (e) {
      return { status: false, error: e.message };
    }
  },

  getCDN: async () => {
    const r = await savetube.request(savetube.api.cdn, {}, 'get');
    return r.status ? { status: true, data: r.data.cdn } : r;
  },

  download: async (link) => {
    if (!savetube.isUrl(link)) return { status: false, error: "URL inválida" };
    const id = savetube.youtube(link);
    if (!id) return { status: false, error: "No se pudo extraer el ID" };

    try {
      const cdnRes = await savetube.getCDN();
      if (!cdnRes.status) return cdnRes;
      const cdn = cdnRes.data;

      const infoRes = await savetube.request(`https://${cdn}${savetube.api.info}`, {
        url: `https://www.youtube.com/watch?v=${id}`
      });
      if (!infoRes.status) return infoRes;

      const decrypted = await savetube.crypto.decrypt(infoRes.data.data);

      const dl = await savetube.request(`https://${cdn}${savetube.api.download}`, {
        id,
        downloadType: 'audio',
        quality: '128',
        key: decrypted.key
      });

      return {
        status: true,
        result: {
          title: decrypted.title || "Desconocido",
          duration: decrypted.duration || "??:??",
          thumbnail: decrypted.thumbnail || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
          downloadUrl: dl.data.data.downloadUrl
        }
      };
    } catch (e) {
      return { status: false, error: e.message };
    }
  }
};

const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply("⚠️ Ingresa un link de YouTube.");

  try {
    await m.react('🕒');
    let res = await savetube.download(args[0]);
    if (!res.status) {
      await m.react('✖️');
      return m.reply("❌ Error: " + res.error);
    }

    const { title, duration, thumbnail, downloadUrl } = res.result;

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: downloadUrl },
        fileName: `${title}.mp3`,
        mimetype: "audio/mpeg",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: `Duración: ${duration}`,
            sourceUrl: args[0],
            thumbnailUrl: thumbnail,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    );

    await m.react('✅');
  } catch (e) {
    await m.react('✖️');
    m.reply("⚠️ Error al enviar el audio: " + e.message);
  }
};

handler.help = ['yta <url>'];
handler.command = ['yta'];
handler.tags = ['descargas'];

export default handler;