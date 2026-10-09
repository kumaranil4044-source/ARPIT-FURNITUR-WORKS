/* ============================================================
   scripts/sitemap.mjs — Google ke liye sitemap.xml banata hai
   Build me apne aap chalta hai, isliye naye product judte hi
   sitemap me aa jaate hain.
   ============================================================ */

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { PRODUCTS } from "../src/data/products.js";

const SITE_URL = "https://arpit-furnitur-works.vercel.app";

const pages = [
  "",
  "/shop",
  "/about",
  "/gallery",
  "/reviews",
  "/contact",
  "/enquiry",
  ...PRODUCTS.map((p) => `/product/${p.id}`),
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`)
    .join("\n") +
  `\n</urlset>\n`;

await mkdir(path.resolve("public"), { recursive: true });
await writeFile(path.resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml me ${pages.length} links likhe`);
