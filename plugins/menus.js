import { generateWAMessageFromContent, proto, prepareWAMessageMedia } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
    const media = await prepareWAMessageMedia({ image: { url: 'https://tinyurl.com/28st4n83' } }, { upload: conn.waUploadToServer })

    const menu = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "╔═════════════════════╗\n║⬩𓊆◦ 𝙼𝙴𝙽𝚄𝚂 - 𝙳𝙸𝚂𝙿𝙾𝙽𝙸𝙱𝙻𝙴𝚂 ◦𓊇⬩\n╚═════════════════════╝\n\n❯l︴• \`menulist\`\n❯l︴• \`menuowner - dev\`\n❯l︴• \`menudescargas - menudl\`\n❯l︴• \`menusticker\`\n❯l︴• \`menusearch - menuse\`\n❯l︴• \`menulogos\`\n❯l︴• \`menunsfw - menu18\`\n❯l︴• \`menugrupo - menugp\`\n❯l︴• \`menuaudios - menu2\`\n❯l︴• \`menurpg\`\n❯l︴• \`menufun\`\n❯l︴• \`menutools\`\n❯l︴• \`menup\`"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: "_ʀɪɴ ɪᴛᴏꜱʜɪ ʙᴏᴛ ✨_"
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: true,
                        imageMessage: media.imageMessage
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: [
                            {
                                "name": "cta_url",
                                "buttonParamsJson": `{"display_text":"🌐 Página Web","url":"https://github.com/Yuji-XDev"}`
                            },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": `{"display_text":"📜 Lista de comandos","id":".totalfunciones"}`
                            },
                            {
                                "name": "single_select",
                                "buttonParamsJson": JSON.stringify({
                                    title: "⚙️ Configuración",
                                    sections: [
                                        {
                                            title: "Opciones",
                                            rows: [
                                                { header: "👤 Perfil", title: "Ver Perfil", id: ".perfil" },
                                                { header: "⚡ Estado", title: "Mi Estado", id: ".estado" }
                                            ]
                                        }
                                    ]
                                })
                            }
                        ]
                    })
                })
            }
        }
    }, { userJid: m.sender, quoted: m })

    await conn.relayMessage(m.chat, menu.message, { messageId: menu.key.id })
}

handler.command = ['menus']
export default handler