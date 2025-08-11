import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return await conn.sendMessage(
      m.chat,
      { text: "🔥 Ejemplo: .wikis Anime" },
      { quoted: m }
    );
  }

  try {
    const searchUrl = `https://es.m.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(text)}&format=json&utf8=1`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    const searchResults = searchData.query.search;

    if (searchResults.length === 0) {
      return await conn.sendMessage(
        m.chat,
        { text: "🌹 No hay respuesta de Wikipedia." },
        { quoted: m }
      );
    }

    const articleTitle = searchResults[0].title;
    const articleUrl = `https://es.m.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}`;
    const articleResponse = await fetch(articleUrl);
    const articleHtml = await articleResponse.text();
    const $ = cheerio.load(articleHtml);

    let articleContent = "";
    $('p').each((index, element) => {
      articleContent += $(element).text().trim() + "\n\n";
      if (index >= 4) return false;
    });

    let message = '`乂  W I K I  -  B U S C A R`\n\n';
    message += `  ✩   *Título* : ${articleTitle}\n`;
    message += `  ✩   *Descripción* :\n${articleContent}\n`;
    message += `  ✩   *Link* : [${articleTitle}](${articleUrl})\n\n`;
    message += `> 🔥 Powered by black`;

    await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    await m.react('🔍');

  } catch (error) {
    console.error("Error fetching from Wikipedia:", error);
    await conn.sendMessage(
      m.chat,
      { text: "Error." },
      { quoted: m }
    );
  }
};

handler.command = ['wikis'];
handler.tags = ['buscador'];
handler.help = ['wikis'];
export default handler;