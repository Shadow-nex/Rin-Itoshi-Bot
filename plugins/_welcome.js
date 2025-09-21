/*import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return true

    // --- FUNCIONES AUXILIARES ---
    const getPais = (numero) => {
        const paisesPorPrefijo = {
            "1": "🇺🇸 Estados Unidos",
            "34": "🇪🇸 España",
            "52": "🇲🇽 México",
            "54": "🇦🇷 Argentina",
            "55": "🇧🇷 Brasil",
            "56": "🇨🇱 Chile",
            "57": "🇨🇴 Colombia",
            "58": "🇻🇪 Venezuela",
            "591": "🇧🇴 Bolivia",
            "593": "🇪🇨 Ecuador",
            "595": "🇵🇾 Paraguay",
            "598": "🇺🇾 Uruguay",
            "502": "🇬🇹 Guatemala",
            "503": "🇸🇻 El Salvador",
            "504": "🇭🇳 Honduras",
            "505": "🇳🇮 Nicaragua",
            "506": "🇨🇷 Costa Rica",
            "507": "🇵🇦 Panamá",
            "51": "🇵🇪 Perú",
            "53": "🇨🇺 Cuba",
            "91": "🇮🇳 India"
        }
        const numeroLimpio = numero.replace(/\D/g,'') 
        for (let i = 1; i <= 3; i++) {
            const prefijo = numeroLimpio.slice(0, i)
            if (paisesPorPrefijo[prefijo]) return paisesPorPrefijo[prefijo]
        }
        return "🌎 Desconocido"
    }

    const getTimeZone = (numero) => {
        const zonasHorarias = {
            "1": "America/New_York",
            "34": "Europe/Madrid",
            "52": "America/Mexico_City",
            "54": "America/Argentina/Buenos_Aires",
            "55": "America/Sao_Paulo",
            "56": "America/Santiago",
            "57": "America/Bogota",
            "58": "America/Caracas",
            "591": "America/La_Paz",
            "593": "America/Guayaquil",
            "595": "America/Asuncion",
            "598": "America/Montevideo",
            "502": "America/Guatemala",
            "503": "America/El_Salvador",
            "504": "America/Tegucigalpa",
            "505": "America/Managua",
            "506": "America/Costa_Rica",
            "507": "America/Panama",
            "51": "America/Lima",
            "53": "America/Havana",
            "91": "Asia/Kolkata"
        }
        const numeroLimpio = numero.replace(/\D/g,'')
        for (let i = 1; i <= 3; i++) {
            const prefijo = numeroLimpio.slice(0, i)
            if (zonasHorarias[prefijo]) return zonasHorarias[prefijo]
        }
        return "America/Lima"
    }

    const numeroUsuario = m.key.participant?.split('@')[0].replace(/\D/g,'')
    if (!numeroUsuario) return
    const pais = getPais(numeroUsuario)
    const zona = getTimeZone(numeroUsuario)

    const thumbRes = await fetch("https://files.catbox.moe/jkw74m.jpg")
    const thumbBuffer = await thumbRes.buffer()
    const fkontak = {
        key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" },
        message: { locationMessage: { name: `(☆ RIN ITOSHI ULTRA ☆) ⭐`, jpegThumbnail: thumbBuffer } },
        participant: "0@s.whatsapp.net"
    }

    let ppUrl = await conn.profilePictureUrl(m.messageStubParameters[0] || m.key.participant, 'image')
        .catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

    let chat = global.db.data.chats[m.chat]
    let groupSize = participants.length
    if (m.messageStubType == 27) groupSize++         
    else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--

    let fechaObj = new Date()
    let hora = fechaObj.toLocaleTimeString('es-PE', { timeZone: zona, hour: '2-digit', minute: '2-digit' })
    let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: zona })
    let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: zona })

    // --- MENSAJE BIENVENIDA ---
    if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        // Usamos el número limpio
        const entranteNumero = String(m.participants?.[0] || m.key.participant).split('@')[0].replace(/\D/g,'')
        let welcomeMessage = `*🌸━━✦ WELCOME ✦━━🌸*\n
✨ ¡@${entranteNumero}, un nuevo nakama ha llegado al clan! ⚔️
🎌 Grupo: *${groupMetadata.subject}*
📅 Fecha: ${dia}, ${fecha}
⏰ Hora: ${hora}
🌍 País: ${getPais(entranteNumero)}
👥 Miembros: ${groupSize}

🌟 ¡Prepara tus poderes y que comience la aventura! 🐉
💬 Recuerda saludar a todos y compartir tu energía positiva 💖
`
        const fakeContext = {
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: { newsletterJid: "120363401008003732@newsletter", serverMessageId: '', newsletterName: "₊꒰✩ RIN ITOSHI BOT ✿" },
                externalAdReply: { title: "☆ Rin Itoshi Bot ☆", body: "Desarrollado x ShadowCore", mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: ppUrl, sourceUrl: "https://instagram.com", mediaType: 1, renderLargerThumbnail: false },
                mentionedJid: [entranteNumero + "@s.whatsapp.net"]
            }
        }
        await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption: welcomeMessage, ...fakeContext }, { quoted: fkontak })
    }

    // --- MENSAJE DESPEDIDA ---
    if (chat.welcome && (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE)) {
        // Para salidas usamos m.participants[0] que garantiza el número real
        const eliminadoNumero = String(m.participants?.[0] || m.key.participant).split('@')[0].replace(/\D/g,'')
        let byeMessage = `*💔━━✦ GOODBYE ✦━━💔*\n
😢 @${eliminadoNumero} ha sido eliminado del grupo *${groupMetadata.subject}*.
📅 Fecha: ${dia}, ${fecha}
⏰ Hora: ${hora}
🌍 País: ${getPais(eliminadoNumero)}
👥 Miembros restantes: ${groupSize}

🕊️ Que tus caminos sean épicos, nakama 🌸
⚡ ¡Siempre serás parte de nuestra historia! ✨
`
        const fakeContext = {
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: { newsletterJid: "120363401008003732@newsletter", serverMessageId: '', newsletterName: "₊꒰✩ RIN ITOSHI BOT ✿" },
                externalAdReply: { title: "☆ Rin Itoshi Bot ☆", body: "Desarrollado x ShadowCore", mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: ppUrl, sourceUrl: "https://instagram.com", mediaType: 1, renderLargerThumbnail: false },
                mentionedJid: [eliminadoNumero + "@s.whatsapp.net"]
            }
        }
        await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption: byeMessage, ...fakeContext }, { quoted: fkontak })
    }
}
*/

