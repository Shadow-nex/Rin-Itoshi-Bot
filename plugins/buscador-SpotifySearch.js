import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply('*`🎋 Ingresa el texto de lo que quieres buscar en Spotify`*');
  await m.react('🕓');

  try {
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent(
        { image: { url } }, 
        { upload: conn.waUploadToServer }
      )
      return imageMessage
    }

    let push = [];
    let api = await fetch(`https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(text)}`);
    let json = await api.json();

    for (let track of json.data) {
      let image = await createImage(track.image);

      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `> ◦ *Título:* ${track.title}\n> ◦ *Artistas:* ${track.artist}\n> ° *ID:* ${track.id}\n> ◦ *Duración:* ${track.duration}\n> ° *Álbum:* ${track.album}\n> ◦ *Popularidad:* ${track.popularity}\n> ◦ *Fecha:* ${track.publish}\n> ° *Link:* ${track.url}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: ''
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: image
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              "name": "cta_copy",
              "buttonParamsJson": JSON.stringify({
                display_text: "🎧 ¡Descargar Audio! 🎧",
                id: "123456789",
                copy_code: `.music ${track.url}`
              })
            },
            {
              "name": "cta_url",
              "buttonParamsJson": JSON.stringify({
                display_text: "🎵 Abrir en Spotify",
                url: track.url
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
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              serverMessageId: 100,
              newsletterName: channelRD.name
            },
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: '*`🔍 Resultados de:`* ' + text
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '_`S P - S E A R C H`_'
            }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [...push]
            })
          })
        }
      }
    }, { quoted: m });

    await m.react('✅');
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
  } catch (error) {
    console.error(error);
    m.reply('❌ Error al buscar en Spotify, intenta más tarde.');
  }
}

handler.help = ["spotifysearch *<texto>*"]
handler.tags = ["buscador"]
handler.command = ["spotifysearch"]
handler.coin = 4

export default handler