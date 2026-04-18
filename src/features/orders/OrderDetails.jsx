import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOrderQuery,
  useGetStatusHistoryQuery,
  useRequestRevisionMutation,
  useApprovePreviewMutation,
  useUpdateOrderDetailsMutation,
} from "./ordersApi";
import { useGetLatexByOrderQuery, useUpdateLatexDetailsMutation } from "./latexOrdersApi";
import { useGetDataAnalysisByOrderQuery, useUpdateDataAnalysisDetailsMutation } from "./dataAnalysisApi";
import "../../styles/variables.css";

const STATUS_LABELS = {
  pending_quote: "Pending Quote",
  quoted: "Quoted",
  accepted: "Accepted",
  awaiting_token_payment: "Awaiting Token Payment",
  confirmed: "Confirmed",
  assigned: "Assigned",
  in_progress: "In Progress",
  preview_submitted: "Preview Ready",
  revised: "Revised",
  awaiting_final_payment: "Awaiting Final Payment",
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

function RevisionModal({ onClose, onSubmit, isLoading }) {
  const [message, setMessage] = useState("");
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999, padding: "1rem",
      }}
    >
      <div className="card-royal p-4" style={{ maxWidth: 500, width: "100%" }}>
        <h5 className="section-heading-gold mb-3">
          <i className="fa-solid fa-pen-to-square me-2"></i>Request Revision
        </h5>
        <div className="mb-3">
          <label className="form-label-royal">Revision Message</label>
          <textarea
            className="form-control form-control-royal"
            rows={4}
            placeholder="Describe what needs to be changed…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="d-flex gap-2 justify-content-end">
          <button className="btn-outline-gold" onClick={onClose}>Cancel</button>
          <button className="btn-gold" disabled={isLoading || !message.trim()}
            onClick={() => onSubmit(message)}>
            {isLoading ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Sending…</> : "Submit Revision"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  const { data: order, isLoading, isError } = useGetOrderQuery(orderId);
  const { data: history } = useGetStatusHistoryQuery(orderId);
  const { data: latexDetails } = useGetLatexByOrderQuery(orderId);
  const { data: dataAnalysisDetails } = useGetDataAnalysisByOrderQuery(orderId);
  const [requestRevision, { isLoading: isRevising }] = useRequestRevisionMutation();
  const [approvePreview, { isLoading: isApproving }] = useApprovePreviewMutation();
  const [updateLatex, { isLoading: isSavingLatex }] = useUpdateLatexDetailsMutation();
  const [updateDataAnalysis, { isLoading: isSavingDA }] = useUpdateDataAnalysisDetailsMutation();
  const [updateOrderDetails, { isLoading: isSavingOrder }] = useUpdateOrderDetailsMutation();

  const [editingLatex, setEditingLatex] = useState(false);
  const [latexForm, setLatexForm] = useState({});
  const [editingDA, setEditingDA] = useState(false);
  const [daForm, setDaForm] = useState({});
  const [updateError, setUpdateError] = useState("");

  const [editingOrder, setEditingOrder] = useState(false);
  const [orderForm, setOrderForm] = useState({});
  const [orderUpdateError, setOrderUpdateError] = useState("");

  const startEditLatex = () => {
    setLatexForm({
      conversion_type: latexDetails?.conversion_type || "",
      estimated_pages: latexDetails?.estimated_pages || "",
      journal_template: latexDetails?.journal_template || "",
      bibliography_style: latexDetails?.bibliography_style || "apa",
      figures_tables_count: latexDetails?.figures_tables_count ?? "",
      special_instructions: latexDetails?.special_instructions || "",
    });
    setUpdateError("");
    setEditingLatex(true);
  };

  const saveLatex = async () => {
    setUpdateError("");
    try {
      await updateLatex({ id: latexDetails.id, ...latexForm }).unwrap();
      setEditingLatex(false);
    } catch (err) {
      setUpdateError(err?.data?.detail || err?.data?.message || "Failed to update LaTeX details.");
    }
  };

  const startEditDA = () => {
    setDaForm({
      data_type: dataAnalysisDetails?.data_type || "",
      analysis_objective: dataAnalysisDetails?.analysis_objective || "",
      charts_required: dataAnalysisDetails?.charts_required || "yes",
      report_format: dataAnalysisDetails?.report_format || "pdf",
      additional_notes: dataAnalysisDetails?.additional_notes || "",
    });
    setUpdateError("");
    setEditingDA(true);
  };

  const saveDA = async () => {
    setUpdateError("");
    try {
      await updateDataAnalysis({ id: dataAnalysisDetails.id, ...daForm }).unwrap();
      setEditingDA(false);
    } catch (err) {
      setUpdateError(err?.data?.detail || err?.data?.message || "Failed to update analysis details.");
    }
  };

  const startEditOrder = () => {
    setOrderForm({
      service_category: order?.service_category || "",
      priority: order?.priority || "regular",
    });
    setOrderUpdateError("");
    setEditingOrder(true);
  };

  const saveOrder = async () => {
    setOrderUpdateError("");
    try {
      await updateOrderDetails({ id: orderId, ...orderForm }).unwrap();
      setEditingOrder(false);
    } catch (err) {
      setOrderUpdateError(err?.data?.detail || err?.data?.message || "Failed to update order.");
    }
  };

  const handleRevisionSubmit = async (message) => {
    try {
      await requestRevision({ orderId, message }).unwrap();
      setShowRevisionModal(false);
    } catch (err) {
      console.error("Revision failed", err);
    }
  };

  const handleApprovePreview = async () => {
    try {
      await approvePreview(orderId).unwrap();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-royal mx-auto"></div>
        <p className="text-royal-muted mt-2">Loading order…</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="alert-royal-error mt-4">
        Failed to load order. It may not exist or you may not have access.
      </div>
    );
  }

  const status = order.status || "pending_quote";
  const badgeClass = STATUS_BADGE[status] || "badge-pending";

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", paddingTop: "var(--navbar-height)" }}>
    <div className="container py-4">
      {showRevisionModal && (
        <RevisionModal
          onClose={() => setShowRevisionModal(false)}
          onSubmit={handleRevisionSubmit}
          isLoading={isRevising}
        />
      )}

      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h2 className="section-heading-gold mb-0">
          <i className="fa-solid fa-file-lines me-2"></i>Order #{order.id}
        </h2>
        <button className="btn-outline-gold" style={{ fontSize: "0.85rem" }}
          onClick={() => navigate("/dashboard/orders")}>
          <i className="fa-solid fa-arrow-left me-2"></i>All Orders
        </button>
      </div>

      <div className="row g-4">
        {/* ─── Left: Order Meta ─── */}
        <div className="col-12 col-md-4">
          <div className="card-royal p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="text-gold mb-0">
                <i className="fa-solid fa-circle-info me-2"></i>Order Details
              </h6>
              {order.is_editable_by_client && !editingOrder && (
                <button
                  className="btn-outline-gold"
                  style={{ fontSize: "0.78rem", padding: "0.3rem 0.9rem" }}
                  onClick={startEditOrder}
                >
                  <i className="fa-solid fa-pen me-1"></i>Edit Order
                </button>
              )}
            </div>

            {orderUpdateError && editingOrder && (
              <div className="alert-royal-error mb-3" style={{ fontSize: "0.83rem" }}>{orderUpdateError}</div>
            )}

            <div style={{ fontSize: "0.88rem" }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-royal-muted">Order ID</span>
                <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>#{order.id}</span>
              </div>

              {editingOrder ? (
                <>
                  <div className="mb-2">
                    <label className="form-label-royal">Service</label>
                    <select
                      className="form-select form-select-royal"
                      value={orderForm.service_category}
                      onChange={(e) => setOrderForm((f) => ({ ...f, service_category: e.target.value }))}
                    >
                      <option value="word_to_latex">Word → LaTeX</option>
                      <option value="pdf_to_latex">PDF → LaTeX</option>
                      <option value="editable_pdf_to_latex">Editable PDF → LaTeX</option>
                      <option value="latex_editing">LaTeX Editing</option>
                      <option value="data_analysis">Data Analysis</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label-royal">Priority</label>
                    <select
                      className="form-select form-select-royal"
                      value={orderForm.priority}
                      onChange={(e) => setOrderForm((f) => ({ ...f, priority: e.target.value }))}
                    >
                      <option value="regular">Regular</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="d-flex gap-2 mb-3">
                    <button className="btn-gold" onClick={saveOrder} disabled={isSavingOrder}>
                      {isSavingOrder
                        ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Saving…</>
                        : <><i className="fa-solid fa-floppy-disk me-2"></i>Save</>}
                    </button>
                    <button className="btn-outline-gold" onClick={() => setEditingOrder(false)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-royal-muted">Service</span>
                    <span style={{ color: "var(--color-text-primary)", textTransform: "capitalize" }}>
                      {order.service_category?.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-royal-muted">Priority</span>
                    <span style={{ color: "var(--color-text-primary)", textTransform: "capitalize" }}>
                      {order.priority}
                    </span>
                  </div>
                </>
              )}

              <div className="d-flex justify-content-between mb-3">
                <span className="text-royal-muted">Status</span>
                <span className={`badge ${badgeClass}`} style={{ borderRadius: "var(--radius-pill)", padding: "0.3rem 0.8rem" }}>
                  {STATUS_LABELS[status] || status}
                </span>
              </div>

              {order.final_amount && (
                <>
                  <hr style={{ borderColor: "var(--color-border)" }} />
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-royal-muted">Total Amount</span>
                    <span className="text-gold fw-bold">₹{order.final_amount}</span>
                  </div>
                  {order.token_amount && (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-royal-muted">Token (30%)</span>
                      <span style={{ color: "var(--color-text-primary)" }}>₹{order.token_amount}</span>
                    </div>
                  )}
                  {order.remaining_amount && (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-royal-muted">Remaining (70%)</span>
                      <span style={{ color: "var(--color-text-primary)" }}>₹{order.remaining_amount}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-royal-muted">Payment</span>
                    <span style={{ color: order.payment_status === "paid" ? "#1E8449" : "var(--color-crimson)", textTransform: "capitalize" }}>
                      {order.payment_status || "unpaid"}
                    </span>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <hr style={{ borderColor: "var(--color-border)" }} />
              <div className="d-flex flex-column gap-2">
                {status === "awaiting_token_payment" && (
                  <button className="btn-gold w-100"
                    onClick={() => navigate(`/dashboard/payment/${orderId}?type=token`)}>
                    <i className="fa-solid fa-coins me-2"></i>Pay Token (30%)
                  </button>
                )}
                {status === "awaiting_final_payment" && (
                  <button className="btn-gold w-100"
                    onClick={() => navigate(`/dashboard/payment/${orderId}?type=final`)}>
                    <i className="fa-solid fa-credit-card me-2"></i>Pay Final (70%)
                  </button>
                )}
                {status === "preview_submitted" && (
                  <>
                    <button className="btn-gold w-100" onClick={handleApprovePreview} disabled={isApproving}>
                      {isApproving ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Approving…</> : <><i className="fa-solid fa-check me-2"></i>Approve Preview</>}
                    </button>
                    <button className="btn-outline-gold w-100" onClick={() => setShowRevisionModal(true)}>
                      <i className="fa-solid fa-rotate-left me-2"></i>Request Revision
                    </button>
                  </>
                )}
                {status === "in_progress" && (
                  <button className="btn-outline-gold w-100" onClick={() => setShowRevisionModal(true)}>
                    <i className="fa-solid fa-rotate-left me-2"></i>Request Revision
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right: Timeline + Details ─── */}
        <div className="col-12 col-md-8">
          {/* Status Timeline */}
          <div className="card-royal p-4 mb-4">
            <h6 className="text-gold mb-3">
              <i className="fa-solid fa-timeline me-2"></i>Status History
            </h6>
            {history && history.length > 0 ? (
              <div className="timeline">
                {[...history].reverse().map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className={`timeline-dot ${idx === 0 ? "latest" : ""}`}></div>
                    <div style={{ fontSize: "0.88rem" }}>
                      <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>
                        {STATUS_LABELS[item.status] || item.status}
                      </span>
                      {item.created_at && (
                        <span className="text-royal-muted ms-2" style={{ fontSize: "0.78rem" }}>
                          {new Date(item.created_at).toLocaleString()}
                        </span>
                      )}
                      {item.note && (
                        <p className="text-royal-muted mb-0 mt-1" style={{ fontSize: "0.8rem" }}>
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-royal-muted" style={{ fontSize: "0.88rem" }}>
                No status history yet.
              </p>
            )}
          </div>

          {/* LaTeX Details */}
          {latexDetails && (
            <div className="card-royal p-4 mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="text-gold mb-0">
                  <i className="fa-solid fa-file-code me-2"></i>LaTeX Details
                </h6>
                {order.is_editable_by_client && !editingLatex && (
                  <button className="btn-outline-gold" style={{ fontSize: "0.78rem", padding: "0.3rem 0.9rem" }}
                    onClick={startEditLatex}>
                    <i className="fa-solid fa-pen me-1"></i>Edit Details
                  </button>
                )}
              </div>

              {updateError && editingLatex && (
                <div className="alert-royal-error mb-3" style={{ fontSize: "0.83rem" }}>{updateError}</div>
              )}

              {editingLatex ? (
                <div style={{ fontSize: "0.88rem" }}>
                  <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label-royal">Conversion Type</label>
                      <select className="form-select form-select-royal" value={latexForm.conversion_type}
                        onChange={(e) => setLatexForm((f) => ({ ...f, conversion_type: e.target.value }))}>
                        <option value="word_to_latex">Word → LaTeX</option>
                        <option value="pdf_to_latex">PDF → LaTeX</option>
                        <option value="editable_pdf_to_latex">Editable PDF → LaTeX</option>
                        <option value="latex_editing">LaTeX Editing</option>
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label-royal">Bibliography Style</label>
                      <select className="form-select form-select-royal" value={latexForm.bibliography_style}
                        onChange={(e) => setLatexForm((f) => ({ ...f, bibliography_style: e.target.value }))}>
                        <option value="apa">APA</option>
                        <option value="ieee">IEEE</option>
                        <option value="harvard">Harvard</option>
                        <option value="chicago">Chicago</option>
                        <option value="bibtex">BibTeX</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label-royal">Estimated Pages</label>
                      <input type="number" min="1" className="form-control form-control-royal"
                        value={latexForm.estimated_pages}
                        onChange={(e) => setLatexForm((f) => ({ ...f, estimated_pages: e.target.value }))} />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label-royal">Figures / Tables</label>
                      <input type="number" min="0" className="form-control form-control-royal"
                        value={latexForm.figures_tables_count}
                        onChange={(e) => setLatexForm((f) => ({ ...f, figures_tables_count: e.target.value }))} />
                    </div>
                    <div className="col-12">
                      <label className="form-label-royal">Journal Template</label>
                      <input type="text" className="form-control form-control-royal"
                        placeholder="e.g. IEEE, Springer"
                        value={latexForm.journal_template}
                        onChange={(e) => setLatexForm((f) => ({ ...f, journal_template: e.target.value }))} />
                    </div>
                    <div className="col-12">
                      <label className="form-label-royal">Special Instructions</label>
                      <textarea className="form-control form-control-royal" rows={2}
                        value={latexForm.special_instructions}
                        onChange={(e) => setLatexForm((f) => ({ ...f, special_instructions: e.target.value }))} />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn-gold" onClick={saveLatex} disabled={isSavingLatex}>
                      {isSavingLatex ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Saving…</> : <><i className="fa-solid fa-floppy-disk me-2"></i>Save Changes</>}
                    </button>
                    <button className="btn-outline-gold" onClick={() => setEditingLatex(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="row g-2" style={{ fontSize: "0.88rem" }}>
                  {[
                    ["Conversion Type", latexDetails.conversion_type?.replace(/_/g, " ")],
                    ["Estimated Pages", latexDetails.estimated_pages],
                    ["Journal Template", latexDetails.journal_template || "—"],
                    ["Bibliography Style", latexDetails.bibliography_style],
                    ["Figures / Tables", latexDetails.figures_tables_count ?? "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="col-6 col-md-4">
                      <div className="text-royal-muted">{label}</div>
                      <div style={{ color: "var(--color-text-primary)", textTransform: "capitalize" }}>{value}</div>
                    </div>
                  ))}
                  {latexDetails.special_instructions && (
                    <div className="col-12 mt-2">
                      <div className="text-royal-muted">Special Instructions</div>
                      <div style={{ color: "var(--color-text-primary)" }}>{latexDetails.special_instructions}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Data Analysis Details */}
          {dataAnalysisDetails && (
            <div className="card-royal p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="text-gold mb-0">
                  <i className="fa-solid fa-chart-bar me-2"></i>Data Analysis Details
                </h6>
                {order.is_editable_by_client && !editingDA && (
                  <button className="btn-outline-gold" style={{ fontSize: "0.78rem", padding: "0.3rem 0.9rem" }}
                    onClick={startEditDA}>
                    <i className="fa-solid fa-pen me-1"></i>Edit Details
                  </button>
                )}
              </div>

              {updateError && editingDA && (
                <div className="alert-royal-error mb-3" style={{ fontSize: "0.83rem" }}>{updateError}</div>
              )}

              {editingDA ? (
                <div style={{ fontSize: "0.88rem" }}>
                  <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label-royal">Data Type</label>
                      <select className="form-select form-select-royal" value={daForm.data_type}
                        onChange={(e) => setDaForm((f) => ({ ...f, data_type: e.target.value }))}>
                        <option value="excel">Excel</option>
                        <option value="csv">CSV</option>
                        <option value="sql">SQL</option>
                        <option value="spss">SPSS</option>
                        <option value="stata">Stata</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label-royal">Charts Required?</label>
                      <select className="form-select form-select-royal" value={daForm.charts_required}
                        onChange={(e) => setDaForm((f) => ({ ...f, charts_required: e.target.value }))}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label-royal">Report Format</label>
                      <select className="form-select form-select-royal" value={daForm.report_format}
                        onChange={(e) => setDaForm((f) => ({ ...f, report_format: e.target.value }))}>
                        <option value="pdf">PDF</option>
                        <option value="docx">Word (DOCX)</option>
                        <option value="latex">LaTeX</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label-royal">Analysis Objective</label>
                      <textarea className="form-control form-control-royal" rows={3}
                        value={daForm.analysis_objective}
                        onChange={(e) => setDaForm((f) => ({ ...f, analysis_objective: e.target.value }))} />
                    </div>
                    <div className="col-12">
                      <label className="form-label-royal">Additional Notes</label>
                      <textarea className="form-control form-control-royal" rows={2}
                        value={daForm.additional_notes}
                        onChange={(e) => setDaForm((f) => ({ ...f, additional_notes: e.target.value }))} />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn-gold" onClick={saveDA} disabled={isSavingDA}>
                      {isSavingDA ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Saving…</> : <><i className="fa-solid fa-floppy-disk me-2"></i>Save Changes</>}
                    </button>
                    <button className="btn-outline-gold" onClick={() => setEditingDA(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="row g-2" style={{ fontSize: "0.88rem" }}>
                  {[
                    ["Data Type", dataAnalysisDetails.data_type],
                    ["Charts Required", dataAnalysisDetails.charts_required],
                    ["Report Format", dataAnalysisDetails.report_format],
                  ].map(([label, value]) => (
                    <div key={label} className="col-6 col-md-4">
                      <div className="text-royal-muted">{label}</div>
                      <div style={{ color: "var(--color-text-primary)", textTransform: "capitalize" }}>{value}</div>
                    </div>
                  ))}
                  {dataAnalysisDetails.analysis_objective && (
                    <div className="col-12 mt-2">
                      <div className="text-royal-muted">Analysis Objective</div>
                      <div style={{ color: "var(--color-text-primary)" }}>{dataAnalysisDetails.analysis_objective}</div>
                    </div>
                  )}
                  {dataAnalysisDetails.additional_notes && (
                    <div className="col-12 mt-2">
                      <div className="text-royal-muted">Additional Notes</div>
                      <div style={{ color: "var(--color-text-primary)" }}>{dataAnalysisDetails.additional_notes}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
