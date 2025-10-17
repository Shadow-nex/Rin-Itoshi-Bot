import axios from "axios";
import cheerio from "cheerio";

/**
 * Resuelve una query (nombre, id o URL) a un appId válido.
 * @param {string} query - Puede ser: "WhatsApp", "com.whatsapp" o la URL completa de Play Store.
 * @returns {Promise<{ appId: string, url: string }>}
 */
export async function resolveAppId(query) {
  try {
    query = (query || "").trim();
    if (!query) throw new Error("query vacío");

    // Si es URL de Play Store
    if (query.includes("play.google.com")) {
      try {
        const url = new URL(query);
        const id = url.searchParams.get("id");
        if (!id) throw new Error("No se encontró id en la URL");
        return { appId: id, url: `https://play.google.com/store/apps/details?id=${id}` };
      } catch (err) {
        throw new Error("URL inválida: " + err.message);
      }
    }

    // Si parece ya un appId (com.nombre.paquete)
    if (/^[a-zA-Z0-9_.]+$/.test(query) && query.includes(".")) {
      return { appId: query, url: `https://play.google.com/store/apps/details?id=${query}` };
    }

    // Si es nombre libre: buscar en Play Store y tomar el primer resultado
    const searchURL = `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps`;
    const { data: html } = await axios.get(searchURL, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      timeout: 10000,
    });

    const $ = cheerio.load(html);
    const first = $("a[href*='/store/apps/details?id=']").first();
    const href = first.attr("href");
    if (!href) throw new Error("No se encontró la app en Play Store (búsqueda)");
    const full = "https://play.google.com" + href;
    const id = new URL(full).searchParams.get("id");
    if (!id) throw new Error("No se pudo extraer el appId del resultado");
    return { appId: id, url: full };
  } catch (err) {
    throw new Error("resolveAppId: " + err.message);
  }
}

/**
 * Obtiene detalles visibles de la ficha Play Store (título, icono, developer, versión, tamaño, descripción).
 * @param {string} appUrl - URL completa de la app en Play Store
 * @returns {Promise<object>}
 */
export async function playstoreDetails(appUrl) {
  try {
    const { data: html } = await axios.get(appUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      timeout: 10000,
    });
    const $ = cheerio.load(html);

    const title = $("h1 span").first().text().trim() || null;
    const icon = $("img.T75of.QNCnCf").attr("src") || $("img.T75of").attr("src") || null;
    const developer = $("a.hrTbp.R8zArc").first().text().trim() || null;
    const description = $("meta[name='description']").attr("content") ||
                        $("div.DWPxHb").text().trim().slice(0, 400) ||
                        null;

    // Buscar en la lista de detalles (Current Version, Size, Installs, etc.)
    let version = null;
    let size = null;

    $("div.hAyfc").each((i, el) => {
      const label = $(el).find("div.BgcNfc").text().trim().toLowerCase();
      const value = $(el).find("span.htlgb").text().trim();
      if (!label) return;
      if (/current version|versión actual|version/i.test(label) && !version) version = value || version;
      if (/size|tamaño/i.test(label) && !size) size = value || size;
    });

    // fallback por si no se halló con los selectores anteriores (positions cambian)
    if (!version) version = $("div.hAyfc .htlgb").eq(3).text().trim() || null;

    return {
      title,
      icon,
      developer,
      description,
      version,
      size,
      url: appUrl,
      appId: new URL(appUrl).searchParams.get("id"),
    };
  } catch (err) {
    throw new Error("playstoreDetails: " + err.message);
  }
}

/**
 * Llama a la API de respaldo para obtener el link directo del APK.
 * (La API usada en tu plugin es https://api.nyxs.pw/playstore/download?id=)
 * @param {string} appId
 * @returns {Promise<object>} { link, name, version, size, icon, url, ... }
 */
export async function getDownloadFromNyxs(appId) {
  try {
    if (!appId) throw new Error("appId requerido");
    const apiUrl = `https://api.nyxs.pw/playstore/download?id=${encodeURIComponent(appId)}`;
    const { data } = await axios.get(apiUrl, { timeout: 20000 });
    // la API suele devolver { link: "...", name: "...", version: "...", size: "...", icon: "...", url: "..." }
    if (!data || !data.link) throw new Error("API de descarga no devolvió enlace (data.link)");
    return data;
  } catch (err) {
    throw new Error("getDownloadFromNyxs: " + err.message);
  }
}

/**
 * Función principal conveniente: recibe query (nombre, id o url) y devuelve
 * { appId, url, title, icon, developer, description, version, size, download }
 * donde download es el objeto devuelto por la API (incluye link).
 * @param {string} query
 */
export async function playstoreGet(query) {
  try {
    // 1) resolver appId y appUrl
    const { appId, url } = await resolveAppId(query);

    // 2) detalles de la ficha (scraper)
    let details = {};
    try {
      details = await playstoreDetails(url);
    } catch (e) {
      // Si falla el scrapping, no rompemos: seguimos con la API de backup
      details = { appId, url };
    }

    // 3) obtener link de descarga desde la API de respaldo
    const download = await getDownloadFromNyxs(appId);

    return {
      appId,
      url,
      name: details.title || download.name || appId,
      icon: details.icon || download.icon || null,
      developer: details.developer || download.developer || null,
      description: details.description || download.description || null,
      version: details.version || download.version || null,
      size: details.size || download.size || null,
      download, // incluye .link
    };
  } catch (err) {
    throw new Error("playstoreGet: " + err.message);
  }
}

export default {
  resolveAppId,
  playstoreDetails,
  getDownloadFromNyxs,
  playstoreGet,
};