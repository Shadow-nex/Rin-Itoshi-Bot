import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)


  if (user.registered) {
   const texto = `✦₊˚ 🎀 𓂃 ₊˚⊹♡ ₊˚ 🎀 ✦
꒰🍓⚠️ 𝒂𝒗𝒊𝒔𝒐 ⚠️🍓꒱  
┈┈┈┈┈┈┈┈┈┈

(｡>﹏<｡) 💦  
*Ya cuentas con un registro activo...*  

🌸 ¿𝒒𝒖𝒊𝒆𝒓𝒆𝒔 𝒓𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒓𝒕𝒆 𝒏𝒖𝒆𝒗𝒂𝒎𝒆𝒏𝒕𝒆?  

💌 Usa *#unreg* para borrar tu registro y comenzar otra vez.  

┈┈┈┈┈┈┈┈┈┈  
૮₍´｡• ᵕ •｡\`₎ა 🌷 𝒕𝒆 𝒆𝒔𝒑𝒆𝒓𝒂𝒓𝒆𝒎𝒐𝒔 ~  
✦₊˚ 🎀 𓂃 ₊˚⊹♡ ₊˚ 🎀 ✦`;

    const botones = [
      { buttonId: `${usedPrefix}ping`, buttonText: { displayText: '🔥 Velocidad' }, type: 1 },
      { buttonId: `${usedPrefix}unreg`, buttonText: { displayText: '🍁 Eliminar Registro' }, type: 1 },
    ];

    return await conn.sendMessage(m.chat, {
      image: { url: 'https://tinyurl.com/24a3c343' },
      caption: texto,
      mentions: [m.sender],
      footer: club,
      buttons: botones,
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        }
      }
    }, { quoted: m });
 }
  
   if (!Reg.test(text)) {
     const mensaje = `｡☆✼★━━━━━━━━━━━━★✼☆｡  
❀ ₊˚⊹ ᴏᴏᴘꜱ~ ᴄᴏᴍᴀɴᴅᴏ ɪɴᴄᴏʀʀᴇᴄᴛᴏ (｡•́︿•̀｡)  
┈┈┈┈┈┈┈┈┈┈  
↳ 𝑼́𝒔𝒂𝒍𝒐 𝒂𝒔𝒊́:  
   ${usedPrefix + command} nombre.edad  

🐰 𝑬𝒋𝒆𝒎𝒑𝒍𝒐:  
> ${usedPrefix + command} ${name2}.18  
┈┈┈┈┈┈┈┈┈┈  
🌸 𝒏𝒐 𝒕𝒓𝒊𝒔𝒕𝒆~ 𝒗𝒖𝒆𝒍𝒗𝒆 𝒂 𝒊𝒏𝒕𝒆𝒏𝒕𝒂𝒓 ꒰ᐢ. .ᐢ꒱
｡☆✼★━━━━━━━━━━━━★✼☆｡`;

     const botones = [
       { buttonId: `${usedPrefix}reg ${name2}.18`, buttonText: { displayText: '🖍️ Auto Verificación' }, type: 1 },
       { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '🎲 Menu All' }, type: 1 },
     ];

    return await conn.sendMessage(m.chat, {
      image: { url: 'https://tinyurl.com/24a3c343' },
      caption: mensaje,
      mentions: [m.sender],
      footer: club,
      buttons: botones,
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        }
      }
    }, { quoted: m });
  }

  let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    
  let fechaObj = new Date();
  let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
  let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`✦₊˚ 🎀꒰ 🍓 ꒱🎀 ₊˚✦\n(｡>﹏<｡)💦 *El nombre no puede estar vacío*`)
  if (!age) return m.reply(`✦₊˚ 🎀꒰ 🍓 ꒱🎀 ₊˚✦\n(≧﹏≦) *La edad no puede estar vacía*`)
  if (name.length >= 100) return m.reply(`✦₊˚ 🎀꒰ 🍓 ꒱🎀 ₊˚✦\n(๑•﹏•) *El nombre es demasiado largo...*`)
  age = parseInt(age)
  if (age > 1000) return m.reply(`✦₊˚ 🎀꒰ 🍓 ꒱🎀 ₊˚✦\n(´｡• ᵕ •｡\`) 💮 *Wow~ el abuelito quiere jugar al bot*`)
  if (age < 5) return m.reply(`✦₊˚ 🎀꒰ 🍓 ꒱🎀 ₊˚✦\n(｡•́︿•̀｡) *Awww~ un abuelito bebé jsjs* 🍼💕`)

  user.name = `${name} ✓`
  user.age = age
  user.regTime = + new Date      
  user.registered = true
  user.coin = (user.coin || 0) + 40
  user.exp = (user.exp || 0) + 300
  user.joincount = (user.joincount || 0) + 20

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `✿⊹⊱⋆彡 Registro Finalizado 彡⋆⊰⊹✿

╭━━━ ˚₊· ͟͟͞͞➳❥
🍓 Nombre: ${name}
🐰 Edad: ${age} añitos ฅ^•ﻌ•^ฅ
📖 Fecha: ${fecha}
⌛ Hora: ${hora}
🌙 Día: ${dia}
╰━━━ ˚₊· ͟͟͞͞➳❥

ﾟ｡⋆｡🎀｡⋆｡ﾟ⋆｡🎀｡⋆｡ﾟ
💌 〔 𝑹𝑬𝑪𝑶𝑴𝑷𝑬𝑵𝑺𝑨𝑺 〕 💌
✧ 💰 +40 → ${moneda}
✧ 🔮 +300 → exp
✧ 💎 +20 → tokens
ﾟ｡⋆｡🎀｡⋆｡ﾟ⋆｡🎀｡⋆｡ﾟ

(づ๑•ᴗ•๑)づ♡ ¡Yay ${name}!
Fuiste registrado con mucha ternura kawaii ✨🍓`.trim();

  await m.react?.('📩')

  await conn.sendMessage(
    m.chat,
    {
      image: { url: pp },
      caption: regbot,
      contextInfo: {
      mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '❁︩︪•°ֺ໋۪݊🌱 ʀᴇɢɪsᴛʀᴏ - ʀɪɴ ɪᴛᴏsʜɪ ᴜʟᴛʀᴀ ⚡°໋•︪︩❁',
          body: '꒰🍃꒱ ᴛᴜ ᴄᴜᴇɴᴛᴀ ʜᴀ ꜱɪᴅᴏ ᴀᴄᴛɪᴠᴀᴅᴀ ᴄᴏɴ ᴇxɪᴛᴏ `☯︎ ʙʏ: 𝑺𝒉𝒂𝑫𝒐𝒘•𝑪𝒐𝒓𝒆',
          mediaType: 1,
          thumbnailUrl: 'https://tinyurl.com/2c4kbyk3',
          mediaUrl: redes,
          sourceUrl: redes,
          renderLargerThumbnail: true
        }
      }
    },
    { quoted: m });
  };

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler