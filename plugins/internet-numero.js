import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🚩 Ingresa el nombre de la app que quieres buscar.\n\n🍂 Ejemplo:\n${usedPrefix + command} WhatsApp`, m)
  }

  try {
    let url = `https://api.dorratz.com/v3/fdroid-search?query=${encodeURIComponent(text)}`
    let res = await fetch(url)
    let data = await res.json()

    if (!Array.isArray(data) || data.length === 0) {
      return conn.reply(m.chat, `⚠️ No se encontraron resultados para *${text}*`, m)
    }

    let apps = data.slice(0, 5)

    let info = apps.map((app, i) => {
      return `📦 *${i + 1}. ${app.name || app.nombre || 'Sin nombre'}*
📝 ${app.description || 'Sin descripción'}
🔗 [Enlace](${app.enlace || '-'})
🎨 Icono: ${app.icono || 'No disponible'}
📑 Licencia: ${app.licencia || 'Desconocida'}
👤 Creador: ${app.creador || 'Desconocido'}`
    }).join('\n\n')

    await conn.sendMessage(m.chat, {
      text: `✨ *Resultados de búsqueda en F-Droid para:* _${text}_\n\n${info}`,
      linkPreview: false
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `❌ Ocurrió un error al buscar la app.`, m)
  }
}

handler.help = ['fdroidse <app>']
handler.tags = ['buscadores']
handler.command = /^fdroidse$/i

export default handler