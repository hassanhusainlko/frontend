import { Link } from "react-router-dom";
import "../../styles/variables.css";

/* ── responsive tweaks ── */
const sx = `
  @media (max-width: 576px) {
    .hero-title { font-size: 1.75rem !important; }
    .cta-inner   { padding: 2rem 1.25rem !important; }
  }
`;

const SERVICES = [
  {
    icon: "fa-arrow-right-arrow-left",
    title: "Word / PDF to LaTeX",
    desc: "Convert Word, PDF, and editable PDF documents into clean, well-structured LaTeX code.",
  },
  {
    icon: "fa-pen-to-square",
    title: "LaTeX Editing & Formatting",
    desc: "Edit and format existing LaTeX documents — equations, tables, figures, and cross-references.",
  },
  {
    icon: "fa-book",
    title: "Journal-Ready Formatting",
    desc: "Format your manuscript to journal guidelines — IEEE, Springer, Elsevier, and more.",
  },
  {
    icon: "fa-list-alt",
    title: "Bibliography Management",
    desc: "Set up and format references in APA, IEEE, Harvard, Chicago, BibTeX, or custom styles.",
  },
  {
    icon: "fa-table",
    title: "Tables, Figures & Layout",
    desc: "Professional table design, figure placement, and page layout with proper numbering and captions.",
  },
  {
    icon: "fa-graduation-cap",
    title: "Thesis & Dissertation Formatting",
    desc: "Complete thesis and dissertation formatting including front matter, chapters, and appendices.",
  },
];

const TEMPLATES = [
  { name: "IEEE", icon: "fa-solid fa-microchip" },
  { name: "Springer", icon: "fa-solid fa-book-open" },
  { name: "Elsevier", icon: "fa-solid fa-flask" },
  { name: "APA", icon: "fa-solid fa-quote-right" },
  { name: "Chicago", icon: "fa-solid fa-landmark" },
  { name: "Harvard", icon: "fa-solid fa-university" },
];

