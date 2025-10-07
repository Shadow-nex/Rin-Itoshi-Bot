import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    let regex = /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i
    let match = m.text.match(regex)
    if (!match) return

    let url = match[0]
    await m.react('⏳')

    let api = `https://api.delirius.store/download/tiktok?url=${encodeURIComponent(url)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.status || !json.data) {
      await m.react('❌')
      return conn.reply(m.chat, '❌ No se pudo obtener el video, inténtalo nuevamente.', m)
    }

    const videoData = json.data
    const { creator, title, region, duration, author, music, meta, published, repro, like, share, comment, download } = videoData


    const videoUrl = meta.media.find(v => v.hd && v.hd !== '0 B')?.hd
                    || meta.media.find(v => v.org)?.org
                    || meta.media[0]?.wm

    await m.react('📥')
    let info = `
🌟 *TikTok Downloader*

📝 *Creator API:* ${creator || "-"}
🎬 *Title:* ${title || "-"}
🧑‍🎤 *Author:* ${author?.nickname || "-"} (${author?.username || "-"})
⏱️ *Duration:* ${duration || "-"}s
🌎 *Region:* ${region || "-"}
📅 *Published:* ${published || "-"}

👁️‍🗨️ *Views:* ${repro || "0"}   ❤️ *Likes:* ${like || "0"}
💬 *Comments:* ${comment || "0"}   🔄 *Shares:* ${share || "0"}
⬇️ *Downloads:* ${download || "0"}

🎶 *Audio:* ${music?.title || "-"} - ${music?.author || "-"} (${music?.duration || "-"}s)

📦 *Media Info:*
${meta.media.map((v, i) => `  ${i+1}. Type: ${v.type || "-"} | HD: ${v.hd || "N/A"} | WM: ${v.wm || "N/A"} | Original: ${v.org || "N/A"} | Size: ${v.size_hd || v.size_org || "N/A"}`).join("\n")}
`

    await m.react('📤')

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl },
        caption: info,
        gifPlayback: false,
        thumbnailUrl: meta.media[0]?.org
      },
      { quoted: m }
    )

    await m.react('✔️')

  } catch (err) {
    console.error(err)
    await m.react('❌')
    conn.reply(m.chat, '❌ Ocurrió un error al procesar el video de TikTok.', m)
  }
}

handler.customPrefix = /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i
handler.command = new RegExp
export default handler