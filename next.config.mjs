/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Utiliza o minificador do SWC
  experimental: {
    esmExternals: true // Melhora o tratamento de módulos externos ES
  }
};

export default nextConfig;
