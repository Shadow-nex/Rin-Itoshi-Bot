import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        userId = m.mentionedJid[0];
    } else {
        userId = m.sender;
    }

    let user = global.db.data.users[userId];

    let name = await conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let pareja = user.marry || 'Nadie';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;

    let avatar = await conn.profilePictureUrl(userId, 'image')
        .catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    let perfilImg = `https://api.siputzx.my.id/api/canvas/profile?backgroundURL=https://i.ibb.co.com/2jMjYXK/IMG-20250103-WA0469.jpg&avatarURL=${encodeURIComponent(avatar)}&rankName=${encodeURIComponent(role)}&rankId=0&exp=${exp}&requireExp=1000&level=${nivel}&name=${encodeURIComponent(name)}`;

    let footers = [
        "✦ ✧ Rin Itoshi Bot ✧ ✦ • 🌌 Conexión Estelar ☄️",
        "⎯͢͢͢͞͞★ 𝑹𝒊𝒏 𝑰𝒕𝒐𝒔𝒉𝒊 ⚔️ • 𝐁𝐨𝐭 𝐂𝐨𝐬𝐦𝐢𝐜𝐨",
        "🌸 Rin Itoshi Bot • Resonancia del Alma 🌙",
        "⚡ Rin Itoshi Bot ⚡ | 🌀 Energía Dimensional",
        "👑 Rin Itoshi Bot • Guardián del Reino Cósmico 🌌"
    ];
    let footerRandom = footers[Math.floor(Math.random() * footers.length)];

    let profileText = `      🔮 𝐏𝐄𝐑𝐅𝐈𝐋 𝐂𝐎𝐒𝐌𝐈𝐂𝐎 🔮
   ✧ ˚₊ ⊹ Rin Itoshi Bot ⊹ ₊˚ ✧

☄️︙ *🪪 Identidad Estelar:* @${userId.split('@')[0]}
☄️︙ *🌙 Nombre Arcano:* *${name}*
☄️︙ *🌀 Esencia Vital:* _${description}_


   ⚙️ 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 𝐄𝐒𝐏𝐈𝐑𝐈𝐓𝐔𝐀𝐋
➺ 🎂 *Edad Estelar:* ${user.age || 'Incierta'}
➺ 📆 *Ciclo Cósmico:* ${cumpleanos}
➺ ⚧️ *Polaridad:* ${genero}
➺ 💖 *Vínculo Álmico:* ${pareja}

      ✦ 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 ✦
⋄ 🪙 *${moneda}:* ${coins.toLocaleString()} ${moneda}
⋄ 🍂 *Nivel Dimensional:* ${nivel}
⋄ 🌷 *Exp Cósmica:* ${exp.toLocaleString()}
⋄ 🌿 *Rango:* ${role}

✦ 🏦 *Banco ${moneda}:* ${bankCoins.toLocaleString()} ${moneda}
✦ 🔮 *Premium Cósmico:* ${user.premium ? '🟢 Activo' : '🔴 Inactivo'}

☾ 🌌 𝐑𝐞𝐬𝐨𝐧𝐚𝐧𝐜𝐢𝐚 𝐅𝐢𝐧𝐚𝐥 ☽`.trim();

    await conn.sendMessage(m.chat, { 
        image: { url: perfilImg },
        caption: profileText,
        footer: footerRandom,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '✧ Perfil de Usuario ✧',
                body: dev,
                thumbnailUrl: perfilImg,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;