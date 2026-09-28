/* ============================================================
   Helper functions
   ============================================================ */

import { SITE, WHATSAPP } from "../data/site";

/** 4500 -> "Rs 4,500" */
export const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/** Human readable order id: AFWS-7K2M9 */
export const makeOrderId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 5; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `AFWS-${out}`;
};

export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** 10-digit Indian mobile */
export const isValidPhone = (v) => /^[6-9]\d{9}$/.test(v.replace(/\D/g, ""));

/** WhatsApp click-to-chat (number site.js me hai) */
export const whatsappLink = (msg) => `${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export const telLink = `tel:+91${SITE.phone}`;

/* Delivery + GST rules — site.js se */
export const FREE_DELIVERY_ABOVE = SITE.freeDeliveryAbove;
export const DELIVERY_FEE = SITE.deliveryFee;
export const GST_PERCENT = SITE.gstPercent;
