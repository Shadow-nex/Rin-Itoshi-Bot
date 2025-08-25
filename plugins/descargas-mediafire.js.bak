import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      throw m.reply(`🧪 Ingresa un enlace válido de *Mediafire*.\n\n🌱 Ejemplo: ${usedPrefix + command} https://www.mediafire.com/file/xxxxxx/file`);
    }

    await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    let apiUrl = `https://api.vreden.my.id/api/mediafiredl?url=${encodeURIComponent(text)}`;
    let res = await fetch(apiUrl);
    let json = await res.json();

    if (!json.result || !json.result[0] || !json.result[0].status) {
      throw `❌ No se pudo obtener información del archivo.\nVerifica que el link sea correcto.`;
    }

    let file = json.result[0];
    let { nama, size, mime, link } = file;

    await conn.sendFile(m.chat, link, nama, 
      `乂  *¡MEDIAFIRE - DESCARGAS!*  乂\n\n` +
      `📂 *Nombre:* ${nama}\n` +
      `📦 *Peso:* ${size}\n` +
      `🔖 *MimeType:* ${mime}\n\n` +
      `> 📥 Archivo descargado desde Mediafire`, 
      m
    );

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error(err);
    m.reply(`❌ Ocurrió un error al intentar descargar el archivo.\n\n⚠️ Verifica el link de *Mediafire*.`);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.help = ['mediafire <url>']
handler.tags = ['descargas']
handler.command = ['mf', 'mediafire']
handler.register = true
handler.group = true

export default handler