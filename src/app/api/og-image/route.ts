import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");
    if (!url) {
        return new NextResponse("Missing url", {status: 400});
    }

    try {
        const upstream = await fetch(url, {
            headers: {"User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)"},
            signal: AbortSignal.timeout(5000),
            next: {revalidate: 60 * 60 * 24},
        });
        if (!upstream.ok || !upstream.body) {
            return new NextResponse("Upstream error", {status: 502});
        }

        const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
        if (!contentType.startsWith("image/")) {
            return new NextResponse("Not an image", {status: 415});
        }

        return new NextResponse(upstream.body, {
            headers: {
                "content-type": contentType,
                "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
            },
        });
    } catch {
        return new NextResponse("Fetch failed", {status: 502});
    }
}
