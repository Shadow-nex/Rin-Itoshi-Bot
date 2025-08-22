import fs from 'fs'

let handler = async (m, { conn }) => {

let msg = {
  title: "📌 MENÚ DE PRUEBA PPP",
  sections: [
    {
      title: "📖 Información",
      rows: [
        {
          header: "ℹ️ Texto de ejemplo",
          title: "Información Básica",
          description: "Este es un menú PPP de prueba con texto.",
          id: "info_texto"
        },
        {
          header: "📹 Video de ejemplo",
          title: "Video incluido",
          description: "Ejemplo de menú PPP con video.",
          id: "info_video"
        }
      ]
    }
  ]
}

await conn.sendMessage(m.chat, { 
  text: "✨ Bienvenido al menú PPP de prueba.\nAquí tienes información en texto y un video incluido.",
  footer: "Menú PPP Demo",
  title: "🌟 MENÚ DE PRUEBA 🌟",
  buttonText: "Abrir Menú",
  sections: msg.sections
}, { quoted: m })

// Envío de video de ejemplo
await conn.sendMessage(m.chat, { 
  video: { url: "https://files.catbox.moe/81wrse.mp4" }, 
  caption: "🎬 Video de prueba incluido en el menú PPP." 
}, { quoted: m })

}

handler.command = /^menuppp$/i
export default handler