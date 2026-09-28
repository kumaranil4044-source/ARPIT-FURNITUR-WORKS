/* ============================================================
   scripts/process-images.mjs
   Har stock photo ko consistent product-shot format me laata hai:
     - portrait/odd ratios ko 4:3 me centre-crop
     - 1200 x 900 px
     - WebP (q=80) + JPG fallback
     - file size report
   Chalaane ke liye:  npm run images
   ============================================================ */

import { readdir, mkdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images");
const STOCK = path.resolve("source-images"); // source photos public/ ke bahar rehte hain
const OUT = path.join(ROOT, "catalog"); // processed + optimised (site yahan se padti hai)
const W = 1200;
const H = 900;

/* jin files par focus crop chahiye (village photos me product
   ek side hota hai, baaki me gharcycle etc. dikhta hai) */
const FOCUS = {
  "charpai-1": { left: 0.0, width: 0.62 },
  "charpai-2": { left: 0.0, width: 0.62 },
  "village-1": { left: 0.05, width: 0.55 },
  "singardan-1": { left: 0.1, width: 0.6 },
};

await mkdir(OUT, { recursive: true });

const files = (await readdir(STOCK)).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
let totalIn = 0;
let totalOut = 0;
const rows = [];

for (const file of files) {
  const name = path.basename(file, path.extname(file));
  const src = path.join(STOCK, file);
  const before = (await stat(src)).size;
  totalIn += before;

  let pipeline = sharp(src).rotate(); // EXIF orientation theek karo

  const focus = FOCUS[name];
  if (focus) {
    /* pehle focus area crop karo, phir 4:3 me fit karo */
    const meta = await sharp(src).metadata();
    const cw = Math.round(meta.width * focus.width);
    const ch = Math.round(cw * (H / W));
    if (ch <= meta.height) {
      pipeline = pipeline.extract({
        left: Math.round(meta.width * focus.left),
        top: Math.max(0, Math.round((meta.height - ch) / 2)),
        width: cw,
        height: ch,
      });
    }
  }

  pipeline = pipeline.resize(W, H, { fit: "cover", position: "centre" });

  const jpg = path.join(OUT, `${name}.jpg`);
  const webp = path.join(OUT, `${name}.webp`);
  await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(jpg);
  await pipeline.clone().webp({ quality: 80 }).toFile(webp);

  /* shop-* photos ko extra wide banner bhi banate hain (16:9) */
  if (name.startsWith("shop-")) {
    await sharp(src)
      .rotate()
      .resize(2000, 1125, { fit: "cover", position: "centre" })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, `${name}-wide.webp`));
    await sharp(src)
      .rotate()
      .resize(2000, 1125, { fit: "cover", position: "centre" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(OUT, `${name}-wide.jpg`));
  }

  const afterJpg = (await stat(jpg)).size;
  const afterWebp = (await stat(webp)).size;
  totalOut += afterWebp;

  rows.push({
    name,
    before: `${Math.round(before / 1024)}K`,
    jpg: `${Math.round(afterJpg / 1024)}K`,
    webp: `${Math.round(afterWebp / 1024)}K`,
  });
}

console.table(rows);
console.log(
  `\nOriginal total: ${Math.round(totalIn / 1024 / 1024)} MB  ->  WebP total: ${Math.round(totalOut / 1024 / 1024)} MB`
);
console.log(`Written to ${OUT}`);
