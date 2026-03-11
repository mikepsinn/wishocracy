/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable instrumentation for Sentry
  experimental: {
    instrumentationHook: true,
  },
  async redirects() {
    return [
      {
        source: '/auth/signup',
        destination: '/auth/signin',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
