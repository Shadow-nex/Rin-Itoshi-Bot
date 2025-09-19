export async function before(m, { conn }) {

  const canal = 'https://whatsapp.com/channel/0029VbApwZ9ISTkEBb6ttS3F'
  const canal2 = 'https://whatsapp.com/channel/0029Vb6IdnEGU3BTahqaLL2V'
  const canal3 = 'https://whatsapp.com/channel/0029VbBVnhSBlHpUWKo19m2m'
  const api = 'https://api.stellarwa.xyz'
  const git = 'https://github.com/DevAlexJs'
  const md = 'https://github.com/DevAlexJs/SakuraBot-MD'

  const redesArray = [canal, canal2, canal3, api, git, md]
  globalThis.redes33 = redesArray[Math.floor(Math.random() * redesArray.length)]

  // Asegúrate de que global.my exista y tenga los valores que necesitas
  const canales = Object.entries(global.my || {})
    .reduce((acc, [key, value]) => {
      if (key.startsWith('ch')) {
        const index = key.slice(2)
        const nombre = global.my[`name${index}`]
        if (nombre) {
          acc.push({ id: value, nombre })
        }
      }
      return acc
    }, [])

  // Si canales está vacío, evita el error
  const channelRD = canales.length > 0 
    ? canales[Math.floor(Math.random() * canales.length)] 
    : { id: "default@newsletter", nombre: "Canal por defecto" }

  // Define valores por defecto si no existen
  const packname = global.packname || "Mi Bot"
  const dev = global.dev || "Dev"
  const icon = global.icon || null

  global.rcanal = { 
    contextInfo: { 
      isForwarded: true, 
      forwardedNewsletterMessageInfo: { 
        newsletterJid: channelRD.id, 
        serverMessageId: '0', 
        newsletterName: channelRD.nombre, 
      }, 
      externalAdReply: { 
        showAdAttribution: true, 
        title: packname, 
        body: dev, 
        mediaUrl: null, 
        description: null, 
        previewType: "PHOTO", 
        thumbnailUrl: icon, 
        sourceUrl: globalThis.redes33, 
        mediaType: 1, 
        renderLargerThumbnail: false 
      }
    }
  }

  global.fake2 = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.nombre,
        serverMessageId: '0'
      }
    }
  }
}