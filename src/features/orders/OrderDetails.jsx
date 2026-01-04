// src/components/orders/OrderDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderQuery } from "./ordersApi";

// export default function OrderDetails() {
//   const { id: orderId } = useParams(); // assumes route param is `:id`
//   const navigate = useNavigate();

//   const {
//     data: order,
//     isLoading,
//     isError,
//     error,
//   } = useGetOrderQuery(orderId, { skip: !orderId });

//   if (!orderId) return <p className="text-red-600">No order id provided.</p>;

//   if (isLoading) return <p className="text-gray-600">Loading order...</p>;
//   if (isError)
//     return (
//       <p className="text-red-600">Failed to load order: {error?.message}</p>
//     );

//   // Render order details - adjust fields to your shape
//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h2 className="text-2xl font-bold">Order #{orderId}</h2>
//           <p className="text-sm text-gray-600">
//             Status: {order.status ?? order.order_status}
//           </p>
//         </div>
//         <div>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-3 py-1 border rounded text-sm"
//           >
//             Back
//           </button>
//         </div>
//       </div>

//       <section className="mb-4">
//         <h3 className="font-semibold">Service</h3>
//         <p className="text-gray-700">{order.service_type}</p>
//       </section>

//       <section className="mb-4">
//         <h3 className="font-semibold">Type</h3>
//         <p className="text-gray-700">{order.order_type}</p>
//       </section>

//       {order.latex_details && (
//         <section className="mb-4">
//           <h3 className="font-semibold">LaTeX details</h3>
//           <p className="text-gray-700">{order.latex_details.latex_title}</p>
//           {/* other latex fields */}
//         </section>
//       )}

//       {order.data_details && (
//         <section className="mb-4">
//           <h3 className="font-semibold">Data details</h3>
//           <p className="text-gray-700">{order.data_details.data_title}</p>
//         </section>
//       )}

//       <section className="mb-4">
//         <h3 className="font-semibold">Customer</h3>
//         <p className="text-gray-700">
//           {order.customer_name ?? order.user?.name}
//         </p>
//       </section>

//       {/* Add more fields, attachments, progress bar, actions like cancel/pay, etc. */}
//     </div>
//   );
// }

// Mock data for demonstration
import { useState } from "react";

