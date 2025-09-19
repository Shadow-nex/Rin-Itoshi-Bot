export async function before(m, { conn }) {

var canal = 'https://whatsapp.com/channel/0029VbApwZ9ISTkEBb6ttS3F'
var canal2 = 'https://whatsapp.com/channel/0029Vb6IdnEGU3BTahqaLL2V'
var canal3 = 'https://whatsapp.com/channel/0029VbBVnhSBlHpUWKo19m2m'
var api = 'https://api.stellarwa.xyz'
var git = 'https://github.com/DevAlexJs'
var md = 'https://github.com/DevAlexJs/SakuraBot-MD'

globalThis.redes33 = [canal, canal2, canal3, api, git, md].getRandom()

  const canales = Object.entries(global.my)
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

const channelRD = canales[Math.floor(Math.random() * canales.length)]

global.fake2 = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '0', newsletterName: channelRD.nombre, }, externalAdReply: { showAdAttribution: true, title: packname, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icon, sourceUrl: redes33, mediaType: 1, renderLargerThumbnail: false }}}

global.rcanal = {
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