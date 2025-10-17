import fetch from "node-fetch"
import { playstoreGet } from "../lib/playstoredl.js"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return conn.reply(
      m.chat,
      `✨ *Uso correcto:*\n\n> ${usedPrefix + command} WhatsApp\n> ${usedPrefix + command} com.whatsapp\n> ${usedPrefix + command} https://play.google.com/store/apps/details?id=com.whatsapp\n\n📱 Descarga el APK directamente desde la Play Store.`,
      m
    )

  try {
    await conn.reply(m.chat, "🔍 *Buscando la aplicación...*", m)

    const info = await playstoreGet(text)
    const data = info.download

    if (!data || !data.link)
      return conn.reply(m.chat, "❌ No se pudo generar el enlace de descarga.", m)

    const caption = `
╭━━━〔 𝐏𝐋𝐀𝐘𝐒𝐓𝐎𝐑𝐄 𝐀𝐏𝐊 〕━━⬣
┃📱 *App:* ${info.name || "Desconocida"}
┃👤 *Desarrollador:* ${info.developer || "N/A"}
┃📦 *Versión:* ${info.version || "N/A"}
┃📁 *Tamaño:* ${info.size || "Desconocido"}
┃⭐ *Valoración:* ${data.rating || "N/A"}
┃🔗 *Play Store:* ${info.url || "N/A"}
╰━━━⬣
⬇️ *Descargando APK...*
`

    await conn.sendMessage(m.chat, {
      image: { url: info.icon },
      caption,
      contextInfo: {
        externalAdReply: {
          title: info.name || "PlayStore App",
          body: "Descarga directa del APK",
          thumbnailUrl: info.icon,
          sourceUrl: info.url,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    })

    const apkRes = await fetch(data.link)
    const buffer = await apkRes.arrayBuffer()

    await conn.sendMessage(
      m.chat,
      {
        document: Buffer.from(buffer),
        mimetype: "application/vnd.android.package-archive",
        fileName: `${info.name || info.appId}.apk`,
      },
      { quoted: m }
    )
  } catch (err) {
    console.error(err)
    conn.reply(
      m.chat,
      `❌ *Error al descargar el APK:*\n${err.message}`,
      m
    )
  }
}

handler.command = /^playstoredl|playstoreapk|apkdl$/i

export default handler