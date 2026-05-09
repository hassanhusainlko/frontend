import howWeWorkImage from "/how_we_work.png";
import "../../styles/variables.css";

const STEPS = [
  { icon: "fa-upload", title: "Place an Order", desc: "Login and upload your document with required details: name, service type, page count, and any special instructions." },
  { icon: "fa-magnifying-glass", title: "Admin Review", desc: "Our team reviews your order and confirms details like page count and service type, making corrections if necessary." },
  { icon: "fa-handshake", title: "Accept & Pay Token", desc: "Accept the reviewed order. Pay a Token Amount (30%) to confirm and signal the admin to begin work." },
  { icon: "fa-file-lines", title: "First Draft", desc: "Admin uploads the First Draft for your review. Request corrections or approve to move forward." },
  { icon: "fa-file-circle-check", title: "Final Document", desc: "After incorporating your feedback, the admin uploads the Final Document for your review." },
  { icon: "fa-credit-card", title: "Pay Remaining (70%)", desc: "After reviewing and approving the Final Document, pay the remaining 70% of the total amount." },
  { icon: "fa-box-open", title: "Delivery", desc: "Payment verified â€” the Final Project is made available for you to download immediately." },
];

const REFERRAL_RULES = [
  "When a new user registers using your Referral Code, you earn 10% of their first completed project.",
  "The referral bonus is credited only after completion of the first project of the referred user.",
  "A user can use a maximum of 25% of total available Referral Bonus in one project.",
  "The referral program can be changed or ended at any time without prior notice.",
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="section-royal-alt">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
            <div style={{ flex: 1, height: 1, background: "var(--color-border)" }}></div>
            <h2 className="section-heading-gold mb-0">How We Work</h2>
            <div style={{ flex: 1, height: 1, background: "var(--color-border)" }}></div>
          </div>
          <p className="text-royal-muted">A simple, transparent 7-step process from order to delivery.</p>
        </div>

        <div className="row g-4 align-items-start mb-5">
          {/* Steps */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-3">
              {STEPS.map(({ icon, title, desc }, idx) => (
                <div key={idx} className="d-flex gap-3 align-items-start">
                  <div style={{
                    minWidth: 48, height: 48, borderRadius: "50%",
                    background: "var(--gradient-royal)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(124,58,237,0.25)",
                    boxShadow: "var(--shadow-card)",
                    flexShrink: 0,
                  }}>
                    <i className={`fa-solid ${icon}`} style={{ color: "#FFFFFF", fontSize: "1rem" }}></i>
                  </div>
                  <div style={{
                    background: "#FFFFFF",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.9rem 1.1rem",
                    flex: 1,
                    boxShadow: "var(--shadow-card)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.3rem" }}>
                      <span style={{
                        background: "var(--gradient-royal)",
                        color: "#FFFFFF",
                        borderRadius: "50%",
                        width: 22, height: 22,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
                      }}>{idx + 1}</span>
                      <h6 style={{ color: "var(--color-text-primary)", fontWeight: 600, margin: 0 }}>{title}</h6>
                    </div>
                    <p className="text-royal-muted mb-0" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="col-12 col-lg-4">
            <img
              src={howWeWorkImage}
              className="img-fluid"
              alt="How We Work"
              style={{
                borderRadius: "var(--radius-lg)",
                border: "2px solid var(--color-border)",
                boxShadow: "var(--shadow-card-lg)",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Referral Program */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          boxShadow: "var(--shadow-card)",
        }}>
          <div className="d-flex align-items-center gap-3 mb-3">
            <div style={{ width: 4, height: 32, background: "var(--gradient-royal)", borderRadius: 2 }}></div>
            <h4 className="section-heading-gold mb-0">Referral Program</h4>
          </div>
          <p className="text-royal-muted mb-3" style={{ fontSize: "0.9rem" }}>
            Earn bonus credits by referring new users to TexScript.
          </p>
          <ul className="list-unstyled" style={{ marginBottom: 0 }}>
            {REFERRAL_RULES.map((rule, idx) => (
              <li key={idx} className="d-flex gap-3 mb-2" style={{ fontSize: "0.88rem" }}>
                <i className="fa-solid fa-circle-check mt-1" style={{ color: "var(--color-crimson)", flexShrink: 0 }}></i>
                <span className="text-royal-muted">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
