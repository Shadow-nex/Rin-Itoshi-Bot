import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (command === 'ytplaylist') {
    if (!text) return conn.reply(m.chat, "🎶 *Escribe el nombre de una playlist de YouTube para buscarla.*", m);

    try {
      let result = await yts({ query: text, type: 'playlist' });
      let playlists = result.playlists;

      if (!playlists || playlists.length === 0)
        return conn.reply(m.chat, "❌ No encontré ninguna playlist con ese nombre.", m);

      let topPlaylists = playlists.slice(0, 5);
      let first = topPlaylists[0];

      // Mensaje con la primera playlist destacada
      await conn.sendMessage(m.chat, {
        image: { url: first.thumbnail },
        caption:
          `🎼 *Resultados para:* "${text}"\n\n` +
          `📂 *${first.title}*\n` +
          `👤 Autor: ${first.author.name}\n` +
          `🎵 Videos: ${first.videoCount}\n` +
          `🔗 URL: ${first.url}`,
        mentions: [m.sender]
      }, { quoted: m });

      // Crear lista interactiva
      let listSections = topPlaylists.map(pl => ({
        title: `🎶 ${pl.title.slice(0, 50)}`,
        rows: [
          {
            title: "📂 Ver Playlist Completa",
            description: `Autor: ${pl.author.name} | Videos: ${pl.videoCount}`,
            id: `${pl.url}`
          },
          {
            title: "🎬 Descargar Primer Video",
            description: `Descargar el primer video de la playlist`,
            id: `${usedPrefix}ytmp44 ${pl.listId}`
          },
          {
            title: "🎵 Descargar Audio del Primero",
            description: `Extraer en mp3 el primer video de la playlist`,
            id: `${usedPrefix}ytmp33 ${pl.listId}`
          }
        ]
      }));

      await conn.sendList(
        m.chat,
        "📜 *Playlists encontradas en YouTube*",
        `🔍 *Búsqueda:* ${text}\n📂 *Total:* ${playlists.length}\n📄 *Mostrando:* ${topPlaylists.length}`,
        "✨ Selecciona una playlist:",
        listSections,
        m.sender
      );

    } catch (e) {
      console.error(e);
      await conn.sendButton(
        m.chat,
        "⚠️ Ocurrió un error buscando playlists.",
        `🛠️ Comando: ${usedPrefix + command}`,
        null,
        [["📩 Reportar error", `#report ${usedPrefix + command}`]],
        m
      );
    }
  }
};

handler.help = ['ytplaylist <texto>'];
handler.tags = ['descargas', 'busqueda'];
handler.command = ['ytplaylist'];

export default handler;