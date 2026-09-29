// Generates public/og-image.jpg (1200x630) from the existing brand logo + theme colors.
// Run with: node scripts/generate-og-image.mjs
// Re-run any time the logo or tagline changes.
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const logoPath = path.join(root, "src/assets/logo-fua.png");
const outPath = path.join(root, "public/og-image.jpg");

const WIDTH = 1200;
const HEIGHT = 630;

const svgBackground = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(217, 53%, 15%)" />
      <stop offset="100%" stop-color="hsl(354, 92%, 30%)" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <text
    x="50%"
    y="86%"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="34"
    font-weight="bold"
    fill="#ffffff"
  >Becas Deportivas en Estados Unidos</text>
</svg>
`;

const logoSize = 340;

const [background, logo] = await Promise.all([
  sharp(Buffer.from(svgBackground)).png().toBuffer(),
  sharp(logoPath)
    .resize(logoSize, logoSize, { fit: "inside" })
    .toBuffer(),
]);

await sharp(background)
  .composite([
    {
      input: logo,
      gravity: "center",
      top: Math.round(HEIGHT / 2 - logoSize / 2 - 30),
      left: Math.round(WIDTH / 2 - logoSize / 2),
    },
  ])
  .jpeg({ quality: 90 })
  .toFile(outPath);

console.log(`Wrote ${outPath}`);
