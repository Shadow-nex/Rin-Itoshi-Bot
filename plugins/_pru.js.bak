import { proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, command }) => {
    let imgUrl = logo;
    let rtx2 = '✨ ¡Hola! Este es un mensaje especial con tu código secreto ✨';
    let secret = '🔑 1234ABCD'; // Aquí tu código secreto dinámico si quieres

    // Enviar imagen con caption y botón
    await conn.sendMessage(m.chat, {
        image: { url: imgUrl },
        caption: rtx2,
        contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363401008003732@newsletter', // Reemplaza con tu canal si aplica
                serverMessageId: 100,
                newsletterName: 'CHANNEL_NAME'
            }
        },
        footer: '® ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ | © sʜᴀᴅᴏᴡ.xʏᴢ',
        templateButtons: [
            {
                index: 1,
                quickReplyButton: {
                    displayText: '🔑 Copiar código',
                    id: `.codigo ${secret}`
                }
            }
        ]
    }, { quoted: m });

    // También puedes responder con el código como mensaje normal
    await conn.reply(m.chat, `*Tu código es:* ${secret}`, m);
};

handler.command = ['miComando']; // Aquí defines el comando
handler.help = ['miComando'];
handler.tags = ['general'];

export default handler;