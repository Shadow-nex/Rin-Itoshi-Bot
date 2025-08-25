import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text }) => {
    if (!text) {
        return conn.reply(message.chat, `🍭 *⍴᥆r 𝖿ᥲ᥎᥆r, іᥒgrᥱsᥲ ᥣ᥆ 𝗊ᥙᥱ ძᥱsᥱᥲs ᑲᥙsᥴᥲr ..*`, message, rcanal);
    }

    await message.react('🍬');
    conn.reply(message.chat, `*🌩 Dᥱsᥴᥲrgᥲᥒძ᥆ іmágᥱᥒᥱs, ⍴᥆r 𝖿ᥲ᥎᥆r ᥱs⍴ᥱrᥲ...*`, message, rcanal);

    const apiUrl = `https://delirius-apiofc.vercel.app/search/wallpapers?q=${text}`;
    
    try {
        const response = await axios.get(apiUrl);
        const images = response.data.data.map(item => item.image);

        let cards = [];

        for (const [index, imageUrl] of images.entries()) {
            if (index >= 5) break;
            cards.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `Imagen ${index + 1}: ${response.data.data[index].title}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ȷ᥆sᥱ ᥊rᥣ'
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: response.data.data[index].title,
                    hasMediaAttachment: true,
                    imageMessage: await createImageMessage(imageUrl)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Ver Más",
                            Url: response.data.data[index].thumbnail
                        })
                    }]
                })
            });
        }

        const carouselMessage = generateWAMessageFromContent(message.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.fromObject({
                            text: `🌱 rᥱsᥙᥣ𝗍ᥲძ᥆s ძᥱ : ${text}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.fromObject({
                            text: 'Gᥲᥣᥱríᥲ іmágᥱᥒᥱs',
                        }),
                        header: proto.Message.InteractiveMessage.Header.fromObject({
                            hasMediaAttachment: false
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: cards
                        })
                    })
                }
            }
        }, { quoted: message });

        await conn.relayMessage(message.chat, carouselMessage.message, { messageId: carouselMessage.key.id });
    } catch (error) {
        console.error(error);
        conn.reply(message.chat, `Error al buscar imágenes de coches.`, message);
    }
};

async function createImageMessage(imageUrl) {
    const { imageMessage } = await generateWAMessageContent({
        'image': {
            'url': imageUrl
        }
    }, {
        'upload': conn.waUploadToServer
    });
    return imageMessage;
}

handler.tags = ['wallpapersearch'];
handler.help = ['wallpapersearch *<palabra clave>*'];
handler.command = ['wallpapersearch'];
handler.register = true;

export default handler;