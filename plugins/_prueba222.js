
import fetch from 'node-fetch';

let handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    let pinUrl =
      (text && (text.match(/https?:\/\/\S+/i) || [])[0]) ||
      (m.quoted && m.quoted.text && (m.quoted.text.match(/https?:\/\/\S+/i) || [])[0]);

    if (!pinUrl || !/pinterest\.com\/pin\//i.test(pinUrl)) {
      return conn.reply(
        m.chat,
        `🌟 *Descarga Pinterest*\n\n👉 Manda el link de un *Pin* con video.\n\n🧪 Ejemplo:\n${usedPrefix + command} https://pinterest.com/pin/4151824651938194`,
        m
      );
    }

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    const endpoint = `https://api.dorratz.com/v3/pinvideo?url=${encodeURIComponent(pinUrl)}`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`API respondió ${res.status}`);
    const data = await res.json();

    const videoUrl = findMp4Url(data);
    if (!videoUrl) throw new Error("No encontré el .mp4 en la respuesta");

    const caption = [
      '╭━━━〔  Pinterest DL  〕━━⬣',
      '┆ ✅ *Video listo*',
      `┆ 🔗 Fuente: ${pinUrl}`,
      '┆ 📌 Plataforma: Pinterest',
      '╰━━━━━━━━━━━━━━━━━━⬣',
    ].join('\n');

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl },
        caption,
        mimetype: 'video/mp4',
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (err) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    conn.reply(m.chat, `⚠️ Error: ${err.message}`, m);
  }
};

function findMp4Url(any) {
  let url;
  try {
    const visit = (node) => {
      if (url) return;
      if (typeof node === 'string' && node.includes('.mp4')) {
        if (/^https?:\/\/\S+\.mp4(\?\S+)?$/i.test(node)) url = node;
        return;
      }
      if (Array.isArray(node)) node.forEach(visit);
      if (typeof node === 'object') Object.values(node).forEach(visit);
    };
    visit(any);
  } catch {}
  return url || null;
}

handler.help = ['pinvideo <url>'];
handler.tags = ['downloader'];
handler.command = /^(pinvideo)$/i;

export default handler;