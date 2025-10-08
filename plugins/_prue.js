import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import yts from 'yt-search';

const handler = async (m, { conn }) => {
  const youtubeRegex = /https?:\/\/(?:www\.|youtu\.be\/|youtube\.com\/watch\?v=)[^\s]+/i;
  const match = m.text?.match(youtubeRegex);
  if (!match) return;

  const url = match[0];

  await m.react('⏳');

  const result = await yts(url);
  if (!result?.videos?.length) return conn.reply(m.chat, '⚠️ No se encontró el video.', m);

  const video = result.videos[0];

  const media = await prepareWAMessageMedia(
    { image: { url: video.thumbnail } },
    { upload: conn.waUploadToServer }
  );

  const interactiveMessage = {
    body: {
      text: `===========================
      ✿ *\`${video.title}\`*

= ° 🌵 *𝙰𝚄𝚃𝙾𝚁:* ${video.author.name}
= ° 🍁 *𝚅𝙸𝚂𝚃𝙰𝚂:* ${video.views.toLocaleString()}
= ° 🌿 *𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽:* ${video.timestamp}
= ° 🔗 *𝚄𝚁𝙻:* ${video.url}
===========================`
    },
    footer: { text: '┊▬ кαиєкι вσт ν3 | ву ѕнα∂σω 𝚇𝙳 ▬ ❜┊' },
    header: {
      title: '        乂 𝘠𝘖𝘜𝘛𝘜𝘉𝘌 - 𝘚𝘌𝘈𝘙𝘊𝘏 乂',
      hasMediaAttachment: true,
      imageMessage: media.imageMessage
    },
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: '      ᴏᴘᴄɪᴏɴᴇs ᴅᴇ ᴅᴇsᴄᴀʀɢᴀ 🎋',
            sections: [
              {
                title: video.title,
                rows: [
                  {
                    header: '𝐘 𝐎 𝐔 𝐓 𝐔 𝐁 𝐄 • 𝐘 𝐓 𝐌 𝐏 𝟑',
                    title: '✿ 🎧 Descargar audio',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/ytmp3 ${video.url}`
                  },
                  {
                    header: '𝐘 𝐎 𝐔 𝐓 𝐔 𝐁 𝐄 • 𝐘 𝐓 𝐌 𝐏 𝟒',
                    title: '✿ 📹 Descargar video',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/ytmp4 ${video.url}`
                  },
                  {
                    header: '𝐘 𝐎 𝐔 𝐓 𝐔 𝐁 𝐄 • 𝐘 𝐓 𝐌 𝐏 𝟑 𝐃 𝐎 𝐂',
                    title: '✿ 🎋 ᴅᴇsᴄᴀʀɢᴀ ᴀᴜᴅɪᴏ ᴇɴ ᴅᴏᴄᴜᴍᴇɴᴛᴏ',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/ytmp3doc ${video.url}`
                  },
                  {
                    header: '𝐘 𝐎 𝐔 𝐓 𝐔 𝐁 𝐄 • 𝐘 𝐓 𝐌 𝐏 𝟒 𝐃.𝐎 𝐂',
                    title: '✿ 🎋 ᴅᴇsᴄᴀʀɢᴀ ᴠɪᴅᴇᴏ ᴇɴ ᴅᴏᴄᴜᴍᴇɴᴛᴏ '',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/ytmp4doc ${video.url}`
                  },
                  {
                    header: '𝐘 𝐎 𝐔 𝐓 𝐔 𝐁 𝐄 • 𝐘 𝐓 𝐀',
                    title: '✿ 🎋 ᴅᴇsᴄᴀʀɢᴀ ʀᴀᴘɪᴅᴀ ᴅᴇ ᴀᴜᴅɪᴏ ',
                    description: `✎ Duración: ${video.timestamp}`,
                    id: `/yta ${video.url}`
                  },
                  {
                    header: '𝐘 𝐎 𝐔 𝐓 𝐔 𝐁 𝐄 • 𝐘 𝐓 𝐕',
                    title: '✿ 🍧 ᴅᴇsᴄᴀʀɢᴀ ʀᴀᴘɪᴅᴀ ᴅᴇ ᴠɪᴅᴇᴏ',
                    description: `✎ Duración: ${video.timestamp} `,
                    id: `/ytv ${video.url}`
                  }
                ]
              }
            ]
          })
        }
      ],
      messageParamsJson: ''
    }
  };

  const userJid = conn?.user?.jid || m.key.participant || m.chat;
  const msg = generateWAMessageFromContent(m.chat, { interactiveMessage }, { userJid, quoted: fkontak });
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  await m.react('✔️');
};

handler.customPrefix = /https?:\/\/(?:www\.|youtu\.be\/|youtube\.com\/watch\?v=)[^\s]+/i;
handler.command = new RegExp();

export default handler;