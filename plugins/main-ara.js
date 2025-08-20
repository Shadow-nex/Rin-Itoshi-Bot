const handler = async (m, { conn }) => {
  const audios = [
    'https://files.catbox.moe/55r702.mp4', // Primer audio
    'https://o.uguu.se/gOSSscdF.opus', // Segundo audio
    'https://n.uguu.se/jGUWWmwU.opus'  // Tercer audio (puedes cambiarlo)
  ];

  const randomAudio = audios[Math.floor(Math.random() * audios.length)];

  await conn.sendMessage(m.chat, {
    audio: { url: randomAudio },
    mimetype: 'audio/mpeg',
    ptt: true,
  }, { quoted: m });
};

// Sin prefijo
handler.customPrefix = /^(ara ara)$/i;
handler.command = new RegExp;

export default handler;
