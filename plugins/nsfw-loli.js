/* Pack By WillZek 
- Hecho Para Los Pajeros 
- https://github.com/WillZek 
*/

import fetch from 'node-fetch';

let handler = async(m, { conn, usedPrefix, command }) => {

m.react('🕑');

const gp = global.db.data.chats[m.chat] || {};

if (!gp.nsfw && m.isGroup) return m.reply('[❗] *El contenido \`NSFW\` está desactivado en este grupo.*\n> Un administrador puede activarlo con el comando » *#nsfw on*');

let txt = 'Pack🔥🔥🔥';

let img = 'https://delirius-apiofc.vercel.app/nsfw/girls';

m.react('✅');
// viva el porno jodido 
conn.sendMessage(m.chat, { 
        image: { url: img }, 
        caption: txt, 
        footer: dev, 
        buttons: [
            {
                buttonId: `.pack`,
                buttonText: { displayText: 'Siguiente 🔁' }
            },
            {
                buttonId: '.vxxx',
                buttonText: { displayText: '🥵 Obtener Video' }
            },
            {
                buttonId: '.tetas',
                buttonText: { displayText: '😐 Tetas' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.help = ['pack'];
handler.tag = ['nsfw'];
handler.command = ['pack', 'loli'];

export default handler;