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
        // hostname: 'backend.tkshop.live',
        hostname: 'test.tkshop.live',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
}

export default nextConfig
