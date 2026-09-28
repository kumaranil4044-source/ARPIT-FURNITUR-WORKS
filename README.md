# Arpit Furniture Works & Service

**Lakdi ka furniture — Phulpur, Prayagraj.** Charpai, bed, singardan, takhat,
kursi, mez aur dining set. Sab apne size ka banaya jaata hai.

React 18 + Vite + React Router. Koi UI library nahi — poora design hand-written
CSS variables se bana hai, isi liye lakdi ka theme badalne se poori site ka rang
badal jaata hai.

**Website live karne ke liye → [`DEPLOY.md`](./DEPLOY.md)**
Ya bas `DEPLOY.bat` par double-click kar dein.

---

## 1. Chalaane ke liye

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ ban jaata hai (2 MB)
npm run preview  # production build ko dekhein
```

| Script | Kya karta hai |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build + unused images hata deta hai |
| `npm run images` | `source-images/` se `public/images/catalog/` (crop + WebP) |
| `npm run deploy` | Vercel par live (pehli baar login puchega) |

---

## 2. Apni details badalna

**Ek hi file:** `src/data/site.js`

```js
phone: "9005279049",
whatsapp: "9005279049",
address: { line1: "Mahajudwa", line2: "Near Hanuman Mandir", city: "Phulpur" }
```

Yahan change karo — **poori website update ho jayegi.** Footer, WhatsApp
button, call button, map link, meta tags, sab yahin se aata hai.

---

## 3. Products badalna

`src/data/products.js`

```js
{
  id: "bed-01",                 // image ka naam bhi yahi hota hai
  name: "Solid Wood Bed",
  basePrice: 14500,
  category: "Bed",
  wood: ["sheesham", "sal"],    // kis lakdi me banta hai
  finish: ["Natural", "Sindoor"],
  image: "/images/products/bed-01.jpg",          // aapki photo
  imageFallback: "/images/catalog/bed-1.webp",   // abhi wali photo
}
```

### Apni photos kahan daalni hain

```
public/images/products/bed-01.jpg      ← aapki asli photo
public/images/products/charpai-01.jpg
```

Bas itna karein — **code me kuch badalne ki zarurat nahi.** File ka naam
product ke `id` se match hona chahiye.

Jab tak aapki photo nahi daalti, website catalogue wali photo dikhayegi.
Aap ek-ek karke badal sakte ho.

**Photo kaise lo (professional lagegi):**
- Din me, khidki ke paas — natural roshni
- Plain deewar (safed ya grey) peeche
- Seedha saamne se, thoda upar se
- Ek hi distance aur angle har product ke liye
- 1400 x 1050 px (4:3), JPG, 300 KB se kam

Charpai jaise desi saaman ke liye dukaan ya ghar me hi photo karein —
staged photo se zyada sach dikhta hai.

---

## 4. Images ka system

```
source-images/          ← original photos (site use NAHI karti)
        │  npm run images
        ▼
public/images/catalog/  ← 1200x900 WebP, compressed (site yahan se padti hai)
        │
        │  pehle apni photo → phir catalogue → phir placeholder
        ▼
