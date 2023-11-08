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
        {
          source: '/authorize',
          destination: `http://localhost:3001/auth/authorize`,
        },
        {
          source: '/callback',
          destination: `http://localhost:3001/auth/callback`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
