/*import axios from 'axios'
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
          title: "☆ 🍧 𝐒𝐔𝐁𝐁𝐎𝐓𝐒 | 𝐎𝐍𝐋𝐈𝐍𝐄 ⭐ ☆",
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
    return `✿〫𝆬 ${i + 1}
> ׅ֮ׄ᷋᪲᷼🥧̷̸ּࣱ۪۫͡ଅ :  \`ᴜsᴜᴀʀɪᴏ:\` ${bot.user?.name || '𝚂𝚄𝙱 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸'}
> ׅ֮ׄ᷋᪲᷼🍏̷̸ּࣱ۪۫͡ଅ :  \`ʟɪɴᴋ:\` wa.me/${(bot.user?.jid || '').replace(/[^0-9]/g, '')}
> ׅ֮ׄ᷋᪲᷼🍂̷̸ּࣱ۪۫͡ଅ :  \`ᴇʟ ʟɪɴᴇᴀ:\` ${bot.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - bot.uptime) : 'Desconocido'}
`;
  }).join('\n\n');

  const textoSubbots = `
\`\`\`   ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟🌷⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`    ۪〫〫𝆬✿〫𝆬 ᮫ᨗ۫ 𝐒𝐎𝐂𝐊𝐄𝐓𝐒 𝐎𝐍𝐋𝐈𝐍𝐄   ּּ籭᮫꫶ֹּּ࣭ٜ〫۫𝆬𝆬ᨗ࠭࠭𝆬ᨗ \`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮ \`\`\`


᮫๋𝆬┌๋࣮╸ֻ֔╺〪ׅ֘╼꒷᮫〪𝆬Ս֢֔֔꒡๋ׅ݃⌒᮫ֻ๋〪𝆬꒥꒷꒥ׅ֘⢅๋〪⭐ׅ⡨๋֢╸ׅ݃╺๋ᰱ〪֔╼ֽ꒷Ս๋ׅ꒡ֻ݃⌒꒥ֻ๋〪꒷ׅ꒥╸๋ׅ╺᮫໋〪֘𝆬╼᮫๋֢𝆬┐᮫๋〪ׅ𝆬
 ࣭݀۫◯࣭ ˚✎ *°ʀᴜɴᴛɪᴍᴇ:* _${uptime}_
 ࣭݀۫◯࣭ ˚✎ *°sᴇssɪᴏɴs ʟɪʙʀᴇs:* _${disponibles}_
 ࣭݀۫◯࣭ ˚✎ *°sᴏᴄᴋᴇᴛs ᴄᴏɴᴇᴄᴛᴀᴅᴏs:* _${total}_
֔࣪└╸᮫໋֔𝆬╺᮫ֽ〭╼֔꒷໋〭Ս᮫ֽ꒡֔⌒ֽ〭꒥᮫࣪𝆬꒷֔꒥⢅᮫໋݃𝆬☁️໋⡨݃╸᮫໋݃𝆬╺ֽ࣪╼֔꒷〭Ս᮫໋݃𝆬꒡֢⌒໋֔꒥᮫𝆬꒷֢꒥֔╸᮫໋〭݃𝆬╺ֽ╼໋〭֔┘᮫໋݃𝆬



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
          title: `◌⃘۪֟፝֯۫ Ｐａｎｅｌ • ｓｕｂ ｂｏｔｓ ♡࣭ ˚`,
          body: `🌤️⧫̇❀̶࣭۪ٜ݊݊⃛᛫⭐ 𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙳𝙾𝚂: ${total}/${maxSubbots}`,
          thumbnailUrl: 'https://files.catbox.moe/fleiok.jpg',
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
}*/


import ws from "ws"
import axios from "axios"
import fetch from "node-fetch"

