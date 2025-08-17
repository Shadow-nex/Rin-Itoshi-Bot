// plugins/logo.js
// ╭─『 Rin Itoshi 』─⬣  LOGO MAKER (sin APIs)
// Requiere: npm i canvas

import { createCanvas, registerFont } from 'canvas'

// ====== REGISTRA FUENTES (opcional: ajusta a las que tengas en tu proyecto) ======
try {
  // Asegúrate de que existan estos TTF en ./assets/fonts/
  registerFont('./assets/fonts/Poppins-ExtraBold.ttf', { family: 'PoppinsXBold' })
  registerFont('./assets/fonts/Montserrat-Bold.ttf', { family: 'MontserratBold' })
  registerFont('./assets/fonts/Poppins-Regular.ttf', { family: 'PoppinsReg' })
} catch (e) {
  // Si no hay fuentes, canvas usará sans-serif por defecto
  console.warn('⚠️ No se encontraron algunas fuentes. Usando fuentes del sistema.')
}

// ====== ESTILOS DISPONIBLES ======
const STYLES = [
  'neon',
  'gradient',
  'chrome',
  'glitch',
  'outline',
  'shadow',
  '3d',
  'sticker'
]

// ====== UTILIDADES ======
const fitFont = (ctx, text, maxWidth, baseSize = 150, minSize = 24, step = 2, fontFamily = 'PoppinsXBold') => {
  let size = baseSize
  do {
    ctx.font = `${size}px "${fontFamily}", "MontserratBold", "PoppinsReg", sans-serif`
    if (ctx.measureText(text).width <= maxWidth || size <= minSize) break
    size -= step
  } while (size > minSize)
  return size
}

const drawGradientText = (ctx, text, x, y, maxWidth, fontFamily) => {
  const size = fitFont(ctx, text, maxWidth, 160, 28, 2, fontFamily)
  ctx.font = `${size}px "${fontFamily}", sans-serif`
  const metrics = ctx.measureText(text)
  const g = ctx.createLinearGradient(x - metrics.width * 0.1, y - size, x + metrics.width * 1.1, y + size)
  g.addColorStop(0, '#00F0FF')
  g.addColorStop(0.5, '#7A5CFF')
  g.addColorStop(1, '#FF4E98')
  ctx.fillStyle = g
  ctx.strokeStyle = 'rgba(0,0,0,0.35)'
  ctx.lineWidth = Math.max(4, size * 0.06)
  ctx.strokeText(text, x, y)
  ctx.fillText(text, x, y)
}

const drawNeon = (ctx, text, x, y, maxWidth, fontFamily) => {
  const size = fitFont(ctx, text, maxWidth, 170, 28, 2, fontFamily)
  ctx.font = `${size}px "${fontFamily}", sans-serif`
  ctx.fillStyle = '#ffffff'
  // Glow
  ctx.shadowColor = '#00e6ff'
  ctx.shadowBlur = Math.max(20, size * 0.35)
  ctx.fillText(text, x, y)
  // Borde leve
  ctx.shadowBlur = 0
  ctx.lineWidth = Math.max(3, size * 0.05)
  ctx.strokeStyle = 'rgba(0,230,255,0.7)'
  ctx.strokeText(text, x, y)
}

const drawChrome = (ctx, text, x, y, maxWidth, fontFamily) => {
  const size = fitFont(ctx, text, maxWidth, 150, 26, 2, fontFamily)
  ctx.font = `${size}px "${fontFamily}", sans-serif`
  // Simulación de chrome: gradiente metálico + brillo
  const metrics = ctx.measureText(text)
  const g = ctx.createLinearGradient(0, y - size, 0, y + size * 0.3)
  g.addColorStop(0, '#dfe6ec')
  g.addColorStop(0.3, '#9aa5ad')
  g.addColorStop(0.5, '#ffffff')
  g.addColorStop(0.75, '#8a949b')
  g.addColorStop(1, '#c9d1d8')
  ctx.fillStyle = g
  ctx.strokeStyle = '#1f2326'
  ctx.lineWidth = Math.max(3, size * 0.05)
  ctx.strokeText(text, x, y)
  ctx.fillText(text, x, y)
  // Brillo superior
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = 'rgba(255,255,255,0.25)'
  ctx.fillRect(x, y - size * 0.95, metrics.width, size * 0.35)
  ctx.globalCompositeOperation = 'source-over'
}

