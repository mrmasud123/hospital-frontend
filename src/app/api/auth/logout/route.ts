import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const token = (await cookies()).get("token")?.value;

    if (token) {
        await fetch(`${process.env.API_URL}/api/logout`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    const res = NextResponse.json({ message: "Logged out" });
    res.cookies.delete("token");
    return res;
}