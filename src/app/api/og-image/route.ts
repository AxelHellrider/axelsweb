export const runtime = "nodejs";

function absoluteUrl(src: string, base: URL): string {
  try {
    if (!src) return "";
    const trimmed = src.trim().replace(/"|'/g, "");
    if (trimmed.startsWith("//")) return `${base.protocol}${trimmed}`;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("/")) return `${base.origin}${trimmed}`;
    return new URL(trimmed, base.href).toString();
  } catch {
    return "";
  }
}

function extractImageFromHtml(html: string, base: URL): string | null {
  const findMeta = (regex: RegExp) => {
    const m = html.match(regex);
    return m?.[1] ? absoluteUrl(m[1], base) : null;
  };

  // Try Open Graph first
  const og = findMeta(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    || findMeta(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);
  if (og) return og;

  // Then Twitter card
  const tw = findMeta(/<meta[^>]+name=["']twitter:image(?::src)?["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    || findMeta(/<meta[^>]+content=["']([^"']+)["'][^>]*name=["']twitter:image(?::src)?["'][^>]*>/i);
  if (tw) return tw;

  // Icons as last resort
  const linkIconMatch = html.match(/<link[^>]+rel=["'](?:shortcut icon|icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["'](?:shortcut icon|icon|apple-touch-icon)["'][^>]*>/i);
  if (linkIconMatch?.[1]) return absoluteUrl(linkIconMatch[1], base);

  return null;
}

async function fetchWithUA(url: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has("user-agent")) {
    headers.set(
      "user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
    );
  }
  return fetch(url, { ...init, headers });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");
  if (!target) {
    return Response.redirect(new URL("/window.svg", request.url), 302);
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(target);
  } catch {
    return Response.redirect(new URL("/window.svg", request.url), 302);
  }

  try {
    // 1) Get HTML
    const htmlRes = await fetchWithUA(targetUrl.toString(), { cache: "no-store" });
    if (!htmlRes.ok) throw new Error(`Failed to fetch page: ${htmlRes.status}`);
    const html = await htmlRes.text();

    // 2) Extract image URL
    const imgUrl = extractImageFromHtml(html, targetUrl);
    if (!imgUrl) return Response.redirect(new URL("/window.svg", request.url), 302);

    // 3) Fetch the image and stream it back
    const imgRes = await fetchWithUA(imgUrl, { cache: "no-store" });
    if (!imgRes.ok || !imgRes.body) {
      return Response.redirect(new URL("/window.svg", request.url), 302);
    }

    const contentType = imgRes.headers.get("content-type") || "image/jpeg";
    const cacheControl = "public, s-maxage=86400, stale-while-revalidate=43200";

    return new Response(imgRes.body, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": cacheControl,
      },
    });
  } catch {
    return Response.redirect(new URL("/window.svg", request.url), 302);
  }
}