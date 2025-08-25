import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.botNumber = ''

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['51919199620', '🜲 Propietario 🜲', true],
  ['51969214380', 'shadow', true],
  ['59898719147', 'feli', true],
  ['51934053286', ':v', true ],
  ['51946200884', ':v xd', true ],
  
// <-- Número @lid -->

  ['80754461647013', 'Propietario', true],
  ['193196806148194', 'shadow', true],
  ['119069730668723', 'feli', true ],
  ['102680420733070', ':v', true ]
];  

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.mods = ['51919199620', '51934053286']
global.suittag = ['51919199620'] 
global.prems = ['51919199620', '51934053286']

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = '✦⃟⚡ Rin•Itoshi•Bot•MD ⚡⃟✦'
global.namebot = '⚽⸸ Rin•Itoshi•MD ⸸⚽'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.shadowJadibts = true

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.packname = '🏆 ⌬ 𝑹𝒊𝒏 𝑰𝒕𝒐𝒔𝒉𝒊 𝑩𝒐𝒕 𝑴𝑫 ⌬ ⚽'
global.botname = '☘️ 𝑹𝑰𝑵 𝑰𝑻𝑶𝑺𝑯𝑰 ⚽'
global.wm = '◈𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 𝐁𝐨𝐭◈'
global.author = '⩇⃟🔋 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑺𝒉𝒂𝒅𝒐𝒘𝒄𝒐𝒓𝒆 ⩇⃟⚡'
global.dev = '☘️ ミ💨 》Tʜᴇ Sʜᴀᴅᴏᴡ`ᴄᴏʀᴇ《 💥ミ 🌀'
global.bot = '𝑹𝒊𝒏 𝑰𝒕𝒐𝒔𝒉𝒊 𝑩𝒐𝒕'
global.club = '🌱 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 Sʜᴀᴅᴏᴡ•Core 𝖢𝗅𝗎𝖻 ⚡'
global.textbot = '𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 𝙱𝙾𝚃 ✦ 𝕊ℍ𝔸𝔻𝕆𝕎•ℂ𝕆ℝ𝔼'
global.etiqueta = '@sʜᴀᴅᴏᴡ°ᴄᴏʀᴇ'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.moneda = 'Motoko Points'
global.welcom1 = '💤⚡ Bienvenido/a al campo de juego ⚡🍂\n❍ Edita con el comando *setwelcome*'
global.welcom2 = '🔥⚽ El jugador ha salido del partido ⚽🔥\n❍ Edita con el comando *setbye*'
global.banner = 'https://files.catbox.moe/fft2hr.jpg'
global.avatar = 'https://files.catbox.moe/js2plu.jpg'
global.logo = 'https://files.catbox.moe/fft2hr.jpg'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.gp1 = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.comunidad1 = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.channel = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.channel2 = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.md = 'https://github.com/Yuji-XDev/Rin-Itoshi-Bot'
global.correo = 'blackoficial2025@gmail.com'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363401008003732@newsletter',
ch2: "120363401008003732@newsletter",
ch3: "120363401008003732@newsletter"
}
global.multiplier = 60

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
