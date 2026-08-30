const OG_IMAGE_REGEX =
    /<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/i;

export async function fetchOgImage(url: string): Promise<string | null> {
    try {
        const res = await fetch(url, {
            headers: {"User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)"},
            next: {revalidate: 60 * 60 * 24},
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) return null;

        const html = await res.text();
        const match = html.match(OG_IMAGE_REGEX);
        const imageUrl = match?.[1];
        if (!imageUrl) return null;
        // Next/Image blocks SVG by default, and og:image SVGs tend to be generic
        // site banners rather than real previews anyway — skip and let the caller fall back.
        if ((imageUrl.split("?")[0] ?? "").toLowerCase().endsWith(".svg")) return null;

        return new URL(imageUrl, url).toString();
    } catch {
        return null;
    }
}