const drawOutline = (ctx, text, x, y, maxWidth, fontFamily) => {
  const size = fitFont(ctx, text, maxWidth, 160, 26, 2, fontFamily)
  ctx.font = `${size}px "${fontFamily}", sans-serif`
  ctx.lineWidth = Math.max(6, size * 0.08)
  ctx.strokeStyle = '#000000'
  ctx.strokeText(text, x, y)
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, x, y)
}

const drawShadow = (ctx, text, x, y, maxWidth, fontFamily) => {
  const size = fitFont(ctx, text, maxWidth, 160, 26, 2, fontFamily)
  ctx.font = `${size}px "${fontFamily}", sans-serif`
  ctx.shadowColor = 'rgba(0,0,0,0.6)'
  ctx.shadowBlur = Math.max(8, size * 0.15)
  ctx.shadowOffsetX = Math.max(6, size * 0.08)
  ctx.shadowOffsetY = Math.max(6, size * 0.08)
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, x, y)
  ctx.shadowBlur = 0
}

const draw3D = (ctx, text, x, y, maxWidth, fontFamily) => {
  const size = fitFont(ctx, text, maxWidth, 150, 24, 2, fontFamily)
  ctx.font = `${size}px "${fontFamily}", sans-serif`
  const depth = Math.max(6, Math.floor(size * 0.12))
  // Extrusión
  ctx.fillStyle = '#1a1a1a'
  for (let i = depth; i > 0; i--) {
    ctx.fillText(text, x + i, y + i)
  }
  // Cara frontal
  const g = ctx.createLinearGradient(x, y - size, x, y + size)
  g.addColorStop(0, '#7A5CFF')
  g.addColorStop(1, '#00F0FF')
  ctx.fillStyle = g
  ctx.fillText(text, x, y)
}

const drawSticker = (ctx, text, x, y, maxWidth, fontFamily) => {
  const size = fitFont(ctx, text, maxWidth, 140, 22, 2, fontFamily)
  ctx.font = `${size}px "${fontFamily}", sans-serif`
  ctx.lineWidth = Math.max(10, size * 0.16)
  ctx.strokeStyle = '#ffffff'
  ctx.fillStyle = '#111111'
  ctx.strokeText(text, x, y)
  ctx.fillText(text, x, y)
}

const drawGlitch = (ctx, text, x, y, maxWidth, fontFamily) => {
  const size = fitFont(ctx, text, maxWidth, 150, 26, 2, fontFamily)
  ctx.font = `${size}px "${fontFamily}", sans-serif`
  // Base
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, x, y)
  // Channels desplazados
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = 'rgba(255,0,0,0.7)'
  ctx.fillText(text, x + 3, y - 2)
  ctx.fillStyle = 'rgba(0,255,255,0.7)'
  ctx.fillText(text, x - 3, y + 2)
  ctx.globalCompositeOperation = 'source-over'
}

