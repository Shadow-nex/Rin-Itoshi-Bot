import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import yts from 'yt-search';

const handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `*🌴 Por favor, ingresa un texto para buscar en Youtube.*\n> *\`Ejemplo:\`* ${usedPrefix + command} Bing Bang`;

  const results = await yts(text);
  const videos = results.videos.slice(0, 10);

  if (!videos.length) throw '⚠️ *No se encontraron resultados para tu búsqueda.*';

  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  const media = await prepareWAMessageMedia(
    { image: { url: randomVideo.thumbnail } },
    { upload: conn.waUploadToServer }
  );

  const interactiveMessage = {
    body: {
      text: `> *Resultados:* \`${videos.length}\`\n\n*${randomVideo.title}*\n\n≡ 🌵 *\`Autor:\`* ${randomVideo.author.name}\n≡ 🍁 *\`Vistas:\`* ${randomVideo.views.toLocaleString()}\n≡ 🌿 *\`Enlace:\`* ${randomVideo.url}`
    },
    footer: { text: 'sᴜᴋᴜɴᴀ ʙᴏᴛ ᴍᴅ' },
    header: {
      title: '```乂 YOUTUBE - SEARCH```',
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
              title: `${video.title}`,
              rows: [
                {
                  header: video.title,
                  title: video.author.name,
                  description: `𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗋 𝖺𝗎𝖽𝗂𝗈 | Duración: ${video.timestamp}`,
                  id: `.ytmp3 ${video.url}`
                },
                {
                  header: video.title,
                  title: video.author.name,
                  description: `𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗋 𝗏𝗂𝖽𝖾𝗈 | Duración: ${video.timestamp}`,
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

handler.help = ['yts <texto>'];
handler.tags = ['buscador'];
handler.command = ['yts', 'ytsearch'];

export default handler;
