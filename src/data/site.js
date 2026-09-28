/* ============================================================
   SITE CONFIG — apni saari business details YAHAN badlo.
   Baaki saari files yahin se padhti hain, isliye ek jagah
   change karo to poori website update ho jayegi.
   ============================================================ */

export const SITE = {
  /* ---- identity ---- */
  name: "Arpit Furniture Works",
  fullName: "Arpit Furniture Works and Service",
  tagline: "Village-style solid wood furniture, made to order",
  since: 2015,

  /* ---- contact ---- */
  phone: "9005279049",
  phoneDisplay: "+91 90052 79049",
  whatsapp: "9005279049", // country code ke bina, sirf number
  email: "arpitfurnitureworks@gmail.com",

  /* ---- social media (apne page ka link yahan likho) ---- */
  social: {
    instagram: "", // jaise: "https://instagram.com/arpitfurniture"
    facebook: "", // jaise: "https://facebook.com/arpitfurniture"
  },

  /* ---- malik ki photo (public/images/owner.jpg rakho) ---- */
  ownerPhoto: "/images/owner.jpg",
  ownerName: "Arpit — Malik, Arpit Furniture Works",

  /* ---- address (jhaan pehchaan ke liye SEO bhi) ---- */
  address: {
    line1: "Mahajudwa",
    line2: "Near Hanuman Mandir",
    city: "Phulpur",
    district: "Prayagraj",
    state: "Uttar Pradesh",
    pincode: "212402",
    country: "India",
  },

  /* ---- shop timings ---- */
  hours: "Mon – Sat, 9:00 am – 8:00 pm",

  /* ---- delivery ---- */
  freeDeliveryAbove: 50000,
  deliveryFee: 2500,
  gstPercent: 18,
};

/* Poora address ek line me — maps aur WhatsApp ke liye */
export const FULL_ADDRESS = `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.district}, ${SITE.address.state} - ${SITE.address.pincode}`;

/* WhatsApp click-to-chat link */
export const WHATSAPP = `https://wa.me/91${SITE.whatsapp}`;

export const waLink = (message) => `${WHATSAPP}?text=${encodeURIComponent(message)}`;

/* Google Maps search link (address ke naam se) */
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  FULL_ADDRESS
)}`;

/* tel: link */
export const TEL_LINK = `tel:+91${SITE.phone}`;
