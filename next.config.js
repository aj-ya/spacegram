/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['bit.ly'],
    },
    assetPrefix: './',
};

module.exports = nextConfig;
