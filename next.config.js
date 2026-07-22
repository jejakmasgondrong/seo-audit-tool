/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devServer = {
        ...config.devServer,
        allowedHosts: 'all',
        client: {
          webSocketURL: 'auto://0.0.0.0:0/ws',
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
