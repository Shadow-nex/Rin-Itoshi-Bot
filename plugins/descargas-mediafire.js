import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw m.reply(`${emoji} Por favor, ingresa un link de Mediafire.`);
  
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  
  try {
    let response = await fetch(`https://api.nexfuture.com.br/api/downloads/mediafire/dl?url=${encodeURIComponent(text)}`);
    let data = await response.json();
    
    if (data.status) {
      let fileInfo = data.resultado;
      let downloadUrl = fileInfo.url;
      
      await conn.sendFile(m.chat, downloadUrl, fileInfo.nome, 
        `乂 *¡MEDIAFIRE - DESCARGAS!* 乂\n\n✩ *Nombre* : ${fileInfo.nome}\n✩ *Peso* : ${fileInfo.size}\n✩ *MimeType* : ${fileInfo.mime}`, 
        m);
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
    } else {
      throw new Error("Error en la respuesta de la API.");
    }
  } catch (error) {
    console.error(error);
    m.reply("Hubo un error al intentar obtener el archivo. Por favor, verifica el enlace.");
  }
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mf', 'mediafire']
handler.register = true

export default handler