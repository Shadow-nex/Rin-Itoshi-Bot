import fetch from 'node-fetch'

let handler = async (m, { conn, isOwner }) => {
  try {

    const transparentImg = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=',
      'base64'
    )

    await conn.updateProfilePicture(conn.user.jid, transparentImg)
    await conn.reply(m.chat, '✅ Foto de perfil del bot eliminada con éxito.', m, rcanal)
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, '*❌ Ocurrió un error al intentar eliminar la foto de perfil.', m)
  }
}

handler.help = ['delppbot']
handler.tags = ['owner']
handler.command = ['delppbot', 'removeppbot', 'deleteppbot']
handler.owner = true

export default handler