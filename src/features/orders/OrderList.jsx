import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "./ordersApi";
import "../../styles/variables.css";

const STATUS_LABELS = {
  pending_quote:          "Pending Quote",
  quoted:                 "Quoted",
  accepted:               "Accepted",
  awaiting_token_payment: "Awaiting Payment",
  confirmed:              "Confirmed",
  assigned:               "Assigned",
  in_progress:            "In Progress",
  preview_submitted:      "Preview Ready",
  revised:                "Revised",
  awaiting_final_payment: "Final Payment Due",
  delivered:              "Delivered",
  cancelled:              "Cancelled",
};

const STATUS_BADGE = {
  pending_quote:          "badge-pending",
  quoted:                 "badge-pending",
  accepted:               "badge-confirmed",
  awaiting_token_payment: "badge-pending",
  confirmed:              "badge-confirmed",
  assigned:               "badge-confirmed",
  in_progress:            "badge-in-progress",
  preview_submitted:      "badge-in-progress",
  revised:                "badge-in-progress",
  awaiting_final_payment: "badge-pending",
  delivered:              "badge-delivered",
  cancelled:              "badge-cancelled",
};

const STATUS_ACCENT = {
  pending_quote:          "#D97706",
  quoted:                 "#D97706",
  accepted:               "#2563EB",
  awaiting_token_payment: "#D97706",
  confirmed:              "#2563EB",
  assigned:               "#2563EB",
  in_progress:            "#7C3AED",
  preview_submitted:      "#7C3AED",
  revised:                "#7C3AED",
  awaiting_final_payment: "#D97706",
  delivered:              "#059669",
  cancelled:              "#9CA3AF",
};

const SERVICE_LABELS = {
  data_analysis:        "Data Analysis",
  latex:                "LaTeX",
  word_to_latex:        "Word → LaTeX",
  pdf_to_latex:         "PDF → LaTeX",
  editable_pdf_to_latex:"Editable PDF → LaTeX",
  latex_editing:        "LaTeX Editing",
};

const SERVICE_ICON = {
  data_analysis:        "fa-chart-line",
  latex:                "fa-file-pen",
  word_to_latex:        "fa-file-word",
  pdf_to_latex:         "fa-file-pdf",
  editable_pdf_to_latex:"fa-file-pdf",
  latex_editing:        "fa-file-pen",
};

