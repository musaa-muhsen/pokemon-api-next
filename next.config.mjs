/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "raw.githubusercontent.com",
          },
        ],
        },
      // i18n: {
      //   locales: ['en'],
      //   defaultLocale: 'en',
      // },
      // experimental: {
      //   serverActions: true,
      // },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      }
};

export default nextConfig;
