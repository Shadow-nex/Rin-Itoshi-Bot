let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos.');

  try {
    let groupMeta = await conn.groupMetadata(m.chat);
    let participants = groupMeta.participants || [];

    // Verificar si quien ejecuta es admin o superadmin
    let user = participants.find(p => p.id === m.sender);
    let isAdmin = user?.admin === 'admin' || user?.admin === 'superadmin';
    if (!isAdmin) {
      return m.reply('🚫 Este comando solo puede ser usado por *administradores* del grupo.');
    }

    // Descripción del grupo como reglas
    let desc = groupMeta.desc || 'Este grupo no tiene reglas configuradas.';

    // Obtener admins y crear lista de menciones
    let admins = participants
      .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
      .map(a => `@${a.id.split('@')[0]}`);
    let adminsMentions = participants
      .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
      .map(a => a.id);
    let adminsText = admins.length > 0 ? admins.join(', ') : 'No hay administradores.';

    // Mensaje estilo Rin-Itoshi épico
    let msg = `
╔═══༺🌸༻═══╗
🌟 *REGLAS DEL GRUPO* 🌟
🎌 ${groupMeta.subject}
╚═══༺🌸༻═══╝

📜 *Reglas:* 
${desc}

👑 *Administradores:* ${adminsText}

✨「Respeta las reglas y comparte tu espíritu otaku con todos los nakamas」⚔️
🎴 ¡Que la aventura en este grupo sea épica y llena de diversión! 🌌
`;

    return conn.sendMessage(m.chat, { text: msg, mentions: adminsMentions }, { quoted: m });

  } catch (e) {
    console.error(e);
    return m.reply('❌ No se pudo obtener la descripción o los administradores.');
  }
};

handler.command = /^r$/i;
handler.group = true;

export default handler;
