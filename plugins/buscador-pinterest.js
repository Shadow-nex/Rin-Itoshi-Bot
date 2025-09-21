import fetch from 'node-fetch'
import baileys from '@whiskeysockets/baileys'

const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`${emojis} Ingresa un texto. Ejemplo: .pinterest anime`)
  await m.react('🕓')
  await conn.sendMessage(m.chat, {
    text: `🍉 ʙᴜsᴄᴀɴᴅᴏ ʀᴇsᴜʟᴛᴀᴅᴏs ૮₍｡˃ ᵕ ˂ ｡₎ა 🫛`,
    ...rcanal
  }, { quoted: m })

  try {
    let res = await fetch(`https://api.stellarwa.xyz/search/pinterest?query=${encodeURIComponent(text)}&apikey=Diamond`)
    let json = await res.json()

    if (!json.status || !json.data?.length) throw 'No se encontraron resultados en Pinterest.'

    let results = json.data.slice(0, 15)

    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent(
        { image: { url } },
        { upload: conn.waUploadToServer }
      )
      return imageMessage
    }

    let cards = []
    for (let item of results) {
      let image = await createImage(item.hd || item.mini)

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text:  `> *❏ \`Título:\`* ${item.title || '-'}\n` +
                `> *➭ \`ID:\`* ${item.id}\n` +
                `> *⍟ \`Usuario:\`* ${item.username}\n` +
                `> *♧ \`Nombre:\`* ${item.full_name}\n` +
                `> *✿ \`Seguidores:\`* ${item.followers}\n` +
                `> *✬ \`Likes:\`* ${item.likes}\n` +
                `> *✧ \`Fecha:\`* ${item.created}\n` +
                `> *✎ \`Descripción:\`* ${item.description || 'Sin descripción'}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: club
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '🌷 Pinterest Result ☁️',
          hasMediaAttachment: true,
          imageMessage: image
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: "🔗 Ver Imagen HD",
                url: item.hd,
                merchant_url: item.hd
              })
            },
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: "👤 Ver Perfil",
                url: item.profile_user,
                merchant_url: item.profile_user
              })
            }
          ]
        })
      })
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
              text: `*🎋 Resultados de Pinterest para:* \`${text}\`\n> 🍏 Mostrando: ${results.length} resultados`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '_Pinterest - Search_'
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
    }, { quoted: m, ...rcanal })

    await m.react('✅')
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {
    console.error(e)
    await m.reply('Error en la búsqueda o envío del mensaje.', null, { ...rcanal })
  }
}

handler.help = ['pinterest <texto>']
handler.tags = ['buscador']
handler.command = ['pinterest', 'pin']
handler.register = true

export default handler


const rcanal = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363401008003732@newsletter',
      serverMessageId: '',
      newsletterName: '囹🎋𑜞 ᪲•˙ꨂ ֢✧: яιи ιтσѕнι ¢нαииєℓ σffι¢ιαℓ ੈ♡‧₊˚'
    },
    externalAdReply: {
      title: "𐔌 . ⋮ 𝗕 𝗨 𝗦 𝗖 𝗔 𝗡 𝗗 𝗢 .ᐟ ֹ ₊ ꒱",
      body: textbot,
      mediaUrl: null,
      description: null,
      previewType: "PHOTO",
      thumbnail: await (await fetch(icono)).buffer(),
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false
    },
    mentionedJid: null
  }
}