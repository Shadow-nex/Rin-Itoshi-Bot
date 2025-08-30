import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✳️ Ingresa un enlace de *MediaFire*\n\n📌 Ejemplo:\n${usedPrefix + command} https://www.mediafire.com/file/...`

  try {
    let apiKey = 'proyectsV2' // 🔑 Tu API Key definida
    let url = `https://api.stellarwa.xyz/dow/mediafire?url=${encodeURIComponent(text)}&apikey=${apiKey}`

    let res = await fetch(url)
    let json = await res.json()

    if (!json.status) throw `❌ No se pudo obtener el archivo.`

    let { title, peso, fecha, dl } = json.data

    let info = `╭━━━〔 📥 MediaFire Downloader 〕━━⬣
┃ 📂 Archivo: ${title}
┃ 📦 Tamaño: ${peso}
┃ 📅 Fecha: ${fecha}
╰━━━━━━━━━━━━━━━━━━⬣`

    // Aviso primero con la info
    await conn.sendMessage(m.chat, {
      text: info,
      footer: "✨ Rin Itoshi Bot",
      headerType: 1
    }, { quoted: m })

    // Descargar y enviar como documento 📂
    let fileBuffer = await (await fetch(dl)).buffer()
    await conn.sendMessage(m.chat, {
      document: fileBuffer,
      fileName: title,
      mimetype: 'application/octet-stream'
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    throw `⚠️ Error al procesar el enlace.`
  }
}

handler.help = ['mediafire <url>']
handler.tags = ['downloader']
handler.command = /^mediafire$/i

export default handler