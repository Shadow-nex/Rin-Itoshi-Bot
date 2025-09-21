import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
try {
let res = await fetch('https://api.github.com/repos/Yuji-XDev/Rin-Itoshi-Bot')

if (!res.ok) throw new Error('Error al obtener datos del repositorio')
let json = await res.json()

let txt = `⼢ ⃘𐇽.    𝗦𝗖𝗥𝗜𝗣𝗧  •  𝗜𝗡𝗙𝗢  ଘ(੭*ˊᵕˋ)੭\n`
txt += `> ❐ *Nombre:* ${json.name}\n`
txt += `> ✿ *Visitas:* ${json.watchers_count}\n`
txt += `> 𔓕 *Peso:* ${(json.size / 1024).toFixed(2)} MB\n`
txt += `> ❀ *Actualizado:* ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
txt += `> ✰ *Url:* ${json.html_url}\n`
txt += `> ✦ *Forks:* ${json.forks_count}\n`
txt += `> ⬣ *Stars:* ${json.stargazers_count}\n`
txt += `> *${dev}*`

await conn.sendMessage(m.chat, {text: txt, contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterName: channelRD.name, newsletterJid: channelRD.id, }, externalAdReply: { title: packname, body: dev, thumbnailUrl: 'https://files.catbox.moe/3bmdrm.jpg', sourceUrl: redes, mediaType: 1, renderLargerThumbnail: true }}}, {quoted: m})

} catch {
await conn.reply(m.chat, `${msm} Ocurrió un error.`, m)
await m.react(error)
}}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true

export default handler