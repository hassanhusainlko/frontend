import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "./ordersApi";
import { useCreateLatexDetailsMutation } from "./latexOrdersApi";
import "../../styles/variables.css";

const STEPS = ["Order Details", "Upload Files"];

const FILE_TYPES = [
  { value: "client_main_file", label: "Main Document" },
  { value: "client_supporting_file", label: "Supporting File" },
  { value: "client_figure", label: "Figure" },
  { value: "client_template", label: "Template" },
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

export default function CreateLatexOrder() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [priority, setPriority] = useState("standard");
  const [details, setDetails] = useState({
    conversion_type: "",
    estimated_pages: "",
    journal_template: "",
    bibliography_style: "apa",
    figures_tables_count: "",
    special_instructions: "",
  });

  const [files, setFiles] = useState([
    { id: 1, file: null, fileType: "client_main_file", progress: 0, status: "idle" },
  ]);

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [createLatexDetails, { isLoading: isAddingDetails }] = useCreateLatexDetailsMutation();

  const inputClass = "form-control form-control-royal";
  const selectClass = "form-select form-select-royal";

  const handleNextStep1 = (e) => {
    e.preventDefault();
    setError("");
    if (!details.conversion_type) { setError("Conversion type is required."); return; }
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
      const result = await createOrder({ service_category: "latex", priority }).unwrap();
      newOrderId = result.id;
      await createLatexDetails({
        order: newOrderId,
        conversion_type: details.conversion_type,
        estimated_pages: Number(details.estimated_pages) || 1,
        journal_template: details.journal_template,
        bibliography_style: details.bibliography_style,
        figures_tables_count: Number(details.figures_tables_count) || 0,
        special_instructions: details.special_instructions,
      }).unwrap();
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
        service_category: "latex", priority,
      }).unwrap();
      await createLatexDetails({
        order: newOrderId,
        conversion_type: details.conversion_type,
        estimated_pages: Number(details.estimated_pages) || 1,
        journal_template: details.journal_template,
        bibliography_style: details.bibliography_style,
        figures_tables_count: Number(details.figures_tables_count) || 0,
        special_instructions: details.special_instructions,
      }).unwrap();
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
          <i className="fa-solid fa-file-pen me-2"></i>Place LaTeX Order
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

              {/* LaTeX details */}
              <div className="mb-3">
                <label className="form-label-royal">Conversion Type</label>
                <select className={selectClass} value={details.conversion_type}
                  onChange={(e) => setDetails((s) => ({ ...s, conversion_type: e.target.value }))}>
                  <option value="">Select type</option>
                  <option value="word_to_latex">Word → LaTeX</option>
                  <option value="pdf_to_latex">PDF → LaTeX</option>
                  <option value="editable_pdf_to_latex">Editable PDF → LaTeX</option>
                  <option value="latex_editing">LaTeX Editing</option>
                </select>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label className="form-label-royal">Estimated Pages</label>
                  <input type="number" min="1" className={inputClass} placeholder="e.g. 15"
                    value={details.estimated_pages}
                    onChange={(e) => setDetails((s) => ({ ...s, estimated_pages: e.target.value }))} />
                </div>
                <div className="col-sm-6">
                  <label className="form-label-royal">Figures / Tables</label>
                  <input type="number" min="0" className={inputClass} placeholder="e.g. 5"
                    value={details.figures_tables_count}
                    onChange={(e) => setDetails((s) => ({ ...s, figures_tables_count: e.target.value }))} />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label className="form-label-royal">Journal Template</label>
                  <input type="text" className={inputClass} placeholder="e.g. IEEE, Springer"
                    value={details.journal_template}
                    onChange={(e) => setDetails((s) => ({ ...s, journal_template: e.target.value }))} />
                </div>
                <div className="col-sm-6">
                  <label className="form-label-royal">Bibliography Style</label>
                  <select className={selectClass} value={details.bibliography_style}
                    onChange={(e) => setDetails((s) => ({ ...s, bibliography_style: e.target.value }))}>
                    <option value="apa">APA</option>
                    <option value="ieee">IEEE</option>
                    <option value="harvard">Harvard</option>
                    <option value="chicago">Chicago</option>
                    <option value="bibtex">BibTeX</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label-royal">Special Instructions</label>
                <textarea className={inputClass} rows={2} placeholder="Double-column, 10pt font, etc."
                  value={details.special_instructions}
                  onChange={(e) => setDetails((s) => ({ ...s, special_instructions: e.target.value }))}></textarea>
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
                Attach your source documents. You can upload multiple files or skip this step.
              </p>

              <div className="d-flex flex-column gap-3 mb-3">
                {files.map((entry, idx) => (
                  <div key={entry.id}>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                      <input
                        type="file"
                        className={inputClass}
                        style={{ flex: 2, minWidth: 180 }}
                        accept=".pdf,.doc,.docx,.tex,.zip"
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
                Accepted: PDF, DOC, DOCX, TEX, ZIP
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
