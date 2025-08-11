/*import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
  const text = args.join(" ");
  if (!text) {
    return m.reply(
      `┌──〔 📀 𝙈𝙊𝘿𝙊 𝙎𝙐𝙆𝙐𝙉𝘼 〕──┐
│ ⚠️ 𝙐𝙎𝙊 𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝙊:
│ ${usedPrefix}${command} shakira soltera
└──────────────────────┘`
    );
  }

  await m.react('💻');

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.result?.downloadUrl) {
      return m.reply(
        `┌──〔 ❌ 𝙀𝙍𝙍𝙊𝙍 𝟰𝟬𝟰 〕──┐
│ 🔎 No se encontró nada para:
│ "${text}"
└──────────────────────┘`
      );
    }

    const { title, artist, duration, cover, url } = json.result.metadata;
    const audio = json.result.downloadUrl;

    await m.reply(
      `📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗘𝗡 𝗖𝗨𝗥𝗦𝗢...
> [▰▰▰▰▰▱▱▱▱▱] 50%
> Archivo: 🎧 ${title}
> Espera unos segundos...`
    );

    await conn.sendMessage(m.chat, {
      audio: { url: audio },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: '🌌 ᴅᴇsᴄᴀʀgᴀ ᴄᴏᴍᴘʟᴇᴛᴀ 🔊',
          thumbnailUrl: cover,
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: url
        }
      }
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.error(e);
    return m.reply(
      `┌──〔 ❌ 𝙀𝙍𝙍𝙊𝙍 𝙎𝙄𝙎𝙏𝙀𝙈𝘼 〕──┐
│ ⚠️ Ocurrió un fallo inesperado.
│ 📄 Detalles en consola.
│ 🔁 Intenta de nuevo más tarde.
└────〔 💀 𝙎𝙪𝙠𝙪𝙣𝙖_𝙁𝘼𝙄𝙇.𝙙𝙢𝙥 〕────┘`
    );
  }
};

handler.command = ['music'];
handler.help = ['music <nombre>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;*/


import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || !text.includes('spotify.com/track')) {
    return conn.reply(m.chat, `🌿 *Ingresa una URL válida de Spotify*\n\n📌 Ejemplo:\n${usedPrefix + command} https://open.spotify.com/track/5xSt1wxZobFcLzHrFakv6z?si=bMp7vXRTTLK2PkzceN9Imw%0A&context=spotify%3Aplaylist%3A37i9dQZF1EIUCUEDwM1AZV`, m);
  }

  try {
    m.react('🎧');
    
    let api = `https://delirius-apiofc.vercel.app/download/spotifydl?url=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json.status || !json.data?.url) {
      return conn.reply(m.chat, `❌ No se pudo obtener el audio.\n📌 Verifica que la URL sea correcta.`, m);
    }

    const { title, author, duration, image, url } = json.data;

    let textoInfo = `📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗘𝗡 𝗖𝗨𝗥𝗦𝗢...
> [▰▰▰▰▰▱▱▱▱▱] 50%
> Archivo: 🎧 ${title}
> Espera unos segundos...`;

    await conn.sendMessage(m.chat, { image: { url: image }, caption: textoInfo.trim() }, { quoted: m });
    await conn.sendMessage(m.chat, { audio: { url }, mimetype: 'audio/mpeg' }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al procesar la descarga. Intenta más tarde.', m);
  }
};

handler.command = ['music'];
handler.help = ['music <nombre>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;

