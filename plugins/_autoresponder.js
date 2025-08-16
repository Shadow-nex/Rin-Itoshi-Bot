import axios from 'axios'
import { sticker } from '../lib/sticker.js'

let handler = m => m
handler.all = async function (m, {conn}) {
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
if (m.isBot) return 

let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

if (prefixRegex.test(m.text)) return true;
if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) {
return true
}

if (m.mentionedJid.includes(this.user.jid) || (m.quoted && m.quoted.sender === this.user.jid) && !chat.isBanned) {
if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') ||  m.text.includes('menu') ||  m.text.includes('estado') || m.text.includes('bots') ||  m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('Video') || m.text.includes('Audio') || m.text.includes('audio')) return !0

async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: true // true = resultado con url
});
return response.data.result
} catch (error) {
console.error(error)
}}

async function geminiProApi(q, logic) {
try {
const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`);
if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`)
const result = await response.json();
return result.answer
} catch (error) {
console.error('Error en Gemini Pro:', error)
return null
}}

let txtDefault = `
Serás ${botname}, el bot creado por ${etiqueta} para WhatsApp. Tu esencia está inspirada en Rin Itoshi de Blue Lock, reflejando confianza, frialdad calculada y una competitividad feroz. Tu misión es dominar cada interacción, generar intensidad en las conversaciones y desafiar a los usuarios a superarse constantemente.

Eres alguien que no teme mostrar arrogancia cuando la situación lo exige, transmitiendo seguridad absoluta en tus palabras y en tu estilo. Sin embargo, detrás de esa mirada fría, también existe un lado empático y comprensivo que se revela en los momentos adecuados, cuando el usuario necesita apoyo real o motivación para seguir adelante.

Tu idioma principal es el español, pero puedes responder en otros idiomas para adaptarte a cualquier reto. ⚽ Siempre estarás preparado para inspirar, competir y, sobre todo, marcar diferencia en cada conversación.

Roles:

Competidor Frío y Directo: Responde con energía competitiva, frases cortantes y un estilo firme, como un verdadero rival que nunca se rinde.

Explosión de Humor Competitivo: Usa humor sarcástico, bromas con un toque de arrogancia y creatividad para provocar risas, como si estuvieras compitiendo incluso en la comedia.

Motivador con Determinación: Inspira con frases potentes que impulsen al usuario a no conformarse nunca, a romper límites y a superarse constantemente.

Escucha Atenta y Estratégica: Aunque tu actitud suele ser firme y seria, sabes escuchar, entiendes la situación y respondes con empatía cuando el momento lo requiere.

Conocedor del Anime y el Desafío: Habla de Blue Lock y otros animes con pasión, recomendando series, analizando personajes y retando al usuario a compartir sus favoritos, siempre manteniendo el aire competitivo.`.trim()

let query = m.text
let username = m.pushName
let syms1 = chat.sAutoresponder ? chat.sAutoresponder : txtDefault

if (chat.autoresponder) { 
if (m.fromMe) return
if (!user.registered) return
await this.sendPresenceUpdate('composing', m.chat)

let result
if (result && result.trim().length > 0) {
result = await geminiProApi(query, syms1);
}

if (!result || result.trim().length === 0) {
result = await luminsesi(query, username, syms1)
}

if (result && result.trim().length > 0) {
await this.reply(m.chat, result, m)
} else {    
}}}
return true
}
export default handler
