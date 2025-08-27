import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🌀 Ingresa un código de país.\n\n⚡ Ejemplo:\n${usedPrefix + command} +58`, m)
  }

  try {
    let url = `https://api.dorratz.com/v2/pais/${encodeURIComponent(text)}`
    let res = await fetch(url)
    let data = await res.json()

    if (!data || !data.nombre) {
      return conn.reply(m.chat, `❌ No se encontró información para el código *${text}*`, m)
    }

    let info = `
╭━━━〔 🌍 Información del País 〕━━⬣
┃🏳️ Nombre: *${data.nombre}*
┃📞 Código: *${data.código}*
┃🏴 Bandera: ${data.bandera}
┃🏛️ Capital: *${data.capital}*
┃💱 Moneda: *${data.moneda}*
┃🌎 Continente: *${data.continente}*
┃📍 Región: *${data.región}*
┃🌐 Código ISO: *${data.código_iso}*
┃👥 Población: *${data.población}*
┃📏 Área: *${data.área} km²*
┃🗣️ Idioma: *${data.idioma_oficial}*
┃🎉 Fiesta nacional: *${data.fiesta_nacional}*
┃☁️ Clima: *${data.clima}*
┃⛏️ Recursos: *${data.recursos_naturales}*
┃📦 Exportaciones: *${data.exportaciones}*
┃🛒 Importaciones: *${data.importaciones}*
┃🏖️ Turismo: *${data.turismo}*
┃🎶 Himno: *${data.himno_nacional}*
┃📖 Mitos/Leyendas: *${data.mitos_leyendas}*
┃🍽️ Gastronomía: *${data.gastronomía}*
╰━━━━━━━━━━━━━━━━━━⬣
    `.trim()

    await conn.sendMessage(m.chat, { text: info }, { quoted: m })
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `❌ Ocurrió un error al obtener la información.`, m)
  }
}

handler.help = ["pais <código>"]
handler.tags = ["tools"]
handler.command = ["pais"]

export default handler