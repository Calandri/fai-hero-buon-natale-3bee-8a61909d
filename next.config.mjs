/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Support basePath for preview routing (e.g., /preview)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // Ensure assets work with basePath
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
