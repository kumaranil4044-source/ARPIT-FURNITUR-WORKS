import { SITE, FULL_ADDRESS, TEL_LINK, MAPS_LINK, waLink } from "../data/site";

export function AddressMap({ height = 320 }) {
  const q = encodeURIComponent(
    `${SITE.address.line1} ${SITE.address.line2} ${SITE.address.city} ${SITE.address.district} ${SITE.address.state} ${SITE.address.pincode}`
  );
  return (
    <div className="card map-card">
      <iframe
        title={`Map — ${SITE.name}`}
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        width="100%"
        height={height}
        style={{ border: 0, borderRadius: 16 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="map-foot">
        <span className="muted">{FULL_ADDRESS}</span>
        <a className="btn btn-ghost btn-sm" href={MAPS_LINK} target="_blank" rel="noreferrer">
          Map par kholein
        </a>
      </div>
    </div>
  );
}
