// src/features/dashboard/components/OrderDetails.jsx
import React from "react";

export default function OrderDetails({ order }) {
  return (
    <div className="card shadow-sm h-100" style={{ borderRadius: "10px" }}>
      <div className="card-body">
        <h6 className="card-title mb-3">
          <i className="fa-regular fa-file-lines pe-2" />
          Order Details
        </h6>

        {!order && (
          <p className="text-muted mb-0">
            Select an order from the list to see details.
          </p>
        )}

        {order && (
          <>
            <p className="mb-1">
              <strong>Order ID:</strong> #{order.id}
            </p>
            <p className="mb-1">
              <strong>Type:</strong> {order.order_type}
            </p>
            <p className="mb-1">
              <strong>Status:</strong> {order.order_status}
            </p>
            <p className="mb-1">
              <strong>Service Type:</strong> {order.service_type}
            </p>
            <p className="mb-1">
              <strong>Progress:</strong> {order.progress_bar}%
            </p>
            <p className="mb-1">
              <strong>Created:</strong>{" "}
              {order.created_at
                ? new Date(order.created_at).toLocaleString()
                : "N/A"}
            </p>
            <hr />

            {order.latex_details && (
              <>
                <h6>LaTeX Details</h6>
                <p className="mb-1">
                  <strong>Title:</strong>{" "}
                  {order.latex_details.latex_title || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Type:</strong>{" "}
                  {order.latex_details.latex_type || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Estimated Pages:</strong>{" "}
                  {order.latex_details.estm_pages}
                </p>
                <p className="mb-1">
                  <strong>Additional Notes:</strong>{" "}
                  {order.latex_details.additional_notes || "N/A"}
                </p>
              </>
            )}

            {order.data_details && (
              <>
                <h6 className="mt-3">Data Analysis Details</h6>
                <p className="mb-1">
                  <strong>Title:</strong>{" "}
                  {order.data_details.data_title || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Objective:</strong>{" "}
                  {order.data_details.data_objective || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Data Type:</strong>{" "}
                  {order.data_details.data_type || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Additional Notes:</strong>{" "}
                  {order.data_details.additional_notes || "N/A"}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
