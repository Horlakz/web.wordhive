/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.wordhive.horlakz.com",
        port: "",
        pathname: "/media/**",
      },
    ],
    domains: ["ui-avatars.com", "api.wordhive.horlakz.com", "localhost"],
  },
};

module.exports = nextConfig;
