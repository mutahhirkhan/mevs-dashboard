/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL:'http://localhost:3000/api/'
  },
  // Will be available on both server and client
  publicRuntimeConfig: {
    BASE_URL:process.env.BASE_URL,
}
}

module.exports = nextConfig
