
import 'dotenv/config'
import fetch from 'node-fetch'

/**
 * Busca wallpapers en delirius-apiofc con resultados siempre variados.
 * - Sazona la query con tags aleatorios (4k, neon, night, etc.)
 * - Baraja y aplica offset aleatorio para no repetir
 *
 * Requiere:
 *   DELIRIUS_API_BASE (opcional, default vercel)
 *   DELIRIUS_API_KEY  (si tu instancia la pide)
 */

const API_BASE = process.env.DELIRIUS_API_BASE?.replace(/\/+$/, '') 
  || 'https://delirius-apiofc.vercel.app'
const API_KEY  = process.env.DELIRIUS_API_KEY || ''

// Tags para variar resultados con la misma consulta
const SPICE_TAGS = [
  '4k', 'ultrawide', 'amoled', 'mobile', 'dark', 'neon', 'minimal',
  'night', 'sunset', 'street', 'retro', 'abstract', 'hdr', 'aesthetic'
]

/** Fisher–Yates shuffle */
function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Construye una query “picante” para variar */
function spiceQuery(q) {
  // 60% de las veces, agrega un tag aleatorio
  if (Math.random() < 0.6) {
    const tag = SPICE_TAGS[Math.floor(Math.random() * SPICE_TAGS.length)]
    return `${q} ${tag}`.trim()
  }
  // 20%: singular/plural/variaciones simples
  if (Math.random() < 0.5) {
    const variants = [q, q.replace(/\bcars\b/i, 'car'), q.replace(/\bcar\b/i, 'cars')]
    return variants[Math.floor(Math.random() * variants.length)]
  }
  return q
}

/**
 * @param {string} query - término a buscar, ej. "Cars"
 * @param {object} opts
 * @param {number} opts.limit - cuántos items devolver (default 8)
 * @param {boolean} opts.alwaysDifferent - fuerza variación agresiva (default true)
 * @returns {Promise<Array<{id?:string, title?:string, url:string, thumb?:string, width?:number, height?:number}>>}
 */
export async function searchWallpapers(query, opts = {}) {
  if (!query) throw new Error('Falta la query')

  const { limit = 8, alwaysDifferent = true } = opts
  const q = alwaysDifferent ? spiceQuery(query) : query

  const url = new URL(`${API_BASE}/search/wallpapers`)
  url.searchParams.set('q', q)
  if (API_KEY) url.searchParams.set('apikey', API_KEY) // por si la API usa query key

  const headers = {}
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}` // por si usa header

  const res = await fetch(url.toString(), { headers })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Delirius API fallo ${res.status}: ${text.slice(0, 200)}`)
  }

  const data = await res.json().catch(() => ({}))
  // Normaliza posibles formatos conocidos: {result:[]}, {data:[]}, array directo
  const items = Array.isArray(data) 
    ? data 
    : (data.result || data.results || data.data || [])

  if (!Array.isArray(items) || items.length === 0) return []

  // Baraja todo para evitar repetidos
  const mixed = shuffle(items)

  // Offset aleatorio si hay muchos resultados
  let offset = 0
  if (mixed.length > limit) {
    const hops = Math.max(1, Math.floor(mixed.length / limit))
    offset = Math.floor(Math.random() * Math.min(mixed.length - limit, hops * 2 + 1))
  }

  const slice = mixed.slice(offset, offset + limit)

  // Mapea a un formato limpio y predecible
  return slice.map((it) => ({
    id: it.id || it._id || it.slug || undefined,
    title: it.title || it.name || it.prompt || q,
    url: it.url || it.image || it.download || it.src || it.file || '',
    thumb: it.thumb || it.thumbnail || it.preview || it.small || it.cover || it.url || '',
    width: it.width || it.w || undefined,
    height: it.height || it.h || undefined
  })).filter(w => w.url)
}

// Ejemplo de uso simple:
if (process.argv[1] === new URL(import.meta.url).pathname) {
  (async () => {
    const out = await searchWallpapers('Cars', { limit: 8 })
    console.log(out)
  })().catch(err => {
    console.error('Error:', err.message)
    process.exit(1)
  })
}