import pkg from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
const { proto } = pkg

var handler = m => m
handler.all = async function (m) {

/*  // Canales disponibles
  global.canalIdM = [
    "120363401008003732@newsletter", 
    "120363401008003732@newsletter"
  ]
  global.canalNombreM = [
    "༺✮•°◤𝑫𝑬𝑵𝑱𝑰𝑩𝑶𝑻 𝑼𝑳𝑻𝑹𝑨~🔫", 
    "༺✮•°◤🄳🄴🄽🄹🄸 🄱🄾🅃-🅅2~🔫"
  ]

  // Elegir canal aleatorio
  global.channelRD = await getRandomChannel()
*/
  global.rcanal = { 
    contextInfo: { 
      isForwarded: true, 
      forwardedNewsletterMessageInfo: { 
        newsletterJid: channelRD.id, 
        serverMessageId: '', 
        newsletterName: channelRD.name 
      }, 
      externalAdReply: { 
        title: botname, 
        body: dev, 
        mediaUrl: null, 
        description: null, 
        previewType: "PHOTO", 
        thumbnail: await (await fetch(icono)).buffer(), 
        sourceUrl: redes, 
        mediaType: 1, 
        renderLargerThumbnail: true 
      }, 
      mentionedJid: null 
    }
  }
}

export default handler


async function getRandomChannel() {
  let randomIndex = Math.floor(Math.random() * canalIdM.length)
  let id = canalIdM[randomIndex]
  let name = canalNombreM[randomIndex]
  return { id, name }
}