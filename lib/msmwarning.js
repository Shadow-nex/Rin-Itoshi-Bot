const getMensajeSistema = () => ({

  smsrowner: `*${global.comando2} es una función exclusiva de los propietarios principales. Tu acceso no está autorizado.*`,

  smsowner: `*${global.comando2} solo puede ser ejecutado por los desarrolladores. No tienes los permisos necesarios.*`,

  smsmods: `*${global.comando2} está reservado para moderadores. Tu perfil no cumple con los requisitos.*`,

  smspremium: `*${global.comando2} es un beneficio exclusivo para usuarios premium. Este privilegio aún no te corresponde.*`,

  smsgroup: `*${global.comando2} solo está disponible en grupos. Este entorno no es válido.*`,

  smsprivate: `*${global.comando2} debe utilizarse en un chat privado*`,

  smsadmin: `*${global.comando2} requiere permisos de administrador. Acceso denegado.*`,

  smsbotAdmin: `*Para ejecutar ${global.comando2}, el bot necesita ser administrador. Por favor, actualiza los permisos.*`,

  smsunreg: `⚽ ║『 *REGISTRO REQUERIDO* 』║
*Para usar "${global.comando2}" primero debes registrarte.*
 
🌀 Usa: _#${global.verifyaleatorio} ${global.user2}.${global.edadaleatoria}_`,

  smsrestrict: `🚫 ║『 *FUNCIÓN BLOQUEADA* 』║ — Esta característica está deshabilitada.`
  
})

export default getMensajeSistema
