/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // TODO: remove mock url
      {
        protocol: 'https',
        hostname: 'gmedia.playstation.com',
        port: '',
        pathname: '/**/*',
      },
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
