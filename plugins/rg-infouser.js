let handler = async (m, { conn, args }) => {
  let who = m.mentionedJid?.[0] 
    ? m.mentionedJid[0] 
    : m.quoted 
      ? m.quoted.sender 
      : args[0] 
        ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : m.sender
  
  try {
    let jid = who
    let number = jid.split('@')[0]
    let waLink = `https://wa.me/${number}`
    let name = await conn.getName(jid)
    
    let ppUrl
    try {
      ppUrl = await conn.profilePictureUrl(jid, "image")
    } catch {
      ppUrl = logo
    }

    let about = (await conn.fetchStatus(jid).catch(() => ({})))?.status || "Sin descripción"

    let info = `
╭━━━〔 👤 *Información de Usuario* 〕━━⬣
┃ ✦ *ID:* \`\`\`${jid}\`\`\`
┃ ✦ *Número:* ${number}
┃ ✦ *wa.me:* ${waLink}
┃ ✦ *Nombre:* ${name}
┃ ✦ *Descripción:* ${about}
┃ ✦ *Tipo de cuenta:* 📱 WhatsApp (Messenger/Business)
╰━━━━━━━━━━━━━━━━━━⬣
    `.trim()

    await conn.sendFile(m.chat, ppUrl, "perfil.jpg", info, m, false)

  } catch (e) {
    m.reply("❌ No se pudo obtener la información del usuario.")
    console.log(e)
  }
}

handler.help = ["infouser @tag | número"]
handler.tags = ["info"]
handler.command = ['infouser']

export default handler