import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return true;

    const chat = globalThis.db.data.chats[m.chat] || {};
    const isWelcomeOn = chat.welcome ?? true;


    const welcomeMsg = ({ user, groupName, memberCount, dateTime }) =>
        `🌸 ¡Bienvenido @${user.split('@')[0]}!\n` +
        `💖 Grupo: *${groupName}*\n` +
        `✨ Total miembros: ${memberCount}\n` +
        `📅 Fecha: ${dateTime.date}\n` +
        `🕒 Hora: ${dateTime.time}\n` +
        `📆 Día: ${dateTime.day}\n` +
        `🎉 Preséntate y pásala genial!`;

    const goodbyeMsg = ({ user, groupName, memberCount, dateTime }) =>
        `🌷 Adiós @${user.split('@')[0]}!\n` +
        `💔 Grupo: *${groupName}*\n` +
        `👥 Quedan ${memberCount} miembros\n` +
        `📅 Fecha: ${dateTime.date}\n` +
        `🕒 Hora: ${dateTime.time}\n` +
        `📆 Día: ${dateTime.day}\n` +
        `😢 Te extrañaremos!`;

    const getProfilePic = async (jid) => {
        try {
            return await conn.profilePictureUrl(jid, 'image');
        } catch {
            try {
                return await conn.profilePictureUrl(conn.user.id, 'image');
            } catch {
                return banner;
            }
        }
    }

    const getDateTime = () => {
        const d = new Date();
        const day = d.toLocaleDateString('es-ES', { weekday: 'long' });
        const date = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
        const time = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return { day, date, time };
    }

    // --- Bienvenida ---
    if (m.messageStubType === 1 && isWelcomeOn) {
        for (const user of m.messageStubParameters || []) {
            const pp = await getProfilePic(user);
            const msg = welcomeMsg({
                user,
                groupName: groupMetadata.subject,
                memberCount: groupMetadata.participants.length,
                dateTime: getDateTime()
            });
            await conn.sendMessage(m.chat, {
                image: { url: pp },
                caption: msg,
                mentions: [user]
            });
        }
    }

    // --- Despedida ---
    if (m.messageStubType === 2 && isWelcomeOn) {
        for (const user of m.messageStubParameters || []) {
            const pp = await getProfilePic(user);
            const msg = goodbyeMsg({
                user,
                groupName: groupMetadata.subject,
                memberCount: groupMetadata.participants.length,
                dateTime: getDateTime()
            });
            await conn.sendMessage(m.chat, {
                image: { url: pp },
                caption: msg,
                mentions: [user]
            });
        }
    }

    return true;
}