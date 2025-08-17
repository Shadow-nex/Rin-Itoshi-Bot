import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('hh:mm:ss A')
    let dia = moment.tz('America/Lima').locale('es').format('dddd')
    let comandos = Object.keys(global.plugins).length

    let club = '⚡ *Powered by* » Sʜᴀᴅᴏᴡ•Core 𝖢𝗅𝗎𝖻 ⚡'
    let menu = `
╭━━━〔 *🔎 𝑴𝑬𝑵𝑼 𝑺𝑬𝑨𝑹𝑪𝑯* 〕━━⬣
┃ ⏰ 𝗛𝗼𝗿𝗮: *${hora}*
┃ 📅 𝗙𝗲𝗰𝗵𝗮: *${fecha}*
┃ 📆 𝗗𝗶́𝗮: *${dia}*
┃ 👑 𝗖𝗿𝗲𝗮𝗱𝗼𝗿: *${creador}*
┃ ⚙️ 𝗣𝗿𝗲𝗳𝗶𝗷𝗼: *${usedPrefix}*
┃ 📂 𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀: *${comandos}*
╰━━━〔 *${bot}* 〕━━⬣

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

📢 *Canal Oficial:*  
🔗 ${channel}  
「 ⚽𐚁 ֹ ִ Rin Itoshi - Official ୧ ֹ ִ⚽ 」
    `.trim()

    await conn.sendMessage(m.chat, {
      image: { url: logo },
      caption: menu,
      footer: club,
      buttons: [
        { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 Creador" }, type: 1 },
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "📜 Menú Completo" }, type: 1 }
      ],
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: '📥 Rin Itoshi - Menú Search',
          body: '✨ Explora todas las búsquedas disponibles',
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