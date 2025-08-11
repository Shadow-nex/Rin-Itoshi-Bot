import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `☁️ Ingresa el ID de un usuario de Free Fire que quieras stalkear`, m)

  try {
    let api = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`)
    let json = api.data
    if (!json.status) return conn.reply(m.chat, "❌ No se encontraron resultados para ese ID.", m)

    let {
      account = {},
      pet_info = {},
      guild = {},
      ketua_guild = {}
    } = json.data

    let {
      name = "Desconocido",
      level = "N/A",
      xp = "N/A",
      region = "N/A",
      like = "N/A",
      bio = "No disponible",
      create_time = "N/A",
      last_login = "N/A",
      honor_score = "N/A",
      booyah_pass = "N/A",
      BR_points = "N/A",
      CS_points = "N/A"
    } = account

    let {
      name: petName = "Sin mascota",
      level: petLevel = "N/A",
      xp: petXP = "N/A"
    } = pet_info

    let {
      name: guildName = "Sin clan",
      level: guildLevel = "N/A",
      member = "N/A",
      capacity = "N/A"
    } = guild

    let txt = `╭━━〔 🕹️ 𝗙𝗥𝗘𝗘 𝗙𝗜𝗥𝗘 𝗦𝗧𝗔𝗟𝗞𝗘𝗥 〕━━⬣
▢ 👤 *Usuario:* ${name}
▢ 🧬 *Nivel:* ${level}
▢ 🎯 *XP:* ${xp}
▢ 🌍 *Región:* ${region}
▢ ❤️ *Likes:* ${like}
▢ 📜 *Bio:* ${bio}
▢ 📅 *Creación:* ${create_time}
▢ 🕒 *Último login:* ${last_login}
▢ 🏅 *Honor:* ${honor_score}
▢ 🎫 *Booyah Pass:* ${booyah_pass}
▢ 🎮 *Puntos BR:* ${BR_points}
▢ ⚔️ *Puntos CS:* ${CS_points}
╰━━━━━━━━━━━━━━━━━━━━⬣\n`

    txt += `\n╭━━〔 🐾 𝗠𝗔𝗦𝗖𝗢𝗧𝗔 〕━━⬣
▢ 🐶 *Nombre:* ${petName}
▢ 🔢 *Nivel:* ${petLevel}
▢ ✨ *XP:* ${petXP}
╰━━━━━━━━━━━━━━━━━━━━⬣\n`

    txt += `\n╭━━〔 🏰 𝗖𝗟𝗔𝗡 〕━━⬣
▢ 🏷️ *Nombre:* ${guildName}
▢ 🎖️ *Nivel:* ${guildLevel}
▢ 👥 *Miembros:* ${member}/${capacity}
╰━━━━━━━━━━━━━━━━━━━━⬣\n`

    if (ketua_guild.name) {
      let {
        name: leaderName = "N/A",
        level: leaderLevel = "N/A",
        xp: leaderXP = "N/A",
        BR_points: leaderBR = "N/A",
        CS_points: leaderCS = "N/A",
        like: leaderLike = "N/A",
        create_time: leaderCreate = "N/A",
        last_login: leaderLogin = "N/A"
      } = ketua_guild

      txt += `\n╭━━〔 👑 𝗟𝗜́𝗗𝗘𝗥 𝗗𝗘𝗟 𝗖𝗟𝗔𝗡 〕━━⬣
▢ 🙍 *Nombre:* ${leaderName}
▢ 🧬 *Nivel:* ${leaderLevel}
▢ 🎯 *XP:* ${leaderXP}
▢ 🎮 *Puntos BR:* ${leaderBR}
▢ ⚔️ *Puntos CS:* ${leaderCS}
▢ ❤️ *Likes:* ${leaderLike}
▢ 📅 *Creación:* ${leaderCreate}
▢ 🕒 *Último login:* ${leaderLogin}
╰━━━━━━━━━━━━━━━━━━━━⬣`
    }

    await conn.sendMessage(m.chat, { text: txt }, { quoted: m })

  } catch (error) {
    console.error(error)
    conn.reply(m.chat, "⚠️ Hubo un error al procesar la información. Puede que el ID no exista o el servidor no responda.", m)
  }
}

handler.help = ['freefirestalk <id>']
handler.tags = ['stalk']
handler.command = ['freefirestalk', 'ffstalk']

export default handler