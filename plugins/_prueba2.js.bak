import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `✨ Ingresa un prompt\n\nEjemplo:\n${usedPrefix + command} Anime witch girl with silver hair`, m);

  try {
 
    let url = `https://api.vreden.my.id/api/artificial/ximage?prompt=${encodeURIComponent(text)}`;
    let res = await fetch(url);
    if (!res.ok) throw await res.text();

    let json = await res.json();
    let html = json.result;

    if (!html) throw new Error('Respuesta vacía');

    let urls = [...html.matchAll(/<img[^>]+src=["']?([^"' >]+)["']?/g)].map(v => v[1]);

    if (!urls.length) throw new Error('Sin imágenes');

    await conn.sendMessage(m.chat, {
      image: { url: urls[0] },
      caption: `✨ Imagen generada para:\n\`\`\`${text}\`\`\``
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    const errores = [
      '❌ Ocurrió un error al generar la imagen, inténtalo otra vez.',
      '⚠️ Algo salió mal, por favor repite el comando más tarde.'
    ];
    let msg = errores[Math.floor(Math.random() * errores.length)];
    conn.reply(m.chat, msg, m);
  }
};

handler.help = ['ximage <prompt>'];
handler.tags = ['ai', 'image'];
handler.command = /^ximage$/i;

export default handler;