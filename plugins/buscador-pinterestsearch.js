import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🎋 Ingresa un nombre o palabra clave para buscar videos de *Pinterest*.\n\n📌 Ejemplo:\n${usedPrefix + command} Rin Itoshi`)
  }

  try {
    await m.react("⏳")

    const api = `https://api.neoxr.eu/api/pinterest-v2?q=${encodeURIComponent(text)}&show=10&type=video&apikey=russellxz`
    const res = await fetch(api)
    const json = await res.json()

    if (!json.status || !json.data || json.data.length === 0) {
      return m.reply("⚠️ No se encontraron resultados para tu búsqueda.")
    }

    const resultados = json.data

    m.reply(`✨ Se encontraron ${resultados.length} videos de *Pinterest* para: ${text}\n\n⏳ Enviando...`)

    for (let vid of resultados) {
      const url = vid.content?.[0]?.url
      const thumb = vid.content?.[0]?.thumbnail
      const title = vid.title || "Video sin título"
      const desc = vid.description || "Sin descripción."

      if (url) {
        await conn.sendMessage(
          m.chat,
          {
            video: { url },
            caption: `🎬 *${title}*\n📝 ${desc}\n🔗 ${vid.source}`,
            thumbnail: thumb
          },
          { quoted: m }
        )
      }
    }

    await m.react("✅")
  } catch (e) {
    console.error(e)
    m.reply("❌ Ocurrió un error al buscar o enviar los videos de Pinterest.")
  }
}

handler.help = ["pinterestvideo", "pine"]
handler.tags = ["search"]
handler.command = ["pinterestvideo", "pinse"]
export default handler