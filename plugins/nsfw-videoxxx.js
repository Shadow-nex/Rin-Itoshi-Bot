// Para los pajeros xd
let handler = async(m, { conn }) => {

let chat = global.db.data.chats[m.chat];
if (!chat.nsfw) return m.reply(hotw);

// let rvid = global.vidxxx[Math.floor(Math.random() * global.vidxxx.length)];

let vid = 'https://dark-core-api.vercel.app/api/random/anime-random-hot?key=dk-vip';

conn.sendMessage(m.chat, { 
        video: { url: vid }, 
        caption: '🍭 ¡Disfruta Del Video!', 
        footer: dev, 
        buttons: [
            {
                buttonId: `.vxxx`,
                buttonText: { displayText: '🔁 Siguiente Vídeo 🔁' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.tag = ['nsfw'];
handler.help = ['videoxxx'];
handler.command = ['videoxxx', 'vxxx'];

export default handler;