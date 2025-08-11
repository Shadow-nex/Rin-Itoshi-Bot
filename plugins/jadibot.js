import ws from 'ws';

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) 
    return conn.reply(m.chat, `💠 El comando *${command}* está desactivado temporalmente.`, m, fake);

  const connsActivas = global.conns.filter(conn =>
    conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED
  );
  
  const _muptime = process.uptime() * 1000;
  const uptime = clockString(_muptime);

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
    if (dias) resultado += `${dias} ᴅɪᴀs, `;
    if (horas) resultado += `${horas} ʜᴏʀᴀs, `;
    if (minutos) resultado += `${minutos} ᴍɪɴᴜᴛᴏs, `;
    if (segundos) resultado += `${segundos} sᴇɢᴜɴᴅᴏs`;
    return resultado.trim();
  }

  const total = subbotsUnicos.length;
  const maxSubbots = 50;
  const disponibles = maxSubbots - total;

  const lista = subbotsUnicos.map((bot, i) => {
    return `╭➤ ѕσ¢ƙєт #${i + 1} 𓆩💠𓆪
┃ ➤🏮 *Usuario:* ${bot.user?.name || 'Sub-Bot Rin Itoshi'}
┃ ➤🌐 *Link:* wa.me/${(bot.user?.jid || '').replace(/[^0-9]/g, '')}
┃ ➤⏳ *En línea:* ${bot.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - bot.uptime) : 'Desconocido'}
╰━━━━━━━━━━━⊱`;
  }).join('\n\n');

  const textoSubbots = `───〔 💠 𝐒𝐎𝐂𝐊𝐄𝐓𝐒 𝐀𝐂𝐓𝐈𝐕𝐎𝐒 💠 〕───

⏳ *Tiempo activo:* _[ ${uptime} ]_
🌿 *Sesiones libres:* _[ ${disponibles} ]_
🏆 *Sub-Bots conectados:* _[ ${total} ]_

— ✦ Lista de Sub-Bots Conectados ✦ —

${lista || '🌙 No hay Sub-Bots activos por ahora.'}`;

  await conn.sendMessage(m.chat, {
    contextInfo: {
      externalAdReply: {
        title: `💠 ѕσ¢ƙєтѕ αcтιvσѕ`,
        body: `🏮 Conectados: ${total}/${maxSubbots}`,
        thumbnailUrl: 'https://files.catbox.moe/zgvj8c.jpg',
        sourceUrl: 'https://github.com/Yuji-XDev/RinItoshi-MD',
        mediaType: 1,
        renderLargerThumbnail: false,
        showAdAttribution: true
      }
    },
    text: textoSubbots
  }, { quoted: fkontak });
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