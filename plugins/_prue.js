import yts from 'yt-search';
import fetch from 'node-fetch';
import { proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    // Obtener cualquier texto posible del mensaje
    let text =
      m.message?.conversation ||
      m.message?.extendedTextMessage?.text ||
      m.message?.imageMessage?.caption ||
      m.message?.videoMessage?.caption ||
      "";

    if (!text) return; // No hay texto, salir

    // Detectar link de YouTube
    let regex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/[^\s]+/i;
    let match = text.match(regex);

    // Si no hay link, no hacemos nada
    if (!match) return;

    let url = match[0];

    await m.react('🕓');

    // Buscar video con yt-search
    let res = await yts(url);
    let video = res.videos[0];
    if (!video) {
      await m.react('✖️');
      return conn.reply(m.chat, '❌ No se encontró el video.', m);
    }

    // Miniatura
    let thumbnail;
    try {
      thumbnail = await (await fetch(video.thumbnail)).buffer();
    } catch {
      thumbnail = await (await fetch('https://telegra.ph/file/36f2a1bd2aaf902e4d1ff.jpg')).buffer();
    }

    // Mensaje principal
    const caption = `╭━━━〔 📀  𝐌𝐔𝐒𝐈𝐂 - 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 〕━━⬣
┃ ✦ 𝗧𝗶́𝘁𝘂𝗹𝗼 › *${video.title || 'No encontrado'}*
┃ ✦ 𝗖𝗮𝗻𝗮𝗹 › *${video.author.name || 'No encontrado'}*
┃ ✦ 𝗗𝘂𝗿𝗮𝗰𝗶𝗼́𝗻 › *${video.duration || 'No encontrado'}*
┃ ✦ 𝗩𝗶𝘀𝘁𝗮𝘀 › *${video.views || 'No encontrado'}*
┃ ✦ 𝗣𝘂𝗯𝗹𝗶𝗰𝗮𝗱𝗼 › *${video.ago || 'No encontrado'}*
┃ ✦ 𝗘𝗻𝗹𝗮𝗰𝗲 › ${video.url}`;

    // Lista de otros resultados de YouTube
    let ytSections = res.videos.slice(1, 11).map((v, index) => ({
      title: `${index + 1}┃ ${v.title}`,
      rows: [
        { title: `🎶 Descargar MP3`, description: `Duración: ${v.duration}`, id: `${usedPrefix}ytmp3 ${v.url}` },
        { title: `🎥 Descargar MP4`, description: `Duración: ${v.duration}`, id: `${usedPrefix}ytmp4 ${v.url}` },
      ]
    }));

    // Enviar mensaje con miniatura, caption y lista
    await conn.sendMessage(m.chat, {
      image: thumbnail,
      caption,
      footer: '┃✨ 𝐄𝐥𝐢𝐣𝐚 𝐮𝐧𝐚 𝐨𝐩𝐜𝐢𝐨́𝐧 ✨\n┃  🎧 › Audio\n┃  📹 › Video\n╰━━━━━━━━━━━━━━━━━━⬣',
      buttons: [
        { buttonId: `${usedPrefix}ytmp3 ${video.url}`, buttonText: { displayText: '🍂 Audio' }, type: 1 },
        { buttonId: `${usedPrefix}ytmp4 ${video.url}`, buttonText: { displayText: '🌱 Video' }, type: 1 }
      ],
      contextInfo: {
        mentionedJid: [m.sender],
      },
      headerType: 1,
      viewOnce: true
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.error(e);
    await m.react('✖️');
    conn.reply(m.chat, '*`Error al procesar el link de YouTube.`*', m);
  }
};

// Detecta automáticamente cualquier link de YouTube
handler.customPrefix = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/[^\s]+/i;
handler.command = new RegExp();
export default handler;