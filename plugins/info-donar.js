let media = 'https://files.catbox.moe/ur3ocy.jpg'

let handler = async (m, { conn, command }) => {
  let titulo = `🎁 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐁𝐨𝐭 - 𝐀𝐬𝐢𝐬𝐭𝐞𝐧𝐜𝐢𝐚`
let descripcion = `Apoya al proyecto y contribuye para mantener activo el bot 💖`
let link = 'https://paypal.me/shadowCore877' 
let git = 'https://github.com/Shadow-nex/Rin-Itoshi-Bot'
let wm = '© 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐁𝐨𝐭'
let asistencia = `✨ ¡Gracias por tu interés en apoyar a Rin Itoshi Bot!  
Tu donación nos ayuda a seguir mejorando y manteniendo el servicio activo.  
Cualquier aporte es muy valioso 💕`

let texto = `
╭━━━〔 🌸 𝐃𝐨𝐧𝐚𝐜𝐢𝐨𝐧 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐁𝐨𝐭 🌸 〕
┃ 💎 *${user?.name || 'Usuario'}*, gracias por usar el bot.
┃ 🩷 Tu apoyo mantiene vivo este proyecto.
┃ 🌐 Puedes donar desde PayPal:
┃ 💰 ${link}
╰━━━━━━━━━━━━━━━━━━⬣
`

await conn.sendMessage(m.chat, {
  text: texto,
  contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 9999999,
    isForwarded: true,
    externalAdReply: {
      title: titulo,
      body: descripcion,
      thumbnailUrl: media,
      sourceUrl: link,
      mediaType: 1,
      renderLargerThumbnail: true
    }
  }
}, { quoted: m })
}

handler.help = ['donar']
handler.tags = ['info']
handler.command = ['donar', 'alv']
handler.exp = 200

export default handler
