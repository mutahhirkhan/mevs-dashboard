/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // BASE_URL:'http://localhost:3000/api/',
    // ALCHEMY_ACCESS_TOKEN:'9ypu7nYud-JjBWy9TdWMDJGX4ONqmYFW'
    ANKR_WSS_ENDPOINT:process.env.ANKR_WSS_ENDPOINT
  },
  // Will be available on both server and client
  publicRuntimeConfig: {
    ANKR_WSS_ENDPOINT:process.env.ANKR_WSS_ENDPOINT
    // BASE_URL:process.env.BASE_URL,
  },
  serverRuntimeConfig: {
    // BASE_URL:process.env.BASE_URL,
    // ALCHEMY_ACCESS_TOKEN:process.env.ALCHEMY_ACCESS_TOKEN

  }

}

module.exports = nextConfig
