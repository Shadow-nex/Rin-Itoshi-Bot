import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    try {
        const dbPath = path.join('./database.json');

        if (fs.existsSync(dbPath)) {
            let db = JSON.parse(fs.readFileSync(dbPath));
            if (db.lastRestartChat) {
                await conn.sendMessage(db.lastRestartChat, { text: '「✅」 El bot ya está online!' });
                delete db.lastRestartChat;
                fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
                return;
            }
        }

        m.reply('🍂 Reiniciando El Bot....');
        
        let db = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};
        db.lastRestartChat = m.chat;
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        setTimeout(() => process.exit(0), 2000);

    } catch (error) {
        console.log(error);
        conn.reply(m.chat, `${error}`, m);
    }
}

handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];
handler.rowner = true;

export default handler;