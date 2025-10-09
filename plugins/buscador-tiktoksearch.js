import axios from "axios"
const {
  proto,
  generateWAMessageFromContent,
  generateWAMessageContent
} = (await import("@whiskeysockets/baileys")).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return conn.reply(
      m.chat,
      `🌿 *Ingresa un texto para buscar en TikTok.*\n\n📌 Ejemplo:\n> ${usedPrefix + command} Edits Kaiser`,
      m,
      rcanal
    )

  // Función para crear video en mensaje
  async function createVideoMessage(url) {
    const { videoMessage } = await generateWAMessageContent(
      { video: { url } },
      { upload: conn.waUploadToServer }
    )
    return videoMessage
  }

  // Función para mezclar resultados
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  try {
    m.react("⏳")
    await conn.reply(m.chat, "✧ *Buscando resultados en TikTok...*", m, {
      contextInfo: {
        externalAdReply: {
          title: "✿ 𝙱𝚄𝚂𝙲𝙰𝙽𝙳𝙾 𝙴𝙽 𝚃𝙸𝙺𝚃𝙾𝙺 ✿",
          body: "Por favor espera un momento...",
          mediaType: 1,
          thumbnail: avatar,
          sourceUrl: redes
        }
      }
    })

    const { data } = await axios.get(
      `https://api.starlights.uk/api/search/tiktok?text=${encodeURIComponent(text)}`
    )

    if (!data?.status || !data?.result?.data)
      throw new Error("❌ No se encontraron resultados en TikTok.")

    let results = data.result.data
    shuffleArray(results)
    let topResults = results.slice(0, 10)

    let cards = []
    for (let v of topResults) {
      const info = `
🎬 *Título:* \`${v.title || "Sin título"}\`
👤 *Autor:* ${v.creator || "Desconocido"}
🌍 *Región:* ${v.region || "N/A"}
🆔 *ID del Video:* ${v.video_id || "N/A"}

🕒 *Publicado:* ${
        v.create_time ? new Date(v.create_time * 1000).toLocaleString() : "Desconocido"
      }
🎧 *Duración:* ${v.duration ? v.duration + " segundos" : "N/A"}
🎵 *Audio:* ${v.music || "Sin música"}

❤️ *Likes:* ${v.likes?.toLocaleString() || 0}
💬 *Comentarios:* ${v.comments?.toLocaleString() || 0}
👁 *Vistas:* ${v.views?.toLocaleString() || 0}
🔁 *Compartidos:* ${v.share?.toLocaleString() || 0}
⬇️ *Descargas:* ${v.download?.toLocaleString() || 0}

🔗 *Enlace directo:* ${v.url || "No disponible"}
`.trim()

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: info
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: club
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: v.title || "Video TikTok",
          hasMediaAttachment: true,
          videoMessage: await createVideoMessage(v.nowm)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌸 Ver en TikTok",
                url: v.url
              })
            },
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "⭕ Canal - official",
                url: 'https://whatsapp.com/channel/0029VbBPa8EFsn0aLfyZl23j'
              })
            }
          ]
        })
      })
    }

    const content = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `🌺 *Resultados de TikTok para:* ${text}`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "🌸 Fuente: Rin itoshi"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: false
              }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                cards
              })
            })
          }
        }
      },
      { quoted: m }
    )

    await conn.relayMessage(m.chat, content.message, { messageId: content.key.id })
    m.react("✅")
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `⚠️ *Ocurrió un error:* ${e.message}`, m)
  }
}

handler.help = ["tiktoksearch <texto>"]
handler.tags = ["buscador"]
handler.command = ["tiktoksearch", "ttsearch", "tiktoks"]
handler.register = true
handler.group = true

export default handler