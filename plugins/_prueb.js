import { baileys } from '@whiskeysockets/baileys'
import fs from 'fs'
import path from 'path'

// Ruta del JSON
const subbotsFile = path.join('./database', 'subbots.json');

// Función para leer la DB
function loadSubbots() {
    if (!fs.existsSync(subbotsFile)) return {};
    const data = fs.readFileSync(subbotsFile, 'utf-8');
    return JSON.parse(data || '{}');
}

// Función para guardar la DB
function saveSubbots(db) {
    fs.writeFileSync(subbotsFile, JSON.stringify(db, null, 2), 'utf-8');
}

// Comando setprefix solo para subbots
let handler = async (m, { conn, command, text, usedPrefix, args, subbotId, isSubbot }) => {
    try {
        if (!isSubbot) {
            return conn.reply(m.chat, `Este comando solo funciona en subbots.`, m);
        }

        if (!text) {
            return conn.reply(
                m.chat,
                `*Uso incorrecto*\n\nEjemplo:\n${usedPrefix}${command} ! # $`,
                m
            );
        }

        let newPrefixes = [...new Set(args)];

        // Cargar DB
        const db = loadSubbots();

        // Guardar prefijos del subbot
        db[subbotId] = db[subbotId] || {};
        db[subbotId].prefixes = newPrefixes;

        // Guardar en el JSON
        saveSubbots(db);

        let response = `✦ Subbot: *${subbotId}*
✦ Prefijo(s) actualizado(s):
  ${newPrefixes.map(p => `• ${p}`).join("\n")}`.trim();

        await conn.reply(m.chat, response, m);

    } catch (err) {
        console.error(err);
        await conn.reply(m.chat, `❌ Ocurrió un error al actualizar el prefijo.`, m);
    }
};

// Config del comando
handler.command = ['setprefix'];
handler.rowner = true; 
export default handler;