import fetch from "node-fetch";

const spotifyApis = [
  { name: "Delirius", url: "https://delirius-apiofc.vercel.app/download/spotifydl?url=" },
  { name: "Vreden", url: "https://api.vreden.my.id/api/spotify?url=" },
  { name: "Dorratz", url: "https://api.dorratz.com/spotifydl?url=" }
];

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, "⚡ Ingresa el link de Spotify.", m);

  let data;
  for (let api of spotifyApis) {
    try {
      const res = await fetch(api.url + encodeURIComponent(text));
      const json = await res.json();
      
      if (api.name === "Delirius" && json.status) {
        data = {
          title: json.data.title,
          artist: json.data.author,
          duration: json.data.duration,
          image: json.data.image,
          download: json.data.url
        };
      }
      if (api.name === "Vreden" && json.status === 200 && json.result.status) {
        data = {
          title: json.result.title,
          artist: json.result.artists,
          duration: 0,
          image: json.result.cover,
          download: json.result.music
        };
      }
      if (api.name === "Dorratz" && json.download_url) {
        data = {
          title: json.name,
          artist: json.artists,
          duration: json.duration_ms,
          image: json.image,
          download: json.download_url
        };
      }

      if (data) break;
    } catch (e) {
      console.log(`Error en ${api.name}:`, e.message || e);
    }
  }

  if (!data) return conn.reply(m.chat, "❌ No se pudo obtener la canción de ninguna API.", m);

  await conn.sendMessage(m.chat, {
    image: { url: data.image },
    caption: `🎧 Título: ${data.title}\n🎤 Artista: ${data.artist}\n⏱ Duración: ${data.duration}\n🔗 Link: ${text}`
  }, { quoted: m });

  await conn.sendMessage(m.chat, {
    audio: { url: data.download },
    mimetype: "audio/mpeg",
    fileName: `${data.title}.mp3`
  }, { quoted: m });
};

handler.command = handler.help = ['spotify'];
handler.tags = ['descargas'];
export default handler;