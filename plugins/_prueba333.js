import fetch from 'node-fetch';
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

// Función para decorar texto con fuentes
const decorate = (text, style = 'bold') => {
  switch(style) {
    case 'bold': return `*${text}*`;
    case 'italic': return `_${text}_`;
    case 'fancy': 
      return text
        .split('')
        .map(c => {
          if(c === ' ') return ' ';
          const code = c.toUpperCase().charCodeAt(0);
          if(code < 65 || code > 90) return c;
          return String.fromCharCode(0x1D400 + (code - 65));
        })
        .join('');
    default: return text;
  }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `❌ Uso correcto:\n${usedPrefix + command} nombre de la canción`, m);
  }

  try {
    const query = encodeURIComponent(args.join(' '));
    const res = await fetch(`https://api.zenzxz.my.id/tools/lyrics?title=${query}`);
    if (!res.ok) throw await res.text();
    const data = await res.json();

    if (!data.status || !data.result || data.result.length === 0) {
      return conn.reply(m.chat, `❌ No se encontraron resultados para "${args.join(' ')}"`, m);
    }

    // Tomamos el primer resultado
    const song = data.result[0];
    const lyrics = song.plainLyrics || "No hay letra disponible.";

    // Mensaje decorado estilo STYLE BOT
    const text = `
╭━━━❀〔 ${decorate('Lyrics Finder', 'fancy')} 〕❀━━⬣
│
│ ✦ ${decorate('Canción:', 'bold')} ${song.trackName}
│ ✦ ${decorate('Artista:', 'bold')} ${song.artistName}
│ ✦ ${decorate('Álbum:', 'bold')} ${song.albumName}
│ ✦ ${decorate('Duración:', 'bold')} ${Math.floor(song.duration/60)}:${(song.duration%60).toString().padStart(2,'0')} min
│ ✦ ${decorate('Instrumental:', 'bold')} ${song.instrumental ? 'Sí 🎵' : 'No ❌'}
│
╰━━━❀〔 ${decorate('Letra', 'italic')} 〕❀━━⬣

${lyrics}
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ Ocurrió un error al buscar la letra.', m);
  }
};

handler.command = ['lyrics', 'letra', 'songlyrics']; // Comandos
handler.limit = true; 
export default handler;