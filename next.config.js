/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
