import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGetOrdersQuery } from "../../orders/ordersApi"; // adjust path

// OrdersList Component
export default function OrdersList({ onSelectOrder, selectedOrderId }) {
  const { data: orders = [], isLoading, error } = useGetOrdersQuery();
  const navigate = useNavigate();
  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  const handleClick = (o) => {
    const id = o.id ?? o._id;
    // If parent wants callback
    if (onSelectOrder) onSelectOrder(o);

    // navigate to order details page
    navigate(`/orders/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-red-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5h6M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
      </div>

      {/* Load states */}
      {isLoading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-600">Failed to load orders.</p>}
      {!isLoading && !error && orders.length === 0 && (
        <p className="text-gray-500">No orders placed yet.</p>
      )}

      {/* Orders */}
      <div className="space-y-3">
        {orders.map((o) => {
          const id = o.id ?? o._id;
          const status = o.status ?? o.order_status;
          return (
            <div
              key={id}
              onClick={() => handleClick(o)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                selectedOrderId === id
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-red-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-800">Order #{id}</span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    statusColors[status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{o.order_type}</span>
                <span>{o.service_type}</span>
                <span>{o.date}</span>
              </div>

              {o.latex_details?.latex_title && (
                <p className="text-sm text-gray-500 mt-1">
                  {o.latex_details.latex_title}
                </p>
              )}
              {o.data_details?.data_title && (
                <p className="text-sm text-gray-500 mt-1">
                  {o.data_details.data_title}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
