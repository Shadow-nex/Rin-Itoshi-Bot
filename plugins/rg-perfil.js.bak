import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, args, usedPrefix }) => {
  try {
    let userId =
      (m.quoted && m.quoted.sender) ||
      (m.mentionedJid && m.mentionedJid[0]) ||
      m.sender

    if (!global.db.data.users) global.db.data.users = {}
    if (!global.db.data.characters) global.db.data.characters = {}
    if (!global.db.data.users[userId]) global.db.data.users[userId] = {}

    const user = global.db.data.users[userId]
    const name = await conn.getName(userId).catch(() => userId.split('@')[0])

    // Datos básicos
    const cumpleanos = user.birth || 'Sin especificar :< (#setbirth)'
    const genero = user.genre || 'Sin especificar'
    const pareja = user.marry
    const casado = pareja
      ? (global.db.data.users[pareja]?.name ||
          (await conn.getName(pareja).catch(() => pareja.split('@')[0])))
      : 'Nadie'
    const description = user.description || 'Sin descripción :v'

    // Datos numéricos
    const exp = user.exp || 0
    const nivel = user.level || 0
    const coin = user.coin || 0
    const bank = user.bank || 0
    const totalCoins = coin + bank
    const country = user.country || 'Desconocido'
    const phone = new PhoneNumber(userId, 'PE').getNumber('international')

    // XP & ranking
    const sorted = Object.entries(global.db.data.users)
      .map(([k, v]) => ({ ...v, jid: k }))
      .sort((a, b) => (b.level || 0) - (a.level || 0))
    const rank = sorted.findIndex(u => u.jid === userId) + 1
    const xpData = xpRange(nivel, global.multiplier || 1)
    const porcentaje = Math.floor(
      ((exp - xpData.min) / (xpData.xp || 1)) * 100
    )
    const progreso = `${exp - xpData.min} / ${xpData.xp} (_${porcentaje}%_)`

    // Premium
    const prems = Array.isArray(global.prems) ? global.prems : []
    const premium =
      user.premium ||
      prems
        .map(v => v.replace(/\D+/g, '') + '@s.whatsapp.net')
        .includes(userId)
    const isLeft = premium
      ? user.premiumTime && user.premiumTime > Date.now()
        ? await formatTime(user.premiumTime - Date.now())
        : 'Permanente'
      : '—'

    // Harem y favoritos
    const favId = user.favorite
    const favLine =
      favId && global.db.data.characters?.[favId]
        ? `\n๑ Claim favorito » *${global.db.data.characters[favId].name || '???'}*`
        : ''
    const ownedIDs = Object.entries(global.db.data.characters)
      .filter(([, c]) => c.user === userId)
      .map(([id]) => id)
    const haremCount = ownedIDs.length
    const haremValue = ownedIDs.reduce((acc, id) => {
      const char = global.db.data.characters[id] || {}
      return acc + (typeof char.value === 'number' ? char.value : 0)
    }, 0)

    // Imagen del perfil
    const perfil =
      (await conn
        .profilePictureUrl(userId, 'image')
        .catch(_ =>
          'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'
        )) || 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'

    // Texto del perfil
    const profileText = `
🔮 𝐏𝐄𝐑𝐅𝐈𝐋 𝐂𝐎𝐒𝐌𝐈𝐂𝐎 🔮
✧ ˚₊ ⊹ Rin Itoshi Bot ⊹ ₊˚ ✧

🌟 *Identidad Estelar:* @${userId.split('@')[0]}
🌙 *Nombre Arcano:* ${name}
🌀 *Esencia Vital:* _${description}_

⚙️ 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 𝐄𝐒𝐏𝐈𝐑𝐈𝐓𝐔𝐀𝐋
🎂 *Edad Estelar:* ${user.age || 'Incierta'}
📆 *Ciclo Cósmico:* ${cumpleanos}
⚧️ *Polaridad:* ${genero}
💖 *Vínculo Álmico:* ${casado}
🌍 *Origen Estelar:* ${country}
📱 *Contacto:* ${phone}

✦ 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 ✦
🪙 *Monedas Cósmicas:* ${coin.toLocaleString()}
🏦 *Banco Cósmico:* ${bank.toLocaleString()}
🌷 *Nivel Dimensional:* ${nivel}
🌿 *Exp Cósmica:* ${exp.toLocaleString()}
➨ Progreso » *${progreso}*
# Puesto » *#${rank}*
🛡️ *Rango:* ${user.role || 'Sin Rango'}
🔮 *Premium Cósmico:* ${premium ? `🟢 Activo (*${isLeft}*)` : '🔴 Inactivo'}

ꕥ Harem » *${haremCount}*
♤ Valor total » *${haremValue.toLocaleString()}*${favLine}
❒ Coins totales » *${totalCoins.toLocaleString()}*
❒ Comandos totales » *${user.commands || 0}*
`

    // Envío del mensaje
    await conn.sendMessage(
      m.chat,
      {
        image: { url: perfil },
        caption: profileText.trim(),
        mentions: [userId],
        contextInfo: {
          externalAdReply: {
            title: '✧ Perfil Cósmico ✧',
            body: 'Conecta con tu energía estelar 🌠',
            thumbnailUrl: perfil,
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    )
  } catch (error) {
    console.error(error)
    await m.reply(
      `⚠️ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`
    )
  }
}

handler.help = ['profile']
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
handler.group = true

export default handler

async function formatTime(ms) {
  if (ms <= 0) return 'Expirado'
  let s = Math.floor(ms / 1000),
    m = Math.floor(s / 60),
    h = Math.floor(m / 60),
    d = Math.floor(h / 24)
  s %= 60
  m %= 60
  h %= 24
  let t = []
  if (d) t.push(`${d} día${d > 1 ? 's' : ''}`)
  if (h) t.push(`${h} hora${h > 1 ? 's' : ''}`)
  if (m) t.push(`${m} minuto${m > 1 ? 's' : ''}`)
  if (s) t.push(`${s} segundo${s > 1 ? 's' : ''}`)
  return t.length ? t.join(' y ') : 'Ahora mismo'
}