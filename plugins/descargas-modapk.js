import { search, download } from 'aptoide-scraper';

var handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, `*🧪 Por favor, ingrese el nombre de la apk para descargarla.*`, m, rcanal);

  try {
    await m.react(rwait);
    //conn.reply(m.chat, `\`🍰 Descargando su aplicación...\``, m, rcanal);

    let searchA = await search(text);
    let data5 = await download(searchA[0].id);
    let txt = `  *\`⚽ APK DOWNLOAD\`*\n\n`;
    txt += `🍩 *ɴᴏᴍʙʀᴇ:* ${data5.name}\n`;
    txt += `🏮 *ᴘᴀǫᴜᴇᴛᴇ:* ${data5.package}\n`;
    txt += `⚡ *ᴜʟᴛɪᴍᴀ ᴀᴄᴛᴜᴀʟɪᴢᴀᴄɪᴏɴ:* ${data5.lastup}\n`;
    txt += `📦 *ᴛᴀᴍᴀɴ̃ᴏ:* ${data5.size}\n\n`;
    txt += `> \`\`\`🌀 Descargando su aplicación...\`\`\``

  await conn.sendMessage(
    m.chat,
    {
      image: { url: data5.icon },
      caption: txt,
      contextInfo: {
        externalAdReply: {
          title: '                          ☘️ Dev.Shadow 🇦🇱',
          body: '   🌀꙰⃟ 𖤐 𝙍𝙄𝙉 𝙄𝙏𝙊𝙎𝙃𝙄 ∞ 𝐌𝐃 𖤐🎨⃟',
          mediaType: 1,
          thumbnailUrl: icono,
          mediaUrl: redes,
          sourceUrl: redes,
          renderLargerThumbnail: true
        }
      }
    },
    { quoted: m }
  );
    await m.react(done);

    let pesoMB = parseFloat(data5.size.replace(' MB', '').replace(',', '.'));
    if (data5.size.includes('GB') || pesoMB > 999) {
      return await conn.reply(m.chat, `${emoji4} El archivo es demasiado pesado.`, m);
    }

    await conn.sendMessage(m.chat, {
      document: { url: data5.dllink },
      fileName: `${data5.name}.apk`,
      mimetype: 'application/vnd.android.package-archive',
      caption: `*${data5.name}*\n> *🔋 Descarga Exitosamente.*`,
      thumbnail: data5.icon,
      contextInfo: {
        externalAdReply: {
          title: '⁖ฺ۟̇࣪·֗٬̤⃟✦ 𝕊ʜᴀᴅᴏᴡ `𝕮ᴏʀᴇ ｡ﾟ･',
          body: data5.name,
          mediaUrl: null,
          sourceUrl: null,
          thumbnailUrl: data5.icon,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `${msm} Ocurrió un fallo`, m);
  }
};

handler.tags = ['descargas'];
handler.help = ['apkmod'];
handler.command = ['apk', 'modapk', 'aptoide'];
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;