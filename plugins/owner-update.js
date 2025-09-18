import { execSync } from 'child_process'

var handler = async (m, { conn, text, isMods }) => {
  if (!isMods) return
  try {
    await m.react('🕒')

    let stdout
    try {
      stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''), { stdio: 'pipe' })
    } catch (err) {
      stdout = err.stdout || ''
      console.error('Error al hacer git pull:', err.message)
    }

    let messager = stdout.toString().trim()
    if (!messager) messager = '❀ No hay actualizaciones disponibles o ocurrió un error al comprobarlas.'

    if (messager.includes('❀ Ya está cargada la actualización.')) messager = '❀ Los datos ya están actualizados a la última versión.'
    if (messager.includes('ꕥ Actualizando.')) messager = '❀ Procesando, espere un momento mientras me actualizo.\n\n' + messager

    await conn.reply(m.chat, messager, m)
    await m.react('✔️')

  } catch (error) {
    console.error(error)
    let errorMessage = '⚠︎ Ocurrió un error inesperado.'
    if (error.message) errorMessage += '\n⚠︎ Mensaje de error: ' + error.message
    try { await conn.reply(m.chat, errorMessage, m) } catch {}
    try { await m.react('✖️') } catch {}
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix', 'actualizar']

export default handler