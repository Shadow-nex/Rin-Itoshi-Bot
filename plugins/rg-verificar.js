import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  
  
  if (user.registered) {
   const texto = `➤ ⌬ \`ＡＶＩＳＯ\` ⌬
*🚫 Ya estás registrado...*
¿ ǫᴜɪᴇʀᴇs ᴠᴏʟᴠᴇʀ ᴀ ʀᴇɢɪsᴛʀᴀʀᴛᴇ ?
  
⛩️ Usa *#unreg* para borrar tu registro y volver a empezar.`;

   const botones = [
     { buttonId: `${usedPrefix}ping`, buttonText: { displayText: '🌳 Velocidad del Bot' }, type: 1 },
     { buttonId: `${usedPrefix}unreg`, buttonText: { displayText: '🌷 Unreg' }, type: 1 },
   ];

   return await conn.sendMessage(m.chat, {
     image: { url: 'https://files.catbox.moe/r2ixaj.jpg' },
     caption: texto,
     mentions: [m.sender],
     footer: '🌾 Sukuna Ultra MD',
     buttons: botones,
     headerType: 4
   }, { quoted: m });
 }
  
   if (!Reg.test(text)) {
     const mensaje = `*『✦』El comando ingresado es incorrecto, uselo de la siguiente manera:*

*${usedPrefix + command} nombre.edad*

🎄 \`Ejemplo:\`
*${usedPrefix + command} ${name2}.18*`;

     const botones = [
       { buttonId: `${usedPrefix}reg ${name2}.18`, buttonText: { displayText: '🖍️ Auto Verificacion' }, type: 1 },
       { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '🎲 Menu All' }, type: 1 },
     ];

     return await conn.sendMessage(m.chat, {
       image: { url: 'https://files.catbox.moe/r2ixaj.jpg' },
       caption: mensaje,
       mentions: [m.sender],
       footer: '🌾 Sukuna Ultra MD',
       buttons: botones,
       headerType: 4
     }, { quoted: m });
  }

  let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    
  let fechaObj = new Date();
  let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
  let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });


  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`*『✦』El nombre no puede estar vacío.*`)
  if (!age) return m.reply(`*『✦』La edad no puede estar vacía.*`)
  if (name.length >= 100) return m.reply(`*『✦』El nombre es demasiado largo.*`)
  age = parseInt(age)
  if (age > 1000) return m.reply(`*『✦』Wow el abuelo quiere jugar al bot.*`)
  if (age < 5) return m.reply(`*『✦』hay un abuelo bebé jsjsj.*`)
  user.name = name + '✓'.trim()
  user.age = age
  user.regTime = + new Date      
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)
let regbot = `✅ VERIFICACIÓN EXITOSA ✅

🌾 \`NOMBRE\` » \`\`\`${name}\`\`\`
🌀 \`EDAD\` » \`\`\`${age} años\`\`\`

🕸️ \`FECHA\` » \`\`\`${fecha}\`\`\`
🐋 \`HORA\` » \`\`\`${hora}\`\`\`
🌿 \`DIA\` » \`\`\`${dia}\`\`\`

🍹 RECOMPENSAS 🧪
🪙 \`COINS:\` +40
🏮 \`EXP:\` +300
🔰 \`TOKENS:\` +20\n`;

await m.react('📩')
await conn.sendButton(m.chat, regbot, club, pp, [
['👤 𝗢𝗪𝗡𝗘𝗥', '#owner'],
['🌾 𝗣𝗘𝗥𝗙𝗜𝗟', '#perfil'],
['☘️ 𝗠𝗘𝗡𝗨 • 𝗔𝗟𝗟', '#menu']], null, [
['🌐 𝗖𝗔𝗡𝗔𝗟', `https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U`]], fkontak)}

/*  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: regbot,
    footer: club,
    buttons: [
      { buttonId: '#menu', buttonText: { displayText: '🌳 Menu Principal' }, type: 1 },
      { buttonId: '#profile', buttonText: { displayText: '🔥 Perfil' }, type: 1 },
    ],
    headerType: 4,
    contextInfo: {
      externalAdReply: {
        title: 'ּ໋۪֔⛩️⣴ ⵿ּׄ🫧 ⃝̸̶⵿ᩫᰰᮬ 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐕𝐄𝐑𝐈𝐅𝐈𝐂𝐀𝐃𝐎🎄᮫๋໋֢᳝ꨪᰰ⃟ુ᭡̵໋࡙',
        body: ' . ݁ ּ ּ۪ ࣭֔𔓕⃘᜔𑵅᮫ּ߲֧߲۪۪〫֔࠭🌧️ꨩּֽ֪۪۪〫ࣳׄ꩖ּ߲߲֧۪۪߲߲࣪𝐁𝐲: 𓆩𝑺𝒉𝒂֟፝𝑫𝒐𝒘•𝒄𝒐𝒓𝒆𓆪',
        thumbnailUrl: 'https://files.catbox.moe/hwkp81.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: channel,
      }
    }
  }, { quoted: fkontak });
}*/

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler

