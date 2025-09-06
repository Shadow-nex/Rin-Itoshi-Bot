import axios from 'axios'
import moment from 'moment-timezone'
import fs from 'fs'

let handler = async (m, { conn, args }) => {
  try {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let userData = global.db.data.users[userId] || {}
    let exp = userData.exp || 0
    let coin = userData.coin || 0
    let level = userData.level || 0
    let role = userData.role || 'Sin Rango'
    let name = await conn.getName(userId)

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.keys(global.plugins).length

    let videos = [
        'https://files.catbox.moe/vwlhum.mp4',
        'https://files.catbox.moe/tc1zxx.mp4',
        'https://files.catbox.moe/o3ggg8.mp4',
        'https://files.catbox.moe/uzi4do.mp4'
    ]
    let video = videos[Math.floor(Math.random() * videos.length)]

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
              jpegThumbnail: fs.readFileSync("https://h.uguu.se/pBkksjpQ.jpg")
            },
            title: "⚡ PRUEBA | RIN ITOSHI ⚡",
            description: "Funciones y comandos disponibles",
            currencyCode: "USD",
            priceAmount1000: 5000,
            retailerId: "menu-funciones",
            productImageCount: 1
          },
          businessOwnerJid: "13135550202@s.whatsapp.net"
        }
      }
    }
 
    await conn.sendMessage(m.chat, {
      text: '╭─〔 🍂 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎... 🌷 〕─⬣\n┃ 🌱 *𝒄𝒐𝒏𝒆𝒄𝒕𝒂𝒏𝒅𝒐 𝒂 𝒍𝒂 𝒃𝒂𝒔𝒆 𝒅𝒆 𝒅𝒂𝒕𝒐𝒔...*\n┃ 📡 *sɪɴᴄʀᴏɴɪᴢᴀɴᴅᴏ ᴍᴇɴᴜ...*\n╰─ ─ ─ ─ ─ ─ ─ ─ ─ ╴ ╴ ╴ ╴',
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '🍄 Rɪɴ Iᴛᴏsʜɪ ᴍᴅ 🌹 | 🪾 ʙʏ ᴅᴠ.sʜᴀᴅᴏᴡ 🪴',
          body: club,
          thumbnailUrl: 'https://files.catbox.moe/q8b2br.jpg',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m })

    await new Promise(resolve => setTimeout(resolve, 2000))

    let fechaObj = new Date()
    let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
    let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
    let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })


    let readMore = String.fromCharCode(8206).repeat(4001)
    let menuText = `
🌷｡･:*˚:✧｡  Rɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ ｡✧:˚*:･｡🌱
⊱ ────── {.⋅ ✯ ⋅.} ────── ⊰

☁️ ${ucapan()} @${userId.split('@')[0]} ⚡

  \`[ 𝗜 𝗡 𝗙 𝗢 - 𝗨 𝗦 𝗘 𝗥 ]\`
  ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊
> ✩⚞ ᴜsᴇʀ: *${name}*
> ✩⚞ ɴɪᴠᴇʟ: *${level}*
> ✩⚞ ᴇxᴘ ᴛᴏᴛᴀʟ: *${exp}*
> ✩⚞ ʀᴀɴɢᴏ: ${role}
> ✩⚞ ᴘʀᴏɢʀᴇsᴏ: [██████████]
──────────────────────
${readMore}
  \`[ 𝗜 𝗡 𝗙 𝗢 - 𝗕 𝗢 𝗧 ]\`
  ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊
> ✧⚞ ⚙️ ᴍᴏᴅᴏ: *ɢʀᴀᴛɪs 🧪*
> ✧⚞ 👑 ᴏᴡɴᴇʀ: *+${suittag}*
> ✧⚞ 🤖 ʙᴏᴛ: ${(conn.user.jid == global.conn.user.jid ? '🌟 `ʙᴏᴛ ᴏғɪᴄɪᴀʟ`' : '✨ `sᴜʙ ʙᴏᴛ`')}
> ✧⚞ 📚 ᴄᴏᴍᴀɴᴅᴏs: *${totalCommands}*
> ✧⚞ 🧑‍🤝‍🧑 ᴛᴏᴛᴀʟ ᴜsᴇʀs: *${totalreg}*
> ✧⚞ ⏱️ ʀᴜɴᴛɪᴍᴇ: *${uptime}*
──────────────────────
${readMore}
   \`[ 𝗜 𝗡 𝗙 𝗢 - 𝗙 𝗘 𝗖 𝗛 𝗔 ]\`
  ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊
> ✧⚞ ⚡ ʜᴏʀᴀ ᴘᴇʀᴜ: *${hora}*
> ✧⚞ 🍩 ғᴇᴄʜᴀ: *${fecha}*
> ✧⚞ ☘️ ᴅɪᴀ: *${dia}*
──────────────────────
${readMore}
  *🔥 \`𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦 𝗗𝗜𝗦𝗣𝗢𝗡𝗜𝗕𝗟𝗘𝗦\` ⚽*
   ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊
${readMore}
*╭─◦─≺⊹𝐈𝐍𝐅𝐎⊹≻─◦─╮*
*│⚡•❭* *.\`afk [alasan]\`*
*│⚡•❭* *.\`menu\`*
*│⚡•❭* *.\`uptime\`*
*│⚡•❭* *.\`script\`*
*│⚡•❭* *.\`staff\`*
*│⚡•❭* *.\`creador\`*
*│⚡•❭* *.\`grupos\`*
*│⚡•❭* *.\`estado\`*
*│⚡•❭* *.\`infobot\`*
*│⚡•❭* *.\`sug\`*
*│⚡•❭* *.\`ping\`*
*│⚡•❭* *.\`reportar <txt>\`*
*│⚡•❭* *.\`reglas\`*
*│⚡•❭* *.\`speed\`*
*│⚡•❭* *.\`sistema\`*
*│⚡•❭* *.\`usuarios\`*
*│⚡•❭* *.\`ds\`*
*│⚡•❭* *.\`funciones\`*
*│⚡•❭* *.\`editautoresponder\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ᴍᴇɴᴜ ʟɪsᴛ⊹≻─◦─╮*
*│⚡•❭* *.\`menulist\`*
*│⚡•❭* *.\`dev - ᴍᴇɴᴜ ᴏᴡɴᴇʀ\`*
*│⚡•❭* *.\`menusticker - ᴍᴇɴᴜ sᴛɪᴄᴋᴇʀs\`*
*│⚡•❭* *.\`menusearch - ᴍᴇɴᴜ sᴇᴀʀᴄʜ\`*
*│⚡•❭* *.\`menudl - ᴍᴇɴᴜ ᴅᴇsᴄᴀʀɢᴀs\`*
*│⚡•❭* *.\`menulogos - ʟᴏɢᴏs\`*
*│⚡•❭* *.\`menunsfw - ᴍᴇɴᴜ 18\`*
*│⚡•❭* *.\`menugp - ᴍᴇɴᴜ ɢʀᴜᴘᴏ\`*
*│⚡•❭* *.\`menu2 - ᴍᴇɴᴜ ᴀᴜᴅɪᴏs\`*
*│⚡•❭* *.\`menurpg - ᴍᴇɴᴜ ʀᴘɢ\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹sᴇᴀʀᴄʜ⊹≻─◦─╮*
*│⚡•❭* *.\`ᴀɴɪᴍᴇɪɴғᴏ\`*
*│⚡•❭* *.\`ᴀɴɪᴍᴇsᴇᴀʀᴄʜ\`*
*│⚡•❭* *.\`ᴄᴜᴇᴠᴀɴᴀ\`*
*│⚡•❭* *.\`ɢɪᴛʜᴜʙsᴇᴀʀᴄʜ\`*
*│⚡•❭* *.\`sᴇᴀʀᴄʜʜᴇɴᴛᴀɪ\`*
*│⚡•❭* *.\`ɢᴏᴏɢʟᴇ <ʙúsǫᴜᴇᴅᴀ>\`*
*│⚡•❭* *.\`ɪᴍᴀɢᴇɴ <ǫᴜᴇʀʏ>\`*
*│⚡•❭* *.\`ɪɴғᴏᴀɴɪᴍᴇ\`*
*│⚡•❭* *.\`ɢɪᴛʜᴜʙsᴛᴀʟᴋ <ǫᴜᴇʀʏ>\`*
*│⚡•❭* *.\`sᴏᴜɴᴅᴄʟᴏᴜᴅsᴇᴀʀᴄʜ <ᴛxᴛ>\`*
*│⚡•❭* *.\`ᴘɪɴᴛᴇʀᴇsᴛ\`*
*│⚡•❭* *.\`ᴘᴏʀɴʜᴜʙsᴇᴀʀᴄʜ\`*
*│⚡•❭* *.\`sᴘᴏᴛɪғʏsᴇᴀʀᴄʜ <ᴛᴇxᴛᴏ>\`*
*│⚡•❭* *.\`ʏᴛsᴇᴀʀᴄʜ2 <ᴛᴇxᴛ>\`*
*│⚡•❭* *.\`ɴᴘᴍᴊs\`*
*│⚡•❭* *.\`ɢɴᴜʟᴀ\`*
*│⚡•❭* *.\`ᴀᴘᴋsᴇᴀʀᴄʜ\`*
*│⚡•❭* *.\`ᴡɪᴋɪs\`*
*│⚡•❭* *.\`ᴛɪᴋᴛᴏᴋsᴇᴀʀᴄʜ <ᴛxᴛ>\`*
*│⚡•❭* *.\`ᴛᴡᴇᴇᴛᴘᴏsᴛs\`*
*│⚡•❭* *.\`xɴxxs\`*
*│⚡•❭* *.\`xᴠsᴇᴀʀᴄʜ\`*
*│⚡•❭* *.\`ʏᴛs\`*
*│⚡•❭* *.\`ғᴅʀᴏɪᴅsᴇᴀʀᴄʜ <ᴛéʀᴍɪɴᴏ>\`*
*│⚡•❭* *.\`ʜᴀᴘᴘʏᴍᴏᴅsᴇᴀʀᴄʜ <ʙúsǫᴜᴇᴅᴀ>\`*
*│⚡•❭* *.\`ᴄɪɴᴇᴄᴀʟɪᴅᴀᴅsᴇᴀʀᴄʜ <ʙúsǫᴜᴇᴅᴀ>\`*
*│⚡•❭* *.\`ʏᴀʜᴏᴏsᴇᴀʀᴄʜ <ʙúsǫᴜᴇᴅᴀ>\`*
*│⚡•❭* *.\`ᴍᴏᴠɪᴇ <ᴛéʀᴍɪɴᴏ>\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺sᴜʙ ʙᴏᴛ⊹≻─◦─╮*
*│⚡•❭* *.\`qr\`*
*│⚡•❭* *.\`code\`*
*│⚡•❭* *.\`token\`*
*│⚡•❭* *.\`sockets\`*
*│⚡•❭* *.\`deletesesion\`*
*│⚡•❭* *.\`pausarai\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹ᴅᴏᴡɴʟᴏᴀᴅ⊹≻─◦─╮*
*│⚡•❭* *.\`fb2\`*
*│⚡•❭* *.\`fdroid <url>\`*
*│⚡•❭* *.\`fb\`*
*│⚡•❭* *.\`sound\`*
*│⚡•❭* *.\`gitclone <url git>\`*
*│⚡•❭* *.\`gdrive\`*
*│⚡•❭* *.\`ig\`*
*│⚡•❭* *.\`mediafire <url>\`*
*│⚡•❭* *.\`mega\`*
*│⚡•❭* *.\`apk <nombre>\`*
*│⚡•❭* *.\`pinvid <link>\`*
*│⚡•❭* *.\`apk2 <busqueda>\`*
*│⚡•❭* *.\`npmdl\`*
*│⚡•❭* *.\`tt2\`*
*│⚡•❭* *.\`kwaidl\`*
*│⚡•❭* *.\`likee <url>\`*
*│⚡•❭* *.\`aplay2 • applemusic2
*│⚡•❭* *.\`capcut <url>\`*
*│⚡•❭* *.\`play\`*
*│⚡•❭* *.\`play2\`*
*│⚡•❭* *.\`ytmp3doc\`*
*│⚡•❭* *.\`ytmp4doc\`*
*│⚡•❭* *.\`iaimg <texto>\`*
*│⚡•❭* *.\`yta\`*
*│⚡•❭* *.\`ytv\`*
*│⚡•❭* *.\`tiktokrandom\`*
*│⚡•❭* *.\`spotify\`*
*│⚡•❭* *.\`tiktokhd\`*
*│⚡•❭* *.\`tiktoktrends\`*
*│⚡•❭* *.\`snapchat <link>\`*
*│⚡•❭* *.\`terabox\`*
*│⚡•❭* *.\`tiktok <url>\`*
*│⚡•❭* *.\`tiktokmp3 <url>\`*
*│⚡•❭* *.\`tiktokimg <url>\`*
*│⚡•❭* *.\`twitter <url>\`*
*│⚡•❭* *.\`xvideosdl\`*
*│⚡•❭* *.\`xnxxdl\`*
*│⚡•❭* *.\`pindl\`*
*│⚡•❭* *.\`apkpure\`*
*│⚡•❭* *.\`apkpuredl\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ ғᴜɴ ⊹≻─◦─╮*
*│⚡•❭* *.\`gay @tag\`* 
*│⚡•❭* *.\`lesbiana @tag\`* 
*│⚡•❭* *.\`pajero @tag\`* 
*│⚡•❭* *.\`pajera @tag\`* 
*│⚡•❭* *.\`puto @tag\`* 
*│⚡•❭* *.\`puta @tag\`* 
*│⚡•❭* *.\`manco @tag\`* 
*│⚡•❭* *.\`manca @tag\`* 
*│⚡•❭* *.\`rata @tag\`*
*│⚡•❭* *.\`prostituta @tag\`*
*│⚡•❭* *.\`amigorandom\`*
*│⚡•❭* *.\`jalamela\`*
*│⚡•❭* *.\`simi\`*
*│⚡•❭* *.\`chiste\`*
*│⚡•❭* *.\`consejo\`*
*│⚡•❭* *.\`doxear <mension>\`*
*│⚡•❭* *.\`facto\`*
*│⚡•❭* *.\`reto\`*
*│⚡•❭* *.\`verdad\`*
*│⚡•❭* *.\`prostituto <@tag\`*>\`*
*│⚡•❭* *.\`formarpareja\`*
*│⚡•❭* *.\`formarpareja5\`*
*│⚡•❭* *.\`huevo @user\`*
*│⚡•❭* *.\`chupalo <mencion>\`*
*│⚡•❭* *.\`aplauso <mencion>\`*
*│⚡•❭* *.\`marron <mencion>\`*
*│⚡•❭* *.\`suicidar\`*
*│⚡•❭* *.\`iqtest <mencion>\`*
*│⚡•❭* *.\`meme\`*
*│⚡•❭* *.\`morse\`*
*│⚡•❭* *.\`nombreninja <texto>\`*
*│⚡•❭* *.\`paja\`*
*│⚡•❭* *.\`personalidad <mencion>\`*
*│⚡•❭* *.\`pregunta\`*
*│⚡•❭* *.\`zodiac 2002 02 25\`*
*│⚡•❭* *.\`ship\`*
*│⚡•❭* *.\`sorte\`*
*│⚡•❭* *.\`top [texto]\`*
*│⚡•❭* *.\`formartrio <mencion>\`*
*│⚡•❭* *.\`tt\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ғʀᴀᴄᴇ⊹≻─◦─╮*
*│⚡•❭* *.\`piropo\`*
*│⚡•❭* *.\`frase\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹ᴊᴜᴇɢᴏs⊹≻─◦─╮*
*│⚡•❭* *.\`ahorcado\`*
*│⚡•❭* *.\`delxo\`*
*│⚡•❭* *.\`genio <pregunta>\`*
*│⚡•❭* *.\`math <mode>\`*
*│⚡•❭* *.\`ppt texto\`*
*│⚡•❭* *.\`pvp\`*
*│⚡•❭* *.\`sopa\`*
*│⚡•❭* *.\`acertijo\`*
*│⚡•❭* *.\`ttt texto\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ᴀɴɪᴍᴇ⊹≻─◦─╮*
*│⚡•❭* *.\`angry/enojado @tag\`*
*│⚡•❭* *.\`bath/bañarse @tag\`*
*│⚡•❭* *.\`bite/morder @tag\`*
*│⚡•❭* *.\`bleh/lengua @tag\`*
*│⚡•❭* *.\`blush/sonrojarse @tag\`*
*│⚡•❭* *.\`bored/aburrido @tag\`*
*│⚡•❭* *.\`nights/noches\`*
*│⚡•❭* *.\`dias/days\`*
*│⚡•❭* *.\`coffe/cafe @tag\`*
*│⚡•❭* *.\`cry/llorar @tag\`*
*│⚡•❭* *.\`cuddle/acurrucarse @tag\`*
*│⚡•❭* *.\`dance/bailar @tag\`*
*│⚡•❭* *.\`drunk/borracho @tag\`*
*│⚡•❭* *.\`eat/comer @tag\`*
*│⚡•❭* *.\`messi\`*
*│⚡•❭* *.\`cr7\`*
*│⚡•❭* *.\`facepalm/palmada @tag\`*
*│⚡•❭* *.\`happy/feliz @tag\`*
*│⚡•❭* *.\`hello/hola @tag\`*
*│⚡•❭* *.\`hug/abrazar @tag\`*
*│⚡•❭* *.\`kill/matar @tag\`*
*│⚡•❭* *.\`kiss2/besar2 @tag\`*
*│⚡•❭* *.\`kiss/besar @tag\`*
*│⚡•❭* *.\`laugh/reirse @tag\`*
*│⚡•❭* *.\`lick/lamer @tag\`*
*│⚡•❭* *.\`love2/enamorada @tag\`*
*│⚡•❭* *.\`patt/acariciar @tag\`*
*│⚡•❭* *.\`poke/picar @tag\`*
*│⚡•❭* *.\`pout/pucheros @tag\`*
*│⚡•❭* *.\`ppcouple\`*
*│⚡•❭* *.\`preg/embarazar @tag\`*
*│⚡•❭* *.\`punch/golpear @tag\`*
*│⚡•❭* *.\`run/correr @tag\`*
*│⚡•❭* *.\`sad/triste @tag\`*
*│⚡•❭* *.\`scared/asustada @tag\`*
*│⚡•❭* *.\`seduce/seducir @tag\`*
*│⚡•❭* *.\`shy/timida @tag\`*
*│⚡•❭* *.\`slap/bofetada @tag\`*
*│⚡•❭* *.\`sleep/dormir @tag\`*
*│⚡•❭* *.\`smoke/fumar @tag\`*
*│⚡•❭* *.\`think/pensando @tag\`*
*│⚡•❭* *.\`undress/encuerar @tag\`*
*│⚡•❭* *.\`waifu\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹ᴘᴇʀғɪʟ⊹≻─◦─╮*
*│⚡•❭* *.\`reg\`*
*│⚡•❭* *.\`unreg\`*
*│⚡•❭* *.\`profile\`*
*│⚡•❭* *.\`perfildates\`*
*│⚡•❭* *.\`marry [mension / etiquetar]\`*
*│⚡•❭* *.\`divorce\`*
*│⚡•❭* *.\`setgenre <text>\`*
*│⚡•❭* *.\`delgenre\`*
*│⚡•❭* *.\`setbirth <text>\`*
*│⚡•❭* *.\`delbirth\`*
*│⚡•❭* *.\`setdesc <text>\`*
*│⚡•❭* *.\`deldesc\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ʟᴏɢᴏs⊹≻─◦─╮*
*│⚡•❭* *.\`glitchtext\`*
*│⚡•❭* *.\`narutotext\`*
*│⚡•❭* *.\`dragonball\`*
*│⚡•❭* *.\`neonlight\`*
*│⚡•❭* *.\`pubglogo\`*
*│⚡•❭* *.\`harrypotter\`*
*│⚡•❭* *.\`marvel\`*
*│⚡•❭* *.\`pixelglitch\`*
*│⚡•❭* *.\`amongustext\`*
*│⚡•❭* *.\`writetext\`*
*│⚡•❭* *.\`advancedglow\`*
*│⚡•❭* *.\`typographytext\`*
*│⚡•❭* *.\`neonglitch\`*
*│⚡•❭* *.\`flagtext\`*
*│⚡•❭* *.\`flag3dtext\`*
*│⚡•❭* *.\`deletingtext\`*
*│⚡•❭* *.\`blackpinkstyle\`*
*│⚡•❭* *.\`glowingtext\`*
*│⚡•❭* *.\`underwatertext\`*
*│⚡•❭* *.\`logomaker\`*
*│⚡•❭* *.\`cartoonstyle\`*
*│⚡•❭* *.\`papercutstyle\`*
*│⚡•❭* *.\`watercolortext\`*
*│⚡•❭* *.\`effectclouds\`*
*│⚡•❭* *.\`blackpinklogo\`*
*│⚡•❭* *.\`gradienttext\`*
*│⚡•❭* *.\`summerbeach\`*
*│⚡•❭* *.\`luxurygold\`*
*│⚡•❭* *.\`multicoloredneon\`*
*│⚡•❭* *.\`sandsummer\`*
*│⚡•❭* *.\`galaxywallpaper\`*
*│⚡•❭* *.\`style\`*
*│⚡•❭* *.\`makingneon\`*
*│⚡•❭* *.\`royaltext\`*
*│⚡•❭* *.\`freecreate\`*
*│⚡•❭* *.\`galaxystyle\`*
*│⚡•❭* *.\`rainytext\`*
*│⚡•❭* *.\`graffititext\`*
*│⚡•❭* *.\`colorfulltext\`*
*│⚡•❭* *.\`equalizertext\`*
*│⚡•❭* *.\`angeltxt\`*
*│⚡•❭* *.\`starlight\`*
*│⚡•❭* *.\`steel\`*
*│⚡•❭* *.\`neoncity\`*
*│⚡•❭* *.\`cloudsky\`*
*│⚡•❭* *.\`matrix\`*
*│⚡•❭* *.\`minion\`*
*│⚡•❭* *.\`papercut3d\`*
*│⚡•❭* *.\`firetext\`*
*│⚡•❭* *.\`icecold\`*
*│⚡•❭* *.\`rainbowtext\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹sᴛᴀʟᴋ⊹≻─◦─╮*
*│⚡•❭* *.\`tiktokstalk <usuario>\`*
*│⚡•❭* *.\`kwaistalk <usuario>\`*
*│⚡•❭* *.\`telegramstalk <nombre_usuario>\`*
*│⚡•❭* *.\`youtubestalk <nombre de usuario>\`*
*│⚡•❭* *.\`instagramstalk <usuario>\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ᴘʀᴇᴍɪᴜᴍ⊹≻─◦─╮*
*│⚡•❭* *.\`comprarpremium\`*
*│⚡•❭* *.\`premium\`*
*│⚡•❭* *.\`vip\`*
*│⚡•❭* *.\`spamwa <number>|<mesage>|<no of messages>\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹ʀᴘɢ⊹≻─◦─╮*
*│⚡•❭* *.\`aventura\`*
*│⚡•❭* *.\`baltop\`*
*│⚡•❭* *.\`bank / bal\`*
*│⚡•❭* *.\`cazar\`*
*│⚡•❭* *.\`codigo <cantida de coins>\`*
*│⚡•❭* *.\`canjear <código>\`*
*│⚡•❭* *.\`cartera\`*
*│⚡•❭* *.\`apostar <cantidad>\`*
*│⚡•❭* *.\`cf\`*
*│⚡•❭* *.\`cofre\`*
*│⚡•❭* *.\`crimen\`*
*│⚡•❭* *.\`daily\`*
*│⚡•❭* *.\`depositar\`*
*│⚡•❭* *.\`explorar\`*
*│⚡•❭* *.\`gremio\`*
*│⚡•❭* *.\`regalo\`*
*│⚡•❭* *.\`halloween\`*
*│⚡•❭* *.\`heal\`*
*│⚡•❭* *.\`inventario\`*
*│⚡•❭* *.\`mensual\`*
*│⚡•❭* *.\`mazmorra\`*
*│⚡•❭* *.\`minar\`*
*│⚡•❭* *.\`navidad\`*
*│⚡•❭* *.\`retirar\`*
*│⚡•❭* *.\`robar\`*
*│⚡•❭* *.\`robarxp\`*
*│⚡•❭* *.\`ruleta <cantidad> <color>\`*
*│⚡•❭* *.\`buyall\`*
*│⚡•❭* *.\`buy\`*
*│⚡•❭* *.\`protituirse\`*
*│⚡•❭* *.\`work\`*
*│⚡•❭* *.\`pay / transfer\`*
*│⚡•❭* *.\`semanal\`*
*│⚡•❭* *.\`levelup\`*
*│⚡•❭* *.\`lvl @user\`*
*│⚡•❭* *.\`slot <apuesta>\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ ɢᴀᴄʜᴀ ⊹≻─◦─╮*
*│⚡•❭* *.\`rw\`*
*│⚡•❭* *.\`reclamar\`*
*│⚡•❭* *.\`harem\`*
*│⚡•❭* *.\`waifuimage\`*
*│⚡•❭* *.\`charinfo\`*
*│⚡•❭* *.\`topwaifus [pagina]\`*
*│⚡•❭* *.\`regalar <nombre del personaje> @usuario\`*
*│⚡•❭* *.\`vote <personaje>\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹sᴛɪᴄᴋᴇʀs⊹≻─◦─╮*
*│⚡•❭* *.\`sticker <img>\`*
*│⚡•❭* *.\`sticker <url>\`*
*│⚡•❭* *.\`setmeta\`*
*│⚡•❭* *.\`delmeta\`*
*│⚡•❭* *.\`bratvid <texto>\`*
*│⚡•❭* *.\`pfp @user\`*
*│⚡•❭* *.\`qc\`*
*│⚡•❭* *.\`toimg (reply)\`*
*│⚡•❭* *.\`brat\`*
*│⚡•❭* *.\`bratvid <texto>\`*
*│⚡•❭* *.\`emojimix  <emoji+emoji>\`*
*│⚡•❭* *.\`wm <packname>|<author>\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ᴛᴏᴏʟs⊹≻─◦─╮*
*│⚡•❭* *.\`letra <texto>\`*
*│⚡•❭* *.\`fake\`*
*│⚡•❭* *.\`hd\`*
*│⚡•❭* *.\`detectar\`*
*│⚡•❭* *.\`clima <ciudad/país>\`*
*│⚡•❭* *.\`join\`*
*│⚡•❭* *.\`nuevafotochannel\`*
*│⚡•❭* *.\`nosilenciarcanal\`*
*│⚡•❭* *.\`silenciarcanal\`*
*│⚡•❭* *.\`noseguircanal\`*
*│⚡•❭* *.\`seguircanal\`*
*│⚡•❭* *.\`avisoschannel\`*
*│⚡•❭* *.\`resiviravisos\`*
*│⚡•❭* *.\`inspect\`*
*│⚡•❭* *.\`inspeccionar\`*
*│⚡•❭* *.\`eliminarfotochannel\`*
*│⚡•❭* *.\`reactioneschannel\`*
*│⚡•❭* *.\`reaccioneschannel\`*
*│⚡•❭* *.\`nuevonombrecanal\`* 
*│⚡•❭* *.\`nuevadescchannel\`*
*│⚡•❭* *.\`setavatar\`*
*│⚡•❭* *.\`setbanner\`*
*│⚡•❭* *.\`seticono\`*
*│⚡•❭* *.\`setmoneda\`*
*│⚡•❭* *.\`setname nombre1/nombre2\`*
*│⚡•❭* *.\`cal <ecuacion>\`*
*│⚡•❭* *.\`horario\`*
*│⚡•❭* *.\`read\`*
*│⚡•❭* *.\`traducir <idoma>\`*
*│⚡•❭* *.\`say\`*
*│⚡•❭* *.\`whatmusic <audio/video>\`*
*│⚡•❭* *.\`paisinfo\`*
*│⚡•❭* *.\`ssweb\`*
*│⚡•❭* *.\`tamaño <cantidad>\`*
*│⚡•❭* *.\`document <audio/video>\`*
*│⚡•❭* *.\`translate\`*
*│⚡•❭* *.\`up\`*
*│⚡•❭* *.\`enhance\`*
*│⚡•❭* *.\`wikipedia\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹ᴏɴ / ᴏғғ⊹≻─◦─╮*
*│⚡•❭* *.\`welcome\`*
*│⚡•❭* *.\`bienvenida\`*
*│⚡•❭* *.\`antiprivado\`*
*│⚡•❭* *.\`antiprivate\`*
*│⚡•❭* *.\`restrict\`*
*│⚡•❭* *.\`restringir\`*
*│⚡•❭* *.\`antibot\`*
*│⚡•❭* *.\`antibots\`*
*│⚡•❭* *.\`autoaceptar\`*
*│⚡•❭* *.\`aceptarauto\`*
*│⚡•❭* *.\`autorechazar\`*
*│⚡•❭* *.\`rechazarauto\`*
*│⚡•❭* *.\`autoresponder\`*
*│⚡•❭* *.\`autorespond\`*
*│⚡•❭* *.\`antisubbots\`*
*│⚡•❭* *.\`antibot2\`*
*│⚡•❭* *.\`modoadmin\`*
*│⚡•❭* *.\`soloadmin\`*
*│⚡•❭* *.\`reaction\`*
*│⚡•❭* *.\`reaccion\`*
*│⚡•❭* *.\`nsfw\`*
*│⚡•❭* *.\`modohorny\`*
*│⚡•❭* *.\`antispam\`*
*│⚡•❭* *.\`jadibotmd\`*
*│⚡•❭* *.\`modejadibot\`*
*│⚡•❭* *.\`subbots\`*
*│⚡•❭* *.\`detect\`*
*│⚡•❭* *.\`avisos\`*
*│⚡•❭* *.\`antilink\`*
*│⚡•❭* *.\`audios\`*
*│⚡•❭* *.\`antiver\`*
*│⚡•❭* *.\`antiocultar\`*
*│⚡•❭* *.\`antilink2\`*
*│⚡•❭* *.\`antiarabe\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ɢʀᴜᴘᴏs⊹≻─◦─╮*
*│⚡•❭* *.\`admins\`*
*│⚡•❭* *.\`agregar\`*
*│⚡•❭* *.\`advertencia <@user>\`*
*│⚡•❭* *.\`delwarn\`*
*│⚡•❭* *.\`grupo abrir / cerrar\`*
*│⚡•❭* *.\`group open / close\`*
*│⚡•❭* *.\`delete\`*
*│⚡•❭* *.\`demote <@user>\`*
*│⚡•❭* *.\`promote <@user>\`*
*│⚡•❭* *.\`encuesta <text|text2>\`*
*│⚡•❭* *.\`kickfantasmas\`*
*│⚡•❭* *.\`gpbanner\`*
*│⚡•❭* *.\`gpdesc\`*
*│⚡•❭* *.\`gpname\`*
*│⚡•❭* *.\`hidetag\`*
*│⚡•❭* *.\`infogrupo\`*
*│⚡•❭* *.\`kickall\`*
*│⚡•❭* *.\`kick <@user>\`*
*│⚡•❭* *.\`kicknum\`*
*│⚡•❭* *.\`listonline\`*
*│⚡•❭* *.\`link\`*
*│⚡•❭* *.\`listadv\`*
*│⚡•❭* *.\`mute\`*
*│⚡•❭* *.\`unmute\`*
*│⚡•❭* *.\`config\`*
*│⚡•❭* *.\`restablecer\`*
*│⚡•❭* *.\`setbye\`*
*│⚡•❭* *.\`setwelcome\`*
*│⚡•❭* *.\`testwelcome\`*
*│⚡•❭* *.\`setemoji <emoji>\`*
*│⚡•❭* *.\`invocar <mensaje opcional>\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹ ɴsғᴡ ⊹≻─◦─╮*
*│⚡•❭* *.\`sixnine/69 @tag\`*
*│⚡•❭* *.\`anal/culiar @tag\`*
*│⚡•❭* *.\`blowjob/mamada @tag\`*
*│⚡•❭* *.\`boobjob/rusa @tag\`*
*│⚡•❭* *.\`cum/leche @tag\`*
*│⚡•❭* *.\`fap/paja @tag\`*
*│⚡•❭* *.\`follar @tag\`*
*│⚡•❭* *.\`fuck/coger @tag\`*
*│⚡•❭* *.\`footjob/pies @tag\`*
*│⚡•❭* *.\`fuck2/coger2 @tag\`*
*│⚡•❭* *.\`grabboobs/agarrartetas @tag\`*
*│⚡•❭* *.\`grop/manosear @tag\`*
*│⚡•❭* *.\`penetrar @user\`*
*│⚡•❭* *.\`lickpussy/coño @tag\`*
*│⚡•❭* *.\`r34 <tag>\`*
*│⚡•❭* *.\`sexo/sex @tag\`*
*│⚡•❭* *.\`spank/nalgada @tag\`*
*│⚡•❭* *.\`suckboobs/chupartetas @tag\`*
*│⚡•❭* *.\`violar/perra @tag\`*
*│⚡•❭* *.\`lesbianas/tijeras @tag\`*
*│⚡•❭* *.\`pack\`*
*│⚡•❭* *.\`tetas\`*
*│⚡•❭* *.\`undress/encuerar\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ᴏᴡɴᴇʀ⊹≻─◦─╮*
*│⚡•❭* *.\`addcoins <@user>\`*
*│⚡•❭* *.\`addowner / delowner\`*
*│⚡•❭* *.\`addprem [@user] <days>\`*
*│⚡•❭* *.\`añadirxp\`*
*│⚡•❭* *.\`copia\`*
*│⚡•❭* *.\`autoadmin\`*
*│⚡•❭* *.\`banuser @tag\`* <razón>\`*
*│⚡•❭* *.\`banlist\`*
*│⚡•❭* *.\`bcgc\`*
*│⚡•❭* *.\`block / unblock\`*
*│⚡•❭* *.\`blocklist\`*
*│⚡•❭* *.\`chetar @user / <número>\`*
*│⚡•❭* *.\`cleartmp\`*
*│⚡•❭* *.\`creargc\`*
*│⚡•❭* *.\`deletefile\`*
*│⚡•❭* *.\`delprem <@user>\`*
*│⚡•❭* *.\`deschetar @user / <número>\`*
*│⚡•❭* *.\`dsowner\`*
*│⚡•❭* =>
*│⚡•❭* >
*│⚡•❭* *.\`fetch\`*
*│⚡•❭* *.\`getplugin\`*
*│⚡•❭* *.\`grouplist\`*
*│⚡•❭* *.\`salir\`*
*│⚡•❭* *.\`let\`*
*│⚡•❭* *.\`setppbot\`* 
*│⚡•❭* *.\`prefix [prefix]\`*
*│⚡•❭* *.\`quitarcoin <@user> / all\`*
*│⚡•❭* *.\`quitarxp <@user>\`*
*│⚡•❭* *.\`resetprefix\`*
*│⚡•❭* *.\`restablecerdatos\`*
*│⚡•❭* *.\`restart / reiniciar\`*
*│⚡•❭* *.\`reunion\`*
*│⚡•❭* *.\`savefile <ruta/nombre>\`*
*│⚡•❭* *.\`saveplugin\`*
*│⚡•❭* *.\`setcmd <texto>\`*
*│⚡•❭* *.\`delcmd\`*
*│⚡•❭* *.\`listcmd\`*
*│⚡•❭* *.\`setimage\`*
*│⚡•❭* *.\`setstatus <teks>\`*
*│⚡•❭* *.\`spam2\`*
*│⚡•❭* *.\`unbanuser <@tag\`*>\`*
*│⚡•❭* *.\`ip <alamat ip>\`*
*│⚡•❭* *.\`update / fix\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*

*╭─◦─≺⊹ɪɴᴛᴇʟɪɢᴇɴᴄɪᴀs⊹≻─◦─╮*
*│⚡•❭* *.\`dalle\`*
*│⚡•❭* *.\`demo <texto>\`*
*│⚡•❭* *.\`flux <texto>\`*
*│⚡•❭* *.\`gemini\`*
*│⚡•❭* *.\`ia\`*
*│⚡•❭* *.\`llama\`*
*╰─• ••´º´•» ✤ «•´º´•• •─╯*

*╭─◦─≺⊹ᴄᴏɴᴠᴇʀᴛs⊹≻─◦─╮*
*│⚡•❭* *.\`tourl <imagen>\`*
*│⚡•❭* *.\`catbox\`*
*│⚡•❭* *.\`tourl3\`*
*│⚡•❭* *.\`togifaud\`*
*│⚡•❭* *.\`tomp3\`*
*│⚡•❭* *.\`tovideo\`*
*│⚡•❭* *.\`tts <lang> <teks>\`*
*│⚡•❭* *.\`tts2\`*
*╰┄𔓕‌─‌─‌⋘🝖⋙─‌─‌𓋜‌┄╯*


.•° ✿ °•..•° ✿ °•..•° ✿ °•..•° ✿ °•..•° ✿ °•..•° ✿ °•..•° ✿ °•.
   🚀 *𝗖𝗥𝗘𝗔 𝗨𝗡 𝗦𝗨𝗕𝗕𝗢𝗧 𝗘𝗡 𝗦𝗘𝗚𝗨𝗡𝗗𝗢𝗦*
> 🌷 ➊ *#qr* – Escanea un 𝖢𝗈𝖽𝗂𝗀𝗈 𝗤𝗥  
> 🔐 ➋ *#code* – Usa un 𝖢𝗈𝖽𝗂𝗀𝗈 de 8 dígitos
°•. ✿ .•°°•. ✿ .•°°•. ✿ .•°°•. ✿ .•°°•. ✿ .•°°•. ✿ .•°°•. ✿ .•°`.trim()
    await m.react('🌱')
    await conn.sendMessage(m.chat, {
      video: { url: video },
      gifPlayback: true,
      caption: menuText,
      footer: club,
      buttons: [
        { buttonId: `.code`, buttonText: { displayText: "🌱 s ᴇ ʀ ʙ ᴏ ᴛ" }, type: 1 },
        { buttonId: `.owner`, buttonText: { displayText: "🍂 ᴏ ᴡ ɴ ᴇ ʀ" }, type: 1 }
      ],
      headerType: 4,
      contextInfo: {      
      jpegThumbnail: icono,
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: packname,
          body: dev,
          thumbnailUrl: 'https://files.catbox.moe/us0m4f.jpg',
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: shadow_xyz })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender]
    }, { quoted: m })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto']
handler.register = true
export default handler

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}ʜ ${minutes}ᴍ ${seconds}s`
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH')
  let res = "🌷 ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙"
  if (time >= 5 && time < 12) res = "🍂 ʙᴜᴇɴᴏs ᴅɪᴀs ☀️"
  else if (time >= 12 && time < 18) res = "🌱 ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs 🌤️"
  else if (time >= 18) res = "🐥 ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙"
  return res
}