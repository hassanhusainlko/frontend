import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserInfoCard from "./components/UserInfoCard";
import QuoteGenerator from "./components/QuoteGenerator";
import OrderTypeButtons from "./components/OrderTypeButtons";
import OrdersList from "./components/OrdersList";
import { useLazyGetProfileQuery } from "../profile/profileApi";
import "../../styles/variables.css";

export default function Dashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [triggerGetProfile] = useLazyGetProfileQuery();
  const location = useLocation();

  useEffect(() => {
    triggerGetProfile();
  }, [triggerGetProfile]);

  const isHome = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  if (!isHome) {
    return <Outlet />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", paddingTop: "var(--navbar-height)" }}>
      <div className="container py-4">
        {/* Page title */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div style={{ width: 4, height: 32, background: "var(--gradient-royal)", borderRadius: 2 }}></div>
          <h4 style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", margin: 0 }}>
            Dashboard
          </h4>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-4 col-xl-3">
            <UserInfoCard />
          </div>
          <div className="col-12 col-lg-8 col-xl-9">
            <QuoteGenerator />
            <OrderTypeButtons />
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
