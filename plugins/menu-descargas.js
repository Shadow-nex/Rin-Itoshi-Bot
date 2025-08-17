let handler = async (m, { conn }) => {
  try {
    const imgurl = 'https://files.catbox.moe/nmseef.png';

    const palabrasClave = ['descargas', 'dl', 'downloader'];

    // Filtrar comandos relacionados
    const comandosBusqueda = Object.values(global.plugins).filter(
      plugin => plugin?.help && plugin.help.length > 0 &&
        (palabrasClave.some(palabra =>
          (plugin?.tags || []).join().toLowerCase().includes(palabra) ||
          plugin.help.join(' ').toLowerCase().includes(palabra)
        ))
    );

    // Lista con los nombres originales de los comandos
    const listaComandos = comandosBusqueda.map(plugin => {
      return plugin.help.map(cmd => `🎃 #${cmd}`).join('\n');
    }).join('\n');

    // Texto del menú
    const texto = `ʜᴏʟᴀ
╔═══════ • ° ❁⊕❁ ° • ═══════╗
    📥⃟⃢᭄͜═✩═[𝐌𝐄𝐍𝐔-𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒]═✩═⃟⃢᭄͜📂
╚═══════ • ° ❁⊕❁ ° • ═══════╝

> 📥⊹ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐝𝐞 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐬 𝐩𝐚𝐫𝐚 𝐯𝐚𝐫𝐢𝐨𝐬 𝐚𝐫𝐜𝐡𝐢𝐯𝐨𝐬 📂⊹

━⃨⃛━╼─╍╍╍─╍▻◅╍─╍╍╼╼━⃨⃛╍╍
${listaComandos}

> ${global.club || '👑 ʙᴏᴛ ᴘᴏʀ ʙʟᴀᴄᴋ'}
`.trim();

    // Enviar solo imagen + texto
    await conn.sendMessage(m.chat, {
      image: { url: imgurl },
      caption: texto,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: global.packname || '📦 Sukuna Bot MD',
          body: global.dev || '👑 Creado por Black',
          thumbnailUrl: global.icono || imgurl,
          mediaType: 1,
          renderLargerThumbnail: false,
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

handler.help = ['menudl'];
handler.tags = ['menus'];
handler.command = ['menudescargas', 'menudl'];

export default handler;