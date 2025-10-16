import fs from "fs"
import path from "path"

async function autoReconnectSubBots() {
  try {
    const jadiPath = path.join('./', `${jadi}/`)
    if (!fs.existsSync(jadiPath)) return console.log('⚙️ No hay carpeta de subbots, se omite autoconexión.')

    const subDirs = fs.readdirSync(jadiPath).filter(dir => fs.existsSync(path.join(jadiPath, dir, 'creds.json')))
    if (!subDirs.length) return console.log('📭 No hay subbots guardados para reconectar.')

    console.log(`🔁 Reconectando automáticamente ${subDirs.length} subbot(s)...`)
    for (const id of subDirs) {
      try {
        const pathshadowJadiBot = path.join(jadiPath, id)
        await shadowJadiBot({
          pathshadowJadiBot,
          m: {},
          conn: global.conn || {},
          args: [],
          usedPrefix: '',
          command: 'qr',
          fromCommand: false
        })
        console.log(`✅ Subbot ${id} reconectado correctamente.`)
        await new Promise(r => setTimeout(r, 3000))
      } catch (err) {
        console.error(`❌ Error al reconectar subbot ${id}:`, err.message)
      }
    }
  } catch (err) {
    console.error('❌ Error general en autoconexión de subbots:', err)
  }
}

setTimeout(autoReconnectSubBots, 7000)