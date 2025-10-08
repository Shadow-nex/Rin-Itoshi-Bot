import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`✧ Ingresa el nombre de una canción para buscar su letra.\n\n🎋 Ejemplo:\n» *${usedPrefix + command} Nose*`);

  try {
    const apiUrl = `https://api.stellarwa.xyz/tools/lyrics?query=${encodeURIComponent(text)}&apikey=Shadow-xyz`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.status || !json.data) return m.reply("❌ No se encontraron letras para esa canción.");

    const { title, artist, album, lyrics, dl } = json.data;

    const msg = `
╭━━〔 🎧 𝐋𝐘𝐑𝐈𝐂𝐒 🪶 〕━⬣
┃ 🎵 *Título:* ${title}
┃ 👤 *Artista:* ${artist}
┃ 💿 *Álbum:* ${album.title}
┃ 🔗 *Audio:* ${dl ? "Disponible" : "No disponible"}
╰━━━⬣

🩵 *Letra:*
${lyrics.substring(0, 4000)}${lyrics.length > 4000 ? "\n\n… (letra recortada)" : ""}
`.trim();

    const thumbnail = await (await fetch(album.artwork)).buffer();

    await conn.sendMessage(
      m.chat,
      {
        image: thumbnail,
        caption: msg,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: artist,
            thumbnail: thumbnail,
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: true,
            sourceUrl: dl || "https://stellarwa.xyz"
          }
        }
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    m.reply("⚠️ Ocurrió un error al obtener las letras. Intenta nuevamente.");
  }
};

handler.help = ["lyrics"];
handler.tags = ["buscador", "musica"];
handler.command = ["lyrics"];

export default handler;