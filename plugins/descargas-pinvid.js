import fetch from 'node-fetch';

let handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    let pinUrl =
      (text && (text.match(/https?:\/\/\S+/i) || [])[0]) ||
      (m.quoted && m.quoted.text && (m.quoted.text.match(/https?:\/\/\S+/i) || [])[0]);

    if (!pinUrl) {
      return conn.reply(
        m.chat,
        `🌟 *Descarga Pinterest*\n\n⚡ Manda el link de un *Pin* con video.\n\n🧪 Ejemplo:\n${usedPrefix + command} https://pin.it/2D2bEV2m2`,
        m
      );
    }

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    if (/pin\.it\//i.test(pinUrl)) {
      let res = await fetch(pinUrl, { redirect: 'follow' });
      pinUrl = res.url;
    }

    if (!/pinterest\.com\/pin\//i.test(pinUrl)) {
      throw new Error("❌ El enlace no es válido de *Pinterest*");
    }

    const endpoint = `https://gokublack.xyz/download/pin?url=${encodeURIComponent(pinUrl)}`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`API respondió ${res.status}`);
    const json = await res.json();

    if (!json?.status || !json?.data?.status) {
      throw new Error("La API no devolvió un resultado válido");
    }

    const { type, size, url: videoUrl } = json.data.data;

    if (!videoUrl) throw new Error("No encontré el .mp4 en la respuesta");

    const caption = [
      '╭━━━〔  Pinterest DL  〕━━⬣',
      '┆ 🌀 *Video listo*',
      `┆ 🎬 Tipo: ${type}`,
      `┆ 📦 Tamaño: ${size}`,
      `┆ ⚽ Fuente: ${pinUrl}`,
      '┆ 🌱 Plataforma: Pinterest',
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

handler.help = ['pinvideo *<link>*'];
handler.tags = ['descargas'];
handler.command = ['pinvideo', 'pinv'];

export default handler;