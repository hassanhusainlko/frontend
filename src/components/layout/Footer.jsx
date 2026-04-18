import { Link } from "react-router-dom";
import "../../styles/variables.css";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--gradient-royal)",
        borderTop: "none",
        color: "#FFFFFF",
        marginTop: "4rem",
      }}
    >
      <div className="container py-5">
        <div className="row g-4">
          {/* About */}
          <div className="col-12 col-lg-5 col-md-12">
            <h5 style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              About TexScript
            </h5>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", lineHeight: 1.7 }}>
              We provide professional typesetting services — specializing in LaTeX typesetting of scientific documents including Research Papers, Articles, Thesis, and Dissertations.
            </p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", lineHeight: 1.7 }}>
              Every standard publisher prefers LaTeX-typeset documents. We deliver quality, precision, and speed — within time and cost-efficient manner.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-3 col-md-6">
            <h5 style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              Quick Links
            </h5>
            <ul className="list-unstyled" style={{ fontSize: "0.88rem" }}>
              {[
                { label: "Home", to: "/" },
                { label: "Request a Quote", to: "/dashboard/quote-request" },
                { label: "My Coupons", to: "/dashboard/coupons" },
                { label: "Privacy Policy", to: "#" },
                { label: "Refund Policy", to: "#" },
                { label: "Terms & Conditions", to: "#" },
                { label: "Contact Us", to: "#" },
              ].map(({ label, to }) => (
                <li key={label} className="mb-2">
                  <Link
                    to={to}
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      textDecoration: "none",
                      transition: "color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  >
                    <i className="fa-solid fa-chevron-right me-2" style={{ fontSize: "0.65rem", opacity: 0.7 }}></i>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-6 col-lg-4 col-md-6">
            <h5 style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              Follow Us
            </h5>
            <div className="d-flex gap-3 mb-4">
              {[
                { icon: "fa-facebook", label: "Facebook" },
                { icon: "fa-twitter", label: "Twitter" },
                { icon: "fa-linkedin", label: "LinkedIn" },
                { icon: "fa-instagram", label: "Instagram" },
              ].map(({ icon, label }) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={label}
                  style={{
                    width: 40, height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.35)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                  }}
                >
                  <i className={`fab ${icon}`}></i>
                </a>
              ))}
            </div>

            <div style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "var(--radius-md)",
              padding: "1rem",
            }}>
              <p style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.88rem" }}>
                <i className="fa-solid fa-envelope me-2"></i>Get in Touch
              </p>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.82rem", marginBottom: 0 }}>
                support@texscript.com
              </p>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "2rem 0 1.25rem" }} />

        <div className="text-center" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem" }}>
          © {new Date().getFullYear()} TexScript. All Rights Reserved.
          <span className="mx-2">|</span>
          <span style={{ color: "rgba(255,255,255,0.85)" }}>
            Professional LaTeX &amp; Data Analysis Services
          </span>
        </div>
      </div>
    </footer>
  );
}
