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
                        text: "*╭━━━〔 🌴 Menú Principal 🌴 〕━━⬣*\n\nBienvenido a *Rin Itoshi Bot* ✨\nElige una opción del menú 👇"
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
                                "name": "cta_url", // 🔗 Botón URL
                                "buttonParamsJson": `{"display_text":"🌐 Página Web","url":"https://tusitio.com"}`
                            },
                            {
                                "name": "quick_reply", // ⚡ Botón rápido
                                "buttonParamsJson": `{"display_text":"📜 Lista de comandos","id":"menu_comandos"}`
                            },
                            {
                                "name": "single_select", // 📂 Botón lista tipo Flow
                                "buttonParamsJson": JSON.stringify({
                                    title: "⚙️ Configuración",
                                    sections: [
                                        {
                                            title: "Opciones",
                                            rows: [
                                                { header: "👤 Perfil", title: "Ver Perfil", id: "perfil" },
                                                { header: "⚡ Estado", title: "Mi Estado", id: "estado" }
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

handler.command = ['men', 'men']
export default handler