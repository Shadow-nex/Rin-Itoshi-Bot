import axios from 'axios'
import cheerio from 'cheerio'
import FormData from 'form-data'

async function ffStalk(id) {
    let formdata = new FormData()
    formdata.append('uid', id)
    let { data } = await axios.post('https://tools.freefireinfo.in/profileinfo.php?success=1', formdata, {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://tools.freefireinfo.in",
            "referer": "https://tools.freefireinfo.in/profileinfo.php?success=1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/133.0.0.0 Safari/537.36",
            "cookie": "_ga=GA1.1.1069461514.1740728304; __gads=ID=fa4de8c6be61d818:T=1740728303:RT=1740728303:S=ALNI_MYhU5TQnoVCO8ZG1O95QdJQc1-u1Q; __gpi=UID=0000104decca5eb5:T=1740728303:RT=1740728303:S=ALNI_MaVhADwQqMyGY78ZADfPLLbbw8zfQ; __eoi=ID=f87957be98f6348b:T=1740728303:RT=1740728303:S=AA-Afjb5ISbOLmlxgjjGBUWT3RO3; PHPSESSID=d9vet6ol1uj3frjs359to1i56v; _ga_JLWHS31Q03=GS1.1.1740728303.1.1.1740728474.0.0.0; _ga_71MLQQ24RE=GS1.1.1740728303.1.1.1740728474.57.0.1524185982; FCNEC=%5B%5B%22AKsRol9jtdxZ87hML5ighFLFnz7cP30Fki_Fu8JOnfi-SOz3P6QL33-sNGahy6Hq5X9moA6OdNMIcgFtvZZJnrPzHecI_XbfIDiQo9Nq-I1Y_PRXKDUufD0nNWLvDRQBJcdvu_bOqn2X06Njaz3k4Ml-NvsRVw21ew%3D%3D%22%5D%5D"
        }
    })
    const $ = cheerio.load(data)
    let tr = $('div.result').html().split('<br>')
    let name = tr[0].split('Name: ')[1]
    let bio = tr[14].split(': ')[1]
    let like = tr[2].split(': ')[1]
    let level = tr[3].split(': ')[1]
    let exp = tr[4].split(': ')[1]
    let region = tr[5].split(': ')[1]
    let honorScore = tr[6].split(': ')[1]
    let brRank = tr[7].split(': ')[1]
    let brRankPoint = tr[8].split(': ')[1]
    let csRankPoint = tr[9].split(': ')[1]
    let accountCreated = tr[10].split(': ')[1]
    let lastLogin = tr[11].split(': ')[1]
    let preferMode = tr[12].split(': ')[1]
    let language = tr[13].split(': ')[1]
    let booyahPassPremium = tr[16].split(': ')[1]
    let booyahPassLevel = tr[17].split(': ')[1]
    let petName = tr[20].split(': ')[1] || 'no tiene mascota.'
    let petLevel = tr[21].split(': ')[1] || 'no tiene mascota.'
    let petExp = tr[22].split(': ')[1] || 'no tiene mascota.'
    let starMarked = tr[23].split(': ')[1] || 'no tiene mascota.'
    let selected = tr[24].split(': ')[1] || 'no tiene mascota.'
    
    let guild = 'No pertenece a una guild'
    if (tr.length > 26 && tr[26]) {
        if (tr[26].includes('Guild:')) {
            guild = tr[26].split('Guild: ')[1]
        }
    }
    let equippedItems = []
    $('.equipped-items').find('.equipped-item').each((i, e) => {
        let name = $(e).find('p').text().trim()
        let img = $(e).find('img').attr('src')
        equippedItems.push({
            name,
            img
        })
    })
    return {
        name,
        bio,
        like,
        level,
        exp,
        region,
        honorScore,
        brRank,
        brRankPoint,
        csRankPoint,
        accountCreated,
        lastLogin,
        preferMode,
        language,
        booyahPassPremium,
        booyahPassLevel,
        petInformation: {
            name: petName,
            level: petLevel,
            exp: petExp,
            starMarked,
            selected
        },
        guild,
        equippedItems
    }
}

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('*\`¡Por favor, ingrese la ID de Free Fire!\`*')
    
    m.reply('*\`ᑲᥙsᥴᥲᥒძ᥆ іᥒ𝖿᥆rmᥲᥴіóᥒ...\`*')
    
    try {
        const result = await ffStalk(text)
        
        let equippedItemsText = ''
        if (result.equippedItems && result.equippedItems.length > 0) {
            equippedItemsText = result.equippedItems.map(item => `• ${item.name}`).join('\n')
        } else {
            equippedItemsText = 'No hay elementos'
        }
        
        let caption = `
* ꆬꆬ       ݂    *F R E E  F I R E  -  S T A L K ::*    🫖֟፝  

ㅤത   ׅ     *іᥒ𝖿᥆rmᥲᥴіóᥒ ძᥱᥣ ⍴ᥱr𝖿іᥣ*      🍣     *Ɨᨣ*    ベ

仚  🍟  𔖲𔖮𔖭 *Nombre:* ${result.name}
仚  🌸  𔖲𔖮𔖭 *Bio:* ${result.bio}
仚  🍞  𔖲𔖮𔖭 *Likes:* ${result.like}
仚  🌼  𔖲𔖮𔖭 *Nivel:* ${result.level}
仚  🍀  𔖲𔖮𔖭 *EXP:* ${result.exp}
仚  🌻  𔖲𔖮𔖭 *Región:* ${result.region}
仚  ☘️  𔖲𔖮𔖭 *Puntuación de honor:* ${result.honorScore}
仚  🌵  𔖲𔖮𔖭 *Rango BR:* ${result.brRank}
仚  🍁  𔖲𔖮𔖭 *Puntos de rango BR:* ${result.brRankPoint}
仚  🌺  𔖲𔖮𔖭 *Puntos de rango CS:* ${result.csRankPoint}
仚  ☕  𔖲𔖮𔖭 *Cuenta creada:* ${result.accountCreated}
仚  🪴  𔖲𔖮𔖭 *Último ingreso:* ${result.lastLogin}
仚  🌻  𔖲𔖮𔖭 *Modo preferido:* ${result.preferMode}
仚  🍵  𔖲𔖮𔖭 *Idioma:* ${result.language}

ㅤത   ׅ     *⍴ᥲsᥱ ᑲ᥆᥆ᥡᥲһ*      🍇     *Ɨᨣ*    ベ

仚  🎫  𔖲𔖮𔖭 *Premium:* ${result.booyahPassPremium}
仚  🌟  𔖲𔖮𔖭 *Nivel:* ${result.booyahPassLevel}

ㅤത   ׅ     *іᥒ𝖿᥆rmᥲᥴіóᥒ ძᥱ ᥣᥲ mᥲsᥴ᥆𝗍ᥲ*      🍜     *Ɨᨣ*    ベ

仚  🐶  𔖲𔖮𔖭 *Nombre:* ${result.petInformation.name}
仚  🎈  𔖲𔖮𔖭 *Nivel:* ${result.petInformation.level}
仚  ⭐  𔖲𔖮𔖭 *EXP:* ${result.petInformation.exp}
仚  💫  𔖲𔖮𔖭 *Marca de estrella:* ${result.petInformation.starMarked}
仚  🦄  𔖲𔖮𔖭 *Seleccionado:* ${result.petInformation.selected}

ㅤത   ׅ     *ᥱᥣᥱmᥱᥒ𝗍᥆s ᥱ𝗊ᥙі⍴ᥲძ᥆s*      💜     *Ɨᨣ*    ベ

仚  🎒  𔖲𔖮𔖭 ${equippedItemsText}

ㅤㅤㅤ࿙࿚ㅤׅㅤ࿙࿚࿙࿚ㅤׅㅤ࿙࿚  
> [ ✰ ] ${club}
`.trim()
        
        await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
    } catch (error) {
        console.error(error)
        m.reply('Ocurrió un error al buscar esa ID. Asegúrate de que la ID ingresada sea correcta.')
    }
}

handler.help = ['ffstalk']
handler.tags = ['stalk']
handler.command = /^(ffstalk|freestalk)$/i

export default handler