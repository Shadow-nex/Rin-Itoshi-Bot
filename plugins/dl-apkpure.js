import fetch from 'node-fetch';

let handler = async (m, { conn, text, args }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `🍧 Ejemplo de uso: */apkpure WhatsApp*`, m);
    }
    m.react('🕒');

    if (text.includes('https://apkpure.com/')) {
      try {
        let base = args[0].split("/")[4];
        const file = `https://d.apkpure.com/b/APK/${base}?version=latest`;
        let info = await getInfo(file);
        let { name, sizeB, sizeMB } = info;

        if (sizeB > 200 * 1024 * 1024) {
          return conn.reply(
            m.chat,
            `La aplicación pesa demasiado para usuarios gratis.\n\nPeso: ${sizeMB}\n\n Hazte premium para descargar hasta 500MB.`,
            m
          );
        }

        if (sizeB > 500 * 1024 * 1024) {
          return conn.reply(m.chat, 'La aplicación supera el límite de 500MB.', m);
        }

        let cap = `
◜ ApkPure - Download ◞

≡ 📱 *Nombre:* ${name}
≡ 📦 *Package:* ${base}
≡ ⚖️ *Peso:* ${sizeMB}
≡ 🔗 *Link:* ${args[0]}
`;
        m.reply(cap);

        await conn.sendFile(
          m.chat,
          file,
          `${name}`,
          '',
          m,
          null,
          {
            asDocument: true,
            mimetype: 'application/vnd.android.package-archive',
          }
        );

        m.react('☑️');
      } catch (err) {
        return conn.reply(m.chat, 'Error al obtener info de la app.\n\n' + err, m);
      }
    } 

    else {
      m.react('⌚');
      let res = await search(text); 
      
      if (!res.length) {
        return conn.reply(m.chat, 'No encontré resultados para tu búsqueda.', m);
      }

      let cap = `◜ ApkPure - Search ◞\n\n`;
      cap += res
        .map(
          (v, i) => `
*${i + 1}.* 📱 ${v.name}
   ├ 👨‍💻 Dev: ${v.developer}
   ├ ⭐ Rating: ${v.rating}
   ├ 🔗 Link: ${v.link}`
        )
        .join('\n\n');
      m.reply(cap);
      m.react('☑️');
    }
  } catch (err) {
    return conn.reply(m.chat, 'Error en la ejecución.\n\n' + err, m);
  }
};

handler.help = ['apkpure'];
handler.command = ['apkpure', 'apkpuredl'];
handler.tags = ['download'];
export default handler;

async function search(text) {
  try {
    let url = `https://api.siputzx.my.id/api/apk/apkpure?search=${encodeURIComponent(text)}`;
    let res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    let json = await res.json();

    if (!json.status || !json.data) return [];

    return json.data.map(app => ({
      name: app.title || 'Sin nombre',
      developer: app.developer || 'Desconocido',
      link: app.link,
      icon: app.icon,
      rating: app.rating?.score || 'N/A'
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getInfo(url) {
  try {
    const res = await fetch(url);
    const cd = res.headers.get('content-disposition');
    const name = cd && cd.match(/filename="(.+)"/)[1];
    const sizeB = parseInt(res.headers.get('content-length'), 10);
    const sizeMB = (sizeB / (1024 * 1024)).toFixed(2) + ' MB';

    return { name, sizeB, sizeMB };
  } catch (err) {
    return { error: err.message };
  }
}