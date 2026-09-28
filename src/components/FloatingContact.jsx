/* ============================================================
   Floating WhatsApp + Call buttons
   Local business ke liye sabse zaroori cheez — customer ko
   ek tap me sampark. Number src/data/site.js se aata hai.
   ============================================================ */

import { SITE, waLink, TEL_LINK } from "../data/site";

export default function FloatingContact() {
  return (
    <div className="fab">
      <a
        className="fab-btn fab-call"
        href={TEL_LINK}
        aria-label={`Call ${SITE.phoneDisplay}`}
        title="Call karein"
      >
        <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
          <path
            d="M6.6 3h3l1.5 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z"
            fill="currentColor"
          />
        </svg>
      </a>

      <a
        className="fab-btn fab-wa"
        href={waLink(
          `Namaste ${SITE.name}! Mujhe furniture ke baare me jaanna hai.`
        )}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp on ${SITE.phoneDisplay}`}
        title="WhatsApp karein"
      >
        <svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true">
          <path
            d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 0 1 12 4z"
            fill="currentColor"
          />
          <path
            d="M8.6 7.3c.2 0 .4 0 .6.4l.8 1.9c.1.2 0 .4-.1.5l-.5.6c-.1.2-.2.3 0 .6a7.6 7.6 0 0 0 3.4 3c.3.1.4 0 .6-.1l.6-.7c.2-.2.3-.2.5-.1l1.9.9c.2.1.3.2.3.4a2.6 2.6 0 0 1-1.9 2c-.7.2-1.7.1-3.6-1a11.6 11.6 0 0 1-4.4-4.4c-.7-1.2-.8-2.2-.6-2.8a2.4 2.4 0 0 1 1.1-1z"
            fill="currentColor"
          />
        </svg>
      </a>

      <span className="fab-label">{SITE.phoneDisplay}</span>
    </div>
  );
}
