import moment from 'moment-timezone'

let handler = async (m, { conn }) => {
  try {
    const palabrasClave = ['nable'];

    const comandosBusqueda = Object.values(global.plugins).filter(
      plugin => plugin?.help && plugin.help.length > 0 &&
        (palabrasClave.some(palabra =>
          (plugin?.tags || []).join().toLowerCase().includes(palabra) ||
          plugin.help.join(' ').toLowerCase().includes(palabra)
        ))
    );


    const listaComandos = comandosBusqueda.map(plugin => {
      return plugin.help.map(cmd => `│ .${cmd}`).join('\n');
    }).join('\n');

    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('hh:mm:ss A')
    let dia = moment.tz('America/Lima').locale('es').format('dddd')
    let nombreUser = m.pushName || 'Usuario'
    let pais = '🇵🇪 Perú'
    let botName = global.bot

    const texto = `
[⚡ Menú nable ⚡]

👤 Usuario: *${nombreUser}*
🤖 Bot: *${botName}*
🌎 País: ${pais}
⏰ Hora: *${hora}*
📅 Fecha: *${fecha}*
📆 Día: *${dia}*

📜 Menu nable 

${listaComandos}

💌 Canal oficial: https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: logo },
      caption: texto,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: global.packname,
          body: global.dev,
          thumbnailUrl: global.icono,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          mediaUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
          sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '❌ Hubo un error al cargar el menú.', m);
  }
};

handler.help = ['menup'];
handler.tags = ['menus'];
handler.command = ['menup'];

export default handler;