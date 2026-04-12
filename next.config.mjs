/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source:      "/rates",
        destination: "/",
        permanent:   false, // 307 — easy to reverse later
      },
    ];
  },
};

export default nextConfig;
