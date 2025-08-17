import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment.tz('America/Lima').format('hh:mm:ss A')
    let dia = moment.tz('America/Lima').locale('es').format('dddd')

    let nombreUser = m.pushName || 'Usuario'
    let pais = '🇵🇪 Perú'
    let botName = global.bot || 'Rin Itoshi'
    let club = '🌲 Owner Panel • Shadow•Core 🌲'

    let menu = `
[ꔊꔊꔊ[🍉] _*MENU - OWNER*_ [🍓]ꔊꔊꔊ]    

👤 Usuario: *${nombreUser}*
🤖 Bot: *${botName}*
🌎 País: ${pais}
⏰ Hora: *${hora}*
📅 Fecha: *${fecha}*
📆 Día: *${dia}*

💥 Comandos de moderación y control avanzado para owners 🌼

🛠️  Gestión de Owners:
𖤓❴ *#α∂∂οωиєя • #∂єℓοωиєя*
> ✦ Agrega o elimina un número de la lista de owners.

🔑  Tokens y seguridad:
𖤓❴ *#ϲο∂ιgο*
> ✦ Crea un token de canje de códigos.
𖤓❴ *#ϐαϲκυρ • #ϲορια*
> ✦ Crea un respaldo de seguridad de la DB del bot.

📢  Mensajes globales:
𖤓❴ *#ϐϲgϲ*
> ✦ Envía un mensaje a todos los grupos donde está el bot.

🧹  Limpieza y mantenimiento:
𖤓❴ *#ϲℓєαиƒιℓєѕ*
> ✦ Elimina archivos temporales.
𖤓❴ *#∂ѕοωиєя • #∂єℓαι*
> ✦ Elimina archivos innecesarios de sesión.
𖤓❴ *#ϲℓєαяτмρ • #ναϲιαяτмρ*
> ✦ Limpia la carpeta TMP.

💰  Economía y permisos:
𖤓❴ *#α∂∂ϲοιиѕ • #αñα∂ιяϲοιи*
> ✦ Añade coins a un usuario.
𖤓❴ *#υѕєяρяємιυм • #α∂∂ρяєм*
> ✦ Otorga premium a un usuario.
𖤓❴ *#∂єℓρяєм #яємονє*
> ✦ Quita premium a un usuario.

⚙️  Administración automática y seguridad:
𖤓❴ *#αυτοα∂мιи*
> ✦ El bot dará admin automáticamente si corresponde.
𖤓❴ *#ϐℓοϲκ • #υнϐℓοϲк*
> ✦ Bloquea o desbloquea un número del bot.
𖤓❴ *#ℓιѕτϐαн • #ϐαнℓιѕτ*
> ✦ Lista de usuarios y chats baneados.

🖼️  Configuración visual:
𖤓❴ *#ѕєτιмαgє • #ѕєτρƒρ*
> ✦ Cambia foto de perfil del bot.
𖤓❴ *#ѕєτмοиє∂α*
> ✦ Cambia moneda del bot.
𖤓❴ *#ѕєτиαмє*
> ✦ Cambia nombre del bot.
𖤓❴ *#ѕєτϐιο • #ѕєτѕτατυѕ*
> ✦ Cambia biografía del bot.

🌐  Actualización y reuniones:
𖤓❴ *#υρ∂αтє*
> ✦ Actualiza el bot desde GitHub.
𖤓❴ *#яєιиιϲιαя • #яєѕταяτ*
> ✦ Reinicia el servidor del bot.
𖤓❴ *#яєυнιοн • #мєєτιиg*
> ✦ Envía aviso de reunión a los owners.
`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: logo },
      caption: menu,
      footer: club,
      buttons: [
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "📜 Menú Principal" }, type: 1 },
        { buttonId: `${usedPrefix}rpg`, buttonText: { displayText: "🎮 Menú RPG" }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al mostrar el menú OWNER.')
  }
}

handler.help = ['dev']
handler.tags = ['owner']
handler.command = ['dev', 'menuowner']

export default handler