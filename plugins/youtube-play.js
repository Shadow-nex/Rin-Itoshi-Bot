import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, *🍧 Ingresa un título para buscar en YouTube.*, m);

await m.react('🕓');  
try {  
    let searchResults = await searchVideos(args.join(" "));  

    if (!searchResults.length) throw new Error('*✖️ No se encontraron resultados.*');  

    let video = searchResults[0];  
    let thumbnail = await (await fetch(video.miniatura)).buffer();  

    let messageText = `  \`[ Y O U T U B E - P L A Y ]\`\n`;  
    messageText += `🍧 *${video.titulo}*\n`;  
    messageText += `> ❑ *\`𝐂𝐚𝐧𝐚𝐥:\`* ${video.canal}\n`;  
    messageText += `> ✧ *\`𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧:\`* ${video.duracion}\n`;  
    messageText += `> ♡ *\`𝐕𝐢𝐬𝐭𝐚𝐬:\`* ${video.vistas}\n`;  
    messageText += `> ☁︎ *\`𝐏𝐮𝐛𝐢𝐜𝐚𝐝𝐨:\`* ${video.publicado}\n`;  
    messageText += `> ➪ *\`𝐋𝐢𝐧𝐤:\`* ${video.url}`;  

    await conn.sendMessage(m.chat, {  
        image: thumbnail,  
        caption: messageText,  
        footer: club,  
        contextInfo: {  
            mentionedJid: [m.sender],  
            forwardingScore: 999,  
            isForwarded: true  
        },  
        buttons: [  
            {  
                buttonId: `${usedPrefix}ytmp3doc ${video.url}`,  
                buttonText: { displayText: '🎧 𝗔𝗨𝗗𝗜𝗢 𝗗𝗢𝗖' },  
                type: 1,  
            },  
            {  
                buttonId: `${usedPrefix}ytmp4doc ${video.url}`,  
                buttonText: { displayText: '🎬 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗖' },  
                type: 1,  
            },  
            {  
                buttonId: `${usedPrefix}yta ${video.url}`,  
                buttonText: { displayText: '🎶 𝗔 𝗨 𝗗 𝗜 𝗢' },  
                type: 1,  
            },  
            {  
                buttonId: `${usedPrefix}ytmp4 ${video.url}`,  
                buttonText: { displayText: '📹 𝗩 𝗜 𝗗 𝗘 𝗢' },  
                type: 1,  
            }  
        ],  
        headerType: 1,  
        viewOnce: true  
    }, { quoted: m });  

    await m.react('✅');  
} catch (e) {  
    console.error(e);  
    await m.react('✖️');  
    conn.reply(m.chat, '*✖️ Video no encontrado en Youtube.*', m);  
}

};

handler.help = ['play'];
handler.tags = ['descargas'];
handler.command = ['play', 'play2'];
export default handler;

async function searchVideos(query) {
try {
const res = await yts(query);
return res.videos.slice(0, 10).map(video => ({
titulo: video.title,
url: video.url,
miniatura: video.thumbnail,
canal: video.author.name,
publicado: video.ago || 'No disponible',
vistas: video.views?.toLocaleString() || 'No disponible',
duracion: video.duration.timestamp || 'No disponible'
}));
} catch (error) {
console.error('Error en yt-search:', error.message);
return [];
}
}

1. Hazlo minimalista a lo FelixCat-Bot


2. Que si muestre la miniatura pero sin lo botones y que mande el audio después de haber mostrado la miniatura



