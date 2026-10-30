/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The marketing pages are static, so they are prerendered at build time and
  // served as HTML. That is the whole point of the move: crawlers that do not
  // run JavaScript still get the content.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
