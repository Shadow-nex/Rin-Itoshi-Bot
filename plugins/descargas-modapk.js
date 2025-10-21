import { search, download } from 'aptoide-scraper'
import fetch from 'node-fetch'
import Jimp from 'jimp'

var handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, `🕸️ Por favor, ingrese el nombre de la apk para descargarlo.`, m, rcanal)

  try {
    await m.react('🕒')

    let searchA = await search(text)
    if (!searchA.length) return conn.reply(m.chat, `⚠️ No se encontró ninguna app con ese nombre.`, m)

    let data5 = await download(searchA[0].id)

    let txt = `*乂  APTOIDE - DESCARGAS 乂*\n\n`
    txt += `≡ Nombre : ${data5.name}\n`
    txt += `≡ Package : ${data5.package}\n`
    txt += `≡ Update : ${data5.lastup}\n`
    txt += `≡ Peso :  ${data5.size}`

    await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m, null, rcanal)

    if (data5.size.includes('GB') || parseFloat(data5.size.replace(' MB', '')) > 999) {
      return await conn.reply(m.chat, `ꕥ El archivo es demasiado pesado.`, m)
    }

    let thumbnail = null
    try {
      const img = await Jimp.read(data5.icon)
      img.resize(300, Jimp.AUTO)
      thumbnail = await img.getBufferAsync(Jimp.MIME_JPEG)
    } catch (err) {
      console.log('⚠️ Error al crear miniatura:', err)
    }

    await conn.sendMessage(
      m.chat,
      {
        document: { url: data5.dllink },
        mimetype: 'application/vnd.android.package-archive',
        fileName: `${data5.name}.apk`,
        caption: null,
        ...(thumbnail ? { jpegThumbnail: thumbnail } : {})
      },
      { quoted: fkontak }
    )

    await m.react('✔️')
  } catch (error) {
    console.error(error)
    return conn.reply(
      m.chat,
      `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`,
      m
    )
  }
}

handler.tags = ['descargas']
handler.help = ['apkmod']
handler.command = ['apk', 'modapk', 'aptoide']
handler.group = true
handler.premium = false

export default handler