export default function LatexWriting() {
  return (
    <>
      <style>{sx}</style>

      {/* ── Hero ── */}
      <section
        className="section-royal"
        style={{
          paddingTop: "calc(var(--navbar-height) + 3rem)",
          paddingBottom: 0,
        }}
      >
        <div className="container">
          <div className="row align-items-center g-4 pb-5">
            <div className="col-12 col-lg-7">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  style={{
                    width: 4,
                    height: 36,
                    background: "var(--gradient-royal)",
                    borderRadius: 2,
                  }}
                ></div>
                <h2 className="section-heading-gold mb-0">
                  Academic Typesetting
                </h2>
              </div>
              <h1
                className="section-heading-gold mb-3 hero-title"
                style={{ fontSize: "2.2rem", lineHeight: 1.2 }}
              >
                Professional LaTeX Writing Services
              </h1>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: 1.8,
                  paddingBottom: "1.5rem",
                  fontSize: "1.05rem",
                }}
              >
                High-quality LaTeX formatting and academic typesetting for
                research papers, dissertations, books, journals, and technical
                documents — converted from Word, PDF, or built from scratch.
              </p>
              <Link
                to="/orders/create-latex"
                className="btn-gold text-decoration-none"
              >
                Get Started <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="col-12 col-lg-5 text-center">
              <div
                style={{
                  background: "var(--gradient-hero)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2rem",
                  border: "1px solid var(--color-border-purple)",
                }}
              >
                <i
                  className="fa-solid fa-file-lines"
                  style={{
                    fontSize: "4rem",
                    color: "var(--color-primary)",
                    opacity: 0.7,
                  }}
                ></i>
                <h4 className="section-heading-gold mt-3 mb-2">
                  Precision Typesetting
                </h4>
                <p
                  className="text-royal-muted mb-0"
                  style={{ fontSize: "0.88rem" }}
                >
                  Flawless LaTeX formatting for publication-ready documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section-royal-alt">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading-gold mb-2">
              LaTeX Typesetting Services
            </h2>
            <p
              className="text-royal-muted"
              style={{ maxWidth: 560, margin: "0 auto" }}
            >
              End-to-end LaTeX support — from conversion to final formatting.
            </p>
          </div>

          <div className="row g-4">
            {SERVICES.map(({ icon, title, desc }) => (
              <div key={title} className="col-12 col-sm-6 col-lg-4">
                <div
                  className="card-royal p-4 h-100"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-card-lg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                  style={{
                    transition:
                      "transform var(--transition-normal), box-shadow var(--transition-normal)",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-sm)",
                      background: "var(--color-primary-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <i
                      className={`fa-solid ${icon}`}
                      style={{
                        color: "var(--color-primary)",
                        fontSize: "1.2rem",
                      }}
                    ></i>
                  </div>
                  <h6
                    className="fw-semibold"
                    style={{
                      color: "var(--color-text-primary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {title}
                  </h6>
                  <p
                    className="text-royal-muted mb-0"
                    style={{ fontSize: "0.85rem", lineHeight: 1.65 }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Templates / Styles ── */}
      <section className="section-royal">
        <div className="container">
          <div className="row align-items-center g-4 gy-5">
            <div className="col-12 col-lg-5 text-center">
              <div
                style={{
                  background: "var(--gradient-royal)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2.5rem 2rem",
                  color: "#FFFFFF",
                }}
              >
                <i
                  className="fa-solid fa-file-export"
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "0.75rem",
                    display: "block",
                  }}
                ></i>
                <h4
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  Journal Templates & Styles
                </h4>
                <p
                  style={{
                    opacity: 0.85,
                    fontSize: "0.88rem",
                    marginBottom: 0,
                  }}
                >
                  We format to any major journal or bibliography style.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="row g-3">
                {TEMPLATES.map(({ name, icon }) => (
                  <div key={name} className="col-6 col-sm-4">
                    <div
                      style={{
                        background: "var(--color-bg-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        padding: "1rem",
                        textAlign: "center",
                        transition:
                          "border-color var(--transition-fast), box-shadow var(--transition-fast)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--color-primary)";
                        e.currentTarget.style.boxShadow = "var(--shadow-focus)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--color-border)";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      <i
                        className={icon}
                        style={{
                          fontSize: "1.5rem",
                          color: "var(--color-primary)",
                          marginBottom: "0.4rem",
                          display: "block",
                        }}
                      ></i>
                      <span
                        className="fw-semibold"
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-royal-alt">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading-gold mb-2">How It Works</h2>
            <p className="text-royal-muted">
              From your source document to a polished LaTeX file.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              {
                step: "01",
                title: "Send Your Document",
                desc: "Upload your Word, PDF, or existing LaTeX file and specify the journal template or bibliography style.",
              },
              {
                step: "02",
                title: "We Typeset",
                desc: "Our experts convert and format your document with proper equations, tables, figures, and references.",
              },
              {
                step: "03",
                title: "Review & Revise",
                desc: "Review the compiled LaTeX PDF and request any adjustments to formatting or layout.",
              },
              {
                step: "04",
                title: "Final Delivery",
                desc: "Receive your complete LaTeX source files and compiled PDF, ready for submission.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="col-12 col-sm-6 col-lg-3">
                <div className="text-center" style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "var(--gradient-button)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {step}
                  </div>
                  <h6
                    className="fw-semibold"
                    style={{
                      color: "var(--color-text-primary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {title}
                  </h6>
                  <p
                    className="text-royal-muted mb-0"
                    style={{ fontSize: "0.83rem", lineHeight: 1.6 }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-royal">
        <div className="container">
          <div
            className="text-center cta-inner"
            style={{
              background: "var(--gradient-royal)",
              borderRadius: "var(--radius-lg)",
              padding: "3rem 2rem",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "var(--shadow-card-lg)",
            }}
          >
            <h2
              className="section-heading-gold mb-2"
              style={{ color: "#FFFFFF" }}
            >
              Need LaTeX Formatting?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.82)",
                marginBottom: "1.5rem",
                fontSize: "0.95rem",
              }}
            >
              Get professionally typeset LaTeX for your research paper,
              dissertation, or journal submission.
            </p>
            <Link
              to="/orders/create-latex"
              className="btn-gold text-decoration-none"
              style={{
                background: "#FFFFFF",
                color: "var(--color-primary-dark)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F3FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
              }}
            >
              Start Your Order <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
