import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {

    const menu = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "*╭━━━〔 🌴 List de Menus Disponibles 🌴 〕━━⬣*\n\nBienvenido a *Rin Itoshi Bot*\n #menudl -- Menu de descargas\n #menusearch -- Menu search\n #menulist - Menu list\n #menurpg - Menu rpg\n #menuowner - Menu de owners\n #menuperfil - Opciones para editar tu perfil"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: "_ʀɪɴ ɪᴛᴏꜱʜɪ ʙᴏᴛ ✨_"
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: [
                            {
                                "name": "cta_url",
                                "buttonParamsJson": `{"display_text":"🌐 Página Web","url":"https://github.com/Yuji-XDev"}`
                            },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": `{"display_text":"📜 Lista de comandos","id":"menu_comandos"}`
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