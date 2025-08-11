import fs from 'fs';
import fetch from 'node-fetch';

let apkSession = new Map();

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'apk2' && text) {
    try {
      await m.react('🔍');

      const response = await fetch(`https://delirius-apiofc.vercel.app/download/apk?query=${encodeURIComponent(text)}`);
      const data = await response.json();
      if (!data.status || !data.data) throw new Error("No se encontró la aplicación.");

      const app = data.data;
      apkSession.set(m.chat, { app });

      let description = `\`\`\`◜ Apk - Download ◞\`\`\`\n\n`;
      description += `🌴 *Nombre:* ${app.name}\n`;
      description += `👤 *Desarrollador:* ${app.developer}\n`;
      description += `💾 *Publicado:* ${app.publish}\n`;
      description += `⚙️ *Tamaño:* ${app.size}\n`;
      description += `🖇️ *Descargas:* ${app.stats.downloads.toLocaleString()}\n`;

      const buttons = [
        {
          buttonId: `${usedPrefix}apk_download`,
          buttonText: { displayText: "📥 Descargar" },
          type: 1
        }
      ];

      await m.react('✅');

      await conn.sendMessage(
        m.chat,
        {
          image: { url: app.image },
          caption: description,
          buttons,
          footer: dev,
          viewOnce: true
        },
        { quoted: m }
      );

    } catch (error) {
      console.error("❌ Error:", error);
      await m.react('❌');

      await conn.sendMessage(
        m.chat,
        { text: `❌ Ocurrió un error: ${error.message || "Error desconocido"}` },
        { quoted: m }
      );
    }
    return;
  }

  // --- COMANDO APK_DOWNLOAD ---
  if (command === 'apk_download') {
    let session = apkSession.get(m.chat);
    if (!session) {
      return conn.sendMessage(
        m.chat,
        { text: `❗ No hay sesión activa. Usa ${usedPrefix}apk2 <nombre de la aplicación>.` },
        { quoted: m }
      );
    }

    let { app } = session;
    const downloadUrl = app.download;

    try {
      await m.react('⌛');

      await conn.sendMessage(
        m.chat,
        {
          document: { url: downloadUrl },
          fileName: `${app.name}.apk`,
          mimetype: 'application/vnd.android.package-archive',
          caption: `╭━━━〔 📦 *APK INFO* 〕━━⬣
┃
┃ ✦ *📌 Nombre:* ${app.name}
┃ ✦ *👨‍💻 Desarrollador:* ${app.developer}
┃ ✦ *📅 Publicado:* ${app.publish}
┃ ✦ *📂 Tamaño:* ${app.size}
┃ ✦ *📈 Descargas:* ${app.stats.downloads.toLocaleString()}
┃
╰━━━〔 🔰 Shadow'core 〕━━⬣`,
          thumbnail: app.image,
          contextInfo: {
            externalAdReply: {
              title: app.name,
              body: packname,
              mediaUrl: null,
              sourceUrl: null,
              thumbnailUrl: app.image,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        },
        { quoted: m }
      );

      await m.react('☑️');

    } catch (err) {
      console.error("❌ Error en descarga:", err);
      await m.react('❌'); 

      await conn.sendMessage(
        m.chat,
        { text: `❌ No se pudo descargar el archivo.` },
        { quoted: m }
      );
    }

    return;
  }

  if (command === 'apk2' && !text) {
    return conn.sendMessage(
      m.chat,
      {
        text: `❗ Ingresa un término de búsqueda.\n\n💚 Ejemplo:\n${usedPrefix}apk2 WhatsApp`
      },
      { quoted: m }
    );
  }
};

handler.tags = ['descargas'];
handler.help = ['apk2', 'apk_download'];
handler.command = ['apk2', 'apk_download'];

export default handler;