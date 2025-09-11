import fetch from 'node-fetch';

let handler = async(m, { conn, usedPrefix, command }) => {

m.react('🕑');
let img = 'https://delirius-apiofc.vercel.app/anime/loli';

m.react('✅');
conn.sendMessage(m.chat, { 
        image: { url: img }, 
        caption: club, 
    }, { quoted: m });
}

handler.help = ['loli'];
handler.tags = ['anime', 'nsfw'];
handler.command = ['loli', 'lolis'];

export default handler;