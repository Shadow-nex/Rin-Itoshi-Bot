import { jidDecode } from '@whiskeysockets/baileys'
import path from 'path'
import fs from 'fs'

const handler = async (m, { conn, command, usedPrefix, text }) => {
  try {
    // --- VALIDACIÓN DE SUBBOTS ---
    const isSubBot = [conn.user.jid, ...global.owner.map(([num]) => `${num}@s.whatsapp.net`)].includes(m.sender)
    if (!isSubBot) {
      return m.reply(`✦ El comando *${command}* solo puede ser ejecutado por el *Socket*.`)
    }

    switch (command) {
      // --- MANEJO DE MODOS ---
      case 'self':
      case 'public':
      case 'gponly':
      case 'sologp':
      case 'antiprivate': {
        const config = global.db.data.settings[conn.user.jid] || {}
        const value = (text || '').trim().toLowerCase()

        // Detectar tipo de modo
        const type =
          /self|public/.test(command) ? command :
          /antiprivado|antiprivate/.test(command) ? 'antiPrivate' :
          /gponly|sologp/.test(command) ? 'gponly' : null

        if (!type) return m.reply(`⚠︎ Modo no reconocido.`)

        const isEnable = config[type] || false
        const enable = ['enable', 'on'].includes(value)
        const disable = ['disable', 'off'].includes(value)

        if (enable || disable) {
          if (isEnable === enable) {
            return m.reply(`❀ El modo *${type}* ya estaba ${enable ? 'activado' : 'desactivado'}.`)
          }
          config[type] = enable
          return conn.reply(m.chat, `✧ Has *${enable ? 'activado' : 'desactivado'}* el modo *${type}* para el *Socket*.`, m)
        }

        return conn.reply(m.chat, 
          `╭─〔 ⚙️ Configuración de Modo 〕─⬣\n` +
          `│ ✦ Modo: *${type}*\n` +
          `│ ✧ Estado: *${isEnable ? '✓ Activado' : '✗ Desactivado'}*\n` +
          `│\n` +
          `│ ➤ Activar:  ${usedPrefix + command} enable\n` +
          `│ ➤ Desactivar:  ${usedPrefix + command} disable\n` +
          `╰━━━━━━━━━━━━━━━━━━━━⬣`, m
        )
      }

      // --- CERRAR SESIÓN SUBBOT ---
      case 'logout': {
        const rawId = conn.user?.id || ''
        const cleanId = jidDecode(rawId)?.user || rawId.split('@')[0]

        const index = global.conns?.findIndex(c => c.user.jid === m.sender)

        if (global.conn.user.jid === conn.user.jid) {
          return conn.reply(m.chat, '⚠︎ Este comando no está disponible en la sesión principal.', m)
        }
        if (index === -1 || !global.conns[index]) {
          return conn.reply(m.chat, '⚠︎ La sesión ya está cerrada o no existe una conexión activa.', m)
        }

        conn.reply(m.chat, '❀ Tu sesión será cerrada en unos segundos...', m)

        setTimeout(async () => {
          try {
            await global.conns[index].logout()
            global.conns.splice(index, 1)

            // Eliminar carpeta de sesión
            const sessionPath = path.join(global.jadi, cleanId)
            if (fs.existsSync(sessionPath)) {
              fs.rmSync(sessionPath, { recursive: true, force: true })
              console.log(`✔ Sesión de ${cleanId} eliminada en: ${sessionPath}`)
            }
          } catch (err) {
            console.error(`Error cerrando sesión de ${cleanId}:`, err)
          }
        }, 3000)

        break
      }
    }
  } catch (e) {
    console.error(e)
    m.reply('Ocurrió un error al ejecutar el comando.')
  }
}

handler.command = ['self', 'public', 'gponly', 'sologp', 'antiprivate', 'logout']
handler.help = handler.command
handler.tags = ['socket']

export default handler