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

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    let profileText = `
╔═━━━──༺༻──━━━═╗
     🧿 𝐏𝐑𝐎𝐅𝐈𝐋 𝐀𝐒𝐓𝐑𝐀𝐋 🧿
      ⟡ ℝ𝕚𝕟 𝕀𝕥𝕠𝕤𝕙𝕚 𝔹𝕠𝕥 𝔼𝕟𝕖𝕣𝕘𝕪 ⟡
╚═━━━──༺༻──━━━═╝

> 𖥔 ︳*🪪 𝐈𝐃 𝐃𝐞 𝐔𝐬𝐮𝐚𝐫𝐢𝐨:* @${userId.split('@')[0]}
> 𖥔 ︳*🌙 𝐍𝐨𝐦𝐛𝐫𝐞 𝐌𝐢𝐬𝐭𝐢𝐜𝐨:* *${name}*
> 𖥔 ︳*🌀 𝐄𝐬𝐞𝐧𝐜𝐢𝐚 𝐢𝐧𝐭𝐞𝐫𝐢𝐨𝐫:* _${description}_

 \`🜁 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 𝐕𝐈𝐓𝐀𝐋\`
> ║◦ *🎂 Edad Cósmica:* ${user.age || 'Incierta'}
> ║◦ *📆 Fecha Estelar:* ${cumpleanos}
> ║◦ *⚧️ Energía:* ${genero}
> ║◦ *💖 Lazo Álmico:* ${pareja}

─• *\`𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒\`* •─
∘🪙.• *${moneda}:* ${coins.toLocaleString()} ${moneda}
∘🍂.• *Nivel Dimensional:* ${nivel}
∘🌷.• *Exp Astral:* ${exp.toLocaleString()}
∘🌿.• *Rango:* ${role}

° *🏦 ${moneda} bank:* ${bankCoins.toLocaleString()} ${moneda}
° *🔮 Premium Astral:* ${user.premium ? '🟢 Activo' : '🔴 Inactivo'}

> 🌠 𝐈𝐍𝐓𝐄𝐑𝐏𝐑𝐄𝐓𝐀𝐂𝐈𝐎𝐍 𝐅𝐈𝐍𝐀𝐋:`.trim();

    await conn.sendMessage(m.chat, { 
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '✧ Perfil de Usuario ✧',
                body: dev,
                thumbnailUrl: perfil,
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