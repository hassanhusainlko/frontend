import { useNavigate } from "react-router-dom";
import "../../../styles/variables.css";

export default function OrderTypeButtons() {
  const navigate = useNavigate();

  return (
    <div className="card-royal p-3 mb-4">
      <h6 style={{ color: "var(--color-text-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
        Place a New Order
      </h6>
      <div className="d-flex gap-3 flex-wrap">
        <button
          className="btn-gold"
          style={{ fontSize: "0.88rem", padding: "0.55rem 1.4rem" }}
          onClick={() => navigate("/orders/create-latex")}
        >
          <i className="fa-solid fa-file-pen me-2"></i>LaTeX Order
        </button>
        <button
          style={{
            fontSize: "0.88rem", padding: "0.55rem 1.4rem",
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--color-border-gold)",
            background: "transparent",
            color: "var(--color-gold)",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(201,168,76,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          onClick={() => navigate("/orders/create-data-analysis")}
        >
          <i className="fa-solid fa-chart-line me-2"></i>Data Analysis Order
        </button>
      </div>
    </div>
  );
}
