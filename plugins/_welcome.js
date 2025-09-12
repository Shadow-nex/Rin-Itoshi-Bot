import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  const getPais = (numero) => {
    const paisesPorPrefijo = {
      "1": "🇺🇸 𝑬𝒔𝒕𝒂𝒅𝒐𝒔 𝑼𝒏𝒊𝒅𝒐𝒔",
      "34": "🇪🇸 𝑬𝒔𝒑𝒂𝒏̃𝒂",
      "52": "🇲🇽 𝑴é𝒙𝒊𝒄𝒐",
      "54": "🇦🇷 𝑨𝒓𝒈𝒆𝒏𝒕𝒊𝒏𝒂",
      "55": "🇧🇷 𝑩𝒓𝒂𝒔𝒊𝒍",
      "56": "🇨🇱 𝑪𝒉𝒊𝒍𝒆",
      "57": "🇨🇴 𝑪𝒐𝒍𝒐𝒎𝒃𝒊𝒂",
      "58": "🇻🇪 𝑽𝒆𝒏𝒆𝒛𝒖𝒆𝒍𝒂",
      "591": "🇧🇴 𝑩𝒐𝒍𝒊𝒗𝒊𝒂",
      "593": "🇪🇨 𝑬𝒄𝒖𝒂𝒅𝒐𝒓",
      "595": "🇵🇾 𝑷𝒂𝒓𝒂𝒈𝒖𝒂𝒚",
      "598": "🇺🇾 𝑼𝒓𝒖𝒈𝒖𝒂𝒚",
      "502": "🇬🇹 𝑮𝒖𝒂𝒕𝒆𝒎𝒂𝒍𝒂",
      "503": "🇸🇻 𝑬𝒍 𝑺𝒂𝒍𝒗𝒂𝒅𝒐𝒓",
      "504": "🇭🇳 𝑯𝒐𝒏𝒅𝒖𝒓𝒂𝒔",
      "505": "🇳🇮 𝑵𝒊𝒄𝒂𝒓𝒂𝒈𝒖𝒂",
      "506": "🇨🇷 𝑪𝒐𝒔𝒕𝒂 𝑹𝒊𝒄𝒂",
      "507": "🇵🇦 𝑷𝒂𝒏𝒂𝒎á",
      "51": "🇵🇪 𝑷𝒆𝒓𝒖",
      "53": "🇨🇺 𝑪𝒖𝒃𝒂",
      "91": "🇮🇳 𝑰𝒏𝒅𝒊𝒂"
    };
    for (let i = 1; i <= 3; i++) {
      const prefijo = numero.slice(0, i);
      if (paisesPorPrefijo[prefijo]) return paisesPorPrefijo[prefijo];
    }
    return "🌎 Desconocido";
  };

  const numeroUsuario = m.messageStubParameters?.[0]?.split('@')[0];
  if (!numeroUsuario) return;
  const pais = getPais(numeroUsuario);

  const thumbRes = await fetch("https://files.catbox.moe/jkw74m.jpg");
  const thumbBuffer = await thumbRes.buffer();
  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      locationMessage: {
        name: `(☆ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 𝚄𝙻𝚃𝚁𝙰 ☆) ⭐`,
        jpegThumbnail: thumbBuffer
      }
    },
    participant: "0@s.whatsapp.net"
  };

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
    .catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  let img = await (await fetch(pp)).buffer()
  let chat = global.db.data.chats[m.chat]

  let groupSize = participants.length
  if (m.messageStubType == 27) groupSize++;
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--;

  let fechaObj = new Date()
  let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
  let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
  let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

  let txt = `▧  🍎 𓆩̟֟፝݊͜𝐁݊𝐈͜𝐄𝐍𝐕֟፝⃞𝐄𝐍𝐈𝐃𝐎̟֟፝݊𓆪 🍏 ▧`
  let txt1 = `▧ 🍎 𓆩̟֟፝݊݊͜𝐀͜𝐃֟፝⃞𝐈𝐎𝐒̟֟፝݊𓆪 🍏 ▧`
  let redes = `https://instagram.com`
  let club = `☆ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 𝙾𝙵𝙸𝙲𝙸𝙰𝙻 ☆`

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `*╔═══════════════*
*╟* ⿻ 𝗪 𝗘 𝗟 𝗖 𝗢 𝗠 𝗘 ✰
*╠═══════════════*
*╟* ${groupMetadata.subject}
*╟* ≡‹⧽🌂 \`ᴜsᴇʀ:\` *@${m.messageStubParameters[0].split`@`[0]}*
*╟* ≡‹⧽⚽ \`ғᴇᴄʜᴀ ɪɴɢʀᴇsᴏ:\` *${dia}, ${fecha}*
*╟* ≡‹⧽📡 \`ʜᴏʀᴀ ɪɴɢʀᴇsᴏ:\` *${hora}*
*╟* ≡‹⧽⚡ \`ᴘᴀɪs:\` ${pais}
*╟* ≡‹⧽🌷 \`ᴍɪᴇᴍʙʀᴏs ᴀᴄᴛᴜᴀʟᴇs:\` *${groupSize}*
*╚═══════════════*

🍂 *Descripción:*
${groupMetadata.desc?.slice(0, 200) || "Sin descripción."}`    

    await conn.sendMessage(
      m.chat,
      {
        image: img,
        caption: bienvenida,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363401008003732@newsletter',
            serverMessageId: 99999,
            newsletterName: '[☆𝆺𝅥 𝆭 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 ~ 𝙲𝙷𝙰𝙽𝙽𝙴𝙻 𝙾𝙵𝙵𝙸𝙲𝙸𝙰𝙻 𝆺𝅥 𝆭★]'
          },
          externalAdReply: {
            title: txt,
            body: club,
            thumbnailUrl: 'https://files.catbox.moe/h4lrn3.jpg',
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: fkontak }
    )
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `*╔═══════════════*
*╟* ⿻ 𝗔 𝗗 𝗜 𝗢 𝗦 ✰
*╠═══════════════*
*╟* 🧪 ${groupMetadata.subject}
*╟* ≡‹⧽👋 \`ᴜsᴇʀ:\` *@${m.messageStubParameters[0].split`@`[0]}*
*╟* ≡‹⧽📅 \`ғᴇᴄʜᴀ sᴀʟɪᴅᴀ:\` *${dia}, ${fecha}*
*╟* ≡‹⧽⏰ \`ʜᴏʀᴀ sᴀʟɪᴅᴀ:\` *${hora}*
*╟* ≡‹⧽⚡ \`ᴘᴀɪs:\` ${pais}
*╟* ≡‹⧽👥 \`ᴍɪᴇᴍʙʀᴏs:\` *${groupSize}*
*╚═══════════════*

> 💔 Te esperamos pronto de regreso.
> 🍂 Usa *#help* para ver comandos.`

    await conn.sendMessage(
      m.chat,
      {
        image: img,
        caption: bye,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363401008003732@newsletter',
            serverMessageId: 99999,
            newsletterName: '[☆𝆺𝅥 𝆭  𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 ~ 𝙲𝙷𝙰𝙽𝙽𝙴𝙻 𝙾𝙵𝙵𝙸𝙲𝙸𝙰𝙻 𝆺𝅥 𝆭 ★]'
          },
          externalAdReply: {
            title: txt1,
            body: club,
            thumbnailUrl: 'https://files.catbox.moe/h4lrn3.jpg',
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      },
      { quoted: fkontak }
    )
  }
}