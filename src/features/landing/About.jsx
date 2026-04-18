import about_us from "/about_us.png";
import "../../styles/variables.css";

const WHY_US = [
  { icon: "fa-user-graduate", title: "Expert Typesetters", desc: "Our team consists of subject experts skilled in mathematics, symbols, notations, and operators, ensuring accuracy and professionalism." },
  { icon: "fa-clock", title: "Timely Delivery", desc: "We are committed to delivering your typeset document in the required format within the agreed timeline." },
  { icon: "fa-shield-halved", title: "Confidentiality", desc: "Your content's privacy is our top priority. Documents are securely divided and compiled by our core team to maintain confidentiality." },
  { icon: "fa-lock", title: "Data Security", desc: "After successful delivery, all your documents are securely erased from our systems." },
];

export default function About() {
  return (
    <section id="about" className="section-royal">
      <div className="container">
        {/* About Us */}
        <div className="row align-items-center g-5 mb-5">
          <div className="col-12 col-lg-7">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div style={{ width: 4, height: 36, background: "var(--gradient-royal)", borderRadius: 2 }}></div>
              <h2 className="section-heading-gold mb-0">About Us</h2>
            </div>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              We at <strong style={{ color: "var(--color-text-primary)" }}>texscript.com</strong> provide professional typesetting services,
              specializing in LaTeX for scientific documents such as research papers, articles, theses,
              dissertations, and more.
            </p>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              LaTeX is the preferred choice for standard and reputable publishers, and our expertise
              ensures your document is prepared efficiently and accurately.
            </p>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div style={{ width: 4, height: 36, background: "var(--gradient-royal)", borderRadius: 2 }}></div>
              <h3 className="section-heading-gold mb-0" style={{ fontSize: "1.3rem" }}>Our Services</h3>
            </div>
            <div className="row g-2">
              {["Research Papers", "Articles", "Theses & Dissertations", "Books & Manuals"].map((s) => (
                <div key={s} className="col-6">
                  <div style={{
                    background: "#F9F9F9",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.6rem 1rem",
                    color: "var(--color-text-primary)",
                    fontSize: "0.88rem",
                  }}>
                    <i className="fa-solid fa-check me-2" style={{ color: "var(--color-crimson)" }}></i>{s}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-5 text-center">
            <img
              src={about_us}
              className="img-fluid rounded"
              alt="About Us"
              style={{
                maxHeight: 400,
                objectFit: "cover",
                borderRadius: "var(--radius-lg)",
                border: "2px solid var(--color-border)",
                boxShadow: "var(--shadow-card-lg)",
              }}
            />
          </div>
        </div>

        {/* Why Choose Us */}
        <div id="services">
          <div className="text-center mb-4">
            <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
              <div style={{ flex: 1, height: 1, background: "var(--color-border)" }}></div>
              <h2 className="section-heading-gold mb-0">Why Choose Us?</h2>
              <div style={{ flex: 1, height: 1, background: "var(--color-border)" }}></div>
            </div>
            <p className="text-royal-muted">We solve the real challenges of LaTeX typesetting.</p>
          </div>

          <div className="row g-4 mb-5">
            {WHY_US.map(({ icon, title, desc }) => (
              <div key={title} className="col-12 col-sm-6 col-lg-3">
                <div className="card-royal p-4 h-100 text-center"
                  style={{ transition: "transform var(--transition-normal), box-shadow var(--transition-normal)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow-card-lg)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "var(--gradient-royal)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}>
                    <i className={`fa-solid ${icon}`} style={{ color: "#FFFFFF", fontSize: "1.2rem" }}></i>
                  </div>
                  <h6 style={{ color: "var(--color-text-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h6>
                  <p className="text-royal-muted mb-0" style={{ fontSize: "0.83rem", lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div style={{
            background: "var(--gradient-royal)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "var(--shadow-card-lg)",
          }}>
            <h4 style={{ color: "#FFFFFF", fontFamily: "var(--font-heading)", marginBottom: "0.5rem" }}>
              Here you'll find online Typing Services as per your Needs!
            </h4>
            <p style={{ color: "rgba(255,255,255,0.82)", marginBottom: 0, fontSize: "0.9rem" }}>
              Professional, timely, and confidential — every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
