import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import yts from 'yt-search';

const handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `*🌴 Por favor, ingresa un texto para buscar en Youtube.*\n> *Ejemplo:* ${usedPrefix + command} Bing Bang`;

  const results = await yts(text);
  const videos = results.videos.slice(0, 10);

  if (!videos.length) throw '⚠️ No se encontraron resultados para tu búsqueda.';

  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  let listado = videos.map((v, i) => `
╭─⊰ *${i + 1}.* ${v.title}
│ ⌬ \`Autor:\` ${v.author.name}
│ ⌬ \`Duración:\` ${v.timestamp}
│ ⌬ \`Vistas:\` ${v.views.toLocaleString()}
│ ⌬ \`Link:\` ${v.url}
╰───────────────`).join("\n\n");

  const media = await prepareWAMessageMedia(
    { image: { url: randomVideo.thumbnail } },
    { upload: conn.waUploadToServer }
  );

  const interactiveMessage = {
    body: {
      text: `┏━❰ 乂 *YOUTUBE - SEARCH* 乂 ❱━┓

🎬 *Video destacado:*

≡ 📌 *Título:* ${randomVideo.title}
≡ 🌵 *Autor:* ${randomVideo.author.name}
≡ 🍁 *Vistas:* ${randomVideo.views.toLocaleString()}
≡ 🌿 *Duración:* ${randomVideo.timestamp}
≡ 🔗 *Enlace:* ${randomVideo.url}

┗━━━━━━━━━━━━━━━━━━━━┛

📜 *Lista completa de resultados:*

${listado}`
    },
    footer: { text: 'rin itoshi' },
    header: {
      title: '乂 YOUTUBE - SEARCH',
      hasMediaAttachment: true,
      imageMessage: media.imageMessage
    },
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: 'Opciones de descarga',
            sections: videos.map(video => ({
              title: video.title,
              rows: [
                {
                  header: video.title,
                  title: video.author.name,
                  description: `⬇️ Descargar audio | Duración: ${video.timestamp}`,
                  id: `.ytmp3 ${video.url}`
                },
                {
                  header: video.title,
                  title: video.author.name,
                  description: `⬇️ Descargar video | Duración: ${video.timestamp}`,
                  id: `.ytmp4 ${video.url}`
                }
              ]
            }))
          })
        }
      ],
      messageParamsJson: ''
    }
  };

  const userJid = conn?.user?.jid || m.key.participant || m.chat;
  const msg = generateWAMessageFromContent(m.chat, { interactiveMessage }, { userJid, quoted: m });
  conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.help = ['yts2 <texto>'];
handler.tags = ['buscador'];
handler.command = ['yts2', 'ytsearch2'];

export default handler;