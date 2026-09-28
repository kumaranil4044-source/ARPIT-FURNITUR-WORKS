# Website live kaise karein — **Firebase Hosting** (FREE)

Sabaas `DEPLOY.bat` file ban gayi hai jo aapko **double-click** se live kar degi.

---

## 🔥 Sabse aasaan tarika (3 step)

### STEP 1 — Firebase project banao (ek baar, 3 minute)

1. Ye link browser me kholein:
   **https://console.firebase.google.com/**
2. **"Add project"** par click karein
3. Project ka naam likhein:
   ```
   arpit-furniture-works
   ```
   ⚠️ Sirf **chhote akshar** (a-z), number aur `-` — space ya capital nahi
4. Analytics **OFF** kar dein (zaroorat nahi)
5. **Create project** dabayein
6. Left menu me **Hosting** icon par click → **Get started**
7. Screen par **"Your project ID"** dikhega, kuch aisa:
   ```
   arpit-furniture-works-abc12
   ```
   **Ise copy kar lein.**

### STEP 2 — Project ID daalein

Project folder me **`project-id.txt`** naam ki file di hui hai:

```
C:\Users\kumar\Documents\Default Project\furniture-website\project-id.txt
```

Usme sirf apna project ID likh kar save karein:

```
arpit-furniture-works-abc12
```

> `.firebaserc` file ko bhi edit kar sakte ho — same ID wahan `"default"` ke aage daal dein. Script dono padhta hai.

### STEP 3 — Live karein

**`DEPLOY.bat` par double-click karein.**

Script khud ye karega:
1. Packages install
2. Website banayega
3. Browser me Google login kholega → login karein
4. Website live ho jayegi
5. **Link clipboard me copy** ho jayega + browser me khul jayega
6. `LIVE-URL.txt` file me link save ho jayega

---

## Aapka link kaisa hoga

```
https://arpit-furniture-works-abc12.web.app
```

Aur ye bhi chalta hai:

```
https://arpit-furniture-works-abc12.firebaseapp.com
```

> `abc12` ki jagah aapka asli project ID hoga.
> **Ye main pehle se nahi bata sakta** — Firebase ye naam tab banata hai
> jab aap project banate hain.

**Doosre option ke liye `.web.app` wala hi use karein** — naya hai aur Google
prefer karta hai.

---

## Firebase free plan me kya milta hai

| Cheez | Kitna |
|---|---|
| Website space | 10 GB (aapki site 2 MB hai) |
| Mahine ka traffic | 360 MB |
| HTTPS (padlock) | ✅ apne aap |
| Site update | ✅ har `npm run deploy` par |
| Credit card | ❌ nahi lagta |

Aapki website 2 MB ki hai aur mahine me shayad 500–2000 log aayenge.
**Free plan kaafi hai saalon tak.**

---

## Har baar update kaise karein

Code me kuch badal kar:

```bash
npm run deploy
```

Ya `DEPLOY.bat` dobara chalayein. Bas.

---

## Apna domain: arpitfurnitureworks.com

> ⚠️ **Sahi jaankari:** Firebase me apna domain lagane ke liye **Blaze plan**
> (pay-as-you-go) chahiye hota hai. Free Spark plan par sirf
> `web.app` aur `firebaseapp.com` ke link milte hain.
>
> Blase plan **free bhi rakh sakte ho** — budget limit laga do
> (jaise ₹200/month) to bill nahi aayega jab tak limit cross na ho.
> Charon hosting providers (Hostinger, GoDaddy, Cloudflare) par bhi
> custom domain **bilkul free** milta hai, wo zyada aasan hai.

### Varn ekdam aasaan raasta (recommended)

Domain kharidein (Cloudflare Registrar / Hostinger se) aur
**Vercel par deploy** karein — custom domain wahan free hai:

```bash
npm run deploy:vercel
```

Baaki sab same rahega. Netlify par bhi custom domain free hai.

### Firebase par hi domain lagana ho

1. Firebase Console → Hosting → **Add custom domain**
2. Apna domain likhein: `arpitfurnitureworks.com`
3. Firebase aapko 2 DNS record dikhayega (TXT verification + A record)
4. Domain wale site (Cloudflare/GoDaddy) me wo values daalein
5. Certificate lagne me 24 ghanta lagta hai
6. **www** ka liye bhi alag se add karna hoga

---

## Common problems

| Problem | Hal |
|---|---|
| `Error: Authentication error` | `firebase login` dobara chalaayein |
| `Error: No project found` | `project-id.txt` me ID sahi nahi likhi |
| `Hosting is not enabled` | Firebase console → Hosting → Get started |
| `403` / `404` page dikh raha | `firebase.json` me rewrite hai, thoda wait karein |
| Terminal me Hindi characters toote | `.bat` ko Notepad me khol ke **Save as → UTF-8** karein |
| `node not found` | Node.js LTS install karein — <https://nodejs.org> |

---

## Files ka kya kaam hai

| File | Kaam |
|---|---|
| `project-id.txt` | **Aapka Firebase project ID yahan** |
| `.firebaserc` | wahi ID, JSON format me |
| `firebase.json` | Hosting settings + SPA routing + cache |
| `DEPLOY.bat` | One-click live karne ka tool |
| `DEPLOY.md` | Ye guide |
| `vercel.json` / `netlify.toml` | Agar Vercel/Netlify use karna ho |
| `src/data/site.js` | **Saari business details** — phone, address |
| `public/images/products/` | **Aapni product photos** |

---

## Command se karna ho (terminal)

```bash
npm install
npm run build
npx firebase login
npm run deploy
```

Ya sab ek saath:

```bash
npx firebase deploy --only hosting
```
