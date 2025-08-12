import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid !== "string") {
    throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`);
  }

  for (const media of medias) {
    if (!media.type || (media.type !== "image" && media.type !== "video")) {
      throw new TypeError(`media.type must be "image" or "video", received: ${media.type} (${media.type?.constructor?.name})`);
    }
    if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) {
      throw new TypeError(`media.data must be object with url or buffer, received: ${media.data} (${media.data?.constructor?.name})`);
    }
  }

  if (medias.length < 2) {
    throw new RangeError("Minimum 2 media");
  }

  const caption = options.text || options.caption || "";
  const delay = !isNaN(options.delay) ? options.delay : 500;
  delete options.text;
  delete options.caption;
  delete options.delay;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(media => media.type === "image").length,
        expectedVideoCount: medias.filter(media => media.type === "video").length,
        ...(options.quoted
          ? {
              contextInfo: {
                remoteJid: options.quoted.key.remoteJid,
                fromMe: options.quoted.key.fromMe,
                stanzaId: options.quoted.key.id,
                participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                quotedMessage: options.quoted.message,
              },
            }
          : {}),
      },
    },
    {}
  );

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    const img = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer }
    );
    img.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key },
    };
    await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
    await baileys.delay(delay);
  }

  return album;
}

const pins = async (judul) => {
  try {
    const res = await axios.get(`https://anime-xi-wheat.vercel.app/api/pinterest?q=${encodeURIComponent(judul)}`);
    if (Array.isArray(res.data.images)) {
      return res.data.images.map(url => ({
        image_large_url: url,
        image_medium_url: url,
        image_small_url: url
      }));
    }
    return [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `${emojis} Ingresa un texto. Ejemplo: .pinterest anime`, m, fake);


  try {
    m.react('✨️');
    const results = await pins(text);
    if (!results || results.length === 0) return conn.reply(m.chat, `No se encontraron resultados para "${text}".`, m, fake);

    const maxImages = Math.min(results.length, 15);
    const medias = [];

    for (let i = 0; i < maxImages; i++) {
      medias.push({
        type: 'image',
        data: { url: results[i].image_large_url || results[i].image_medium_url || results[i].image_small_url }
      });
    }

    await sendAlbumMessage(m.chat, medias, {
      caption: `𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀 𝗱𝗲: ${text}\n𝗖𝗮𝗻𝘁𝗶𝗱𝗮𝗱 𝗱𝗲 𝗿𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀: 15\n𝗖𝗿𝗲𝗮𝗱𝗼𝗿:\n> ${club}`,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '☘️', key: m.key } });

  } catch (error) {
    conn.reply(m.chat, 'Error al obtener imágenes de Pinterest.', m, fake);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];
handler.register = true

export default handler;