// ====== RENDER GENERAL ======
const renderLogo = async ({
  text1 = 'Rin Itoshi',
  text2 = '',
  style = 'neon',
  bg = '#0b0f14',
  w = 1600,
  h = 900,
  padding = 80,
  fontFamily = 'PoppinsXBold'
}) => {
  const canvas = createCanvas(w, h)
  const ctx = canvas.getContext('2d')

  // Fondo
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Decor suave (bokeh)
  const radial = ctx.createRadialGradient(w * 0.3, h * 0.3, 0, w * 0.3, h * 0.3, Math.max(w, h))
  radial.addColorStop(0, 'rgba(122,92,255,0.25)')
  radial.addColorStop(0.5, 'rgba(0,240,255,0.15)')
  radial.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = radial
  ctx.fillRect(0, 0, w, h)

  // Área útil
  const maxW = w - padding * 2
  const centerX = padding
  let baseY = h * 0.5

  const drawByStyle = (txt, y) => {
    switch (style) {
      case 'neon':    return drawNeon(ctx, txt, centerX, y, maxW, fontFamily)
      case 'gradient':return drawGradientText(ctx, txt, centerX, y, maxW, fontFamily)
      case 'chrome':  return drawChrome(ctx, txt, centerX, y, maxW, fontFamily)
      case 'glitch':  return drawGlitch(ctx, txt, centerX, y, maxW, fontFamily)
      case 'outline': return drawOutline(ctx, txt, centerX, y, maxW, fontFamily)
      case 'shadow':  return drawShadow(ctx, txt, centerX, y, maxW, fontFamily)
      case '3d':      return draw3D(ctx, txt, centerX, y, maxW, fontFamily)
      case 'sticker': return drawSticker(ctx, txt, centerX, y, maxW, fontFamily)
      default:        return drawNeon(ctx, txt, centerX, y, maxW, fontFamily)
    }
  }

  if (text2) {
    // dos líneas
    drawByStyle(text1, baseY - 40)
    // línea 2 un poco más pequeña
    const prev = ctx.font
    ctx.font = `48px "${fontFamily}", sans-serif`
    drawByStyle(text2, baseY + 80)
    ctx.font = prev
  } else {
    drawByStyle(text1, baseY + 20)
  }

  // Marca sutil
  ctx.globalAlpha = 0.6
  ctx.font = `22px "PoppinsReg", sans-serif`
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.fillText('Rin Itoshi • LogoMaker', padding, h - padding * 0.4)
  ctx.globalAlpha = 1

  return canvas.toBuffer('image/png')
}

// ====== HANDLER DEL COMANDO ======
let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Formatos:
  // .logo <estilo>|<texto>
  // .logo <estilo>|<texto principal>|<texto secundario>
  // .logo estilos
  try {
    if (!args[0]) {
      return m.reply(
        `╭─『 𝙇𝙤𝙜𝙤 𝙈𝙖𝙠𝙚𝙧 』─⬣
│  Usa:
│  ${usedPrefix + command} *estilo|texto*
│  ${usedPrefix + command} *estilo|texto1|texto2*
│
│  Estilos: ${STYLES.map(s=>`*${s}*`).join(', ')}
╰──────────────⬣`
      )
    }

    const raw = args.join(' ')
    if (/^estilos?$/i.test(raw)) {
      return m.reply(`✨ *Estilos disponibles:*\n${STYLES.map(s => `• ${s}`).join('\n')}`)
    }

    const parts = raw.split('|').map(s => s.trim()).filter(Boolean)
    const style = (parts[0] || 'neon').toLowerCase()
    if (!STYLES.includes(style)) {
      return m.reply(`❌ Estilo no válido.\nEstilos: ${STYLES.join(', ')}`)
    }

    const text1 = parts[1] || parts[0] // si no ponen estilo, toma primer texto
    const text2 = parts[2] || ''

    if (!text1) return m.reply('💬 Escribe el texto del logo. Ej: *.logo neon|Rin Itoshi*')

    await m.react('🎨')

    const png = await renderLogo({
      text1,
      text2,
      style,
      // Puedes exponer más opciones, por ahora queda fijo:
      bg: '#0b0f14',
      w: 1600,
      h: 900,
      padding: 80,
      fontFamily: 'PoppinsXBold'
    })

    await conn.sendMessage(
      m.chat,
      {
        image: png,
        caption: `✅ *Logo creado*\n• Estilo: *${style}*\n• Texto: *${text1}${text2 ? ' | ' + text2 : ''}*`
      },
      { quoted: m }
    )
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('⚠️')
    m.reply('❌ Ocurrió un error creando el logo. Revisa que tengas instalado `canvas` y (opcional) las fuentes.')
  }
}

handler.help = ['logo <estilo>|<texto>[|texto2]', 'logo estilos']
handler.tags = ['tools', 'logo', 'media']
handler.command = ['logo']
export default handler