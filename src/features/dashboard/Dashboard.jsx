import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserInfoCard from "./components/UserInfoCard";
import QuoteGenerator from "./components/QuoteGenerator";
import OrderTypeButtons from "./components/OrderTypeButtons";
import OrdersList from "./components/OrdersList";
import { useLazyGetProfileQuery } from "../profile/profileApi";
import { useGetOrdersQuery } from "../orders/ordersApi";
import { useGetMyCouponsQuery } from "../coupons/couponsApi";
import "../../styles/variables.css";

function StatCard({ icon, label, value, bg, iconColor }) {
  return (
    <div className="card-royal p-3 h-100">
      <div className="d-flex align-items-center gap-3">
        <div style={{
          width: 44, height: 44, borderRadius: "var(--radius-sm)",
          background: bg || "rgba(124,58,237,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <i className={`fa-solid ${icon}`} style={{ color: iconColor || "var(--color-crimson)", fontSize: "1.05rem" }}></i>
        </div>
        <div>
          <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{label}</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.1, fontFamily: "var(--font-heading)" }}>{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [triggerGetProfile] = useLazyGetProfileQuery();
  const location = useLocation();
  const { data: orders = [] } = useGetOrdersQuery();
  const { data: coupons = [] } = useGetMyCouponsQuery();

  useEffect(() => {
    triggerGetProfile();
  }, [triggerGetProfile]);

  const isHome = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  if (!isHome) {
    return <Outlet />;
  }

  const totalOrders = orders.length;
  const inProgress = orders.filter((o) =>
    ["in_progress", "preview_submitted", "revised", "assigned", "confirmed", "accepted"].includes(o.status)
  ).length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-page)", paddingTop: "var(--navbar-height)" }}>
      <div className="container py-4">
        {/* Page title */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div style={{ width: 4, height: 32, background: "var(--gradient-royal)", borderRadius: 2 }}></div>
          <h4 style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", margin: 0 }}>
            Dashboard
          </h4>
        </div>

        {/* Stat cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-lg-4">
            <StatCard
              icon="fa-list-check"
              label="Total Orders"
              value={totalOrders}
              bg="rgba(30,41,59,0.07)"
              iconColor="var(--color-primary)"
            />
          </div>
          <div className="col-6 col-lg-4">
            <StatCard
              icon="fa-spinner"
              label="In Progress"
              value={inProgress}
              bg="rgba(124,58,237,0.07)"
              iconColor="#7C3AED"
            />
          </div>
          <div className="col-6 col-lg-4">
            <StatCard
              icon="fa-circle-check"
              label="Delivered"
              value={delivered}
              bg="rgba(5,150,105,0.08)"
              iconColor="#059669"
            />
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-4 col-xl-3">
            <UserInfoCard />
          </div>
          <div className="col-12 col-lg-8 col-xl-9">
            <QuoteGenerator />
            <OrderTypeButtons />

            {coupons.length > 0 && (
              <div className="card-royal p-4 mb-4">
                <h6 style={{ color: "var(--color-text-primary)", fontWeight: 700, marginBottom: "0.75rem" }}>
                  <i className="fa-solid fa-tag me-2" style={{ color: "var(--color-crimson)" }}></i>My Coupons
                </h6>
                <div className="row g-3">
                  {coupons.map((c) => (
                    <div key={c.id} className="col-12 col-sm-6 col-lg-4">
                      <div style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", background: "var(--color-bg-input)", border: "1px dashed var(--color-border)", height: "100%" }}>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span style={{ color: "var(--color-crimson)", fontWeight: 700, fontFamily: "monospace", fontSize: "0.95rem" }}>{c.code}</span>
                          <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", textTransform: "capitalize" }}>{c.coupon_type}</span>
                        </div>
                        <div style={{ fontSize: "0.82rem", color: "var(--color-text-primary)", fontWeight: 600, marginBottom: "0.25rem" }}>
                          {c.discount}% Off
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                          {c.max_discount ? `Max discount ₹${c.max_discount}` : "No max limit"}
                          {c.minimum_order_amount > 0 ? ` · Min order ₹${c.minimum_order_amount}` : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="row g-3">
              <div className="col-12">
                <OrdersList
                  onSelectOrder={setSelectedOrder}
                  selectedOrderId={selectedOrder?.id || null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
