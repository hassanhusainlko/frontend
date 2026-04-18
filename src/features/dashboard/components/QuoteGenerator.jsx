import { useNavigate } from "react-router-dom";
import "../../../styles/variables.css";

export default function QuoteGenerator() {
  const navigate = useNavigate();

  return (
    <div
      className="card-royal p-4 mb-4"
      style={{
        background: "linear-gradient(135deg, var(--color-bg-card) 0%, rgba(139,0,0,0.15) 100%)",
        border: "1px solid var(--color-border-gold)",
      }}
    >
      <div className="d-flex align-items-start gap-3">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--gradient-royal)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <i className="fa-solid fa-file-invoice-dollar" style={{ color: "var(--color-gold)", fontSize: "1.1rem" }}></i>
        </div>
        <div className="flex-grow-1">
          <h5 style={{ color: "var(--color-gold)", marginBottom: "0.25rem", fontFamily: "var(--font-heading)" }}>
            Request a Custom Quote
          </h5>
          <p className="text-royal-muted mb-3" style={{ fontSize: "0.88rem" }}>
            Upload your document and get a personalized price estimate from our team within 24 hours.
          </p>
          <button
            className="btn-gold"
            onClick={() => navigate("/dashboard/quote-request")}
          >
            <i className="fa-solid fa-wand-magic-sparkles me-2"></i>Start Quote Request
          </button>
        </div>
      </div>
    </div>
  );
}
