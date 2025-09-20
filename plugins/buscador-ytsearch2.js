/*import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import yts from 'yt-search';

const handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `*🌴 Por favor, ingresa un texto para buscar en Youtube.*\n> *Ejemplo:* ${usedPrefix + command} Bing Bang`;

  const results = await yts(text);
  const videos = results.videos.slice(0, 10);

  if (!videos.length) throw '⚠️ No se encontraron resultados para tu búsqueda.';

  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  let listado = videos.map((v, i) => `╭─⊰ *${i + 1}.* ${v.title}\n│⌬ *Autor:* ${v.author.name}\n│⌬ *Duración:* ${v.timestamp}\n│⌬ *Vistas:* ${v.views.toLocaleString()}\n│⌬ *Link:* ${v.url}\n╰───────────────`).join("\n\n");

  const media = await prepareWAMessageMedia(
    { image: { url: randomVideo.thumbnail } },
    { upload: conn.waUploadToServer }
  );

  const interactiveMessage = {
    body: {
      text: `🎬 *RESULTADOS ENCONTRADOS:* \`${videos.length}\`

≡ 📌 *\`Título:\`* ${randomVideo.title}
≡ 🌵 *\`Autor:\`* ${randomVideo.author.name}
≡ 🍁 *\`Vistas:\`* ${randomVideo.views.toLocaleString()}
≡ 🌿 *\`Duración:\`* ${randomVideo.timestamp}
≡ 🔗 *\`Enlace:\`* ${randomVideo.url}
┗━━━━━━━━━━━━━━━━━━━━┛

📜 *Lista completa de resultados:*

${listado}`
    },
    footer: { text: dev },
    header: {
      title: '┏━❰ 乂 *YOUTUBE - SEARCH* 乂 ❱━┓',
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
                  description: `🎧 Descargar audio | Duración: ${video.timestamp}`,
                  id: `.ytmp3 ${video.url}`
                },
                {
                  header: video.title,
                  title: video.author.name,
                  description: `📹 Descargar video | Duración: ${video.timestamp}`,
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
*/


import fetch from 'node-fetch';
import yts from 'yt-search';
import baileys from '@whiskeysockets/baileys';

const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*🌴 Por favor, ingresa un texto para buscar en YouTube.*\n> *Ejemplo:* ${usedPrefix + command} Bing Bang`);
  await m.react('🕓');

  try {
    const results = await yts(text);
    const videos = results.videos.slice(0, 8);

    if (!videos.length) throw '⚠️ *No se encontraron resultados para tu búsqueda.*';

    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent(
        { image: { url } },
        { upload: conn.waUploadToServer }
      );
      return imageMessage;
    }

    let cards = [];
    for (let video of videos) {
      let image = await createImage(video.thumbnail);

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `[ ✿ ]◦ *Título:* ${video.title}\n> [🍂]◦ *Autor:* ${video.author.name}\n> [🌱]◦ *Duración:* ${video.timestamp}\n> [🌷]◦ *Vistas:* ${video.views.toLocaleString()}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: '® ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ | © sʜᴀᴅᴏᴡ.xʏᴢ'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: image
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: 'cta_copy',
              buttonParamsJson: JSON.stringify({
                display_text: "🎵 Descargar Audio",
                id: "ytmp3",
                copy_code: `.ytmp3 ${video.url}`
              })
            },
            {
              name: 'cta_copy',
              buttonParamsJson: JSON.stringify({
                display_text: "📹 Descargar Video",
                id: "ytmp4",
                copy_code: `.ytmp4 ${video.url}`
              })
            }
          ]
        })
      });
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*🌱 Resultados de:* \`${text}\`\n> Mostrando: ${videos.length} resultados`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '_YouTube - Search_'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards
            })
          })
        }
      }
    }, { quoted: m });

    await m.react('✅');
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  } catch (e) {
    console.error(e);
    await m.reply('❌ Error en la búsqueda o envío del mensaje.');
  }
};

handler.help = ['ytsearch2 <texto>'];
handler.tags = ['buscador'];
handler.command = ['ytsearch2', 'yts2'];

export default handler;