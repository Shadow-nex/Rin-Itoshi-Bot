import { searchWallpapers } from '../lib/wallpaper.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`✨ Ejemplo:\n${usedPrefix + command} Cars\n${usedPrefix + command} anime amoled`)
  }

  const walls = await searchWallpapers(text, { limit: 8, alwaysDifferent: true })
  if (!walls.length) return m.reply('😿 No encontré wallpapers, intenta con otro término.')

  const msg = walls.map((w, i) => `${i+1}. ${w.title}\n${w.url}`).join('\n\n')
  await conn.reply(m.chat, `🖼️ *resultado para:* ${text}\n\n${msg}`, m)
}
handler.help = ['wallpapers <texto>']
handler.tags = ['herramientas']
handler.command = /^wall(paper|papers|wp|walls)$/i

export default handler