import {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion,
  proto,
  Browsers,
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";

import qrcode from "qrcode";
import NodeCache from "node-cache";
import fs from "fs";
import path from "path";
import pino from "pino";
import chalk from "chalk";
import { exec } from "child_process";
import { makeWASocket } from "../lib/simple.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let id = m.sender.split`@`[0];
  let pathSubBot = path.join("./Sessions/", id);
  if (!fs.existsSync(pathSubBot)) {
    fs.mkdirSync(pathSubBot, { recursive: true });
  }

  await iniciarSubBot({ pathSubBot, conn, m });
};
handler.help = ["sercode"];
handler.tags = ["serbot"];
handler.command = ["sercode"];
export default handler;

async function iniciarSubBot(options) {
  let { pathSubBot, conn, m } = options;

  let { state, saveCreds } = await useMultiFileAuthState(pathSubBot);
  let { version } = await fetchLatestBaileysVersion();

  const connectionOptions = {
    logger: pino({ level: "fatal" }),
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
    },
    browser: Browsers.macOS("Desktop"),
    version,
  };

  let sock = makeWASocket(connectionOptions);

  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin } = update;

    if (connection === "open") {
      let userName = sock.authState.creds.me.name || "Anon";
      let userJid = sock.authState.creds.me.jid;
      console.log(chalk.green(`[SUB-BOT] ${userName} conectado ✔`));

      await conn.sendMessage(m.chat, {
        text: `✅ SubBot conectado correctamente!\n\n> @${m.sender.split`@`[0]} ahora es parte del sistema.`,
        mentions: [m.sender],
      });
      global.conns.push(sock);
    }

    if (update.qr) {
      console.log("Se recibió QR pero está bloqueado (solo code).");
    }

    if (connection === "close") {
      let reason = lastDisconnect?.error?.output?.statusCode;
      console.log(chalk.red(`[SUB-BOT] Conexión cerrada. Razón: ${reason}`));
    }
  }

  sock.ev.on("connection.update", connectionUpdate);

  let secret = await sock.requestPairingCode(m.sender.split`@`[0]);
  secret = secret.match(/.{1,4}/g)?.join("-");

  let msg = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: `✨ *CÓDIGO DE VINCULACIÓN* ✨\n\n🔑 Código: *${secret}*` },
          footer: { text: "╰─⊰ Rin Itoshi SubBot ⊱─╯" },
          header: { hasMediaAttachment: false },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "📋 Copiar código",
                  id: "copy_code",
                  copy_code: secret
                })
              }
            ]
          }
        }
      }
    }
  }), { quoted: m });

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  console.log(chalk.blue(`[SUB-BOT] Código generado: ${secret}`));
}