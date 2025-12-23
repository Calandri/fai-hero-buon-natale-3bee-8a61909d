/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.3bee.com',
      },
      {
        protocol: 'https',
        hostname: 'api-backend-assets.s3.eu-south-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
