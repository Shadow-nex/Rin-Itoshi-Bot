import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const inputUrl = args[0];

  if (!inputUrl || !inputUrl.includes('f-droid.org')) {
    return m.reply(`❗ *Debes proporcionar un enlace de F-Droid válido:*\n\nEjemplo:\n${usedPrefix + command} https://f-droid.org/packages/com.termux.api/`);
  }

  try {
    await m.react('⏳');

    const res = await axios.get(`https://api.dorratz.com/v3/fdroid-dl?url=${encodeURIComponent(inputUrl)}`);
    const data = res.data;

    if (!data || !data.downloadLink) throw '❌ No se encontró el archivo APK.';

    const packageName = inputUrl.split('/').filter(x => x.includes('.')).pop() || 'app';
    const appNameRaw = data.name || data.title || packageName;
    const appName = appNameRaw.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    const versionName = data.version || '1.0';
    const fileName = `${appName}_v${versionName}.apk`;

    let texto = `╭━━━⬣ *📦 APP ENCONTRADA*
┃ 🧩 *Nombre:* ${data.name || 'Desconocido'}
┃ 📌 *Versión:* ${data.version || 'Desconocido'}
┃ 📅 *Agregada:* ${data.addedOn || 'Desconocido'}
┃ 📥 *Tamaño:* ${data.apkSize || 'Desconocido'}
┃ 📱 *Requiere:* ${data.requirement || 'Desconocido'}
┃ 🔐 *Permisos:* ${data.permissions || 'Ninguno'}
╰━━━━━━━━━━━━⬣`.trim();

    await conn.sendMessage(m.chat, {
      document: { url: data.downloadLink },
      mimetype: 'application/vnd.android.package-archive',
      fileName,
      caption: texto
    }, { quoted: fkontak });

  } catch (e) {
    console.error(e);
    await m.reply('💛 Error al obtener la app. Asegúrate de que el enlace de F-Droid es válido o vuelve a intentarlo.');
  }
};

handler.help = ['apkf', 'fdroid'];
handler.tags = ['descargas'];
handler.command = ['apkf', 'fdroid'];

export default handler;