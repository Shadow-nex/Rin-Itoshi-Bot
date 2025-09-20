import fetch from 'node-fetch'
import moment from 'moment-timezone'

let handler = async (m, { conn, command }) => {

  let logo = 'https://files.catbox.moe/fft2hr.jpg'
  let img = 'https://files.catbox.moe/fft2hr.jpg'

  // ✦✦✦ REGLAS DEL BOT ✦✦✦
  if (['botreglas', 'reglasdelbot', 'reglasbot', 'reglas'].includes(command)) {
    let uptime = process.uptime() * 1000
    let muptime = clockString(uptime)
    let userCount = Object.keys(global.db?.data?.users || {}).length || 0
    let chats = Object.keys(conn.chats || {}).length
    let groups = Object.values(conn.chats || {}).filter(c => c.id.endsWith('@g.us')).length

    const texto = `⬣═══════════════════════⬣
     𝙍𝙀𝙂𝙇𝘼𝙈𝙀𝙉 𝑹𝒊𝒏 𝑰𝒕𝒐𝒔𝒉𝒊 ⚡
 ⚠️ *𝐂𝐨𝐝𝐢𝐠𝐨 𝐝𝐞 𝐎𝐧𝐨𝐫 – Black*

▤ ✘ No llamar al bot innecesariamente.
▤ ✘ No hacer spam o comandos repetitivos.
▤ ✘ No añadir a grupos sin autorización.
▤ ✘ No faltar el respeto al sistema ni a los admins.
▤ ✘ Contacta al creador en caso de errores o dudas.
⬣═══════════════════════⬣

⬣═══════════════════════⬣
   ❖ 💠 *𝐈𝐍𝐅𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓* 💠 ❖
🧑‍💻 *Creador:* Shadow.xyz
🤖 *Nombre:* Rin Itoshi
📦 *Versión:* 2.2.5
📊 *Usuarios registrados:* ${userCount}
💬 *Chats activos:* ${chats} (${groups} grupos)
⏱️ *Tiempo activo:* ${muptime}
📅 *Fecha:* ${moment.tz('America/Lima').format('DD/MM/YYYY HH:mm')}

⬣═══════════════════════⬣
> 🌐 Repositorio: ${md}
> ${textbot}`.trim();

    await conn.sendMessage(m.chat, { image: { url: logo }, caption: texto }, { quoted: fkontak })
  }

  // ✦✦✦ REGLAS DEL GRUPO ✦✦✦
  else if (['gruporeglas', 'reglasgp'].includes(command)) {
    if (!m.isGroup) return conn.reply(m.chat, '❗ Este comando solo se puede usar en grupos.', m);

    try {
      const groupInfo = await conn.groupMetadata(m.chat);
      const url = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null);

      // Obtener admins y mostrar nombre o número
      let adminsArr = groupInfo.participants.filter(p => p.admin);
      let adminsText = adminsArr.map(a => {
        let contact = conn.contacts[a.id];
        if (contact?.name) return `• ${contact.name}`; // Nombre del contacto
        return `• ${a.id.split('@')[0]}`; // Si no hay nombre, mostrar número
      }).join('\n') || 'No hay administradores.';

      let adminsMentions = adminsArr.map(a => a.id);

      let creador = groupInfo.owner ? `@${groupInfo.owner.split('@')[0]}` : 'Desconocido';
      let fechaCreacion = new Date(groupInfo.creation * 1000)
        .toLocaleString('es-ES', { timeZone: 'America/Lima' });

      let groupRules = groupInfo.desc?.trim() || 'No hay reglas establecidas en la descripción del grupo.';

      const texto = `╭═══ 📜『 𝑹𝒆𝒈𝒍𝒂𝒔 𝒅𝒆𝒍 𝑮𝒓𝒖𝒑𝒐 』📜═══╮
🏷️ *Nombre:* ${groupInfo.subject}
👑 *Creador:* ${creador}
👥 *Miembros:* ${groupInfo.participants.length}
🛡️ *Admins:*
${adminsText}
📅 *Creado el:* ${fechaCreacion}

📝 *Reglas del grupo:*
${groupRules}
╰═════════════════════════⬣

> © ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ | ☆ ʙʏ sʜᴀᴅᴏᴡ.xʏᴢ`.trim();

      await conn.sendMessage(m.chat, { image: { url: url || img }, caption: texto, mentions: adminsMentions }, { quoted: m });

    } catch (e) {
      console.error(e);
      await conn.reply(m.chat, '❌ No se pudieron obtener las reglas del grupo. Asegúrate de usar este comando en un grupo válido.', m);
    }
  }
};

handler.help = ['botreglas', 'gruporeglas', 'reglasgp'];
handler.tags = ['main'];
handler.command = ['botreglas','reglasdelbot','reglasbot','reglas','gruporeglas','reglasgp'];
handler.register = true;

export default handler;

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [
    d ? d + 'd' : '',
    h ? h + 'h' : '',
    m ? m + 'm' : '',
    s ? s + 's' : ''
  ].join(' ')
}
