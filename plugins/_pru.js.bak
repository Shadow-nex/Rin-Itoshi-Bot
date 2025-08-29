import { generateWAMessageFromContent, proto, jidNormalizedUser } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
    let imgUrl = logo; // tu URL de imagen
    let rtx2 = '✨ ¡Hola! Este es un mensaje especial con tu código secreto ✨';
    let secret = '🔑 1234ABCD';

    // Crear contenido de plantilla (template message)
    const template = {
        templateMessage: {
            hydratedTemplate: {
                hydratedContentText: rtx2,
                locationMessage: { 
                    jpegThumbnail: (await conn.fetchImage(imgUrl)) 
                },
                hydratedFooterText: '® ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ | © sʜᴀᴅᴏᴡ.xʏᴢ',
                hydratedButtons: [
                    {
                        quickReplyButton: {
                            displayText: '🔑 Copiar código',
                            id: `.codigo ${secret}`
                        }
                    }
                ]
            }
        }
    };

    // Enviar mensaje
    const msg = generateWAMessageFromContent(m.chat, template, { quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    // También puedes enviar el código como texto normal
    await conn.sendMessage(m.chat, { text: `*Tu código es:* ${secret}` }, { quoted: m });
};

handler.command = ['miComando'];
handler.help = ['miComando'];
handler.tags = ['general'];

export default handler;