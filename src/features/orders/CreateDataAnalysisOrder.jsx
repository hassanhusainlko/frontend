import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateOrderMutation,
  useUploadOrderFileMutation,
} from "./ordersApi";
import { useCreateDataAnalysisDetailsMutation } from "./dataAnalysisApi";
import "../../styles/variables.css";

const STEPS = ["Order Setup", "Analysis Details", "Upload File"];

function StepIndicator({ current }) {
  return (
    <div
      className="d-flex align-items-center mb-4"
      style={{ maxWidth: 420, margin: "1rem auto 1.5rem" }}
    >
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={stepNum} className="d-flex align-items-center flex-grow-1">
            <div style={{ textAlign: "center", minWidth: 80 }}>
              <div
                className={`wizard-step-dot ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                style={{ margin: "0 auto 0.3rem" }}
              >
                {isDone ? (
                  <i
                    className="fa-solid fa-check"
                    style={{ fontSize: "0.7rem" }}
                  ></i>
                ) : (
                  stepNum
                )}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: isActive
                    ? "var(--color-gold)"
                    : "var(--color-text-muted)",
                }}
              >
                {label}
              </div>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`wizard-step-line ${isDone ? "done" : ""}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CreateDataAnalysisOrder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState("");

  const [priority, setPriority] = useState("standard");
  const [step2, setStep2] = useState({
    data_type: "",
    analysis_objective: "",
    charts_required: "yes",
    report_format: "pdf",
    additional_notes: "",
  });
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("client_main_file");

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [createDataAnalysisDetails, { isLoading: isAddingDetails }] =
    useCreateDataAnalysisDetailsMutation();
  const [uploadOrderFile, { isLoading: isUploading }] =
    useUploadOrderFileMutation();

  const inputClass = "form-control form-control-royal";
  const selectClass = "form-select form-select-royal";

  const submitStep1 = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await createOrder({
        service_category: "data_analysis",
        priority,
      }).unwrap();
      setOrderId(result.id);
      setStep(2);
    } catch (err) {
      setError(
        err?.data?.detail || err?.data?.message || "Failed to create order.",
      );
    }
  };

  const submitStep2 = async (e) => {
    e.preventDefault();
    setError("");
    if (!step2.data_type) {
      setError("Data type is required.");
      return;
    }
    if (!step2.analysis_objective.trim()) {
      setError("Analysis objective is required.");
      return;
    }
    try {
      await createDataAnalysisDetails({
        order: orderId,
        data_type: step2.data_type,
        analysis_objective: step2.analysis_objective,
        charts_required: step2.charts_required,
        report_format: step2.report_format,
        additional_notes: step2.additional_notes,
      }).unwrap();
      setStep(3);
    } catch (err) {
      setError(
        err?.data?.detail ||
          err?.data?.message ||
          "Failed to save analysis details.",
      );
    }
  };

  const submitStep3 = async (e) => {
    e.preventDefault();
    setError("");
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    try {
      await uploadOrderFile({ orderId, file, file_type: fileType }).unwrap();
      navigate(`/dashboard/orders/${orderId}`);
    } catch (err) {
      setError(
        err?.data?.detail || err?.data?.message || "File upload failed.",
      );
    }
  };

  return (
    <div style={{ padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2
          className="section-heading-gold mb-4"
          style={{ textAlign: "center" }}
        >
          <i className="fa-solid fa-chart-line me-2"></i>Place Data Analysis
          Order
        </h2>

        <div className="card-royal p-4">
          <StepIndicator current={step} />
          {error && <div className="alert-royal-error mb-3">{error}</div>}

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={submitStep1}>
              <div className="mb-4">
                <label className="form-label-royal">Priority</label>
                <div className="d-flex gap-3">
                  {["standard", "urgent"].map((p) => (
                    <label
                      key={p}
                      style={{
                        flex: 1,
                        padding: "0.9rem",
                        borderRadius: "var(--radius-md)",
                        border: `2px solid ${priority === p ? "var(--color-gold)" : "var(--color-border)"}`,
                        background:
                          priority === p
                            ? "rgba(201,168,76,0.08)"
                            : "var(--color-bg-input)",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all var(--transition-fast)",
                        color:
                          priority === p
                            ? "var(--color-gold)"
                            : "var(--color-text-muted)",
                      }}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={p}
                        checked={priority === p}
                        onChange={(e) => setPriority(e.target.value)}
                        style={{ display: "none" }}
                      />
                      <div>
                        <i
                          className={`fa-solid ${p === "urgent" ? "fa-bolt" : "fa-clock"} me-2`}
                        ></i>
                        <span className="text-capitalize fw-semibold">{p}</span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          marginTop: 4,
                          opacity: 0.8,
                        }}
                      >
                        {p === "urgent"
                          ? "Faster delivery"
                          : "Standard turnaround"}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-gold" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Creating…
                  </>
                ) : (
                  <>
                    Next <i className="fa-solid fa-arrow-right ms-2"></i>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={submitStep2}>
              <div className="mb-3">
                <label className="form-label-royal">Data Type</label>
                <select
                  className={selectClass}
                  value={step2.data_type}
                  onChange={(e) =>
                    setStep2((s) => ({ ...s, data_type: e.target.value }))
                  }
                >
                  <option value="">Select data type</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="sql">SQL</option>
                  <option value="spss">SPSS</option>
                  <option value="stata">Stata</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label-royal">Analysis Objective</label>
                <textarea
                  className={inputClass}
                  rows={3}
                  placeholder="e.g. Find monthly sales trends and forecast next quarter"
                  value={step2.analysis_objective}
                  onChange={(e) =>
                    setStep2((s) => ({
                      ...s,
                      analysis_objective: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label className="form-label-royal">Charts Required?</label>
                  <select
                    className={selectClass}
                    value={step2.charts_required}
                    onChange={(e) =>
                      setStep2((s) => ({
                        ...s,
                        charts_required: e.target.value,
                      }))
                    }
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <label className="form-label-royal">Report Format</label>
                  <select
                    className={selectClass}
                    value={step2.report_format}
                    onChange={(e) =>
                      setStep2((s) => ({ ...s, report_format: e.target.value }))
                    }
                  >
                    <option value="pdf">PDF</option>
                    <option value="docx">Word (DOCX)</option>
                    <option value="latex">LaTeX</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label-royal">Additional Notes</label>
                <textarea
                  className={inputClass}
                  rows={2}
                  placeholder="e.g. Include regression and ANOVA"
                  value={step2.additional_notes}
                  onChange={(e) =>
                    setStep2((s) => ({
                      ...s,
                      additional_notes: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn-gold"
                disabled={isAddingDetails}
              >
                {isAddingDetails ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Saving…
                  </>
                ) : (
                  <>
                    Next <i className="fa-solid fa-arrow-right ms-2"></i>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={submitStep3}>
              <div className="alert-royal-success mb-4">
                <i className="fa-solid fa-check me-2"></i>Order #{orderId}{" "}
                created. Upload your data file.
              </div>
              <div className="mb-3">
                <label className="form-label-royal">File Type</label>
                <select
                  className={selectClass}
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                >
                  <option value="client_main_file">Main Data File</option>
                  <option value="client_supporting_file">
                    Supporting Document
                  </option>
                  <option value="client_figure">Figure / Chart</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label-royal">Select File</label>
                <input
                  type="file"
                  className={inputClass}
                  accept=".xlsx,.xls,.csv,.sav,.dta,.pdf,.docx"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div
                  className="text-royal-muted mt-1"
                  style={{ fontSize: "0.78rem" }}
                >
                  Accepted: XLSX, CSV, SAV, DTA, PDF, DOCX
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn-gold"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Uploading…
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-upload me-2"></i>Upload &amp;
                      Finish
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn-outline-gold"
                  onClick={() => navigate(`/dashboard/orders/${orderId}`)}
                >
                  Skip Upload
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
