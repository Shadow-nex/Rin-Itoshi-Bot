
import { format } from 'util'

async function mediaFire(url) {
  try {
    const response = await fetch('https://r.jina.ai/' + url)
    const text = await response.text()

    const result = {
      title: (text.match(/Title: (.+)/) || [])[1]?.trim() || '',
      link: (text.match(/URL Source: (.+)/) || [])[1]?.trim() || '',
      filename: '',
      url: '',
      size: '',
      repair: ''
    }

    if (result.link) {
      const fileMatch = result.link.match(/\/([^\/]+\.zip)/)
      if (fileMatch) result.filename = fileMatch[1]
    }

    const matches = [...text.matchAll(/\[(.*?)\]\((https:\/\/[^\s]+)\)/g)]
    for (const match of matches) {
      const desc = match[1].trim()
      const link = match[2].trim()
      
      if (desc.toLowerCase().includes('download') && desc.match(/\((\d+(\.\d+)?[KMGT]B)\)/)) {
        result.url = link
        result.size = (desc.match(/\((\d+(\.\d+)?[MG]B)\)/) || [])[1] || ''
      }
      if (desc.toLowerCase().includes('repair')) {
        result.repair = link
      }
    }

    return result
  } catch (error) {
    return { error: error.message }
  }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
/*  // Restricción VIP/PREMIUM
  let user = global.db.data.users[m.sender]
  if (!user.premium && !user.vip) {
    return m.reply(`🚩 Este comando es exclusivo para usuarios *VIP/Premium*`)
  }
*/
  if (!args[0]) {
    return m.reply(`🚩 Ingrese el enlace de un archivo de Mediafire`)
  }
  
  if (!args[0].match(/mediafire/gi)) {
    return m.reply('🚩 Proporcione un enlace válido de *MediaFire*')
  }
  
  try {
    m.react('💜')
    
    const result = await mediaFire(args[0])
    
    if (result.error) {
      return m.reply(`Error: ${result.error}`)
    }
    
    if (!result.url) {
      return m.reply('🚩 No se pudo extraer el enlace de descarga')
    }
    
    let mediaFireInfo = `
乂  *M E D I A F I R E  -  D O W N L O A D*

✩ *🌱 File Name:* ${result.title || result.filename || 'Unknown'}
✩ *🔥 File Size:* ${result.size || 'Unknown'}
✩ *🌾 Source:* ${result.link || args[0]}`
    
    await conn.sendMessage(m.chat, { 
      document: { url: result.url }, 
      mimetype: 'application/zip',
      fileName: result.filename || result.title || 'mediafire_download.zip',
      caption: mediaFireInfo
    }, { quoted: m })
    
    if (result.repair) {
      m.reply(`*Repair Link (Kalau Download Error):*\n${result.repair}`)
    }
    
    m.react('✅')
   
  } catch (error) {
    console.error(error)
    m.reply(`Error: ${error.message}`)
  }
}

handler.help = ['mediafire', 'mf']
handler.tags = ['downloader']
handler.command ='mediafire',/^(mediafire|mf)$/i
handler.limit = false  
handler.premium = false

export default handler