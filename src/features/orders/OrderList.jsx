import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "./ordersApi";
import "../../styles/variables.css";

const STATUS_LABELS = {
  pending_quote: "Pending Quote",
  quoted: "Quoted",
  accepted: "Accepted",
  awaiting_token_payment: "Awaiting Payment",
  confirmed: "Confirmed",
  assigned: "Assigned",
  in_progress: "In Progress",
  preview_submitted: "Preview Ready",
  revised: "Revised",
  awaiting_final_payment: "Final Payment Due",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_BADGE = {
  pending_quote: "badge-pending",
  quoted: "badge-pending",
  accepted: "badge-confirmed",
  awaiting_token_payment: "badge-pending",
  confirmed: "badge-confirmed",
  assigned: "badge-confirmed",
  in_progress: "badge-in-progress",
  preview_submitted: "badge-in-progress",
  revised: "badge-in-progress",
  awaiting_final_payment: "badge-pending",
  delivered: "badge-delivered",
  cancelled: "badge-cancelled",
};

export default function OrderList() {
  const navigate = useNavigate();
  const { data: orders, isLoading, isError, refetch } = useGetOrdersQuery();

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-royal mx-auto"></div>
        <p className="text-royal-muted mt-2">Loading your orders…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-4">
        <div className="alert-royal-error mb-3">Failed to load orders.</div>
        <button className="btn-outline-gold" onClick={refetch}>
          <i className="fa-solid fa-rotate-right me-2"></i>Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", paddingTop: "var(--navbar-height)" }}>
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h2 className="section-heading-gold mb-0">
          <i className="fa-solid fa-list-check me-2"></i>My Orders
        </h2>
        <div className="d-flex gap-2">
          <button className="btn-outline-gold" style={{ fontSize: "0.85rem" }}
            onClick={() => navigate("/orders/create-latex")}>
            <i className="fa-solid fa-file-pen me-2"></i>New LaTeX Order
          </button>
          <button className="btn-gold" style={{ fontSize: "0.85rem" }}
            onClick={() => navigate("/orders/create-data-analysis")}>
            <i className="fa-solid fa-chart-line me-2"></i>New Data Analysis
          </button>
        </div>
      </div>

      {(!orders || orders.length === 0) ? (
        <div className="card-royal p-5 text-center">
          <i className="fa-solid fa-folder-open fa-3x mb-3" style={{ color: "var(--color-border)", opacity: 0.5 }}></i>
          <h5 style={{ color: "var(--color-text-muted)" }}>No orders yet</h5>
          <p className="text-royal-muted mb-4">Place your first order to get started.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn-crimson" style={{ borderRadius: "var(--radius-pill)", padding: "0.6rem 1.5rem", fontWeight: 600, textDecoration: "none" }}
              onClick={() => navigate("/orders/create-latex")}>
              <i className="fa-solid fa-file-pen me-2"></i>LaTeX Order
            </button>
            <button className="btn-gold" onClick={() => navigate("/orders/create-data-analysis")}>
              <i className="fa-solid fa-chart-line me-2"></i>Data Analysis
            </button>
          </div>
        </div>
      ) : (
        <div className="card-royal" style={{ overflow: "hidden" }}>
          <div className="table-responsive">
            <table className="table mb-0" style={{ color: "var(--color-text-primary)" }}>
              <thead style={{ background: "var(--gradient-royal)", color: "var(--color-text-light)" }}>
                <tr>
                  <th style={{ padding: "0.9rem 1rem", fontWeight: 600, borderBottom: "1px solid var(--color-border-gold)", whiteSpace: "nowrap" }}>Order ID</th>
                  <th style={{ padding: "0.9rem 1rem", fontWeight: 600, borderBottom: "1px solid var(--color-border-gold)", whiteSpace: "nowrap" }}>Service</th>
                  <th style={{ padding: "0.9rem 1rem", fontWeight: 600, borderBottom: "1px solid var(--color-border-gold)", whiteSpace: "nowrap" }}>Priority</th>
                  <th style={{ padding: "0.9rem 1rem", fontWeight: 600, borderBottom: "1px solid var(--color-border-gold)", whiteSpace: "nowrap" }}>Amount</th>
                  <th style={{ padding: "0.9rem 1rem", fontWeight: 600, borderBottom: "1px solid var(--color-border-gold)", whiteSpace: "nowrap" }}>Status</th>
                  <th style={{ padding: "0.9rem 1rem", fontWeight: 600, borderBottom: "1px solid var(--color-border-gold)", whiteSpace: "nowrap" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid var(--color-border)",
                      transition: "background var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-card-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "0.85rem 1rem", fontWeight: 600, color: "var(--color-gold)" }}>
                      #{order.id}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", textTransform: "capitalize" }}>
                      {order.service_category?.replace(/_/g, " ")}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", textTransform: "capitalize" }}>
                      {order.priority === "urgent" ? (
                        <span style={{ color: "var(--color-crimson)" }}>
                          <i className="fa-solid fa-bolt me-1"></i>Urgent
                        </span>
                      ) : order.priority}
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      {order.final_amount ? (
                        <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>
                          ₹{order.final_amount}
                        </span>
                      ) : (
                        <span className="text-royal-muted">TBD</span>
                      )}
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <span
                        className={`badge ${STATUS_BADGE[order.status] || "badge-pending"}`}
                        style={{ borderRadius: "var(--radius-pill)", padding: "0.3rem 0.8rem", fontSize: "0.75rem" }}
                      >
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <button
                        className="btn-outline-gold"
                        style={{ fontSize: "0.78rem", padding: "0.3rem 0.8rem", borderRadius: "var(--radius-sm)" }}
                        onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/orders/${order.id}`); }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
