import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
 try {
   if (!text) {
     return conn.reply(m.chat, `⚡ Ingresa un enlace de *SoundCloud*.\n\n🍂 Ejemplo:\n${usedPrefix + command} https://soundcloud.com/...`, m);
   }

   let res = await fetch(`https://delirius-apiofc.vercel.app/download/soundcloud?url=${encodeURIComponent(text)}`);
   let json = await res.json();

   if (!json.status) throw `❌ No se pudo obtener la información.`

   let data = json.data;
   let caption = `
╭━━━〔 🎧 SoundCloud 🎧 〕━━⬣
┃ ✨ *Título:* ${data.title}
┃ 👤 *Autor:* ${data.author}
┃ 💬 *Comentarios:* ${data.comments}
┃ ❤️ *Likes:* ${data.likes}
┃ 🔁 *Reposts:* ${data.reposts}
┃ ▶️ *Reproducciones:* ${data.playbacks}
┃ 📅 *Publicado:* ${new Date(data.created_at).toLocaleDateString()}
╰━━━━━━━━━━━━━━━━━━━━⬣
🔗 *Enlace:* ${data.link}
   `.trim();

   await conn.sendMessage(m.chat, { 
      image: { url: data.image }, 
      caption 
   }, { quoted: m });

   await conn.sendMessage(m.chat, { 
      audio: { url: data.download }, 
      mimetype: "audio/mpeg",
      fileName: `${data.title}.mp3`
   }, { quoted: m });

 } catch (e) {
   console.error(e)
   conn.reply(m.chat, `❌ Error: ${e}`, m)
 }
};

handler.help = ["soundcloud2"].map(v => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^soundcloud2$/i;

export default handler;