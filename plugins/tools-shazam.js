import fs from 'fs'
import acrcloud from 'acrcloud'

let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!/audio|video/.test(mime)) {
return m.reply(`*${xtools} Por favor, responde a un audio o video para identificar la música.*`)
}

let file = ''
try {
await m.react('⚡')

let media = await q.download()  
if (!media) throw '*✖️ No se pudo descargar el archivo de audio/video.*'  

let dur = (q.seconds || 5)
if (dur < 5) return m.reply('*⚠️ El audio/video debe durar al menos 5 segundos.*')
if (dur > 20) return m.reply('*⚠️ El archivo que carga es demasiado grande. Sugerimos que lo recorte a 10–20 segundos. Esa duración es suficiente para identificar la música.*')

let ext = mime.split('/')[1]  
if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')  
file = `./tmp/${m.sender}-${Date.now()}.${ext}`  
fs.writeFileSync(file, media)  

let buffer = await fs.promises.readFile(file)  
let res = await acr.identify(buffer)  
let { code, msg } = res.status  

if (code !== 0) {  
  if (msg.toLowerCase().includes('no result')) {  
    throw '*⚠️ No se encontró ninguna coincidencia de música.*\n*Asegúrate de que el audio o vídeo esté claro y sin ruido.*'  
  }  
  throw `*✖️ Error del servidor ACRCloud:* ${msg}`  
}  

if (!res.metadata?.music?.length) {  
  throw '*⚠️ No se encontró ninguna coincidencia de música.*'  
}  

let info = res.metadata.music[0]  
let { title, artists, album, genres, release_date } = info  

let txt = `
\`\`\`乂 RESULTADO - ACRCLOUD\`\`\`

≡ 🌴 *Título:* ${title}
≡ 👤 *Artista:* ${artists?.map(v => v.name).join(', ') || 'Desconocido'}
≡ 🌿 *Álbum:* ${album?.name || 'Desconocido'}
≡ 🌵 *Género:* ${genres?.map(v => v.name).join(', ') || 'Desconocido'}
≡ 🌳 *Lanzamiento:* ${release_date || 'Desconocido'}
`.trim()

m.reply(txt)

} catch (e) {
let msg = typeof e === 'string' ? e : `*✖️ Error:* ${e.message || e}`
m.reply(msg)
} finally {
if (file) {
try { fs.unlinkSync(file) }
catch (e) { console.error('Error eliminando archivo temporal:', e) }
}
}
}
handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
handler.register = true;

export default handler;

