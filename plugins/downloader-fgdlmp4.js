/*import axios from 'axios';

const handler = async (m, { text, conn, usedPrefix, command }) => {
  const nombre = await conn.getName(m.sender)
    if (!text) return m.reply('Proporcióname el enlace de YouTube para que pueda ayudarte. 🎥');

    try {
       await m.react('🕓');

        const response = await axios.get(`https://ytdl.axeel.my.id/api/download/video/?url=${text}`);

        if (!response.data || !response.data.metadata) {
            return m.reply('No se pudo obtener los datos del enlace de YouTube. Asegúrate de que el enlace sea correcto. 😕');
        }

        const { metadata, downloads } = response.data;

        const videoUrl = downloads.url;
        const thumbnailUrl = metadata.thumbnail.url;

        await conn.sendMessage(m.chat, {
            video: {
                url: videoUrl
            },
            caption: `*• Título*: ${metadata.title}`,
        }, { quoted: m });
        await m.react('✅');
          await conn.sendMessage(channelid, { text: `╭─────────────⦁\n│╭➟ ≡ El Usuario ${nombre}\n││➟ ▢ A Usado El Comando ${usedPrefix + command}\n│╰➟ ⌬ Ꭱꭼꮇ Ꮯꮋꭺɴ Ꮃꮋꭺ - Ᏼꮻꭲ`, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🤖 Uso De Un Comando 📥',
thumbnailUrl: 'https://files.catbox.moe/qtdb1u.jpg',
sourceUrl: 'https://dash.host-cuervo.shop',
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })

    } catch (error) {
        await m.react('✖️');
    }
};

handler.command = ['fgdlmp4'];
export default handler;

*/


import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '❀ Ingresa un link de youtube', m);

    try {
        await m.react('🕒');
        let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`);
        let json = await api.json();
        let { title, author, authorUrl, lengthSeconds, views, uploadDate, thumbnail, description, duration, downloadUrl, quality } = json;
        
        let HS = `*Titulo :* ${title}\nDuración : ${duration}\nCalidad : ${quality}p`;

        let durationInSeconds = 0;
        if (duration.includes("min")) {
            let minutes = parseFloat(duration.replace(" min", ""));
            durationInSeconds = Math.round(minutes * 60); 
        }

        if (durationInSeconds >= 2400) {
            await conn.sendMessage(m.chat, { 
                document: { url: downloadUrl }, 
                mimetype: 'video/mp4', 
                fileName: `${title}.mp4`, 
                caption: HS 
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { 
                video: { url: downloadUrl }, 
                caption: HS 
            }, { quoted: m });
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖');
    }
};

handler.help = ['fgdlmp4 *<url>*'];
handler.tags = ['dl'];
handler.command = ['fgdlmp4'];

export default handler;