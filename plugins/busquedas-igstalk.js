import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `✧ Ingresa un nombre de usuario de Instagram.\n\n🌿 Ejemplo:\n*${usedPrefix + command} Shadow.XYZ*`,
      m
    );
  }

  try {
    let res = await fetch(`https://api.siputzx.my.id/api/stalk/instagram?username=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.status) return conn.reply(m.chat, "No se encontró el usuario.", m);

    let data = json.data;
    let info = `
╭━━━〔 ✧ ιɴѕᴛᴀɢʀᴀᴍ ✧ 〕━━⬣
┃👤 *Nombre:* ${data.full_name || "N/A"}
┃🔖 *Usuario:* @${data.username}
┃📌 *Biografía:* ${data.biography || "Sin descripción"}
┃🌐 *Enlace:* ${data.external_url || "Ninguno"}
┃✔️ *Verificado:* ${data.is_verified ? "Sí" : "No"}
┃🔒 *Privado:* ${data.is_private ? "Sí" : "No"}
┃📊 *Seguidores:* ${data.followers_count.toLocaleString()}
┃👥 *Siguiendo:* ${data.following_count.toLocaleString()}
┃📸 *Publicaciones:* ${data.posts_count.toLocaleString()}
╰━━━━━━━━━━━━━━━━━━⬣
    `.trim();

    await conn.sendMessage(m.chat, {
      image: { url: data.profile_pic_url },
      caption: info,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "Ocurrió un error al obtener los datos.", m);
  }
};

handler.help = ["igstalk"].map(v => v + " <usuario>");
handler.tags = ["tools"];
handler.command = ["instagramstalk", "igstalk", "stalkig"];
handler.register = true;

export default handler;