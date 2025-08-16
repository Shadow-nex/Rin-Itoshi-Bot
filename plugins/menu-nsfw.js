import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  try {
    const img = './src/catalogo.jpg'; 
    const taguser = '@' + m.sender.split('@')[0];
    const invisible = String.fromCharCode(8206).repeat(850);

    const fkontak = {
      key: {
        fromMe: false,
        participant: '0@s.whatsapp.net',
        remoteJid: 'status@broadcast'
      },
      message: {
        contactMessage: {
          displayName: '𝙉𝙎𝙁𝙒 𝘽𝙊𝙏',
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;NSFW;;;\nFN:NSFW\nitem1.TEL;waid=0:0\nitem1.X-ABLabel:Bot\nEND:VCARD`
        }
      }
    };

    const str = `
╭━〔 🔞 𝙈𝙀𝙉𝙐 +𝟭𝟴 🔞 〕━⬣
┃ 👋 Hola ${taguser}
┃ Bienvenido al *Modo Caliente*
┃ ${invisible}
╰━━━━━━━━━━━━━━━━━━⬣

🍑 *Búsquedas calientes:*
› ${usedPrefix}xnxxsearch
› ${usedPrefix}pornhubsearch
› ${usedPrefix}xvsearch
› ${usedPrefix}r34
› ${usedPrefix}rule34search


🎥 *Descargas para adultos:*
› ${usedPrefix}xnxxdl
› ${usedPrefix}xvideosdl
› ${usedPrefix}pornhubdl


👅 *Acciones roleplay NSFW:*
› ${usedPrefix}sixnine/69 @tag
› ${usedPrefix}anal/culiar @tag
› ${usedPrefix}blowjob/mamada @tag
› ${usedPrefix}boobjob/rusa @tag
› ${usedPrefix}cum/leche @tag
› ${usedPrefix}fap/paja @tag
› ${usedPrefix}follar @tag
› ${usedPrefix}footjob/pies @tag
› ${usedPrefix}fuck/coger @tag
› ${usedPrefix}grabboobs/agarrartetas @tag
› ${usedPrefix}grop/manosear @tag
› ${usedPrefix}pack / loli
› ${usedPrefix}penetrar @user
› ${usedPrefix}suckboobs/chupartetas @tag
› ${usedPrefix}tetas
› ${usedPrefix}spank/nalgada @tag
› ${usedPrefix}sexo/sex @tag
› ${usedPrefix}lickpussy/coño @tag
› ${usedPrefix}videoxxx
› ${usedPrefix}violar/perra @tag
› ${usedPrefix}undress
› ${usedPrefix}lesbianas/tijeras @tag


🍒 *Packs / Lolis:*
› ${usedPrefix}pack
› ${usedPrefix}pack2
› ${usedPrefix}pack3
› ${usedPrefix}videoxxx
› ${usedPrefix}loli
› ${usedPrefix}hentai
› ${usedPrefix}tetas


🧃 *Contenido lésbico:*
› ${usedPrefix}lesbianas
› ${usedPrefix}videoxxxlesbi

⚠️ *Solo mayores de edad. Usa bajo tu responsabilidad.*

> © nsғᴡ 𝙈𝙀𝙉𝙐 by Rin itoshi
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: str,
      mentions: [m.sender]
    }, { quoted: fkontak });

    await conn.sendMessage(m.chat, { react: { text: '🍑', key: m.key } });

  } catch (e) {
    conn.reply(m.chat, `⚠️ Error al enviar el menú.\n\n${e}`, m);
  }
};

handler.help = ['menu18', 'menunsfw'];
handler.command = ['menu18', 'menu+18', 'nsfwmenu', 'menuhot'];
handler.fail = null;

export default handler;