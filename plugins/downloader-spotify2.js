/*import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = icono;
  
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🌲 *Escribe el nombre de una canción o pega el enlace de Spotify.*\nEjemplo:\n${usedPrefix + command} DJ Opus`,
      footer: '🔍 Buscar y descargar vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Spotify Downloader',
          body: 'Busca una canción por nombre o link',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
  }

  let trackUrl;

  // Detectar si es enlace válido de Spotify
  const isSpotifyLink = text.includes('spotify.com/track');

  if (isSpotifyLink) {
    trackUrl = text.trim();
  } else {
    // Buscar por nombre
    const searchUrl = `https://api.vreden.my.id/api/spotifysearch?query=${encodeURIComponent(text)}`;
    const searchRes = await fetch(searchUrl);
    const searchJson = await searchRes.json();

    if (!searchJson?.result || !searchJson.result[0]) {
      return m.reply(`❌ No se encontró ninguna canción con el término: ${text}`);
    }

    trackUrl = searchJson.result[0].spotifyLink;
  }

  try {
    const infoRes = await fetch(`https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(trackUrl)}`);
    const trackData = await infoRes.json();
    const track = trackData.result;

    if (!track?.status || !track.music) {
      return m.reply(`⚠️ No se pudo obtener datos válidos del track.`);
    }

    const audioRes = await fetch(track.music);
    const audioBuffer = await audioRes.buffer();

    // Enviar información del track con imagen
    await conn.sendMessage(m.chat, {
      image: { url: track.cover || thumbnailCard },
      caption: `🌾 título: *${track.title}*\n🔥 Artista: ${track.artists}\n📀 Tipo: ${track.type}\n📅 Lanzamiento: ${track.releaseDate || 'No disponible'}\n🎧 Enviando audio...`,
      footer: dev,
      contextInfo: {
        externalAdReply: {
          title: track.title,
          body: 'Click para escuchar o descargar',
          thumbnailUrl: thumbnailCard,
          sourceUrl: track.music
        }
      }
    }, { quoted: m });

    // Enviar audio en formato MP3
    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      mimetype: 'audio/mpeg',
      fileName: `${track.title}.mp3`
    }, { quoted: m });

  } catch (err) {
    console.error('❌ Error:', err);
    m.reply(`💥 Ocurrió un error al procesar la solicitud.\n📛 ${err.message}`);
  }
};

handler.command = ['music'];
handler.help = ['music <canción>'];
handler.tags = ['downloader'];
export default handler;*/


import fetch from "node-fetch";
import fs from "fs";
import { default as baileys } from "@whiskeysockets/baileys";

const APIKEY = "sylphy-8ff8";
const BASE_URL = "https://api.sylphy.xyz";

let handler = async (m, { conn, args, command }) => {
  if (!args[0]) {
    return m.reply(`✦ Uso: *${command}* <link o nombre de canción>\nEjemplo: ${command} https://open.spotify.com/track/6UR5tB1wVm7qvH4xfsHr8m`);
  }

  try {
    let text = args.join(" ");
    let urlSearch = `${BASE_URL}/search/spotify?q=${encodeURIComponent(text)}&apikey=${APIKEY}`;

    let res = await fetch(urlSearch);
    let json = await res.json();

    if (!json.status || !json.data) {
      return m.reply("❌ No se encontraron resultados.");
    }

    let track = json.data[0];
    let infoMsg = `🎵 *Título:* ${track.title}\n👤 *Artista:* ${track.artist}\n⏱️ *Duración:* ${track.duration}\n🔗 ${track.url}`;

    await conn.sendMessage(m.chat, { text: infoMsg }, { quoted: m });

    let urlDownload = `${BASE_URL}/download/spotify?url=${encodeURIComponent(track.url)}&apikey=${APIKEY}`;
    let res2 = await fetch(urlDownload);
    let json2 = await res2.json();

    if (!json2.status || !json2.data || json2.data.message) {
      return m.reply("⚠️ No se pudo descargar la canción (posible límite de la API).");
    }

    let audioUrl = json2.data.url; 
    let audioRes = await fetch(audioUrl);
    let buffer = await audioRes.arrayBuffer();

    await conn.sendMessage(m.chat, { 
      audio: Buffer.from(buffer), 
      mimetype: "audio/mpeg", 
      fileName: `${track.title}.mp3` 
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Ocurrió un error al procesar la solicitud.");
  }
};

handler.command = ['music'];
handler.help = ['music <canción>'];
handler.tags = ['downloader'];

export default handler;