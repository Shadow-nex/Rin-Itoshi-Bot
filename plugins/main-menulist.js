import { proto } from "@whiskeysockets/baileys"
import fs from "fs"
import sharp from "sharp"

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Imagen base para el documento
    let imgPath = "./menu.png" // pon aquí tu imagen real
    let bufferImg = fs.readFileSync(imgPath)

    // Crear thumbnail en JPEG (obligatorio para que no salga blanco)
    let thumb = await sharp(bufferImg).resize(200).jpeg().toBuffer()

    // Texto del menú
    let menutxt = `
╭━━━〔 ✦ 𝑴𝑬𝑵𝑼 ✦ 〕━━⬣
┃🍂 Hola @${m.sender.split('@')[0]}
┃🌸 Bienvenido al menú de *Rin Itoshi Bot*
┃⚡ Usa los botones o lista para navegar
╰━━━━━━━━━━━━━━⬣
    `.trim()

    // Botones rápidos
    let buttons = [
      { buttonId: `${usedPrefix}ping`, buttonText: { displayText: "⚡ Estado" }, type: 1 },
      { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 Creador" }, type: 1 }
    ]

    // Lista (flow)
    let sections = [
      {
        title: "📖 Categorías",
        highlight_label: "Recomendado",
        rows: [
          { header: "🎵 Música", title: "play / ytmp3", description: "Descarga canciones", id: `${usedPrefix}play despacito` },
          { header: "📥 Descargas", title: "Facebook / TikTok", description: "Bajar videos", id: `${usedPrefix}tiktok https://vm.tiktok.com/xxx` },
          { header: "🎮 Juegos", title: "Adivina / Trivia", description: "Diversión y retos", id: `${usedPrefix}game` }
        ]
      }
    ]

    await conn.sendMessage(m.chat, {
      document: bufferImg, // 👈 documento real
      fileName: "⟆ 𖦹 🍂 𝑴𝑬𝑵𝑼 𝑩𝑶𝑻 🍂 𖦹 ⟅",
      mimetype: "image/png", // 👈 doc tipo imagen
      jpegThumbnail: thumb, // 👈 preview visible
      caption: menutxt,
      footer: '© ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ | ° ʙʏ sʜᴀᴅᴏᴡ.xʏᴢ',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: "single_select",
            paramsJson: JSON.stringify({
              title: "🌸 𝑪𝑨𝑻𝑬𝑮𝑶𝑹𝑰𝑨𝑺 🌸",
              sections
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "Rin Itoshi 🌸",
          body: "Menú oficial",
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply("❌ Error al generar el menú.")
  }
}

handler.command = /^(menulist|menu)$/i
export default handler