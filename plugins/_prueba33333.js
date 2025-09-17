import fetch from "node-fetch";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `✨ Ingresa el link de una playlist de SoundCloud.\n\nEjemplo:\n*${usedPrefix + command} https://on.soundcloud.com/h4Gnvqwnf7fr9SH56*`, m);
    }

    let api = `https://apis-starlights-team.koyeb.app/starlight/soundcloud-playlist?url=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    if (!res.ok) throw new Error(`❌ Error en la API`);
    let data = await res.json();

    if (!data || !data.tracks) throw new Error("❌ No se encontraron resultados.");

    // ── Plantilla decorada con toda la información
    let info = `
╭━━━〔 🎶 *SOUNDCLOUD PLAYLIST* 🎶 〕━━⬣
┃ ✨ *Título:* ${data.title || "-"}
┃ 👤 *Autor:* ${data.owner || "-"} ${data.verified ? "✅" : ""}
┃ 👥 *Seguidores:* ${data.followers || 0}
┃ 📅 *Publicado:* ${data.published || "-"}
┃ 📦 *ID:* ${data.id || "-"}
┃ 🔗 *URL:* ${data.url || "-"}
╰━━━〔 ✨ 〕━━⬣

📝 *Descripción:* 
${data.description || "-"}
    `.trim();

    // 🔘 Botones tipo lista (Flow) con todas las canciones
    const sections = [
      {
        title: "🎶 Canciones en la playlist",
        highlight_label: "▶️ Selecciona una canción",
        rows: data.tracks.map((t, i) => ({
          header: t.title,
          title: `${t.author}`,
          description: `Toca para escuchar ♪`,
          id: `${usedPrefix}scplay ${t.url}` // aquí puedes poner otro comando que reproduzca directo
        }))
      }
    ];

    // Botones URL y de Respuesta Rápida
    const buttons = [
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "🌐 Ver Playlist",
          url: data.url
        })
      },
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "👤 Perfil del Autor",
          url: data.profile
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "▶️ Escuchar Preview",
          id: `${usedPrefix}scplay ${data.tracks[0]?.url || ""}`
        })
      },
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: "📂 Lista de canciones",
          sections
        })
      }
    ];

    // Enviar mensaje con imagen + botones
    await conn.sendMessage(m.chat, {
      text: info,
      footer: "🌸 SoundCloud Downloader",
      buttons,
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: data.title,
          body: `Playlist de ${data.owner}`,
          thumbnailUrl: data.thumb,
          sourceUrl: data.url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ *Ocurrió un error:*\n${e.message}`, m);
  }
};

handler.command = ['scplaylist'];
export default handler;