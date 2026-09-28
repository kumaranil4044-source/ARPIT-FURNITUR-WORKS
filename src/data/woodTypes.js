/* ============================================================
   Lakdi (wood) catalogue — gaon ke workshop me jo milti hai.
   Theme control: <html data-wood="babool">
   ============================================================ */

export const WOOD_TYPES = [
  {
    id: "babool",
    name: "Babool",
    hindi: "किया / बबूल",
    tagline: "Sabse sasta, gaon ka asli lakdi",
    swatch: "#8a6b45",
    grain: "#4e3a22",
    priceIndex: 0.75,
  },
  {
    id: "mango",
    name: "Mango Wood",
    hindi: "आम की लकड़ी",
    tagline: "Gaon me sabse aam, mazboot aur sasti",
    swatch: "#b08654",
    grain: "#6d5130",
    priceIndex: 0.85,
  },
  {
    id: "sheesham",
    name: "Sheesham",
    hindi: "शीशम",
    tagline: "Sabse popular — kambal jaisa golden",
    swatch: "#8b5a2b",
    grain: "#54331a",
    priceIndex: 1.2,
  },
  {
    id: "sal",
    name: "Sal Wood",
    hindi: "साल",
    tagline: "Bhaari aur sindoor ki lakdi",
    swatch: "#6f4526",
    grain: "#3f2614",
    priceIndex: 1.1,
  },
  {
    id: "mahogany",
    name: "Mahogany",
    hindi: "महोगनी",
    tagline: "Laal-mahiring, mehnat lagti hai",
    swatch: "#7d3a2c",
    grain: "#4a1f18",
    priceIndex: 1.35,
  },
  {
    id: "teak",
    name: "Teak",
    hindi: "सागौन",
    tagline: "Sabse mehnga, par biishak bhi",
    swatch: "#96692f",
    grain: "#5c3d18",
    priceIndex: 1.5,
  },
];

export const ACCENTS = [
  { id: "sindoor", name: "Sindoor", swatch: "#b04a2f" },
  { id: "haldi", name: "Haldi", swatch: "#c9a227" },
  { id: "neel", name: "Neel", swatch: "#3f6b8a" },
  { id: "hari", name: "Hari", swatch: "#5d7a4a" },
  { id: "gulabi", name: "Gulabi", swatch: "#a85a72" },
];

export const getWood = (id) => WOOD_TYPES.find((w) => w.id === id) || WOOD_TYPES[0];
export const getAccent = (id) => ACCENTS.find((a) => a.id === id) || ACCENTS[0];