public/images/products/ ← AAPKI photo, yahan daalein
```

`npm run build` ke baad unused images apne aap hat jaati hain — isiliye
deploy sirf **2 MB** ka hota hai, 17 MB nahi.

---

## 5. Lakdi ke theme

`src/data/woodTypes.js` me har lakdi ka rang hai. `src/index.css` me uska
CSS variable set hai.

**Nayi lakdi jodni ho:**
1. `woodTypes.js` me entry add karein (naam, hindi naam, rang, daam index)
2. `index.css` me `[data-wood="naam"] { --wood: #xxxxxx; ... }` add karein

Wo khud ba khud navbar panel, home page, shop filter, product page aur
enquiry form — sab jagah aa jayegi.

Abhi 6 lakdi hain: **Babool, Mango, Sheesham, Sal, Mahogany, Teak**
aur 5 rang: **Sindoor, Haldi, Neel, Hari, Gulabi**.

---

## 6. Pages

| Page | Kya hai |
|---|---|
| `/` | Dukaan ka banner, charpai/lakdi selector, categories, featured |
| `/shop` | Filter + search + sort, 8 products |
| `/gallery` | 12 photos, click par badi photo (lightbox) |
| `/product/:id` | Photo, lakdi chunein, colour, quantity, specs, tabs |
| `/cart` · `/checkout` | Cart aur 2-step checkout |
| `/enquiry` | Naap/photo bhejne ka form, WhatsApp se bhi |
| `/about` | Dukan ki kahani, lakdi ki jaankari, address + map |

Nav bar: **Home · Saamaan · Gallery · Enquiry · Contact Us**
(right side me WhatsApp + call ke floating buttons)

---

## 7. Enquiry form asli server par lagana

Abhi **demo mode** me hai (sirf dikhata hai, kahin bhejta nahi).

`src/pages/Enquiry.jsx` me `onSubmit` me ek block hai — wo khol dein:

```js
await fetch(import.meta.env.VITE_ENQUIRY_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

`.env` me `VITE_ENQUIRY_URL` daalein. Free options (server nahi chahiye):
**Formspree**, **Web3Forms**, ya **Google Sheets** (Apps Script se).

Customers WhatsApp par bhi enquiry kar sakte hain — wo link har jagah hai.

---

## 8. Payment

Checkout abhi demo hai (asli paise nahi kat-te). India ke liye **Razorpay**
best hai — `src/pages/Checkout.jsx` me `placeOrder` dekhein.

Charpai jaise chhote daam wale saaman me online payment zaroori nahi —
WhatsApp aur cash bhi chalta hai.

---

## 9. Deploy

`DEPLOY.md` padhein, ya `DEPLOY.bat` double-click karein.

Short version:

```bash
npm run build
npx vercel --prod
```

Pehli baar login karna hoga. Free plan pe unlimited site chalti hai aur
HTTPS apne aap lag jaata hai.

Domain lagane ka tareeqa `DEPLOY.md` me hai.

---

## 10. Project structure

```
furniture-website/
├── DEPLOY.bat              ← one-click live
├── DEPLOY.md               ← Hindi guide
├── vercel.json             ← Vercel config + SPA routing
├── netlify.toml            ← Netlify config
├── index.html
├── package.json
├── vite.config.js
│
├── public/                 ← website me jaata hai (seedha copy hota hai)
│   ├── .htaccess           ← cPanel ke liye
│   ├── _redirects          ← Netlify routing
│   ├── robots.txt
│   └── images/
│       ├── products/       ← ★ AAPKI PHOTOS
│       └── catalog/        ← abhi use ho rahi photos
│
├── source-images/          ← original downloads (site use nahi karti)
│
├── scripts/
│   ├── process-images.mjs  ← crop + resize + WebP
│   └── slim-dist.mjs       ← unused images hata deta hai
│
└── src/
    ├── main.jsx
    ├── App.jsx             ← routes
    ├── index.css           ← 6 lakdi ke theme variables
    ├── styles.css          ← saare components ka CSS
    │
    ├── data/
    │   ├── site.js         ← ★ SAARI BUSINESS DETAILS
    │   ├── products.js     ← saaman
    │   └── woodTypes.js    ← lakdi + rang
    │
    ├── context/
    │   ├── ThemeContext.jsx
    │   └── CartContext.jsx
    │
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ShopBanner.jsx       ← dukaan ka banner
    │   ├── ThemePanel.jsx       ← rang badalne ka panel
    │   ├── ProductCard.jsx
    │   ├── ProductImage.jsx
    │   ├── CartDrawer.jsx
    │   ├── FloatingContact.jsx  ← WhatsApp + call
    │   └── Footer.jsx
    │
    └── pages/
        ├── Home.jsx
        ├── Shop.jsx
        ├── Gallery.jsx
        ├── ProductDetail.jsx
        ├── Cart.jsx
        ├── Checkout.jsx
        ├── Enquiry.jsx
        ├── About.jsx
        └── NotFound.jsx
```
