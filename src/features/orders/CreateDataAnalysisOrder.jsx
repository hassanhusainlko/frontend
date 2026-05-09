import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "./ordersApi";
import { useCreateDataAnalysisDetailsMutation } from "./dataAnalysisApi";
import "../../styles/variables.css";

const STEPS = ["Order Details", "Upload Files"];

const FILE_TYPES = [
  { value: "client_main_file", label: "Main Data File" },
  { value: "client_supporting_file", label: "Supporting Document" },
  { value: "client_figure", label: "Figure / Chart" },
];

function StepIndicator({ current }) {
  return (
    <div className="d-flex align-items-center mb-4" style={{ maxWidth: 340, margin: "0 auto 1.75rem" }}>
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={stepNum} className="d-flex align-items-center flex-grow-1">
            <div style={{ textAlign: "center", minWidth: 80 }}>
              <div className={`wizard-step-dot ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                style={{ margin: "0 auto 0.3rem" }}>
                {isDone ? <i className="fa-solid fa-check" style={{ fontSize: "0.7rem" }}></i> : stepNum}
              </div>
              <div style={{ fontSize: "0.72rem", color: isActive ? "var(--color-primary)" : "var(--color-text-muted)" }}>
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
  const token = useSelector((state) => state.auth.token);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [priority, setPriority] = useState("standard");
  const [details, setDetails] = useState({
    analysis_for: "",
    title: "",
    data_type: "",
    analysis_objective: "",
    charts_required: "yes",
    report_format: "pdf",
    additional_notes: "",
    introduction: false,
    review_of_literature: false,
    managing_references: false,
  });

  const [files, setFiles] = useState([
    { id: 1, file: null, fileType: "client_main_file", progress: 0, status: "idle" },
  ]);

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [createDataAnalysisDetails, { isLoading: isAddingDetails }] = useCreateDataAnalysisDetailsMutation();

  const inputClass = "form-control form-control-royal";
  const selectClass = "form-select form-select-royal";

  const handleNextStep1 = (e) => {
    e.preventDefault();
    setError("");
    if (!details.analysis_for) { setError("Please select what this analysis is for."); return; }
    if (!details.data_type) { setError("Data type is required."); return; }
    if (!details.analysis_objective.trim()) { setError("Analysis objective is required."); return; }
    setStep(2);
  };

  const addFileRow = () => {
    setFiles((prev) => [
      ...prev,
      { id: Date.now(), file: null, fileType: "client_main_file", progress: 0, status: "idle" },
    ]);
  };

  const removeFileRow = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  function uploadFileXHR(orderId, entry, idx) {
    return new Promise((resolve, reject) => {
      const fd = new FormData();
      fd.append("file", entry.file);
      fd.append("file_type", entry.fileType);
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable)
          setFiles((prev) => prev.map((f, i) =>
            i === idx ? { ...f, progress: Math.round(e.loaded / e.total * 100) } : f
          ));
      };
      xhr.onload = () => {
        if (xhr.status < 300) {
          setFiles((prev) => prev.map((f, i) => i === idx ? { ...f, status: "done" } : f));
          resolve();
        } else {
          reject(new Error(xhr.responseText || "Upload failed"));
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.open("POST", `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/orders/orders/${orderId}/upload-file/`);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(fd);
    });
  }

  const submitFinal = async (e) => {
    e.preventDefault();
    setError("");
    const toUpload = files.filter((f) => f.file);
    let newOrderId = null;
    let readyToUpload = false;
    try {
      const result = await createOrder({ service_category: "data_analysis", priority }).unwrap();
      newOrderId = result.id;
      await createDataAnalysisDetails({ order: newOrderId, ...details }).unwrap();
      readyToUpload = true;
      for (let i = 0; i < toUpload.length; i++) {
        const realIdx = files.indexOf(toUpload[i]);
        setFiles((prev) => prev.map((f, j) => j === realIdx ? { ...f, status: "uploading" } : f));
        await uploadFileXHR(newOrderId, toUpload[i], realIdx);
      }
      navigate(`/dashboard/orders/${newOrderId}`);
    } catch (err) {
      if (readyToUpload && newOrderId) {
        navigate(`/dashboard/orders/${newOrderId}`);
      } else {
        setError(err?.data?.detail || err?.data?.message || err?.message || "Submission failed.");
      }
    }
  };

  const skipUpload = async () => {
    setError("");
    try {
      const { id: newOrderId } = await createOrder({
        service_category: "data_analysis", priority,
      }).unwrap();
      await createDataAnalysisDetails({ order: newOrderId, ...details }).unwrap();
      navigate(`/dashboard/orders/${newOrderId}`);
    } catch (err) {
      setError(err?.data?.detail || err?.data?.message || "Submission failed.");
    }
  };

  const isSubmitting = isCreating || isAddingDetails;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-page)", paddingTop: "calc(var(--navbar-height) + 2rem)", paddingBottom: "3rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1rem" }}>
        <h2 className="section-heading-gold mb-4" style={{ textAlign: "center" }}>
          <i className="fa-solid fa-chart-line me-2"></i>Place Data Analysis Order
        </h2>

        <div className="card-royal p-4">
          <StepIndicator current={step} />
          {error && <div className="alert-royal-error mb-3">{error}</div>}

          {/* ── STEP 1: Order Details ── */}
          {step === 1 && (
            <form onSubmit={handleNextStep1}>
              {/* Priority */}
              <div className="mb-4">
                <label className="form-label-royal">Priority</label>
                <div className="d-flex gap-3">
                  {["standard", "urgent"].map((p) => (
                    <label key={p} style={{
                      flex: 1, padding: "0.9rem", borderRadius: "var(--radius-md)",
                      border: `2px solid ${priority === p ? "var(--color-crimson)" : "var(--color-border)"}`,
                      background: priority === p ? "rgba(124,58,237,0.06)" : "var(--color-bg-input)",
                      cursor: "pointer", textAlign: "center", transition: "all var(--transition-fast)",
                      color: priority === p ? "var(--color-crimson)" : "var(--color-text-muted)",
                    }}>
                      <input type="radio" name="priority" value={p} checked={priority === p}
                        onChange={(e) => setPriority(e.target.value)} style={{ display: "none" }} />
                      <div>
                        <i className={`fa-solid ${p === "urgent" ? "fa-bolt" : "fa-clock"} me-2`}></i>
                        <span className="text-capitalize fw-semibold">{p}</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", marginTop: 4, opacity: 0.8 }}>
                        {p === "urgent" ? "Faster delivery" : "Standard turnaround"}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <hr style={{ borderColor: "var(--color-border)", margin: "1.25rem 0" }} />

              {/* Analysis details */}
              <div className="mb-3">
                <label className="form-label-royal">Analysis For</label>
                <select className={selectClass} value={details.analysis_for}
                  onChange={(e) => setDetails((s) => ({ ...s, analysis_for: e.target.value }))}>
                  <option value="">Select purpose</option>
                  <option value="research_article">Research Article</option>
                  <option value="pg_dissertation">PG Dissertation</option>
                  <option value="phd_thesis">PhD Thesis</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label-royal">
                  Title <span className="text-royal-muted">(optional)</span>
                </label>
                <input type="text" className={inputClass}
                  placeholder="e.g. Impact of climate change on crop yield"
                  value={details.title}
                  onChange={(e) => setDetails((s) => ({ ...s, title: e.target.value }))} />
              </div>
              <div className="mb-3">
                <label className="form-label-royal">Data Type</label>
                <select className={selectClass} value={details.data_type}
                  onChange={(e) => setDetails((s) => ({ ...s, data_type: e.target.value }))}>
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
                <textarea className={inputClass} rows={3}
                  placeholder="e.g. Find monthly sales trends and forecast next quarter"
                  value={details.analysis_objective}
                  onChange={(e) => setDetails((s) => ({ ...s, analysis_objective: e.target.value }))}></textarea>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label className="form-label-royal">Charts Required?</label>
                  <select className={selectClass} value={details.charts_required}
                    onChange={(e) => setDetails((s) => ({ ...s, charts_required: e.target.value }))}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <label className="form-label-royal">Report Format</label>
                  <select className={selectClass} value={details.report_format}
                    onChange={(e) => setDetails((s) => ({ ...s, report_format: e.target.value }))}>
                    <option value="pdf">PDF</option>
                    <option value="docx">Word (DOCX)</option>
                    <option value="latex">LaTeX</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label-royal d-block mb-2">Chapters Required</label>
                <div className="d-flex flex-column gap-2">
                  {[
                    { key: "introduction", label: "Introduction" },
                    { key: "review_of_literature", label: "Review of Literature" },
                    { key: "managing_references", label: "Managing References" },
                  ].map(({ key, label }) => (
                    <label key={key} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                      <input type="checkbox" checked={details[key]}
                        onChange={(e) => setDetails((s) => ({ ...s, [key]: e.target.checked }))}
                        style={{ accentColor: "var(--color-crimson)", width: 16, height: 16 }} />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label-royal">Additional Notes</label>
                <textarea className={inputClass} rows={2}
                  placeholder="e.g. Include regression and ANOVA"
                  value={details.additional_notes}
                  onChange={(e) => setDetails((s) => ({ ...s, additional_notes: e.target.value }))}></textarea>
              </div>

              <button type="submit" className="btn-gold">
                Next <i className="fa-solid fa-arrow-right ms-2"></i>
              </button>
            </form>
          )}

          {/* ── STEP 2: Upload Files ── */}
          {step === 2 && (
            <form onSubmit={submitFinal}>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
                Attach your data files. You can upload multiple files or skip this step.
              </p>

              <div className="d-flex flex-column gap-3 mb-3">
                {files.map((entry, idx) => (
                  <div key={entry.id}>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                      <input
                        type="file"
                        className={inputClass}
                        style={{ flex: 2, minWidth: 180 }}
                        accept=".xlsx,.xls,.csv,.sav,.dta,.pdf,.docx"
                        onChange={(e) => setFiles((prev) => prev.map((f, i) =>
                          i === idx ? { ...f, file: e.target.files[0], status: "idle", progress: 0 } : f
                        ))}
                      />
                      <select
                        className={selectClass}
                        style={{ flex: 1, minWidth: 140 }}
                        value={entry.fileType}
                        onChange={(e) => setFiles((prev) => prev.map((f, i) =>
                          i === idx ? { ...f, fileType: e.target.value } : f
                        ))}
                      >
                        {FILE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                      {files.length > 1 && (
                        <button type="button" onClick={() => removeFileRow(entry.id)}
                          style={{ background: "none", border: "none", color: "var(--color-crimson)", cursor: "pointer", padding: "0 6px", fontSize: "1rem" }}
                          aria-label="Remove file">
                          <i className="fa-solid fa-times"></i>
                        </button>
                      )}
                    </div>
                    {entry.status !== "idle" && (
                      <div style={{ marginTop: 6 }}>
                        <div style={{ height: 4, background: "var(--color-border)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{
                            height: "100%", width: `${entry.progress}%`,
                            background: entry.status === "done" ? "var(--color-success)" : "var(--color-crimson)",
                            borderRadius: 2, transition: "width 0.2s ease",
                          }}></div>
                        </div>
                        <span style={{ fontSize: "0.72rem", color: entry.status === "done" ? "var(--color-success)" : "var(--color-text-muted)" }}>
                          {entry.status === "done" ? "Uploaded ✓" : entry.status === "uploading" ? `${entry.progress}%` : ""}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button type="button" onClick={addFileRow}
                style={{
                  background: "none", border: "1px dashed var(--color-border)",
                  borderRadius: "var(--radius-md)", color: "var(--color-text-muted)",
                  padding: "0.45rem 1rem", fontSize: "0.85rem", cursor: "pointer",
                  width: "100%", marginBottom: "1.5rem",
                  transition: "border-color var(--transition-fast), color var(--transition-fast)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-crimson)"; e.currentTarget.style.color = "var(--color-crimson)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
              >
                <i className="fa-solid fa-plus me-2"></i>Add Another File
              </button>

              <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                Accepted: XLSX, CSV, SAV (SPSS), DTA (Stata), PDF, DOCX
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <button type="button" className="btn-outline-gold"
                  onClick={() => { setError(""); setStep(1); }}>
                  <i className="fa-solid fa-arrow-left me-2"></i>Back
                </button>
                <button type="submit" className="btn-gold" disabled={isSubmitting}>
                  {isSubmitting
                    ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Submitting…</>
                    : <><i className="fa-solid fa-paper-plane me-2"></i>Submit Order</>}
                </button>
                <button type="button" className="btn-outline-gold"
                  onClick={skipUpload} disabled={isSubmitting}>
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
