import yts from 'yt-search';
import { proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix }) => {
  try {

    let regex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/[^\s]+/i;
    let match = m.text.match(regex);
    if (!match) return;

    let url = match[0];
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    let searchResult = await yts(url);
    let video = searchResult.videos[0];
    if (!video) {
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      return conn.sendMessage(m.chat, { text: '❌ No se encontró el video.' }, { quoted: m });
    }

    await conn.sendMessage(m.chat, { react: { text: '📥', key: m.key } });

    const sections = [
      {
        title: "🎵 FORMATOS DISPONIBLES",
        rows: [
          { title: "🎵 YTMP3", description: "Descargar solo audio", rowId: `#ytmp3 ${video.url}` },
          { title: "🎬 YTMP4", description: "Descargar video", rowId: `#ytmp4 ${video.url}` },
          { title: "🎧 YTA", description: "Audio alta calidad", rowId: `#yta ${video.url}` },
          { title: "📹 YTV", description: "Video alta calidad", rowId: `#ytv ${video.url}` },
        ]
      }
    ];

    const listMessage = {
      text: ` YOUTUBE DETECTADO
> 🎬 Título: ${video.title}
> ⏱️ Duración: ${video.timestamp}
> 👁️ Vistas: ${video.views}
> 🔗 Enlace: ${video.url}


Selecciona el formato que deseas descargar:`,
      footer: "Kaneki Bot • YouTube Downloader",
      title: "📥 DESCARGA TU VIDEO",
      buttonText: "Seleccionar formato",
      sections
    };

    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },
      ...listMessage
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al procesar el video de YouTube.' }, { quoted: m });
  }
};

handler.customPrefix = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/[^\s]+/i;
handler.command = new RegExp();
export default handler;