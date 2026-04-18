import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../orders/ordersApi";
import "../../../styles/variables.css";

// Colours tuned for white/light card background
const STATUS_BADGE = {
  pending:                { bg: "rgba(192,57,43,0.09)",  color: "#922B21",  border: "rgba(192,57,43,0.3)" },
  confirmed:              { bg: "rgba(192,57,43,0.09)",  color: "#922B21",  border: "rgba(192,57,43,0.3)" },
  in_progress:            { bg: "rgba(41,128,185,0.10)", color: "#2471A3",  border: "rgba(41,128,185,0.3)" },
  awaiting_token_payment: { bg: "rgba(192,57,43,0.07)",  color: "#C0392B",  border: "rgba(192,57,43,0.25)" },
  preview_submitted:      { bg: "rgba(41,128,185,0.10)", color: "#2471A3",  border: "rgba(41,128,185,0.3)" },
  awaiting_final_payment: { bg: "rgba(192,57,43,0.07)",  color: "#C0392B",  border: "rgba(192,57,43,0.25)" },
  completed:              { bg: "rgba(39,174,96,0.10)",  color: "#1E8449",  border: "rgba(39,174,96,0.3)" },
  delivered:              { bg: "rgba(39,174,96,0.13)",  color: "#1A6B3C",  border: "rgba(39,174,96,0.4)" },
};

function StatusBadge({ status }) {
  const s = STATUS_BADGE[status] || { bg: "rgba(0,0,0,0.05)", color: "#6B7280", border: "rgba(0,0,0,0.12)" };
  return (
    <span style={{
      padding: "1.rem 0.6rem",
      borderRadius: "var(--radius-pill)",
      fontSize: "0.72rem",
      fontWeight: 600,
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      whiteSpace: "nowrap",
    }}>
      {status?.replace(/_/g, " ") || "unknown"}
    </span>
  );
}

export default function OrdersList({ onSelectOrder, selectedOrderId }) {
  const { data: orders = [], isLoading, error } = useGetOrdersQuery();

  return (
    <div className="card-royal p-4 h-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h6 style={{ color: "var(--color-text-primary)", fontWeight: 700, margin: 0 }}>
          <i className="fa-solid fa-list-check me-2" style={{ color: "var(--color-crimson)" }}></i>Recent Orders
        </h6>
        <Link to="/dashboard/orders" style={{ color: "var(--color-crimson)", fontSize: "0.78rem", textDecoration: "none", fontWeight: 600 }}>
          View all <i className="fa-solid fa-arrow-right ms-1"></i>
        </Link>
      </div>

      {isLoading && (
        <div className="d-flex align-items-center gap-2" style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
          <div className="spinner-royal" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
          Loading orders…
        </div>
      )}

      {error && (
        <div className="alert-royal-error" style={{ fontSize: "0.83rem", padding: "0.6rem 0.9rem" }}>
          Failed to load orders.
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <div className="text-center py-3">
          <i className="fa-solid fa-inbox" style={{ color: "#CCCCCC", fontSize: "2rem", marginBottom: "0.5rem", display: "block" }}></i>
          <p className="text-royal-muted mb-2" style={{ fontSize: "0.85rem" }}>No orders placed yet.</p>
          <Link to="/dashboard/quote-request" className="btn-gold" style={{ textDecoration: "none", fontSize: "0.8rem", padding: "0.4rem 1.2rem" }}>
            Get a Quote
          </Link>
        </div>
      )}

      {!isLoading && !error && orders.length > 0 && (
        <div style={{ maxHeight: 280, overflowY: "auto", overflowX: "hidden" }}>
          {orders.slice(0, 8).map((order) => {
            const isSelected = selectedOrderId === order.id;
            return (
              <div
                key={order.id}
                onClick={() => onSelectOrder && onSelectOrder(order)}
                style={{
                  padding: "0.65rem 0.75rem",
                  marginBottom: "0.4rem",
                  borderRadius: "var(--radius-sm)",
                  background: isSelected ? "rgba(192,57,43,0.07)" : "#FAFAFA",
                  border: `1px solid ${isSelected ? "var(--color-crimson)" : "var(--color-border)"}`,
                  cursor: "pointer",
                  transition: "background 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "#F5F5F5"; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "#FAFAFA"; }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "var(--color-crimson)", fontWeight: 700, fontSize: "0.82rem" }}>
                      #{order.id}
                    </span>
                    <span style={{
                      padding: "0.1rem 0.45rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.68rem",
                      background: "rgba(192,57,43,0.07)",
                      color: "var(--color-text-muted)",
                      border: "1px solid var(--color-border)",
                      textTransform: "capitalize",
                    }}>
                      {order.service_category?.replace(/_/g, " ") || order.order_type || "—"}
                    </span>
                  </div>
                  <StatusBadge status={order.status || order.order_status} />
                </div>
                {order.priority && (
                  <div style={{ marginTop: "0.25rem", color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
                    Priority: {order.priority}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
