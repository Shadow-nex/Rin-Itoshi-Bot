import axios from 'axios'
var handler = async(m, { conn, text }) => {
let loadd = [
 '《██▒▒▒▒▒▒▒▒▒▒▒》10%',
 '《████▒▒▒▒▒▒▒▒▒》30%',
 '《███████▒▒▒▒▒▒》50%',
 '《██████████▒▒▒》70%',
 '《█████████████》100%',
 '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...'
 ]

let { key } = await conn.sendMessage(m.chat, {text: '_Loading_'})//Pengalih isu

for (let i = 0; i < loadd.length; i++) {
await conn.sendMessage(m.chat, {text: loadd[i], edit: key })}

  if (!text) return conn.reply(m.chat, '*\`🌹 INGRESE EL NOMBRE DE UN USUARIO DE GITHUB\`*', m, rcanal)

  await m.reply('*B U S C A N D O ✅*')
  let request = await githubstalk(text) 
    let { username, following, followers, type, bio, company, blog, location, email, public_repo, public_gists, profile_pic } = request
    let thumb = await (profile_pic)
    let hasil = `*\`⬤── 「 𝙂𝙄𝙏𝙃𝙐𝘽 𝙎𝙏𝘼𝙇𝙆 」 ──⬤\`*
*\`🌹 *nombre de usuario\`*: ${username}
*\`🌹 *Bio\`*: ${bio}
*\`🌹 *Compañía\`*: ${company}
*\`🌹 *Email:\`* ${email}
*\`🌹 *Blog:\`* ${blog}
*\`🌹 *Repositorios públicos:\`* ${public_repo}
*\`🌹 *Gists Publik:\`* ${public_gists}
*\`🌹 *Follower:\`* ${followers}
*\`🌹 *Following:\`* ${following}
*\`🌹 *Lokasi:\`* ${location}
*\`🌹 *Type:\`* ${type}
`

    conn.sendFile(m.chat, thumb, 'githubstalk.jpg', hasil, m, rcanal)
}
handler.help = ['githubstalk'].map(v => v + ' <query>')
handler.tags = ['stalk']
handler.command = ['githubstalk']

export default handler

async function githubstalk(user) {
    return new Promise((resolve, reject) => {
        axios.get('https://api.github.com/users/'+user)
        .then(({ data }) => {
            let hasil = {
                username: data.login,
                nickname: data.name,
                bio: data.bio,
                id: data.id,
                nodeId: data.node_id,
                profile_pic: data.avatar_url,
                url: data.html_url,
                type: data.type,
                admin: data.site_admin,
                company: data.company,
                blog: data.blog,
                location: data.location,
                email: data.email,
                public_repo: data.public_repos,
                public_gists: data.public_gists,
                followers: data.followers,
                following: data.following,
                ceated_at: data.created_at,
                updated_at: data.updated_at
            }
            resolve(hasil)
        })
    })
}
