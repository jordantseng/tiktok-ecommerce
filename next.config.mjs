/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: '**.tkshop.live',
        port: '',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: '**.tkback.app',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
}

export default nextConfig
