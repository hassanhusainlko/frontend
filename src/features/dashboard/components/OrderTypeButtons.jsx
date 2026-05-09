import { useNavigate } from "react-router-dom";
import "../../../styles/variables.css";

const SERVICES = [
  {
    icon: "fa-file-pen",
    title: "LaTeX Services",
    desc: "Word/PDF to LaTeX conversion, editing & formatting",
    path: "/orders/create-latex",
    bg: "rgba(30,41,59,0.07)",
    iconColor: "var(--color-primary)",
  },
  {
    icon: "fa-chart-line",
    title: "Data Analysis",
    desc: "Statistical analysis, charts & research reports",
    path: "/orders/create-data-analysis",
    bg: "rgba(124,58,237,0.07)",
    iconColor: "var(--color-crimson)",
  },
];

export default function OrderTypeButtons() {
  const navigate = useNavigate();

  return (
    <div className="card-royal p-3 mb-4">
      <h6 style={{ color: "var(--color-text-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
        Place a New Order
      </h6>
      <div className="row g-3">
        {SERVICES.map((s) => (
          <div className="col-sm-6" key={s.path}>
            <button
              onClick={() => navigate(s.path)}
              style={{
                width: "100%", textAlign: "left", padding: "1rem 1.1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-input)",
                cursor: "pointer",
                transition: "border-color var(--transition-fast), background var(--transition-fast), transform var(--transition-bounce), box-shadow var(--transition-normal)",
                display: "flex", alignItems: "flex-start", gap: "0.85rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-crimson)";
                e.currentTarget.style.background = s.bg;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "var(--shadow-card-lg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.background = "var(--color-bg-input)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: "var(--radius-sm)",
                background: s.bg, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}>
                <i className={`fa-solid ${s.icon}`} style={{ color: s.iconColor, fontSize: "1rem" }}></i>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: "var(--color-text-primary)", fontSize: "0.9rem", marginBottom: "0.2rem" }}>{s.title}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", lineHeight: 1.4 }}>{s.desc}</div>
              </div>
              <i className="fa-solid fa-arrow-right" style={{ color: "var(--color-text-muted)", fontSize: "0.78rem", marginTop: "0.25rem", flexShrink: 0 }}></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
