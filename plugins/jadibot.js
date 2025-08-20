import ws from 'ws';

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) 
    return conn.reply(m.chat, `☁️ El comando *${command}* está desactivado temporalmente.`, m, fake);

  const channelRD = { 
    id: '120363401008003732@newsletter', 
    name: '⚽𐚁 ֹ ִ Rin Itoshi - Official ୧ ֹ ִ⚽ᩚ꤬ᰍ'
  };

  const connsActivas = global.conns.filter(conn =>
    conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED
  );
  
  const _muptime = process.uptime() * 1000;
  const rinuptime = clockString(_muptime);

  const vistos = new Set();
  const subbotsUnicos = connsActivas.filter(conn => {
    const jid = conn.user?.jid;
    if (vistos.has(jid)) return false;
    vistos.add(jid);
    return true;
  });

  function convertirMsADiasHorasMinutosSegundos(ms) {
    let segundos = Math.floor(ms / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);
    segundos %= 60;
    minutos %= 60;
    horas %= 24;

    let resultado = '';
    if (dias) resultado += `${dias} d, `;
    if (horas) resultado += `${horas} h, `;
    if (minutos) resultado += `${minutos} m, `;
    if (segundos) resultado += `${segundos} s`;
    return resultado.trim();
  }

  const total = subbotsUnicos.length;
  const maxSubbots = 100;
  const disponibles = maxSubbots - total;

  const readMore = String.fromCharCode(8206).repeat(4001)
  const lista = subbotsUnicos.map((bot, i) => {
    return `❖━━━━━━━━━━━━━━━❖
      𖦹𖦹𖦹  𝐒𝐎𝐂𝐊𝐄𝐓 𖦹𖦹𖦹
⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ \`#${i + 1}\` ﾟ｡⋆ ｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆

> ✦ 🍂 ᴜsᴜᴀʀɪᴏ: ${bot.user?.name || 'Sub-Bot 🍂'}
> ✦ 🌷 ʟɪɴᴋ: wa.me/${(bot.user?.jid || '').replace(/[^0-9]/g, '')}?text=${usedPrefix}code
> ✦ 🌱 ᴇɴ ʟɪɴᴇᴀ: ${bot.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - bot.uptime) : 'Desconocido'}`;
  }).join('\n\n');

  const textoSubbots = `───〔 ⚽ 𝐒𝐎𝐂𝐊𝐄𝐓𝐒 𝐀𝐂𝐓𝐈𝐕𝐎𝐒 🔋 〕───

⚽ *ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ:* _[ ${rinuptime} ]_
💖 *sᴇssɪᴏɴs ʟɪʙʀᴇs:* _[ ${disponibles} ]_
🌀 *sᴜʙ-ʙᴏᴛs ᴄᴏɴᴇᴄᴛᴀᴅᴏs:* _[ ${total} ]_


— 🜼🍂 List de sub Bots activos 🌱🜼❁ུ۪⸙ —

${readMore
}
${lista || '🌙 No hay Sub-Bots conectados por ahora verifique mas tarde.'}`;

await conn.sendMessage(m.chat, {
  text: textoSubbots,
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      serverMessageId: 100,
      newsletterName: channelRD.name
    },
    externalAdReply: {
      title: '🌀 ѕσ¢ƙєтѕ αcтιvσѕ',
      body: `🍂 Conectados: ${total}/${maxSubbots}`,
      thumbnailUrl: icono,
      mediaUrl: banner,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true,
      showAdAttribution: true
    }
  }
}, { quoted: m });
};

handler.command = ['sockets', 'bots', 'socket'];
handler.tags = ['jadibot'];
handler.help = ['sockets'];

export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}