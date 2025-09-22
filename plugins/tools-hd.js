import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m, { conn, usedPrefix, command }) => {
  const quoted = m.quoted ? m.quoted : m
  const mime = quoted.mimetype || quoted.msg?.mimetype || ''

  if (!/image\/(jpe?g|png)/i.test(mime)) {
    await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } })
    return m.reply(`🍄 Por favor, envie una imagen o responda a la imagen utilizando el comando.`)
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    conn.reply(m.chat, `*✧ Mejorando la calidad de la imagen....*`, m, rcanal)  
    const media = await quoted.download()
    const ext = mime.split('/')[1]
    const filename = `upscaled_${Date.now()}.${ext}`

    const form = new FormData()
    form.append('image', media, { filename, contentType: mime })
    form.append('scale', '2')

    const headers = {
      ...form.getHeaders(),
      'accept': 'application/json',
      'x-client-version': 'web',
      'x-locale': 'en'
    }

    const res = await fetch('https://api2.pixelcut.app/image/upscale/v1', {
      method: 'POST',
      headers,
      body: form
    })

    const json = await res.json()

    if (!json?.result_url || !json.result_url.startsWith('http')) {
      throw new Error('Gagal mendapatkan URL hasil dari Pixelcut.')
    }

    const resultBuffer = await (await fetch(json.result_url)).buffer()

    await conn.sendMessage(m.chat, {
      image: resultBuffer,
      caption: `☆ *𝙰𝚀𝚄𝙸 𝚃𝙸𝙴𝙽𝙴𝚂 𝚃𝚄 𝙸𝙼𝙰𝙶𝙴𝙽 𝙴𝙽 𝙷𝙳* 🍂\n> © ʀɪɴ ɪᴛᴏsʜɪ | ʙʏ sʜᴀᴅᴏᴡ.xʏᴢ °`.trim()
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (err) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    m.reply(`❌ Ocurrio un error:\n${err.message || err}`)
  }
}

handler.help = ["hd"]
handler.tags = ["tools"]
handler.command = ["remini", "hd", "enhance"]

export default handler
async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    if (availableOperations.includes(operation)) {
      operation = operation;
    } else {
      operation = availableOperations[0];
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"});
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"});
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) {chunks.push(chunk)});
        res.on("end", function () {resolve(Buffer.concat(chunks))});
        res.on("error", function (err) {
        reject(err);
        });
      },
    );
  });
}