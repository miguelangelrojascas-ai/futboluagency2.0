import { Anton, Bebas_Neue } from "next/font/google";

/**
 * Fonts for the editorial home.
 *
 * Headlines are meant to be Druk Condensed Super (Commercial Type, paid
 * licence). Until its files are in the repo, Anton stands in: same condensed,
 * heavy build. To switch, drop the licensed .woff2 files in src/fonts/ and
 * replace `druk` with:
 *
 *   localFont({
 *     src: [
 *       { path: "./DrukCond-Super.woff2", weight: "900", style: "normal" },
 *       { path: "./DrukCond-SuperItalic.woff2", weight: "900", style: "italic" },
 *     ],
 *     variable: "--font-druk",
 *     display: "swap",
 *   })
 *
 * Anton has no italic, so the browser slants it for the emphasised words; the
 * real Druk Super Italic replaces that automatically.
 */
export const druk = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-druk",
});

export const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas",
});
