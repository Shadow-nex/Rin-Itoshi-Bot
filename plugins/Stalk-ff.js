import axios from 'axios';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `✨ Ejemplo:\n/freefirestalk 123456789`, m);

  try {
    const res = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`);
    const json = res.data;

    if (!json || !json.status || !json.data || !json.data.account) {
  return conn.reply(m.chat, `😿 Parece que ese ID no existe o no está en la región LATAM.\n\n👉 Si tu cuenta es de *EE.UU. / Norteamérica*, esta función no podrá encontrarla porque usa servidores de LATAM.`, m);
    }

    let { account, pet_info = {}, guild = {}, ketua_guild = {} } = json.data;
    let msg = `
🎮 *Stalk de Free Fire*
────────────────────
👤 *Usuario:* ${account.name}
⭐ *Nivel:* ${account.level}
📍 *Región:* ${account.region}
💬 *Bio:* ${account.bio || "No disponible"}
💗 *Likes:* ${account.like}
📅 *Creado:* ${account.create_time}
🕐 *Último login:* ${account.last_login}
🎖 *Honor Score:* ${account.honor_score}
🎫 *Booyah Pass:* ${account.booyah_pass}
🔥 *Puntos BR:* ${account.BR_points}
⚔️ *Puntos CS:* ${account.CS_points}

🐾 *Mascota:* ${pet_info.name || "Ninguna"} (Nv. ${pet_info.level || "?"}, XP: ${pet_info.xp || "?"})

🏰 *Clan:* ${guild.name || "Sin clan"} (Nv. ${guild.level || 0}, Miembros: ${guild.member || 0}/${guild.capacity || "?"})

👑 *Líder del Clan:* ${ketua_guild.name || "Desconocido"} (Nv. ${ketua_guild.level || "?"}, BR: ${ketua_guild.BR_points || "?"}, CS: ${ketua_guild.CS_points || "?"})
`;

    await conn.sendMessage(m.chat, { text: msg }, { quoted: m });

  } catch (e) {
    console.error('[ERROR EN FREEFIRE]', e.message);
    conn.reply(m.chat, `💔 Ooops... La API de Free Fire falló o está fuera de servicio.\nIntenta de nuevo más tarde.`, m);
  }
};

handler.command = ['freefirestalk', 'ffstalk'];
export default handler;
