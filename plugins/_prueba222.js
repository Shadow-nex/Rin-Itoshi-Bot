// plugins/verify.js
import moment from "moment-timezone";

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Obtener datos del usuario desde tu base
    let user = global.db.data.users[m.sender] || {};
    let perfil = await conn.profilePictureUrl(m.sender, "image").catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
    let about = (await conn.fetchStatus(m.sender).catch(_ => {}))?.status || "Sin descripción";

    // Guardar descripción en la base
    user.descripcion = about;

    // Fecha de verificación
    let fechaBio = moment.tz("America/Bogota").format("DD/MM/YYYY HH:mm");

    // ID / Número de registro
    if (!user.sn) user.sn = Math.floor(Math.random() * 1000000);

    let chtxt = `ੈ₊˚༅༴│↷◌⁺˖ ☕ *𝐒𝐇𝐀𝐃𝐎𝐖 - 𝐁𝐎𝐓* 🚀
⚔️ੈ₊˚༅༴│.👤 *Usuario* » ${m.pushName || "Anónimo"}
🆔ੈ₊˚༅༴│.🔑 *ID* » ${m.sender}
⚡ੈ₊˚༅༴│.🍰 *Verificación* » ${user.name || "Sin nombre"}
🍬ੈ₊˚༅༴│.⚙️ *Edad* » ${user.age || "Sin definir"} años
☁️ੈ₊˚༅༴│.⌨️ *Descripción* » ${about}
🍧ੈ₊˚༅༴│.📇 *Última Modificación* » ${fechaBio}
🍫ੈ₊˚༅༴│.📆 *Fecha* » ${moment.tz("America/Bogota").format("DD/MM/YY")}
❄️ੈ₊˚༅༴│.🌸 *Número de registro* »
⤷ ${user.sn}`;

    // Enviar notificación al canal o grupo
    await conn.sendMessage('120363402970883180@g.us', {
      text: chtxt,
      contextInfo: {
        externalAdReply: {
          title: "【 🌹 NOTIFICACIÓN ⚔️ 】",
          body: "😊 ¡Un usuario nuevo ha sido verificado!",
          thumbnailUrl: perfil,
          sourceUrl: redes, // Define global.redes con el link que quieras
          mediaType: 1,
          showAdAttribution: false,
          renderLargerThumbnail: false,
        },
      },
    });

    // Responder al usuario
    await conn.reply(m.chat, "✅ Te has verificado correctamente, se ha enviado una notificación al canal.", m);

  } catch (e) {
    console.error(e);
    m.reply("⚠️ Hubo un error al verificar tu cuenta.");
  }
};

handler.command = ["verify2", "verificar2", "reg2"];
export default handler;