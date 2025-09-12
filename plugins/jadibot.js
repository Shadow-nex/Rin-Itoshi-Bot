import axios from 'axios'
import ws from 'ws';
import fs from 'fs'

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) 
    return conn.reply(m.chat, `☁️ El comando *${command}* está desactivado temporalmente.`, m);

  const channelRD = { 
    id: '120363401008003732@newsletter', 
    name: '⚡ 𝐑𝐈𝐍 𝐈𝐓𝐎𝐒𝐇𝐈 | °𝐂𝐇𝐀𝐍𝐍𝐄𝐋 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 🍧'
  };

  const getThumbnail = async () => {
    const res = await axios.get("https://files.catbox.moe/3su9of.jpg", { responseType: "arraybuffer" })
    return Buffer.from(res.data, "binary")
  }

  const thumbnail = await getThumbnail()

  const shadow_xyz = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      productMessage: {
        product: {
          productImage: {
            mimetype: "image/jpeg",
            jpegThumbnail: thumbnail
          },
          title: "☆ 🍧 𝐒𝐔𝐁𝐁𝐎𝐓𝐒 | 𝐎𝐍𝐋𝐈𝐍𝐄 🍧☆",
          description: dev,
          currencyCode: "USD",
          priceAmount1000: 5000,
          retailerId: "SubBots",
          productImageCount: 1
        },
        businessOwnerJid: "51919199620@s.whatsapp.net"
      }
    }
  }

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
    if (dias) resultado += `${dias} D, `;
    if (horas) resultado += `${horas} H, `;
    if (minutos) resultado += `${minutos} M, `;
    if (segundos) resultado += `${segundos} S`;
    return resultado.trim();
  }

  const total = subbotsUnicos.length;
  const maxSubbots = 10;
  const disponibles = maxSubbots - total;

  const lista = subbotsUnicos.map((bot, i) => {
    return `╭━═┅═━──────────◈
│ャ □ ➛ 𝚂𝙾𝙲𝙺𝙴𝚃 ~ #${i + 1} ⚡ﾟ｡◌
│┌──
││• 🍧 \`ᴜsᴜᴀʀɪᴏ:\` ${bot.user?.name || '𝚂𝚄𝙱 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸'}
││• 💖 \`ʟɪɴᴋ:\` wa.me/${(bot.user?.jid || '').replace(/[^0-9]/g, '')}
││• 🍂 \`ᴇʟ ʟɪɴᴇᴀ:\` ${bot.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - bot.uptime) : 'Desconocido'}
│└─────•◌•₊˚ 
╰━═┅═━──────────◈`;
  }).join('\n\n');

  const textoSubbots = ` 
 ﹍﹍⏜͡︵(╲  ִ ⚽ ִ  ╱)︵͡⏜﹍﹍
┃⋆⸼˟꘏⪩ \`ᴘᴀɴᴇʟ ᴅᴇ sᴜʙ ʙᴏᴛs\` ⪨꙳ʾ˒˓ʿʾ˒˓ʿ┃
┗━━━━━━━━━━━━━━━━━━━━━┛

╔╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╗
╏✎ *°ʀᴜɴᴛɪᴍᴇ:* _${uptime}_
╏✎ *°sᴇssɪᴏɴs ʟɪʙʀᴇs:* _${disponibles}_
╏✎ *°sᴏᴄᴋᴇᴛs ᴄᴏɴᴇᴄᴛᴀᴅᴏs:* _${total}_
╚╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╝

  🌱 \`\`\`LIST DE SUBS CONECTADOS\`\`\`🔋

${lista || '🌙 No hay Sub-Bots conectados por ahora verifique mas tarde.'}

> ${club}`;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: 'https://files.catbox.moe/z1zfg6.jpg' },
      caption: textoSubbots.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 99999,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: `🍧 𝑺𝑶𝑪𝑲𝑬𝑻𝑺 𝑨𝑪𝑻𝑰𝑽𝑶𝑺 🍧`,
          body: `💔 𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙳𝙾𝚂: ${total}/${maxSubbots}`,
          thumbnailUrl: 'https://tinyurl.com/28st4n83',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    },
    { quoted: shadow_xyz }
  )
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