/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gmedia.playstation.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
}

export default nextConfig
