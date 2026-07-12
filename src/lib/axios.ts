import axios from "axios";

// Every authenticated request goes through the Next.js proxy at
// src/app/api/proxy/[...path]/route.ts, which reads the httpOnly
// "auth_token" cookie server-side and attaches it as a Bearer header
// before forwarding to Laravel. The browser never sees the token, so
// there is no client-side "attach the token" step needed here anymore.
export const api = axios.create({
    baseURL: "/api/proxy",
    headers: { "Content-Type": "application/json" },
});