function OrderRow({ order, navigate }) {
  const status      = order.status || "pending_quote";
  const accentColor = STATUS_ACCENT[status] || "#9CA3AF";
  const icon        = SERVICE_ICON[order.service_category] || "fa-file-lines";
  const serviceLabel= SERVICE_LABELS[order.service_category]
    || order.service_category?.replace(/_/g, " ")
    || "Order";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/dashboard/orders/${order.id}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/dashboard/orders/${order.id}`)}
      style={{
        background: "#FFFFFF",
        border: "1px solid var(--color-border)",
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-sm)",
        cursor: "pointer",
        padding: "0.9rem 1.1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        transition: "box-shadow var(--transition-normal), background var(--transition-fast), transform var(--transition-fast)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card-lg)";
        e.currentTarget.style.background = "var(--color-primary-xsubtle)";
        e.currentTarget.style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.background = "#FFFFFF";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      {/* Service icon */}
      <div style={{
        width: 44, height: 44, borderRadius: "var(--radius-sm)",
        background: "var(--color-primary-xsubtle)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <i className={`fa-solid ${icon}`} style={{ color: "var(--color-primary)", fontSize: "1.05rem" }}></i>
      </div>

      {/* Order # + service label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "0.92rem", lineHeight: 1.3 }}>
          #{order.id}
        </div>
        <div style={{ fontSize: "0.77rem", color: "var(--color-text-muted)", textTransform: "capitalize", marginTop: 1 }}>
          {serviceLabel}
        </div>
      </div>

      {/* Priority — hidden on xs */}
      <div className="d-none d-sm-block">
        {order.priority === "urgent" ? (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.25rem",
            fontSize: "0.73rem", fontWeight: 700, color: "#B45309",
            background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)",
            borderRadius: "var(--radius-pill)", padding: "0.22rem 0.6rem",
            whiteSpace: "nowrap",
          }}>
            <i className="fa-solid fa-bolt" style={{ fontSize: "0.62rem" }}></i> Urgent
          </span>
        ) : (
          <span style={{
            display: "inline-flex", alignItems: "center",
            fontSize: "0.73rem", color: "var(--color-text-muted)",
            background: "rgba(107,114,128,0.07)",
            border: "1px solid rgba(107,114,128,0.14)",
            borderRadius: "var(--radius-pill)", padding: "0.22rem 0.6rem",
            whiteSpace: "nowrap",
          }}>
            Regular
          </span>
        )}
      </div>

      {/* Amount — hidden on xs */}
      <div className="d-none d-sm-block" style={{ minWidth: 72, textAlign: "right" }}>
        {order.final_amount ? (
          <span style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "0.9rem" }}>
            ₹{order.final_amount}
          </span>
        ) : (
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontStyle: "italic" }}>
            TBD
          </span>
        )}
      </div>

      {/* Status badge */}
      <div className="d-none d-md-block">
        <span className={STATUS_BADGE[status] || "badge-pending"}>
          {STATUS_LABELS[status] || status}
        </span>
      </div>

      {/* Status badge — mobile only (shorter) */}
      <div className="d-md-none">
        <span className={STATUS_BADGE[status] || "badge-pending"} style={{ fontSize: "0.68rem", padding: "0.18rem 0.5rem" }}>
          {STATUS_LABELS[status] || status}
        </span>
      </div>

      {/* Arrow */}
      <i className="fa-solid fa-chevron-right" style={{ color: "#D1D5DB", fontSize: "0.75rem", flexShrink: 0 }}></i>
    </div>
  );
}

export default function OrderList() {
  const navigate = useNavigate();
  const { data: orders, isLoading, isError, refetch } = useGetOrdersQuery();

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-page)", paddingTop: "var(--navbar-height)" }}>
      <div className="container py-4">

        {/* ── Header ── */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div style={{ width: 4, height: 36, background: "var(--gradient-royal)", borderRadius: 2, flexShrink: 0 }}></div>
            <div>
              <h4 style={{ margin: 0, color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                My Orders
              </h4>
              {!isLoading && orders && (
                <p style={{ margin: 0, fontSize: "0.77rem", color: "var(--color-text-muted)", marginTop: 1 }}>
                  {orders.length} order{orders.length !== 1 ? "s" : ""} total
                </p>
              )}
            </div>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <button
              className="btn-outline-gold"
              style={{ fontSize: "0.84rem", padding: "0.48rem 1.1rem" }}
              onClick={() => navigate("/orders/create-latex")}
            >
              <i className="fa-solid fa-file-pen me-2"></i>New LaTeX
            </button>
            <button
              className="btn-gold"
              style={{ fontSize: "0.84rem", padding: "0.48rem 1.1rem" }}
              onClick={() => navigate("/orders/create-data-analysis")}
            >
              <i className="fa-solid fa-chart-line me-2"></i>New Data Analysis
            </button>
          </div>
        </div>

        {/* ── Loading ── */}
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-royal mx-auto mb-3"></div>
            <p className="text-royal-muted" style={{ fontSize: "0.9rem" }}>Loading your orders…</p>
          </div>
        )}

        {/* ── Error ── */}
        {isError && (
          <div className="card-royal p-4 text-center">
            <div className="alert-royal-error mb-3">
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              Failed to load orders. Please check your connection and try again.
            </div>
            <button className="btn-outline-gold" onClick={refetch}>
              <i className="fa-solid fa-rotate-right me-2"></i>Retry
            </button>
          </div>
        )}

        {/* ── Empty state ── */}
        {!isLoading && !isError && (!orders || orders.length === 0) && (
          <div className="card-royal p-5 text-center">
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "var(--color-primary-xsubtle)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.25rem",
            }}>
              <i className="fa-solid fa-folder-open" style={{ color: "var(--color-primary)", fontSize: "1.6rem", opacity: 0.5 }}></i>
            </div>
            <h5 style={{ color: "var(--color-text-primary)", fontWeight: 700, marginBottom: "0.4rem" }}>No orders yet</h5>
            <p className="text-royal-muted mb-4" style={{ fontSize: "0.9rem", maxWidth: 300, margin: "0 auto 1.5rem" }}>
              Place your first order to get started with our services.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button className="btn-outline-gold" onClick={() => navigate("/orders/create-latex")}>
                <i className="fa-solid fa-file-pen me-2"></i>LaTeX Order
              </button>
              <button className="btn-gold" onClick={() => navigate("/orders/create-data-analysis")}>
                <i className="fa-solid fa-chart-line me-2"></i>Data Analysis
              </button>
            </div>
          </div>
        )}

        {/* ── Order list ── */}
        {!isLoading && !isError && orders && orders.length > 0 && (
          <>
            {/* Column labels (desktop only) */}
            <div className="d-none d-md-flex align-items-center px-2 mb-2"
              style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", gap: "1rem" }}>
              <div style={{ width: 44, flexShrink: 0 }}></div>
              <div style={{ flex: 1 }}>Order</div>
              <div className="d-none d-sm-block" style={{ width: 72 }}>Priority</div>
              <div className="d-none d-sm-block" style={{ minWidth: 72, textAlign: "right" }}>Amount</div>
              <div style={{ minWidth: 110 }}>Status</div>
              <div style={{ width: 16 }}></div>
            </div>

            <div className="d-flex flex-column gap-2">
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} navigate={navigate} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
