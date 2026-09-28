import { SITE, FULL_ADDRESS, TEL_LINK, MAPS_LINK, waLink } from "../data/site";
import { AddressMap } from "../components/AddressMap";

export default function Contact() {
  return (
    <div>
      <div className="pagehead">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>{SITE.name}</h1>
          <p>{FULL_ADDRESS}. {SITE.hours} khuli hai.</p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">
          <div className="card contact-card">
            <h2>Call ya WhatsApp karein</h2>
            <p className="muted">Dono par same number lagta hai.</p>
            <p className="muted">{SITE.phoneDisplay}</p>
            <div className="flex gap-1 wrap mt-2">
              <a className="btn btn-primary btn-lg" href={TEL_LINK}>
                Call karein
              </a>
              <a
                className="btn btn-wa btn-lg"
                href={waLink("Namaste! Mujhe furniture ke baare me jaanna hai.")}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp karein
              </a>
            </div>
            <div className="mt-3">
              <p><strong>Pata:</strong> {FULL_ADDRESS}</p>
              <p><strong>Time:</strong> {SITE.hours}</p>
              <div className="flex gap-1 wrap mt-2">
                <a className="btn btn-ghost" href={MAPS_LINK} target="_blank" rel="noreferrer">
                  Map par dekhein
                </a>
                <a className="btn btn-ghost" href="/enquiry">
                  Enquiry bharen
                </a>
              </div>
            </div>
          </div>
          <AddressMap height={360} />
        </div>
      </section>
    </div>
  );
}
