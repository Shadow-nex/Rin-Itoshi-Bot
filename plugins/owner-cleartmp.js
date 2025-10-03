import { tmpdir } from 'os'
import path, { join } from 'path'
import { readdirSync, statSync, unlinkSync, existsSync } from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => { 
  const emoji = '✅'
  conn.reply(m.chat, `${emoji} Realizado, ya se ha eliminado los archivos de la carpeta tmp`, m)

  const tmp = [tmpdir(), join(__dirname, '../tmp')]
  const filename = []

  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))

  filename.forEach(file => {
    try {
      if (existsSync(file)) {
        const stats = statSync(file)
        if (stats.isFile()) unlinkSync(file)
      }
    } catch (e) {
      console.error(`No se pudo borrar ${file}:`, e.message)
    }
  })
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = ['cleartmp', 'borrartmp', 'borrarcarpetatmp', 'vaciartmp']
handler.rowner = true

export default handler