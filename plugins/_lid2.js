// Uso preferible: import nombrado (si tu bundler/entorno lo soporta)
import { jidNormalizedUser } from '@whiskeysockets/baileys'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    // 1) Obtener target (puede venir citado, mencionado o por argumento)
    let targetRaw
    if (m.quoted?.sender) targetRaw = m.quoted.sender
    else if (m.mentionedJid?.length) targetRaw = m.mentionedJid[0]
    else if (args[0]) {
      const raw = args[0].replace(/\D/g, '')
      if (raw.length < 8) return conn.reply(m.chat, '❌ *Número inválido.*', m)
      targetRaw = raw + '@s.whatsapp.net'
    } else {
      return conn.reply(
        m.chat,
        `🍁 *Usa el comando así:*\n\n┌ Ejemplo:\n├ ${usedPrefix + command} +51999999999\n├ ${usedPrefix + command} @usuario\n└ Responde a un mensaje`,
        m
      )
    }

    // 2) Normalizar el JID (quita device/resource, deja solo usuario@server)
    const normalized = jidNormalizedUser(targetRaw) // devuelve la parte "usuario" o "user@server"
    // Asegurarnos de tener un JID completo con dominio
    const jid = normalized.includes('@') ? normalized : `${normalized}@s.whatsapp.net`

    // 3) Consultar si está en WhatsApp — pasar array es más fiable
    const [info] = await conn.onWhatsApp([jid])
    console.log('onWhatsApp ->', info)

    if (!info || !info.exists) {
      return conn.reply(m.chat, '❌ *El número no está registrado en WhatsApp.*', m)
    }

    const userJid = info.jid // ej: 51999999999@s.whatsapp.net
    const name = await conn.getName(userJid).catch(() => 'No disponible')
    const statusObj = await conn.fetchStatus(userJid).catch(() => null)
    const ppUrl = await conn.profilePictureUrl(userJid, 'image').catch(() => null)

    const texto = `⟨ 📡 *Datos de WhatsApp* ⟩
━━━━━━━━━━━━━━━━━━━
• 👤 *Nombre:* ${name}
• 📱 *Número:* wa.me/${userJid.replace(/[^0-9]/g, '')}
• 🗝️ *JID:* ${userJid}
• 📜 *Estado:* ${statusObj?.status || 'No disponible'}
• ⏳ *Últ. visto:* ${statusObj?.setAt ? new Date(statusObj.setAt).toLocaleString('es-PE') : 'No disponible'}
• 🖼️ *Foto:* ${ppUrl ? 'Sí tiene' : 'No tiene'}
━━━━━━━━━━━━━━━━━━━`

    await conn.reply(m.chat, texto, m)
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ *Ocurrió un error inesperado al obtener los datos.*', m)
  }
}

handler.command = ['lid', 'whois', 'info']
handler.help = ['lid']
handler.tags = ['tools']

export default handler