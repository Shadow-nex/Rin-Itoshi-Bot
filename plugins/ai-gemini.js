import axios from "axios"

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply("🌿 Ingrese una petición.")

  try {
    await m.react('🕒')

    const apiMap = { 
      luminai: 'qwen-qwq-32b', 
      gemini: 'gemini', 
      bard: 'grok-3-mini' 
    }

    const endpoint = apiMap[command]
    if (!endpoint) throw new Error("ꕥ Comando no reconocido.")

    const prompt = `Eres rin itoshi y tu idioma es Español ${text}`
    const url = `https://api.zenzxz.my.id/ai/${endpoint}?text=${encodeURIComponent(prompt)}`
    
    const res = await axios.get(url, { timeout: 15000 })
    const output = res.data?.response || res.data?.assistant

    if (!res.data?.status || !output) throw new Error("ꕥ Respuesta inválida de la IA.")

    await conn.sendMessage(m.chat, { text: output }, { quoted: m })
    await m.react('✔️')

  } catch (err) {
    console.error(err)
    await m.react('✖️')
    m.reply(`⚠︎ Hubo un problema al procesar tu petición.\n\n${err.message}`)
  }
}

handler.help = ["luminai", "gemini", "bard"]
handler.tags = ["ai"]
handler.command = ["luminai", "gemini", "bard"]
handler.group = true

export default handler