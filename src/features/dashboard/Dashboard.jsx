import React, { useState } from "react";

import UserInfoCard from "./components/UserInfoCard";
import QuoteGenerator from "./components/QuoteGenerator";
import OrderTypeButtons from "./components/OrderTypeButtons";
import OrdersList from "./components/OrdersList";
// import OrderDetails from "./components/OrderDetails";
import { useDispatch } from "react-redux";
import { useLazyGetProfileQuery } from "../profile/profileApi";
import { useEffect } from "react";

export default function Dashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const [triggerGetProfile] = useLazyGetProfileQuery();

  useEffect(() => {
    // Fetch user profile on dashboard load
    triggerGetProfile();
  }, [triggerGetProfile]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Manage your orders and profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: User Info */}
          <div className="lg:col-span-1">
            <UserInfoCard />
          </div>

          {/* RIGHT: Quote + Orders */}
          <div className="lg:col-span-2 space-y-6">
            <QuoteGenerator />
            <OrderTypeButtons />
            <OrdersList
              onSelectOrder={setSelectedOrder}
              selectedOrderId={selectedOrder?.id || null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
