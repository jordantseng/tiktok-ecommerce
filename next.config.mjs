/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
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
