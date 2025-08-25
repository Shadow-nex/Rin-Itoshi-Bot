import fetch from 'node-fetch';

// ------------------------
// Comando principal
// ------------------------
let handler = async (m, { conn, command }) => {
  await sendTebakGambar(m, conn);
};

handler.command = ['tebakgambar', 'tbg'];
export default handler;

// ------------------------
// Función para enviar el juego
// ------------------------
async function sendTebakGambar(m, conn) {
  try {
    const res = await fetch('https://api.vreden.my.id/api/tebakgambar');
    const data = await res.json();
    const image = data.result[0].image;
    const jawaban = data.result[0].jawaban;

    // Guardar respuesta por chat
    conn.tebakGambar = conn.tebakGambar || {};
    conn.tebakGambar[m.chat] = jawaban.toLowerCase();

    // Botones rápidos
    const buttons = [
      { buttonId: 'btn_tebakgambar', buttonText: { displayText: ' Otra imagen' }, type: 1 },
      { buttonId: 'btn_hint', buttonText: { displayText: '💡 Pista' }, type: 1 },
      { buttonId: 'btn_giveup', buttonText: { displayText: '❌ Rendirse' }, type: 1 }
    ];

    // Lista tipo Flow
    const sections = [
      {
        title: 'Opciones',
        rows: [
          { title: '🔄 Otra imagen', rowId: 'btn_tebakgambar' },
          { title: '💡 Pista', rowId: 'btn_hint' },
          { title: '❌ Rendirse', rowId: 'btn_giveup' }
        ]
      }
    ];

    const listMessage = {
      text: `
╭━━━〔 🧩 TEBAK GAMBAR 〕━━⬣
┃ Intenta adivinar la respuesta de esta imagen.
┃ Presiona un botón, usa la lista o escribe tu respuesta.
╰━━━━━━━━━━━━━━━━⬣
      `.trim(),
      footer: 'Rin Itoshi Bot',
      title: 'Tebak Gambar',
      buttonText: 'Opciones',
      sections
    };

    // Enviar imagen con botones y lista
    await conn.sendMessage(m.chat, {
      image: { url: image },
      caption: listMessage.text,
      footer: listMessage.footer,
      buttons,
      headerType: 4
    });

  } catch (err) {
    m.reply('❌ Error al obtener el juego.');
    console.error(err);
  }
}

// ------------------------
// Handler de botones y mensajes
// ------------------------
let buttonHandler = async (m, { conn, buttonId, text }) => {
  if (!conn.tebakGambar || !conn.tebakGambar[m.chat]) return;
  const answer = conn.tebakGambar[m.chat];

  // Acciones según botón
  switch (buttonId) {
    case 'btn_tebakgambar':
      return sendTebakGambar(m, conn); // Nueva ronda
    case 'btn_hint':
      return m.reply(`💡 Pista: Empieza con "${answer.split(' ')[0]}"`);
    case 'btn_giveup':
      delete conn.tebakGambar[m.chat];
      return m.reply(`❌ La respuesta correcta era: ${answer}`);
  }

  // Validar respuesta escrita
  if (text) {
    if (text.toLowerCase() === answer) {
      delete conn.tebakGambar[m.chat];
      return m.reply('🎉 ¡Correcto! Has adivinado.');
    } else {
      return m.reply('❌ Incorrecto, intenta de nuevo.');
    }
  }
};

export { buttonHandler };

// ------------------------
// Integración con Baileys
// ------------------------
// Este snippet va en tu manejador global de mensajes:
conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0];
  const buttonId = m.message?.buttonsResponseMessage?.selectedButtonId;
  const listId = m.message?.listResponseMessage?.singleSelectReply?.selectedRowId;
  const text = m.message?.conversation || m.message?.extendedTextMessage?.text;

  if (buttonId || listId || text) {
    await buttonHandler(m, { conn, buttonId: buttonId || listId, text });
  }
});