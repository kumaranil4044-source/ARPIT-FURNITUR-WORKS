/* ============================================================
   scripts/slim-dist.mjs
   Build ke baad chalata hai: dist/ me se sirf wahi rakhta hai
   jo sach me use ho raha hai.

     - catalog/*.jpg hata deta hai (site .webp padhti hai)
       EXCEPT og:image ke liye ek chhoti si copy bacha deta hai
     - purane/unused catalog photos hata deta hai

   Isse deploy size ~60% kam ho jaata hai.
   ============================================================ */

import { readdir, stat, unlink, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const DIST_IMG = path.resolve("dist/images/catalog");

/* products.js me jo files lagti hain */
const USED = new Set([
  // products (imageFallback)
  "charpai-1", "bed-1", "takhat-1", "sofa-1", "singardan-1",
  "dining-1", "table-1", "chair-1",
  "wardrobe-1", "desk-1", "kitchen-1", "sofa-2", "bed-2", "heroroom-1",
  "sofa-3", "sofa-4", "sofa-5", "sofa-6", "sofa-7", "sofa-8",
  "bed-5", "bed-6", "bed-7", "bed-8", "bed-9", "bed-10",
  "bed-11", "bed-12", "bed-13", "bed-14",
  "dining-2", "dining-3", "dining-4", "dining-5", "dining-6",
  "door-2", "door-3", "door-4", "door-5", "door-6", "door-7",
  "door-8", "door-9", "door-10", "window-2",
  "door-11", "window-3", "window-4", "window-5", "window-6",
  "table-2", "table-3", "table-4", "table-5", "table-6", "table-7",
  "table-8", "table-9", "table-10", "table-11",
  "kapat-2", "kapat-3", "kapat-4", "kapat-5",
  "takhat-3", "takhat-4", "takhat-5", "takhat-6",
  // banner + gallery + about
  "shop-1", "shop-2", "shop-3", "shop-4",
  "charpai-2", "village-1",
  // hero
  "hero", "hero-alt",
]);

/* categories khatam ho gayi — inki koi zaroorat nahi */
const KEEP_EXTRA = ["charpai-1"]; // og:image ke liye

const files = await readdir(DIST_IMG);
let removed = 0;
let freed = 0;

for (const f of files) {
  /* shop-1-wide.webp ka base name "shop-1-wide" hai —
     usko bhi "shop-1" se match karo */
  const raw = path.basename(f, path.extname(f));
  const name = raw.replace(/-wide$/, "");
  const ext = path.extname(f).toLowerCase();

  if (ext === ".jpg" && !KEEP_EXTRA.includes(name)) {
    freed += (await stat(path.join(DIST_IMG, f))).size;
    await unlink(path.join(DIST_IMG, f));
    removed++;
    continue;
  }
  if (!USED.has(name) && !KEEP_EXTRA.includes(name)) {
    freed += (await stat(path.join(DIST_IMG, f))).size;
    await unlink(path.join(DIST_IMG, f));
    removed++;
  }
}

console.log(`Removed ${removed} unused image files (${Math.round(freed / 1024 / 1024)} MB freed)`);
console.log(`Remaining in dist/images/catalog: ${(await readdir(DIST_IMG)).length} files`);
