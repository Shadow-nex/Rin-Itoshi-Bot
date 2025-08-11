import fetch from 'node-fetch';

const mssg = {
    noLink: (platform) => `*⚠️ Por favor, proporciona un enlace de ${platform}*.`,
    invalidLink: (platform) => `*❌ El enlace proporcionado no es válido de ${platform}. Por favor verifica el enlace.*`,
    error: '*⚠️ Ocurrió un error al intentar procesar la descarga.*',
    fileNotFound: '*❌ No se pudo encontrar el archivo en Mediafire. Asegúrate de que el enlace sea correcto.*',
    fileTooLarge: '*☁️ El archivo es demasiado grande más de \`650 MB\`. No se puede procesar.*',
    busy: '*⏳ El servidor está procesando otra solicitud. Por favor espere a que termine.*',
};

let isProcessing = false;

const reply = (texto, conn, m) => {
    conn.sendMessage(m.chat, { text: texto }, { quoted: m });
};

const isValidUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?mediafire\.com\/.*$/i;
    return regex.test(url);
};

const extractFileNameFromLink = (url) => {
    const match = url.match(/\/file\/[^/]+\/(.+?)\/file$/i);
    return match ? decodeURIComponent(match[1].replace(/%20/g, ' ')) : null;
};

const getMimeType = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
        'apk': 'application/vnd.android.package-archive',
        'zip': 'application/zip',
        'rar': 'application/vnd.rar',
        'mp4': 'video/mp4',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'pdf': 'application/pdf',
        'mp3': 'audio/mpeg',
    };
    return mimeTypes[ext] || 'application/octet-stream';
};

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (command === 'mediafire') {
        if (!text) return reply(`*📥 Por favor, ingresa un enlace de Mediafire*`, conn, m);
        if (isProcessing) return reply(mssg.busy, conn, m);
        if (!isValidUrl(text)) return reply(mssg.invalidLink('Mediafire'), conn, m);

        try {
            isProcessing = true;
            await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

            console.log(`Procesando enlace: ${text}`);
            let fileName = extractFileNameFromLink(text) || 'archivo_descargado';

            const apiUrl = `https://www.dark-yasiya-api.site/download/mfire?url=${encodeURIComponent(text)}`;
            const apiResponse = await fetch(apiUrl);
            const data = await apiResponse.json();

            if (data.status && data.result && data.result.dl_link) {
                const downloadUrl = data.result.dl_link;
                const fileSize = parseFloat(data.result.size.replace(/[^0-9.]/g, ''));

                if (fileSize > 650) return reply(mssg.fileTooLarge, conn, m);

                const mimeType = getMimeType(fileName);

                await conn.sendMessage(m.chat, {
                    document: { url: downloadUrl },
                    mimetype: mimeType,
                    fileName: fileName,
                }, { quoted: m });

                await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            } else {
                return reply(mssg.fileNotFound, conn, m);
            }

        } catch (error) {
            console.error('❌ Error con la API de Dark Yasiya:', error.message);
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            return reply(mssg.error, conn, m);
        } finally {
            isProcessing = false;
        }
    }
};

handler.command = ['mediafire2'];
handler.register = true;
handler.coin = 3;

export default handler;
