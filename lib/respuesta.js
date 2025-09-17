// --- VALORES NECESARIOS PARA LA NUEVA FUNCIONALIDAD ---
const newsletterJid = '120363401008003732@newsletter';
const newsletterName = '⸸ 🌿︎「 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 ✦ 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 」🎋︎ ⸸࣭';
const packname = '⸙͎۪۫ ࣭࿐ ✿ ˚.🍧 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 ⌗ 𝐁𝐨𝐭 ♡⚡ ࿐ ۪۫⸙͎';
const dev = '𓏲⍣⃝🌙꙰꙳ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑺ʜᴀᴅᴏᴡ 𝑪𝒐𝒓𝒆 ꙳⍣⃝ ☻⋆͙̈✫.🪷';


// Array de miniaturas
const iconos = [
      'https://files.catbox.moe/ceotf9.jpg',
      'https://files.catbox.moe/fft2hr.jpg',
      'https://files.catbox.moe/i97oje.jpg',
      'https://files.catbox.moe/js2plu.jpg',
      'https://d.uguu.se/GmSLPtrU.png',
      'https://h.uguu.se/kbNQSQxM.jpg',
      'https://h.uguu.se/wzOFAoph.png',
      'https://h.uguu.se/UGUwjmCs.jpg',
      'https://n.uguu.se/vqJnHBPm.jpg',
      'https://n.uguu.se/DlsupQkP.jpg',
      'https://i.pinimg.com/originals/e0/98/ba/e098bac73c8ae72243f66c7bf712045a.jpg',
];

// Función para obtener una aleatoria
const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

/**
 * Plugin centralizado para manejar todos los mensajes de error de permisos.
 */
const handler = (type, conn, m, comando) => {
  const msg = {
  rowner: `*【${global.comando2}】 es una función exclusiva de los propietarios principales. Tu acceso no está autorizado.*`,
  
  owner: `*【${global.comando2}】 solo puede ser ejecutado por los desarrolladores. No tienes los permisos necesarios.*`,
  
  mods: `*【${global.comando2}】 está reservado para moderadores. Tu perfil no cumple con los requisitos.*`,
  
  premium: `*【${global.comando2}】 es un beneficio exclusivo para usuarios premium. Este privilegio aún no te corresponde.*`,
  
  group: `*【${global.comando2}】 solo está disponible en grupos. Este entorno no es válido.*`,
  
  private: `*【${global.comando2}】 debe utilizarse en un chat privado*`,
  
  admin: `*【${global.comando2}】 requiere permisos de administrador. Acceso denegado.*`,
  
  botAdmin: `*Para ejecutar 【${global.comando2}】, el bot necesita ser administrador. Por favor, actualiza los permisos.*`,
  
  unreg: `🎋 *☆ 𝙽𝙾 𝚃𝙴 𝙴𝙽𝙲𝚄𝙴𝙽𝚃𝚁𝙰𝚂 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝙳𝙾(𝙰) ☆*
 *- 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝚃𝙴 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙰 𝙵𝚄𝙽𝙲𝙸𝙾𝙽.*
 
• 🍏 */ʀᴇɢ <ɴᴏᴍʙʀᴇ.ᴇᴅᴀᴅ>*

> 🌿 \`- 🅄 🅂 🄰 -\`
> _#${global.verifyaleatorio} ${global.user2}.${global.edadaleatoria}_
> ꒰ ─┈ ⫶ 𝐁𝐋𝐔𝐄 𝐋𝐎𝐂𝐊  ፝͜͡⚽`,

  restrict: `🚫 — Esta característica está deshabilitada.`
  }[type];

  if (msg) {
    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      },
      externalAdReply: {
        title: packname,
        body: dev,
        thumbnailUrl: getRandomIcono(), // ← aleatoria
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    };

    return conn.reply(m.chat, msg, m, { contextInfo }).then(_ => m.react('✖️'));
  }

  return true;
};

export default handler;