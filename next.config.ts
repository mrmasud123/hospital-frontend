import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;