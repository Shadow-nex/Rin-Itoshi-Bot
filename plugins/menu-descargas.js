import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('hh:mm:ss A')
    let dia = moment.tz('America/Lima').locale('es').format('dddd')
    let comandos = Object.keys(global.plugins).length
    let readMore = String.fromCharCode(8206).repeat(4001)
    
    let channel = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
    let club = '⚡ *Powered by* » Sʜᴀᴅᴏᴡ•Core 𝖢𝗅𝗎𝖻 ⚡'
    let menu = `
╭━━━〔 *📥 𝘔𝘌𝘕𝘜 𝘋𝘌𝘚𝘊𝘈𝘙𝘎𝘈𝘚* 〕━━⬣
┃ ⏱️ 𝐇𝐨𝐫𝐚: *${hora}*
┃ 📅 𝐅𝐞𝐜𝐡𝐚: *${fecha}*
┃ 📆 𝐃𝐢́𝐚: *${dia}*
┃ 🧑‍💻 𝐎𝐰𝐧𝐞𝐫: *${creador}*
┃ ⚙️ 𝐏𝐫𝐞𝐟𝐢𝐣𝐨: *${usedPrefix}*
┃ 📚 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬: *${comandos}*
╰━━━〔 *${bot}* 〕━━⬣

${readMore}

╭─⬣「 *Descargas Disponibles* 」
│🤗 .cuddle  
│🖼️ .imagen *<query>*
│📌 .pinterestdl *<url>*  
│🎵 .tksearch *<búsqueda>*
│➕ .tkseguir  
│🎬 .animedl *<anime-id> <episode-number>* 
│📘 .facebook  
│📘 .fb2 *<enlace>* 
│📦 .apkf  
│📦 .fdroid  
│☁️ .gdrive  
│🐙 .gitclone *<url git>*  
│📸 .instagram  
│📸 .ig  
│📥 .mediafire  
│📥 .mega  
│📦 .apkmod  
│🎮 .npmdl  
│📌 .pinvid *<link>*  
│🎧 .playaudio  
│🎞️ .playvideo  
│🎶 .playlist *<texto>*
│🎶 .ytmp33 *<url>*
│🎞️ .ytmp44 *<url>*
│🎲 .tiktokrandom
│👻 .snapchat
│🎧 .soundcloud *<nombre>* 
│🎼 .spotify  
│🖼️ .tiktokimg *<url>*
│🎶 .tiktokmp3 *<url>*  
│🎲 .tiktok *<link>*  
│🎞️ .tiktokhd <url>  
│🎲 .tiktok2 *<url>*  
│🐦 .twitter *<url>*
│🔞 .xnxxdl  
│🔞 .xvideosdl  
│🎶 .audio z<yt_link>*
│🎞️ .video *<yt_link>*
│🎶 .ytmp3 *<link>*  
│📄 .ytmp3doc  
│📄 .ytadoc  
│🎞️ .ytmp4 *<url>*  
│📄 .ytmp4doc  
│🍏 .applemusic *<url>*  
│🎨 .capcut *<url>*  
│📦 .apk2  
│📦 .apk_download  
│🍏 .applemusic *<link> *
│🎥 .kwai  
│🎶 .music *<canción>* 
│📂 .terabox *<url>*  
│📑 .menudl  
│📑 .descargas  
│📑 .dlmenu  
│🎶 .yta-v2 *<url de YouTube>* 
│🎶 .play8 *<texto>*  
│🎶 .yta *<url o texto>* 
│🎞️ .ytv 
╰─────────────⬣

📢 Canal Official:

${channel}

「 ⚽𐚁 ֹ ִ Rin Itoshi - Official ୧ ֹ ִ⚽ᩚ꤬ᰍ 」
    `.trim()

    await conn.sendMessage(m.chat, {
      image: { url: logo },
      caption: menu,
      footer: club,
      buttons: [
        { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "⚡ Creador" }, type: 1 },
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "☘️ Menu | All" }, type: 1 }
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
          title: '⚡ Rin Itoshi - 🌱 Menu Descargas',
          body: '🎧 ᴅᴇsᴄᴀʀɢᴀ ᴄᴏɴᴛᴇɴɪᴅᴏ ᴅᴇ ʟᴀs ᴘʀɪɴᴄɪᴘᴀʟᴇs ʀᴇᴅᴇs: ʏᴏᴜᴛᴜʙᴇ, ғᴀᴄᴇʙᴏᴏᴋ, sᴘᴏᴛɪғʏ, ɪɢ, ᴇᴛᴄ.',
          thumbnailUrl: 'https://files.catbox.moe/us0m4f.jpg',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al mostrar el menú de descargas.')
  }
}
handler.help = ['menudescargas', 'dlmenu']
handler.tags = ['menus']
handler.command = ['menudescargas', 'dlmenu', 'menudl']
export default handler