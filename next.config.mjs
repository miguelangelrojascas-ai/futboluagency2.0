/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* No "X-Powered-By: Next.js" header: it tells attackers what to probe for. */
  poweredByHeader: false,
  // The marketing pages are static, so they are prerendered at build time and
  // served as HTML. That is the whole point of the move: crawlers that do not
  // run JavaScript still get the content.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /* Paths with a dot never reach the middleware, so this one is handled here. */
  /* Basic security headers on every response. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [{ source: "/index.html", destination: "/es", permanent: true }];
  },
};

export default nextConfig;
