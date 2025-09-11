import fetch from 'node-fetch';

let handler = async (m, { conn }) => {

    try {
        const response = await fetch('https://delirius-apiofc.vercel.app/anime/loli');
        const data = await response.json();

        if (!data || !data.url) {
            return m.reply('❌ No se pudo obtener una imagen en este momento.');
        }

        await conn.sendMessage(m.chat, {
            image: { url: data.url },
            caption: club
        }, { quoted: m });

        m.react('✅');
    } catch (error) {
        console.error(error);
        m.react('✖️');
        m.reply('❌ Ocurrió un error al obtener la imagen.');
    }
};

handler.help = ['loli'];
handler.tags = ['anime', 'nsfw'];
handler.command = ['loli', 'lolis'];

export default handler;