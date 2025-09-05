import axios from 'axios';
import fs from 'fs';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`📌 Usa el comando correctamente:\n\nEjemplo:\n${usedPrefix + command} https://qu.ax/eGdW.mp3`);
  }

  try {
    const url = text.trim();
    const tmpDir = './tmp';
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    async function downloadFile(url, path) {
      const response = await fetch(url);
      const buffer = await response.buffer();
      fs.writeFileSync(path, buffer);
    }

    const headRes = await axios.head(url).catch(() => null);
    const contentType = headRes?.headers?.['content-type'] || '';

    if (contentType.startsWith('video/')) {
      await m.reply('🎥 Descargando video...');
      const ext = contentType.split('/')[1].split(';')[0] || 'mp4';
      const filename = `video_${Date.now()}.${ext}`;
      const filepath = `${tmpDir}/${filename}`;
      await downloadFile(url, filepath);
      await conn.sendFile(m.chat, filepath, filename, '🎬 Video descargado con éxito 🎉', m);
      fs.unlinkSync(filepath);

    } else if (contentType.startsWith('image/')) {
      await m.reply('🖼️ Descargando imagen...');
      const ext = contentType.split('/')[1].split(';')[0] || 'jpg';
      const filename = `image_${Date.now()}.${ext}`;
      const filepath = `${tmpDir}/${filename}`;
      await downloadFile(url, filepath);
      await conn.sendFile(m.chat, filepath, filename, '🖼️ Imagen descargada con éxito 🎉', m);
      fs.unlinkSync(filepath);

    } else if (contentType.startsWith('audio/')) {
      await m.reply('🎧 Descargando audio...');
      const ext = contentType.split('/')[1].split(';')[0] || 'mp3';
      const filename = `audio_${Date.now()}.${ext}`;
      const filepath = `${tmpDir}/${filename}`;
      await downloadFile(url, filepath);
      await conn.sendFile(m.chat, filepath, filename, '🎶 Audio descargado con éxito 🎉', m, { mimetype: contentType });
      fs.unlinkSync(filepath);

    } else {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const titulo = $('title').text() || 'Sin título';
      let textoPlano = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 500);
      await m.reply(`🌐 Título del sitio: ${titulo}\n\n📄 Fragmento:\n${textoPlano}...\n\n🔍 No se detectó archivo multimedia, puede ser una página web.`);
    }

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al procesar el link. ¿Está bien escrito o disponible?');
  }
};

handler.help = ['webget <url>'];
handler.tags = ['tools', 'downloader'];
handler.command = /^webget$/i;

export default handler;
