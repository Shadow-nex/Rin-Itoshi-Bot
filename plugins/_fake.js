import pkg from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
const { proto } = pkg

var handler = m => m
handler.all = async function (m) {

  global.canalIdM = [
    "120363401008003732@newsletter",
    "120363401008003732@newsletter",
    "120363401008003732@newsletter"
  ]
  global.canalNombreM = [
    "⸸ ⚡︎「 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 ✦ 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 」⚡︎ ⸸",
    "✦͙͙͙*ೃ༄ 𝑹𝒊𝒏 𝑰𝒕𝒐𝒔𝒉𝒊 | 𝑺𝒉𝒂𝒅𝒐𝒘`𝑪𝒐𝒓𝒆 ༄*ೃ✦",
    "⋆｡ﾟ☁︎｡⋆ 𝚁 𝙸 𝙽 • 𝙸 𝚃 𝙾 𝚂 𝙷 𝙸 ⋆｡ﾟ☁︎｡⋆"
  ]
  global.channelRD = await getRandomChannel()

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