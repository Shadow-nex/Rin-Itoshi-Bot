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
  
  global.icons = [
    'https://files.catbox.moe/ceotf9.jpg',
    'https://files.catbox.moe/fft2hr.jpg',
    'https://files.catbox.moe/i97oje.jpg',
    'https://files.catbox.moe/js2plu.jpg',
    'https://d.uguu.se/GmSLPtrU.png',
    'https://h.uguu.se/kbNQSQxM.jpg',
    'https://h.uguu.se/wzOFAoph.png',
    'https://h.uguu.se/UGUwjmCs.jpg',
    'https://n.uguu.se/vqJnHBPm.jpg',
    'https://n.uguu.se/DlsupQkP.jpg',
    'https://i.pinimg.com/originals/e0/98/ba/e098bac73c8ae72243f66c7bf712045a.jpg'
  ].getRandom()
  
  var canal = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'  
  var comunidad = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
  var git = 'https://github.com/Yuji-XDev'
  var github = 'https://github.com/Yuji-XDev/Rin-Itoshi-Bot'
  let correo = 'blackoficial2025@gmail.com'
  global.reds = [canal, comunidad, git, github, correo].getRandom()

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
        thumbnail: icons, 
        sourceUrl: reds, 
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