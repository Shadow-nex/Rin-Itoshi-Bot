const handler = async (m, { text, conn }) => {
    try {
        if (!text) return m.reply("《✦》 ¡Por favor, introduce el enlace del canal de WhatsApp!");

        const regex = /https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9-_]+)/;
        const match = text.match(regex);

        if (!match) return m.reply("⚠️ ¡El enlace del canal de WhatsApp no es válido!");

        let channelId = match[2];
        let res = await conn.newsletterMetadata("invite", channelId);

        if (!res || !res.id) return m.reply("❌ Falló la obtención de datos del canal. ¡Verifica el enlace nuevamente!");

        let SHADOW = `🌱 *Detalles del Canal de WhatsApp* 📡\n\n`
            + `🍂 *ID:* ${res.id}\n`
            + `⚡ *Nombre:* ${res.name}\n`
            + `⚽ *Total de Seguidores:* ${res.subscribers.toLocaleString()}\n`
            + `☘️ *Estado:* ${res.state}\n`
            + `✅ *Verificado:* ${res.verification === "VERIFIED" ? "✔ Verificado" : "❌ No Verificado"}\n`;

        return m.reply(SHADOW);
    } catch (error) {
        console.error(error);
        return m.reply("⚠️ Ocurrió un error al obtener los datos del canal. Inténtalo de nuevo más tarde.");
    }
};

handler.command = ['cekidch', 'idch'];
handler.help = ['cekidch'];
handler.tags = ['stalk'];

export default handler;