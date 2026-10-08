import { Link } from "react-router-dom";
import { SITE, TEL_LINK, waLink } from "../data/site";

const REVIEWS = [
  { name: "Ramesh Patel", place: "Phulpur", text: "Bed aur singardan banwaya tha. Naap ekdum fit baitha. 2 saal ho gaye, ek keel bhi dheeli nahi hui.", item: "Bed + Singardan", stars: 5 },
  { name: "Sunita Devi", place: "Prayagraj", text: "Sofa ka kapda aur lakdi dono badhiya. Bacche roz kudte hain phir bhi majboot hai.", item: "Wooden Sofa", stars: 5 },
  { name: "Mohd. Salim", place: "Saray Mamrej", text: "4 darwaze aur 3 khidki lagwaye. Chaukhat (kapat) ki fitting safai se ki, deewar bhi nahi tooti.", item: "Door + Window", stars: 5 },
  { name: "Anita Yadav", place: "Handia", text: "Phone par naap bheja tha, 15 din me singardan ghar pahunch gaya. Daam pehle hi bata diya tha.", item: "Singardan", stars: 4 },
  { name: "Deepak Kumar", place: "Mahajudwa", text: "Kitchen ka dabba banwaya. Design pehle samjhaya, daam fix kiya, phir fit kiya. Kaam saaf-suthra.", item: "Kitchen", stars: 5 },
  { name: "Pooja Singh", place: "Phulpur", text: "Dining table aur 4 kursi li. Polish badhiya, delivery time par. Call par hi sab ho gaya.", item: "Dining Table", stars: 5 },
];

export default function Reviews() {
  return (
    <div>
      <div className="pagehead">
        <div className="container">
          <span className="eyebrow">Customer Reviews</span>
          <h1>Log kya kehte hain</h1>
          <p>Asli ghar, asli naam — {SITE.address.city} aur aas-paas ke grahak.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="grid review-grid">
            {REVIEWS.map((r) => (
              <figure className="card review-card" key={r.name}>
                <div className="review-stars" aria-label={`${r.stars} star`}>
                  {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
                </div>
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  <span className="muted">{r.place} · {r.item}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="center mt-4 flex gap-1 wrap" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary btn-lg" href={TEL_LINK}>Call karein</a>
            <a className="btn btn-wa btn-lg" href={waLink("Namaste! Mujhe furniture banwana hai.")} target="_blank" rel="noreferrer">WhatsApp karein</a>
            <Link to="/enquiry" className="btn btn-primary btn-lg">Enquiry bharen</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
