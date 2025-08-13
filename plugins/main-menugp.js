/*import { promises as fsPromises } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import moment from 'moment-timezone';
import os from 'os';
import { publicIpv4 } from 'public-ip';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const defaultMenu = {
  before: `
╭─⊰〔 ⚙️ *MENÚ ADMINISTRACIÓN* ⚙️ 〕⊱─╮
│  ${'%ucpn'}  —  ${'%week'}, ${'%date'}
│  𝙷𝙾𝙻𝙰 ✦ ${'%name'} ✦
│  Modo: *${'%mode'}*  |  Rol: *${'%role'}*
│  Estado: *${'%prems'}*  |  Uptime: *${'%uptime'}*
╰─────────────────────────────⬣
%readmore
`.trimStart(),
  header: `╭─〔 %category 〕─╮`,
  body: `│ ⌬ %cmd %islimit %isPremium`,
  footer: `╰────────────────⬣\n`,
  after: `\n✨ *Mantén tu grupo en orden con Rin Itoshi Bot* ✨`
};

let handler = async (m, { conn, args, command }) => {
  try {
    const d = new Date(Date.now());
    const locale = 'es';
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    const ucpn = ucapan();
    const name = await conn.getName(m.sender);
    const mode = global.opts['self'] ? 'Privado' : 'Público';
    const { level, exp, limit, premiumTime } = global.db.data.users[m.sender];
    const prems = premiumTime > 0 ? 'Premium' : 'Usuario común';
    const uptime = clockString(process.uptime() * 1000);

    let ipPublic = 'No disponible';
    try {
      ipPublic = await publicIpv4();
    } catch (err) {
      console.error('Error al obtener IP pública:', err);
    }

    let clima = 'No disponible';
    try {
      const API_KEY = 'TU_OPENWEATHERMAP_API_KEY';
      const ciudad = 'Buenos Aires';
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);
      if (resp.ok) {
        const data = await resp.json();
        const desc = data.weather[0].description;
        const temp = data.main.temp;
        clima = `${desc}, ${temp}°C`;
      }
    } catch (err) {
      console.error('Error al obtener clima:', err);
    }

    const before = defaultMenu.before;
    const header = defaultMenu.header;
    const body = defaultMenu.body;
    const footer = defaultMenu.footer;
    const after = defaultMenu.after;

    const help = Object.values(global.plugins)
      .filter(p => !p.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium
      }));
    const tags = { 'grupo': ' `CONFIGURACIÓN` ' };
    const groups = {};
    for (let tag in tags) groups[tag] = help.filter(p => p.tags.includes(tag));

    const menuText = [
      before,
      ...Object.keys(tags).map(tag => {
        const cat = tags[tag];
        const list = groups[tag].map(plugin =>
          plugin.help.map(h => body.replace(/%cmd/g, plugin.prefix ? h : usedPrefix + h)
            .replace(/%islimit/g, plugin.limit ? ' (limitado)' : '')
            .replace(/%isPremium/g, plugin.premium ? ' (premium)' : '')
          ).join('\n')
        ).join('\n');
        return header.replace(/%category/g, cat) + '\n' + list + '\n' + footer;
      }),
      `${after}\nIP Pública: ${ipPublic}\nClima en BA: ${clima}`
    ].join('\n');

    await conn.sendMessage(m.chat, {
      text: menuText,
      contextInfo: {
        externalAdReply: {
          title: '📜 Menú Grupo',
          body: `${name} • ${week}, ${date}`,
          thumbnailUrl: icono,
          sourceUrl: logo
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, 'Lo siento, ocurrió un error al generar el menú.', m);
  }
};

handler.help = ['menugp', 'menugrupo', 'menuadmin']
handler.tags = ['menus']
handler.command = ['menugp', 'menugrupo', 'menuadmin']

export default handler

function ucapan() {
  const h = parseInt(moment.tz('America/Lima').format('HH'));
  if (h >= 18) return "Noche 🌙";
  if (h >= 15) return "Tarde 🌇";
  if (h >= 10) return "Mañana ☀️";
  if (h >= 4) return "Madrugada 🌄";
  return "¿Despierto tan temprano? 🥱";
}

function clockString(ms) {
  if (isNaN(ms)) return '-- H -- M -- S';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return `${h} H ${m} M ${s} S`;
}