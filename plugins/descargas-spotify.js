import axios from "axios";
import * as cheerio from "cheerio";

const client_id = "acc6302297e040aeb6e4ac1fbdfd62c3";
const client_secret = "0e8439a1280a43aba9a5bc0a16f3f009";
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getToken = async () => {
  const res = await axios.post(
    TOKEN_ENDPOINT,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: "Basic " + basic,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res.data.access_token;
};

const searchTrack = async (query, token) => {
  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.data.tracks.items.length === 0) throw new Error("Canción no encontrada.");
  return res.data.tracks.items[0];
};

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("🌴 Ingresa el nombre de una canción o una URL de Spotify.");

  await conn.sendMessage(m.chat, { react: { text: "🍁", key: m.key } });

  try {
    const isUrl = /https?:\/\/(open\.)?spotify\.com\/track\/[a-zA-Z0-9]+/.test(text);
    let track;

    if (isUrl) {
      const id = text.split("/track/")[1].split("?")[0];
      const token = await getToken();
      const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      track = await res.json();
    } else {
      const token = await getToken();
      track = await searchTrack(text, token);
    }

    const image = track.album.images[0]?.url || null;
    const caption = `╭─🎧 *Spotify Music Info*
│💿 *Título:* ${track.name}
│🎨 *Artista:* ${track.artists.map((a) => a.name).join(", ")}
│📚 *Álbum:* ${track.album.name}
│📅 *Fecha:* ${track.album.release_date}
│⏱️ *Duración:* ${(track.duration_ms / 60000).toFixed(2)} min
│🔗 *Link:* ${track.external_urls.spotify}
╰─────────────`;

    
    await conn.sendMessage(
      m.chat,
      {
        image: { url: image },
        caption,
        contextInfo: {
          externalAdReply: {
            title: track.name,
            body: `Artista: ${track.artists.map((a) => a.name).join(", ")}`,
            thumbnailUrl: image,
            mediaUrl: track.external_urls.spotify,
            sourceUrl: track.external_urls.spotify,
            mediaType: 1,
          },
        },
      },
      { quoted: m }
    );

  
    const data = new SpotMate();
    const info = await data.convert(track.external_urls.spotify);

   
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: info.url },
        mimetype: "audio/mpeg",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: track.name,
            body: `Álbum: ${track.album.name}`,
            thumbnailUrl: image,
            mediaUrl: track.external_urls.spotify,
            sourceUrl: track.external_urls.spotify,
            mediaType: 1,
          },
        },
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, { react: { text: "💥", key: m.key } });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    m.reply("❌ No se pudo obtener la canción. Intenta de nuevo más tarde.\n\n" + err);
  }
};

handler.help = ['spotify', 'music'];
handler.tags = ['descargas'];
handler.command = ['spotify', 'splay'];
handler.group = true;

export default handler;

// Clase SpotMate
class SpotMate {
  constructor() {
    this._cookie = null;
    this._token = null;
  }

  async _visit() {
    try {
      const response = await axios.get('https://spotmate.online/en', {
        headers: {
          'user-agent': 'Mozilla/5.0',
        },
      });

      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        this._cookie = setCookieHeader.map((cookie) => cookie.split(';')[0]).join('; ');
      }

      const $ = cheerio.load(response.data);
      this._token = $('meta[name="csrf-token"]').attr('content');

      if (!this._token) throw new Error('Token CSRF no encontrado.');
    } catch (error) {
      throw new Error(`Error visitando SpotMate: ${error.message}`);
    }
  }

  async convert(spotifyUrl) {
    if (!this._cookie || !this._token) await this._visit();

    try {
      const response = await axios.post(
        'https://spotmate.online/convert',
        { urls: spotifyUrl },
        {
          headers: this._getHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error al convertir canción: ${error.message}`);
    }
  }

  _getHeaders() {
    return {
      'accept': '*/*',
      'content-type': 'application/json',
      'cookie': this._cookie,
      'origin': 'https://spotmate.online',
      'referer': 'https://spotmate.online/en',
      'user-agent': 'Mozilla/5.0',
      'x-csrf-token': this._token,
    };
  }
}