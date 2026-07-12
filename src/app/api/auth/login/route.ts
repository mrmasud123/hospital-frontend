import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    const credentials = await request.json();

    try {
        const { data } = await axios.post(
            `${process.env.API_URL}/api/login`,
            credentials
        );

        const response = NextResponse.json(data);
        response.cookies.set("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            error.response?.data ?? { message: "Login failed" },
            { status: error.response?.status ?? 500 }
        );
    }
}