/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false
    },
    images: {
        domains: ['assets.bloggios.in']
    }
};

export default nextConfig;
