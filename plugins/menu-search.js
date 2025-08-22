import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('hh:mm:ss A')
    let dia = moment.tz('America/Lima').locale('es').format('dddd')
    let comandos = Object.keys(global.plugins).length
    let readMore = String.fromCharCode(8206).repeat(4001)
    let uptime = clockString(process.uptime() * 1000);
    let totalreg = Object.keys(global.db.data.users).length

    let menu = `
╭━━━〔 *🔎 𝑴𝑬𝑵𝑼 𝑺𝑬𝑨𝑹𝑪𝑯* 〕━━⬣
┃ ⏰ 𝗛𝗼𝗿𝗮: *${hora}*
┃ 📅 𝗙𝗲𝗰𝗵𝗮: *${fecha}*
┃ 📆 𝗗𝗶́𝗮: *${dia}*
┃ 👑 𝗖𝗿𝗲𝗮𝗱𝗼𝗿: *${creador}*
┃ ⚙️ 𝗣𝗿𝗲𝗳𝗶𝗷𝗼: *${usedPrefix}*
┃ 📂 𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀: *${comandos}*
┃ 🌱 𝗥𝘂𝗻𝘁𝗶𝗺𝗲: *${uptime}*
┃ 🚀 𝘂𝘀𝗲𝗿 𝗿𝗲𝗴𝘀: *${totalreg}*
╰━━━〔 *${bot}* 〕━━⬣

${readMore}

╭─⬣「 *📥 Búsquedas Disponibles* 」
│ 🔎 .apksearch *<término>*
│ 🛍️ .playstore *<nombre>*
│ 🔞 .pornhubsearch
│ 🎵 .soundcloudsearch *<texto>*
│ 🎶 .spotifysearch *<texto>*
│ 🎥 .tiktoksearch *<txt>*
│ 🍑 .xnxxsearch *<query>*
│ 📺 .ytsearch2 *<text>*
│ 📲 .fdroidsearch *<término>*
│ 🎬 .movie *<término>*
│ 🌐 .yahoosearch *<búsqueda>*
│ 🎞️ .cinecalidadsearch *<búsqueda>*
│ 🎮 .happymodsearch *<búsqueda>*
│ 🎥 .tksearch *<búsqueda>*
│ ➕ .tkseguir
│ 📌 .pinscroll *<búsqueda>*
│ 📌 .pinseguir
│ 🔙 .pinatras
│ 💻 .bingsearch
│ 📖 .menusearch
│ 🛒 .playstore <query>
╰─────────────⬣

╭─⬣「 *☘️ Stalk* 」
│⚡ .githubstalk *<query>*
│🧪 .instagramstalk *<usuario>*
│🌷 .minestalk *<nombrejugador>*
│💎 .kwaistalk *<usuario>*
│🔋 .telegramstalk *<nombre_usuario>*
│📡 .tiktokstalk *<usuario>*
│💨 .youtubestalk *<nombre de usuario>*
╰─────────────⬣

📢 *Canal Official:*

${channel}

「 ⚽𐚁 ֹ ִ Rin Itoshi - Official ୧ ֹ ִ⚽ 」
    `.trim()

    await conn.sendMessage(m.chat, {
      image: { url: logo },
      caption: menu,
      footer: '⚡ *Powered by* » Sʜᴀᴅᴏᴡ•Core 𝖢𝗅𝗎𝖻 🌱',
      buttons: [
        { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 Creador" }, type: 1 },
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "📜 Menú Completo" }, type: 1 }
      ],
      headerType: 4,
      contextInfo: {
      mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '💨 Rin Itoshi - Menú Search 💎',
          body: '⟡ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐞𝐬𝐩𝐞𝐜𝐢𝐚𝐥𝐞𝐬 𝐩𝐚𝐫𝐚 𝐛𝐮𝐬𝐜𝐚𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐜𝐢𝐨́𝐧, 𝐚𝐮𝐝𝐢𝐨𝐬, 𝐯𝐢𝐝𝐞𝐨𝐬 𝐲 𝐦𝐮𝐜𝐡𝐨 𝐦𝐚́𝐬 𝐞𝐧 𝐥𝐢́𝐧𝐞𝐚 🌍.',
          thumbnailUrl: 'https://files.catbox.moe/us0m4f.jpg',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al mostrar el menú de búsquedas.')
  }
}

handler.help = ['menusearch']
handler.tags = ['menus']
handler.command = ['menusearch', 'menuse']

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}