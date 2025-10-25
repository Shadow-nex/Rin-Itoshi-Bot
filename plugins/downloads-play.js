import fetch from "node-fetch"
import yts from "yt-search"
import crypto from "crypto"
import axios from "axios"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim())
      return conn.reply(m.chat, `*🍃 Por favor, ingresa el nombre o enlace del video.*`, m, rcanal)

    await m.react('🔎')

    const videoMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|shorts\/|v\/)?([a-zA-Z0-9_-]{11})/)
    const query = videoMatch ? `https://youtu.be/${videoMatch[1]}` : text

    const search = await yts(query)
    const allItems = (search?.videos?.length ? search.videos : search.all) || []
    const result = videoMatch
      ? allItems.find(v => v.videoId === videoMatch[1]) || allItems[0]
      : allItems[0]

    if (!result) throw 'No se encontraron resultados.'

    const { title = 'Desconocido', thumbnail, timestamp = 'N/A', views, ago = 'N/A', url = query, author = {} } = result
    const vistas = formatViews(views)

    const res3 = await fetch("https://files.catbox.moe/wfd0ze.jpg");
    const thumb3 = Buffer.from(await res3.arrayBuffer());

    const fkontak2 = {
      key: { fromMe: false, participant: "0@s.whatsapp.net" },
      message: {
        documentMessage: {
          title: "𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗡𝗗𝗢.... ..",
          fileName: global.botname || "Bot",
          jpegThumbnail: thumb3
        }
      }
    };

    const fkontak = {
      key: { fromMe: false, participant: "0@s.whatsapp.net" },
      message: {
        documentMessage: {
          title: `「 ${title} 」`,
          fileName: global.botname || "Bot",
          jpegThumbnail: thumb3
        }
      }
    };

    const info = `🕸️ *Título:* ${title}
🎋 *Canal:* ${author.name || 'Desconocido'}
🍊 *Vistas:* ${vistas}
🌿 *Duración:* ${timestamp}
✨ *Publicado:* ${ago}
🍉 *Link:* ${url}`;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail },
        caption: info,
        contextInfo: { forwardingScore: 999, isForwarded: true }
      },
      { quoted: fkontak2 }
    );

    if (['play', 'mp3'].includes(command)) {
      await m.react('🎧');

      const audio = await savetube.download(url, "audio");
      if (!audio?.status) throw `Error al obtener el audio: ${audio?.error || 'Desconocido'}`;

      await conn.sendMessage(
        m.chat,
        {
          audio: { url: audio.result.download },
          mimetype: 'audio/mpeg',
          fileName: `${title}.mp3`
        },
        { quoted: fkontak }
      );

      await m.react('✔️');
    }

    else if (['play2', 'mp4'].includes(command)) {
      await m.react('🎬');

      const video = await getVid(url);
      if (!video?.url) throw 'No se pudo obtener el video.';

      await conn.sendMessage(
        m.chat,
        {
          video: { url: video.url },
          fileName: `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: `> 🍃 *${title}*`
        },
        { quoted: fkontak }
      );

      await m.react('✔️');
    }

  } catch (e) {
    await m.react('✖️');
    console.error(e);
    const msg = typeof e === 'string'
      ? e
      : `⚠️ Ocurrió un error inesperado.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e?.message || JSON.stringify(e)}`;
    return conn.reply(m.chat, msg, m);
  }
};

handler.command = handler.help = ['play', 'play2', 'mp3', 'mp4'];
handler.tags = ['download'];
export default handler;

//=================

async function getVid(url) {
  const apis = [
    {
      api: 'Yupra',
      endpoint: `https://api.yupra.my.id/api/downloader/ytmp4?url=${encodeURIComponent(url)}`,
      extractor: res => res?.result?.formats?.[0]?.url || res?.result?.url
    }
  ];
  return await fetchFromApis(apis);
}

async function fetchFromApis(apis) {
  for (const { api, endpoint, extractor } of apis) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const r = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeout);
      const res = await r.json().catch(() => null);
      const link = extractor(res);
      if (link) return { url: link, api };
    } catch (err) {
      console.log(`Error en API ${api}:`, err?.message || err);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  return null;
}

//=================

const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    info: "/v2/info",
    download: "/download",
    cdn: "/random-cdn"
  },
  headers: {
    accept: "*/*",
    "content-type": "application/json",
    origin: "https://yt.savetube.me",
    referer: "https://yt.savetube.me/",
    "user-agent": "Mozilla/5.0"
  },
  crypto: {
    hexToBuffer: (hexString) => Buffer.from(hexString.match(/.{1,2}/g).join(""), "hex"),
    decrypt: async (enc) => {
      const secretKey = "C5D58EF67A7584E4A29F6C35BBC4EB12";
      const data = Buffer.from(enc, "base64");
      const iv = data.slice(0, 16);
      const content = data.slice(16);
      const key = savetube.crypto.hexToBuffer(secretKey);
      const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
      let decrypted = decipher.update(content);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return JSON.parse(decrypted.toString());
    }
  },
  youtube: (url) => {
    const patterns = [
      /youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtu.be\/([a-zA-Z0-9_-]{11})/
    ];
    for (const pattern of patterns) {
      if (pattern.test(url)) return url.match(pattern)[1];
    }
    return null;
  },
  request: async (endpoint, data = {}, method = "post") => {
    try {
      const url = endpoint.startsWith("http") ? endpoint : `${savetube.api.base}${endpoint}`;
      const { data: response } = await axios({
        method,
        url,
        data: method === "post" ? data : undefined,
        params: method === "get" ? data : undefined,
        headers: savetube.headers
      });
      return { status: true, data: response };
    } catch (error) {
      return { status: false, error: error.message };
    }
  },
  getCDN: async () => {
    const res = await savetube.request(savetube.api.cdn, {}, "get");
    if (!res.status) return res;
    return { status: true, data: res.data.cdn };
  },
  download: async (link) => {
    const id = savetube.youtube(link);
    if (!id) return { status: false, error: "No se pudo obtener ID del video" };
    try {
      const cdnRes = await savetube.getCDN();
      if (!cdnRes.status) return cdnRes;
      const cdn = cdnRes.data;

      const info = await savetube.request(`https://${cdn}${savetube.api.info}`, { url: `https://www.youtube.com/watch?v=${id}` });
      if (!info.status) return info;

      const decrypted = await savetube.crypto.decrypt(info.data.data);
      const dl = await savetube.request(`https://${cdn}${savetube.api.download}`, {
        id,
        downloadType: "audio",
        quality: "mp3",
        key: decrypted.key
      });

      if (!dl.data?.data?.downloadUrl)
        return { status: false, error: "No se pudo obtener link de descarga" };

      return { status: true, result: { download: dl.data.data.downloadUrl, title: decrypted.title } };
    } catch (err) {
      return { status: false, error: err.message };
    }
  }
};

function formatViews(views) {
  if (views === undefined || views === null) return "No disponible";
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return views.toString();
}