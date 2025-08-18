// comando bug jaja xd
let handler = async (m, { conn, args }) => {
  let who = m.mentionedJid?.[0] 
    ? m.mentionedJid[0] 
    : m.quoted 
      ? m.quoted.sender 
      : m.sender
  
  try {
    let jid = who
    let number = jid.split('@')[0]
    let waLink = `https://wa.me/${number}`
    let name = await conn.getName(who)
    
    let ppUrl
    try {
      ppUrl = await conn.profilePictureUrl(who, "image")
    } catch {
      ppUrl = logo
    }

    let about = (await conn.fetchStatus(who).catch(() => ({})))?.status || "Sin descripción"

    let business = await conn.fetchBusinessProfile(who).catch(() => null)
    let tipoCuenta = "📱 WhatsApp Messenger"

    if (business) {
      tipoCuenta = "🏢 WhatsApp Business"
      if (business.verifiedName) {
        verificado = `✅ Sí (${business.verifiedName})`
      }
    }

    let info = `
╭━━━〔 👤 *Información de Usuario* 〕━━⬣
┃ ✦ *ID:* \`\`\`${jid}\`\`\`
┃ ✦ *Número:* ${number}
┃ ✦ *wa.me:* ${waLink}
┃ ✦ *Nombre:* ${name}
┃ ✦ *Descripción:* ${about}
┃ ✦ *Tipo de cuenta:* ${tipoCuenta}
┃ ✦ *Verificado:* ${verificado}
╰━━━━━━━━━━━━━━━━━━⬣
    `.trim()

    await conn.sendFile(m.chat, ppUrl, "perfil.jpg", info, m, false)

  } catch (e) {
    m.reply("❌ No se pudo obtener la información del usuario.")
    console.log(e)
  }
}

handler.help = ["infouser @tag"]
handler.tags = ["info"]
handler.command = /^infouser$/i

export default handler