function OrderDetails() {
  // Sample order data matching your API structure
  const { id: orderId } = useParams(); // assumes route param is `:id`
  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useGetOrderQuery(orderId, { skip: !orderId });
  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800 border-green-300",
      "in progress": "bg-blue-100 text-blue-800 border-blue-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return (
      colors[status?.toLowerCase()] ||
      "bg-gray-100 text-gray-800 border-gray-300"
    );
  };
  const paymentHandler = () => {
    navigate("/pay-token");
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!orderId) return <p className="text-red-600">No order id provided.</p>;

  if (isLoading) return <p className="text-gray-600">Loading order...</p>;
  if (isError)
    return (
      <p className="text-red-600">Failed to load order: {error?.message}</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-32 md:pt-20 pb-8 px-4 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-red-700 to-red-800 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Order #{order.id}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                      order.order_status
                    )}`}
                  >
                    {order.order_status}
                  </span>
                  <span className="text-red-100 text-sm">
                    Created: {formatDate(order.created_at)}
                  </span>
                </div>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all backdrop-blur-sm flex items-center gap-2 self-start md:self-center">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {order.progress_bar !== undefined && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Order Progress
              </h3>
              <span className="text-sm font-bold text-red-700">
                {order.progress_bar}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 to-red-700 h-3 rounded-full transition-all duration-500"
                style={{ width: `${order.progress_bar}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Service Information
              </h2>
              <div className="space-y-3">
                <DetailRow label="Service Type" value={order.service_type} />
                <DetailRow label="Order Type" value={order.order_type} />
              </div>
            </div>

            {/* LaTeX Details */}
            {order.latex_details && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  LaTeX Details
                </h2>
                <div className="space-y-3">
                  {order.latex_details.latex_title && (
                    <DetailRow
                      label="Title"
                      value={order.latex_details.latex_title}
                    />
                  )}
                  {order.latex_details.latex_type && (
                    <DetailRow
                      label="LaTeX Type"
                      value={order.latex_details.latex_type
                        .replace(/_/g, " ")
                        .toUpperCase()}
                    />
                  )}

                  {/* Pages Section - Smart Display */}
                  {order.latex_details.exact_pages === 0 &&
                  order.latex_details.estm_pages > 0 ? (
                    <div className="py-2 border-b border-gray-100">
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Pages
                        </span>
                        <div className="text-right ml-4">
                          <p className="text-sm text-gray-800 font-semibold">
                            {order.latex_details.estm_pages} (estimated)
                          </p>
                          <p className="text-xs text-blue-600 italic mt-1">
                            We're working on the exact count
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : order.latex_details.exact_pages > 0 ? (
                    <DetailRow
                      label="Pages"
                      value={order.latex_details.exact_pages}
                    />
                  ) : null}

                  {order.latex_details.source_file && (
                    <div className="py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-600 block mb-1">
                        Source File
                      </span>
                      <a
                        href={order.latex_details.source_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-red-700 hover:text-red-800 underline break-all"
                      >
                        {order.latex_details.source_file.split("/").pop()}
                      </a>
                    </div>
                  )}

                  {order.latex_details.additional_notes && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Special Requirements
                      </p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {order.latex_details.additional_notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Data Analysis Details */}
            {order.data_analysis_details && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Data Analysis Details
                </h2>
                <div className="space-y-3">
                  <DetailRow
                    label="Title"
                    value={order.data_analysis_details.data_title}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Payment & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Information */}
            {(order.latex_details || order.data_analysis_details) && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
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
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Payment
                </h2>

                {(() => {
                  const details =
                    order.latex_details || order.data_analysis_details;
                  const exactAmount = details.total_exact_amount || 0;
                  const estmAmount = details.total_estm_amount || 0;
                  const discountedAmount = details.discounted_amount || 0;
                  const remainingAmount = details.remaining_amount || 0;

                  // Case 1: Still calculating - exact amount is 0
                  if (exactAmount === 0 && estmAmount > 0) {
                    return (
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-600 mb-1">
                          Estimated Amount
                        </p>
                        <p className="text-3xl font-bold text-blue-700 mb-2">
                          ${estmAmount.toFixed(2)}
                        </p>
                        <p className="text-xs text-blue-600 italic">
                          We're calculating the exact amount
                        </p>
                      </div>
                    );
                  }

                  // Case 2: Show exact amount with discount (strikethrough) if applicable
                  const hasDiscount =
                    discountedAmount > 0 && discountedAmount < exactAmount;

                  return (
                    <div className="space-y-3">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                        <p className="text-sm text-gray-600 mb-1">
                          Total Amount
                        </p>
                        {hasDiscount ? (
                          <div>
                            <p className="text-xl font-bold text-gray-400 line-through">
                              ${exactAmount.toFixed(2)}
                            </p>
                            <p className="text-3xl font-bold text-red-700">
                              ${discountedAmount.toFixed(2)}
                            </p>
                            <div className="mt-2 pt-2 border-t border-red-200">
                              <p className="text-xs text-green-600 font-semibold">
                                🎉 You saved $
                                {(exactAmount - discountedAmount).toFixed(2)}!
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-3xl font-bold text-red-700">
                            $
                            {exactAmount > 0
                              ? exactAmount.toFixed(2)
                              : estmAmount.toFixed(2)}
                          </p>
                        )}
                      </div>

                      {remainingAmount > 0 && (
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                          <p className="text-xs text-gray-600 mb-1">
                            Remaining Balance
                          </p>
                          <p className="text-2xl font-bold text-orange-700">
                            ${remainingAmount.toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  onClick={paymentHandler}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Make Payment
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 border-2 border-gray-300 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Contact Support
                </button>
                <button className="w-full bg-white hover:bg-red-50 text-red-600 font-semibold py-3 px-4 rounded-lg transition-all duration-200 border-2 border-red-300 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm text-gray-800 font-semibold text-right ml-4">
        {value || "N/A"}
      </span>
    </div>
  );
}

export default OrderDetails;