const handler = async (m, { conn, command, usedPrefix, participants }) => {
  try {

    const users = [
      global.conn.user.jid,
      ...new Set(
        global.conns
          .filter(c => c.user && c.ws.socket && c.ws.socket.readyState !== ws.CLOSED)
          .map(c => c.user.jid)
      )
    ]

    function convertirMsADiasHorasMinutosSegundos(ms) {
      const segundos = Math.floor(ms / 1000)
      const minutos = Math.floor(segundos / 60)
      const horas = Math.floor(minutos / 60)
      const días = Math.floor(horas / 24)
      const segRest = segundos % 60
      const minRest = minutos % 60
      const horasRest = horas % 24

      let partes = []
      if (días) partes.push(`${días} día${días > 1 ? "s" : ""}`)
      if (horasRest) partes.push(`${horasRest} hora${horasRest > 1 ? "s" : ""}`)
      if (minRest) partes.push(`${minRest} minuto${minRest > 1 ? "s" : ""}`)
      if (segRest && partes.length === 0) partes.push(`${segRest} segundo${segRest > 1 ? "s" : ""}`)
      return partes.join(", ")
    }


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
            title: "☆ 🍏 𝐒𝐔𝐁𝐁𝐎𝐓𝐒 • 𝐎𝐍𝐋𝐈𝐍𝐄 ☁️ ☆",
            description: "SubBots conectados en este momento",
            currencyCode: "USD",
            priceAmount1000: 5000,
            retailerId: "SubBots",
            productImageCount: 1
          },
          businessOwnerJid: "51919199620@s.whatsapp.net"
        }
      }
    }

    let groupBots = users.filter(bot =>
      participants.some(p => p.id.toLowerCase() === bot.toLowerCase())
    )

    if (!groupBots.includes(global.conn.user.jid)) {
      groupBots.push(global.conn.user.jid)
    }

    const botsGroup =
      groupBots.length > 0
        ? groupBots.map(bot => {
            const isMainBot = bot === global.conn.user.jid
            const v = global.conns.find(c => c.user?.jid === bot)

            const uptime = isMainBot
              ? convertirMsADiasHorasMinutosSegundos(Date.now() - (global.conn.uptime || Date.now()))
              : v?.uptime
              ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime)
              : "Activo desde ahora"

            const mention = bot.replace(/[^0-9]/g, "")
            return `@${mention}\n> Bot: ${isMainBot ? "Principal" : "Sub-Bot"}\n> Online: ${uptime}`
          }).join("\n\n")
        : `✧ No hay bots activos en este grupo`

    const message = `\`\`\`   ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟🌷⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`    ۪〫〫𝆬✿〫𝆬 ᮫ᨗ۫ 𝐒𝐎𝐂𝐊𝐄𝐓𝐒 𝐎𝐍𝐋𝐈𝐍𝐄   ּּ籭᮫꫶ֹּּ࣭ٜ〫۫𝆬𝆬ᨗ࠭࠭𝆬ᨗ \`\`\`
\`\`\`   ֶ֮⏝ ٌ۪͝ ⏝ֶ֮⋃ ֶ֮ ⋃⏝ ٌ۪͝ ⏝ֶ֮ \`\`\`

*「 ✦ 」 Lista de bots activos*

❀ Principal: *1*
✿ Subs: *${users.length - 1}*

❏ En este grupo: *${groupBots.length}* bots
${botsGroup}`

    const mentionList = groupBots.map(bot => (bot.endsWith("@s.whatsapp.net") ? bot : `${bot}@s.whatsapp.net`))

    const rcanal = {
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: "",
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: botname,
          body: dev,
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnail: await (await fetch(icono)).buffer(),
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: false
        },
        mentionedJid: mentionList
      }
    }

    await conn.sendMessage(m.chat, { text: message, ...rcanal }, { quoted: shadow_xyz })
  } catch (error) {
    m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`)
  }
}

handler.tags = ["serbot"]
handler.help = ["botlist"]
handler.command = ["botlist", "listbots", "listbot", "bots", "sockets", "socket"]

export default handler