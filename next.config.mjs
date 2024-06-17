/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false
    },
    images: {
        domains: ['bloggios.com']
    }
};

export default nextConfig;
