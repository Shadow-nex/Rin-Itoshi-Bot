import fetch from 'node-fetch';
import as cheerio from 'cheerio';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
  await m.react('🤍');

  if (!args[0]) {
    return conn.reply(
      m.chat,
      `*🚩 Ingresa el enlace de la aplicación que deseas descargar de la Play Store.*\n\n*Ejemplo:*\n\`${prefix + command} https://play.google.com/store/apps/details?id=com.whatsapp\``,
      m,
      rcanal
    );
  }

  const url = args[0];
  let packageName;

  try {
    packageName = new URL(url).searchParams.get("id");
    if (!packageName) throw new Error();
  } catch {
    return conn.reply(m.chat, `*❌ La URL proporcionada no es válida o no contiene un ID de aplicación.*`, m, rcanal);
  }

  // --- Scraping de Google Play para obtener info básica ---
  let appTitle = "Aplicación desconocida";
  try {
    const res = await fetch(`https://play.google.com/store/apps/details?id=${packageName}&hl=es`);
    const html = await res.text();
    const $ = cheerio.load(html);

    appTitle = $('h1 span').first().text().trim() || packageName;
  } catch (e) {
    console.log("Error al obtener título desde Play Store:", e.message);
  }

  // --- Generar enlace de descarga desde APKPure ---
  let link = `https://d.apkpure.com/b/APK/${packageName}?version=latest`;

  try {
    await conn.sendFile(
      m.chat,
      link,
      `${appTitle}.apk`,
      `📦 *Nombre:* ${appTitle}\n🆔 *ID:* ${packageName}\n\n⬇️ Descargado desde *Playstore*`,
      m,
      false,
      { mimetype: 'application/vnd.android.package-archive', asDocument: true }
    );
    await m.react('✅');
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `*❌ Error al enviar la APK. Puede que el APKPure no tenga esta app disponible.*`, m, rcanal);
  }
};

handler.help = ['playstoredl *<url>*'];
handler.tags = ['dl'];
handler.command = ['playstoredl']i;
export default handler;