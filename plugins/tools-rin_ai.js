import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `☕️ *Por favor ingresa una descripción*\n\nEjemplo: ${usedPrefix + command} un gato`, m, rcanal);

    try {
        await m.react('🕒');
        conn.sendPresenceUpdate('composing', m.chat);

        var apii = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);
        
        if (!apii.ok) throw new Error('No se pudo generar la imagen.');

        var res = await apii.buffer();

        await conn.reply(m.chat, 'Aquí está tu imagen:', m, rcanal);
        await conn.sendFile(m.chat, res, 'image.png', '', m);

        await m.react('✅️');
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, 'Ocurrió un error al comunicarse con la API.', m);
    }
}

handler.tags = ['tools'];
handler.help = ['rinai'];
handler.command = ['rinai'];
export default handler;