/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `http://localhost:3001/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
