import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const sylphyKey = "sylphy-c519";
const sylphyAPI = "https://api.sylphy.xyz/download/ytmp4";
const gokuAPI = "https://gokublack.xyz/download/ytmp4";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text || !text.trim()) {
      return conn.reply(m.chat, `🌸 Onichan~ debes poner el comando más un enlace de YouTube uwu 💕\n\nEjemplo:\n*${usedPrefix + command} https://youtu.be/xxxx*`, m, rcanal);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('❌ Nyaa~ No encontré resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, views, url } = videoInfo;

    const rinurl = global.logo || "https://files.catbox.moe/g2of9q.jpg";
    const thumb = (await conn.getFile(thumbnail || rinurl))?.data;

    const infoMessage = `╭─❍⃟🌸 𝐎𝐧𝐢𝐜𝐡𝐚𝐚𝐧~ 💗  
┃ 🎶 *Título:* ${title}  
┃ 👁️ *Vistas:* ${formatViews(views)}  
┃ 🔗 *Enlace:* ${url}  
┃  
┃ ⏳ Estoy preparando tu descarga nya~ 💖  
╰─⟦ 🌈 Espera un momentito uwu ⟧`;

    await conn.sendFile(m.chat, thumb, 'rin.jpg', infoMessage, m);

    if (command === 'audio') {
      try {
        const res = await fetch(`https://api.sylphy.xyz/download/ytmp3?url=${encodeURIComponent(url)}&apikey=${sylphyKey}`);
        const data = await res.json();

        if (!data?.res?.url) throw new Error("Fallo en Sylphy (audio)");

        await conn.sendMessage(m.chat, {
          audio: { url: data.res.url },
          mimetype: "audio/mpeg",
          ptt: false,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: 'YouTube - MP3',
              mediaUrl: url,
              sourceUrl: url,
              thumbnail: thumb,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m });

      } catch (err) {
        return m.reply("❌ No se pudo descargar el audio nya~ 😿");
      }
    }

    else if (command === 'video') {
      await m.reply("⏳ Buscando la mejor fuente de descarga... 🎥✨");

      let success = false;
      let videoUrl = null;

      try {
        const res = await fetch(`${sylphyAPI}?url=${encodeURIComponent(url)}&apikey=${sylphyKey}`);
        const data = await res.json();
        if (data?.res?.url) {
          videoUrl = data.res.url;
          success = true;
        }
      } catch (e) {
        console.error("Error en Sylphy:", e.message);
      }

      if (!success) {
        try {
          const res2 = await fetch(`${gokuAPI}?url=${encodeURIComponent(url)}`);
          const data2 = await res2.json();
          if (data2?.data?.downloadURL) {
            videoUrl = data2.data.downloadURL;
            success = true;
          }
        } catch (e) {
          console.error("Error en Goku:", e.message);
        }
      }

      if (success && videoUrl) {
        await conn.sendMessage(m.chat, {
          video: { url: videoUrl },
          fileName: `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: `╭─❍⃟🎥 𝐕𝐢𝐝𝐞𝐨 𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐝𝐨  
┃ 📺 *Título:* ${title}  
╰──────────────⬣`,
          thumbnail: thumb,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: videoInfo.author?.name || 'YouTube',
              mediaUrl: url,
              sourceUrl: url,
              thumbnail: thumb,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m });
      } else {
        return m.reply("❌ No se pudo descargar el video nya~ 😿");
      }
    }

  } catch (error) {
    return m.reply(`❌ Error: ${error.message}`);
  }
};

handler.help = ['audio <yt_link>', 'video <yt_link>'];
handler.tags = ['descargas'];
handler.command = ['audio', 'video'];
handler.group = true;
export default handler;

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else {
    return views.toString();
  }
}