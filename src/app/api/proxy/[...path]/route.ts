import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    const token = (await cookies()).get("token")?.value;

    const url = `${process.env.API_URL}/api/${path.join("/")}${req.nextUrl.search}`;

    const laravelRes = await fetch(url, {
        method: req.method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
    });

    const data = await laravelRes.text();
    return new NextResponse(data, {
        status: laravelRes.status,
        headers: { "Content-Type": laravelRes.headers.get("Content-Type") ?? "application/json" },
    });
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };