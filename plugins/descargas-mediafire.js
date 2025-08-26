import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `⚽ Ingresa un enlace de **MediaFire**.\n\n💥 Ejemplo:\n${usedPrefix + command} https://www.mediafire.com/file/vmnhppl99gxpzwr/118963055_376112626887969_4242661724965974580_n.jpg/file`, m);
    }

    const api = `https://delirius-apiofc.vercel.app/download/mediafire?url=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json.status || !json.data || !json.data[0]) {
      return conn.reply(m.chat, `❌ No se pudo obtener información del archivo.`, m);
    }

    let file = json.data[0];

    let dl = await fetch(file.link, { redirect: "follow" });
    let finalUrl = dl.url;

    let info = `╭━━━〔 📂 MediaFire Downloader 〕━━⬣
┃ 🍂 *Nombre:* ${file.filename}
┃ 📏 *Tamaño:* ${file.size} bytes
┃ 📄 *Tipo:* ${file.mime}
┃ 📅 *Subido:* ${file.uploaded}
╰━━━━━━━━━━━━━━━━━━━━⬣`;

    await conn.sendMessage(m.chat, { text: info }, { quoted: m });

    await conn.sendMessage(m.chat, {
      document: { url: finalUrl },
      mimetype: file.mime,
      fileName: file.filename
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    return conn.reply(m.chat, `❌ Error al procesar el enlace.\n\n${err.message}`, m);
  }
};

handler.help = ['mediafire'];
handler.tags = ['descargas'];
handler.command = ['mf', 'mediafire'];

export default handler;