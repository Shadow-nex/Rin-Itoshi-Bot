const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];

  if (!user.lastclaim) user.lastclaim = 0;
  if (!user.coin) user.coin = 0;
  if (!user.exp) user.exp = 0;
  if (!user.tokens) user.tokens = 0;

 
  const cooldown = 12 * 60 * 60 * 1000;
  const now = Date.now();
  const timeLeft = user.lastclaim + cooldown - now;

  if (timeLeft > 0) {
    return conn.reply(m.chat, `⏳ Ya usaste este comando.\nVuelve en *${msToTime(timeLeft)}*`, m);
  }

  const coinsGanados = 100;
  const expGanada = 250;
  const tokensGanados = 10;

  user.coin += coinsGanados;
  user.exp += expGanada;
  user.tokens += tokensGanados;
  user.lastclaim = now;

  const nombre = await conn.getName(m.sender);

  conn.sendMessage(m.chat, {
    text: `🎉 *Recompensa recibida*\n\n👤 @${m.sender.split('@')[0]} (${nombre}) ha ganado:\n> 💰 *${coinsGanados} ${moneda}*\n> ⭐ *${expGanada} XP*\n> 🪙 *${tokensGanados} Tokens*`,
    mentions: [m.sender]
  }, { quoted: m });
};

handler.help = ['regalo2'];
handler.tags = ['rpg'];
handler.command = ['regalo2'];
export default handler;

function msToTime(duration) {
  let hours = Math.floor(duration / (1000 * 60 * 60));
  let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((duration % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
}