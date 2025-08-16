import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
const { default: baileys } = await import('@whiskeysockets/baileys')
const { generateWAMessageFromContent, proto } = baileys

// --- MENU DEFAULT ---
const defaultMenu = {
  before: `
╭━━〔 *MENU ADMINIS* 〕━━⬣
┃ 🧪 HOLA "%name" ☘️
┃ 🧹 MENU PARA GESTIONAR GRUPOS..
╰━━━━━━━━━━━━━━━━⬣

> ғᴜɴᴄɪᴏɴᴇs ᴘᴀʀᴀ ɢʀᴜᴘᴏs.
%readmore
`.trim(),
  header: '╭─〔 %category 〕',
  body: '┃ %cmd',
  footer: '╰───────────────⬣\n',
  after: ''
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let tags = {
      'grupo': ' `CONFIGURACIÓN` ',
      'nable': ' `ON / OFF` ',
    }
    let img = 'https://files.catbox.moe/nmseef.png'
    let tag = `@${m.sender.split('@')[0]}`
    let name = await conn.getName(m.sender)

    // --- TIEMPO Y FECHA ---
    let d = new Date()
    let week = d.toLocaleDateString('es', { weekday: 'long' })
    let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
    let time = d.toLocaleTimeString('en-US', { hour12: true }) // → 01:54:20 PM
    let ucpn = ucapan()

    // --- UPTIME ---
    let uptime = clockString(process.uptime() * 1000)

    // --- USUARIO ---
    let { exp, limit, level, role, registered, premiumTime } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let prems = premiumTime > 0 ? 'Premium' : 'Usuario común'
    let platform = os.platform()

    // --- INFO BOT ---
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(u => u.registered).length
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(() => '{}')) || {}

    // --- PLUGINS DISPONIBLES ---
    let help = Object.values(global.plugins)
      .filter(p => !p.disabled)
      .map(p => ({
        help: Array.isArray(p.tags) ? p.help : [p.help],
        tags: Array.isArray(p.tags) ? p.tags : [p.tags],
        prefix: 'customPrefix' in p,
        limit: p.limit,
        premium: p.premium,
      }))

    let groups = {}
    for (let t in tags) groups[t] = help.filter(p => p.tags.includes(t))

    // --- CONSTRUCCIÓN DE MENÚ ---
    let menuText = [
      defaultMenu.before.replace(/%name/g, name),
      ...Object.keys(tags).map(t =>
        defaultMenu.header.replace(/%category/g, tags[t]) + '\n' +
        groups[t].map(plugin =>
          plugin.help.map(cmd =>
            defaultMenu.body
              .replace(/%cmd/g, plugin.prefix ? cmd : _p + cmd)
              .replace(/%islimit/g, plugin.limit ? '🔒' : '')
              .replace(/%isPremium/g, plugin.premium ? '⭐' : '')
          ).join('\n')
        ).join('\n') +
        '\n' + defaultMenu.footer
      ),
      defaultMenu.after
    ].join('\n')

    // --- REEMPLAZOS ---
    let replace = {
      '%': '%',
      p: uptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage || '[sin github]',
      tag, name, prems, level, limit, week, date, time, totalreg, rtotalreg, role,
      ucpn, platform, readmore: readMore
    }

    let text = menuText.replace(
      new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'),
      (_, k) => '' + replace[k]
    )

    await m.react('⚙️')
    await conn.sendMessage(m.chat, {
      text,
      contextInfo: {
        externalAdReply: {
          title: 'MENU GRUPOS',
          body: dev,
          thumbnailUrl: img,
          sourceUrl: channel,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    conn.reply(m.chat, 'Lo siento, el menú tiene algún error.', m)
    throw e
  }
}

handler.help = ['menugp (Menu Para Gestionar Grupos)']
handler.tags = ['menus']
handler.command = ['menugp', 'menugrupo', 'menuadmin']
export default handler

// --------- FUNCIONES UTILES ---------
const readMore = String.fromCharCode(8206).repeat(4001)

function clockString(ms) {
  if (isNaN(ms)) return '--:--:--'
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  let hour = +moment.tz('America/Lima').format('HH')
  if (hour < 4) return "Despierto tan temprano? 🥱"
  if (hour < 10) return "Madrugada 🌄"
  if (hour < 15) return "Mañana ☀️"
  if (hour < 18) return "Tarde 🌇"
  return "Noche 🌙"
}