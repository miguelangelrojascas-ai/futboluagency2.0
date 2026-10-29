// Converts large source images to WebP at a sensible width for where they render.
// Run with: node scripts/optimize-images.mjs
// Re-run after dropping new photos into src/assets.
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const QUALITY = 80;

/** [max width, files]. Roster cards render ~280px wide; editorial images go full-bleed. */
const GROUPS = [
  {
    width: 800,
    files: [
      "success-omar.png",
      "committed-ander.png",
      "committed-ivan.png",
      "committed-simone.png",
      "committed-francisco.png",
      "committed-juan.png",
      "committed-jose.png",
      "success-simone.jpg",
    ],
  },
  {
    width: 1400,
    files: [
      "usa-facilities.png",
      "usa-academic.png",
      "campus-dorm.jpg",
      "campus-offcampus.jpg",
      "campus-dining.jpg",
      "card-bg-coaches-new.jpg",
      "card-bg-evaluation.jpg",
      "card-bg-profile.jpg",
      "card-bg-visas.jpg",
      "team-header-bg.jpg",
      "campus-library.jpeg",
    ],
  },
];

async function run() {
  let before = 0;
  let after = 0;
  let converted = 0;
  const kb = (n) => `${Math.round(n / 1024)}KB`;

  for (const { width, files } of GROUPS) {
    for (const name of files) {
      const src = path.join(root, "src/assets", name);
      const dest = src.replace(/\.(jpe?g|png)$/i, ".webp");

      let srcStat;
      try {
        srcStat = await fs.stat(src);
      } catch {
        continue; // already converted on a previous run
      }

      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(dest);

      const destStat = await fs.stat(dest);
      before += srcStat.size;
      after += destStat.size;
      converted += 1;
      console.log(`${name.padEnd(28)} ${kb(srcStat.size).padStart(7)} → ${kb(destStat.size).padStart(7)}`);
    }
  }

  if (!converted) {
    console.log("Nothing to convert — every listed image already has a .webp.");
    return;
  }
  const mb = (n) => `${(n / 1024 / 1024).toFixed(2)}MB`;
  console.log(`\n${converted} images: ${mb(before)} → ${mb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`);
  console.log("Originals left in place — delete them once the imports point at .webp.");
}

/** Diagrams need their original width and sharper settings than photos. */
const DIAGRAMS = [{ file: "us-soccer-pyramid.png", width: 1030, quality: 92 }];

async function runDiagrams() {
  for (const { file, width, quality } of DIAGRAMS) {
    const src = path.join(root, "src/assets", file);
    const dest = src.replace(/\.(jpe?g|png)$/i, ".webp");
    try {
      await fs.stat(src);
    } catch {
      continue;
    }
    await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(dest);
    const a = await fs.stat(src);
    const b = await fs.stat(dest);
    console.log(`${file.padEnd(28)} ${Math.round(a.size / 1024)}KB → ${Math.round(b.size / 1024)}KB (diagram)`);
  }
}

run().then(runDiagrams).catch((err) => {
  console.error(err);
  process.exit(1);
});
