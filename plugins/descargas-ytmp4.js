import axios from "axios"
import fetch from "node-fetch"
import { sizeFormatter } from "human-readable"

let calidadPredeterminada = "360"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {

    if (command === "setcalidad" || command === "setquality") {
      const calidad = text.trim()

      if (!calidad)
        return m.reply(
          `🌱 *Debes especificar la calidad de descarga.*\n\n🌿 Ejemplo:\n${usedPrefix + command} 720`
        )

      const opciones = ["144", "240", "360", "480", "720", "1080"]
      if (!opciones.includes(calidad))
        return m.reply(`🎋 *Calidad inválida.* Usa una de estas:\n> ${opciones.join("p, ")}p`)

      calidadPredeterminada = calidad
      return m.reply(`✅ *Calidad predeterminada actualizada a:* ${calidad}p`)
    }

    if (command === "ytmp4") {
      if (!text)
        return conn.reply(
          m.chat,
          `🍷 *Ingresa el enlace de YouTube que deseas descargar en formato MP4.*\n\n👻 Ejemplo:\n${usedPrefix + command} https://youtu.be/HWjCStB6k4o`,
          m
        )

      await conn.reply(
        m.chat,
        `⏳ *Procesando tu solicitud...*\n🕸️ Calidad actual: *${calidadPredeterminada}p*`,
        m
      )

      const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/video?url=${encodeURIComponent(text)}&quality=${calidadPredeterminada}`
      const res = await axios.get(apiUrl)

      if (!res.data?.status) throw new Error("No se pudo obtener información del video.")

      const result = res.data.result
      const meta = result.metadata
      const dl = result.download

      const head = await fetch(dl.url, { method: "HEAD" })
      const size = head.headers.get("content-length")
      const formatSize = sizeFormatter({ std: "JEDEC", decimalPlaces: 2 })
      const fileSize = size ? formatSize(parseInt(size)) : "Desconocido"
      const sizeMB = size ? parseInt(size) / 1024 / 1024 : 0

      const info = `🎶 *ＹＯＵＴＵＢＥ • ＭＰ4*  🍎
────────────────────
> °𓃉𐇽ܳ𓏸🎋ᮬᩬִּ〫᪲۟. 𝐓𝐈𝐓𝐔𝐋𝐎: *${meta.title}*
> °𓃉𐇽ܳ𓏸🌿ᮬᩬִּ〫᪲۟. 𝐃𝐔𝐑𝐀𝐂𝐈𝐎𝐍: *${meta.duration?.timestamp || meta.timestamp}*
> °𓃉𐇽ܳ𓏸🍏ᮬᩬִּ〫᪲۟. 𝐂𝐀𝐍𝐀𝐋: *${meta.author?.name || "-"}*
> °𓃉𐇽ܳ𓏸🍄ᮬᩬִּ〫᪲۟. 𝐕𝐈𝐒𝐓𝐀𝐒: *${meta.views?.toLocaleString() || "-"}*
> °𓃉𐇽ܳ𓏸⚽ᮬᩬִּ〫᪲۟. 𝐓𝐀𝐌𝐀𝐍̃𝐎: *${fileSize}*
> °𓃉𐇽ܳ𓏸☁️ᮬᩬִּ〫᪲۟. 𝐂𝐀𝐋𝐈𝐃𝐀𝐃: *${dl.quality}*
> °𓃉𐇽ܳ𓏸🌷ᮬᩬִּ〫᪲۟. 𝐏𝐔𝐁𝐈𝐂𝐀𝐃𝐎: *${meta.ago}*
> °𓃉𐇽ܳ𓏸🕸️ᮬᩬִּ〫᪲۟. 𝐋𝐈𝐍𝐊: *${meta.url}*
> °𓃉𐇽ܳ𓏸⚙️ᮬᩬִּ〫᪲۟. 𝐒𝐄𝐑𝐕𝐈𝐃𝐎𝐑: *vreden*
────────────────────

> \`N O T A:\`
> ρєяѕσиαℓιzα ℓα ¢αℓι∂α∂ ∂єℓ νι∂єσ ¢σи /setquality`

      await conn.sendMessage(m.chat, {
        image: { url: meta.thumbnail },
        caption: info,
      })

      if (sizeMB > 100) {
        await conn.sendMessage(
          m.chat,
          {
            document: { url: dl.url },
            mimetype: "video/mp4",
            fileName: dl.filename,
            caption: `> *${meta.title}*\n> Tamaño: ${fileSize}\n Calidad: ${dl.quality}\n> Enviado como documento (más de 100 MB).`,
          },
          { quoted: m }
        )
      } else {
        await conn.sendMessage(
          m.chat,
          {
            video: { url: dl.url },
            mimetype: "video/mp4",
            fileName: dl.filename,
            caption: `> *${meta.title}*\n> Tamaño: ${fileSize}\n> Calidad: ${dl.quality}`,
          },
          { quoted: m }
        )
      }
    }
  } catch (err) {
    console.error(err)
    conn.reply(
      m.chat,
      "❌ *Ocurrió un error al procesar tu solicitud.*\nVerifica el enlace o intenta con otro video.",
      m
    )
  }
}

handler.help = ["ytmp4 <url>", "setcalidad <valor>"]
handler.tags = ["descargas"]
handler.command = ["ytmp4", "setcalidad", "setquality"]

export default handler