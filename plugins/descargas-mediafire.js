import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `⚠️ Ingresa un enlace de **MediaFire Folder**.\n\n📌 Ejemplo:\n${usedPrefix + command} https://www.mediafire.com/folder/4zhvcue3l75xa/Delirius+Test`, m);
    }

    // URL API con el link ingresado
    const api = `https://delirius-apiofc.vercel.app/download/mediafire?url=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json.status || !json.data) {
      return conn.reply(m.chat, `❌ No se pudo obtener información de la carpeta.`, m);
    }

    let info = `╭━━━〔 📂 MediaFire Downloader 〕━━⬣
┃ 👤 *Creador:* ${json.creator}
┃ 📁 *Carpeta:* ${json.folder}
┃ 📊 *Total archivos:* ${json.data.length}
╰━━━━━━━━━━━━━━━━━━━━⬣\n\n`;

    // Mostrar lista de archivos con detalles
    for (let i = 0; i < json.data.length; i++) {
      let file = json.data[i];
      info += `📌 *${file.filename}*\n`;
      info += `┆📏 Tamaño: ${file.size} bytes\n`;
      info += `┆📄 Tipo: ${file.mime}\n`;
      info += `┆📅 Subido: ${file.uploaded}\n`;
      info += `┆🔗 [Descargar](${file.link})\n\n`;
    }

    // Mandar info primero
    await conn.sendMessage(m.chat, { text: info }, { quoted: m });

    // Luego enviar los archivos (máx 3-5 para no saturar WhatsApp)
    for (let i = 0; i < Math.min(json.data.length, 5); i++) {
      let file = json.data[i];
      await conn.sendMessage(m.chat, {
        document: { url: file.link },
        mimetype: file.mime,
        fileName: file.filename
      }, { quoted: m });
    }

  } catch (err) {
    console.error(err);
    return conn.reply(m.chat, `❌ Error al procesar el enlace.\n\n${err.message}`, m);
  }
};

handler.help = ['mediafire'];
handler.tags = ['descargas'];
handler.command = ['mf', 'mediafire'];

export default handler;