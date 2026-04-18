import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRequestQuoteMutation,
  useUploadQuoteFileMutation,
  useAcceptQuoteMutation,
} from "./quoteApi";
import "../../styles/variables.css";

const STEPS = ["Service Info", "Details", "Upload & Accept"];

function StepIndicator({ current }) {
  return (
    <div className="d-flex align-items-center mb-4" style={{ maxWidth: 420, margin: "0 auto 1.5rem" }}>
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
                {isDone ? <i className="fa-solid fa-check" style={{ fontSize: "0.7rem" }}></i> : stepNum}
              </div>
              <div style={{ fontSize: "0.72rem", color: isActive ? "var(--color-gold)" : "var(--color-text-muted)" }}>
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

export default function QuoteRequest() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [quoteId, setQuoteId] = useState(null);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [step1, setStep1] = useState({
    name: "", email: "", service_category: "", description: "",
  });
  const [step2, setStep2] = useState({});
  const [file, setFile] = useState(null);

  const [requestQuote, { isLoading: isRequesting }] = useRequestQuoteMutation();
  const [uploadQuoteFile, { isLoading: isUploading }] = useUploadQuoteFileMutation();
  const [acceptQuote, { isLoading: isAccepting }] = useAcceptQuoteMutation();

  const handleStep1Change = (e) =>
    setStep1((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleStep2Change = (e) =>
    setStep2((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submitStep1 = (e) => {
    e.preventDefault();
    setError("");
    if (!step1.name.trim() || !step1.email.trim() || !step1.service_category) {
      setError("Name, email and service category are required.");
      return;
    }
    setStep(2);
  };

  const submitStep2 = async (e) => {
    e.preventDefault();
    setError("");

    const isLatex = step1.service_category === "latex";
    if (isLatex && !step2.conversion_type) {
      setError("Conversion type is required.");
      return;
    }
    if (!isLatex && !step2.analysis_objective) {
      setError("Analysis objective is required.");
      return;
    }

    try {
      const payload = {
        name: step1.name,
        email: step1.email,
        service_category: step1.service_category,
        description: step1.description,
        service_details: { ...step2 },
      };
      const result = await requestQuote(payload).unwrap();
      setQuoteId(result.quote_id);
      setStep(3);
    } catch (err) {
      setError(err?.data?.detail || err?.data?.message || "Failed to submit quote request.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please select a file to upload."); return; }
    setError("");
    try {
      await uploadQuoteFile({ quoteId, file }).unwrap();
      setUploadSuccess(true);
    } catch (err) {
      setError(err?.data?.detail || err?.data?.message || "File upload failed.");
    }
  };

  const handleAccept = async () => {
    setError("");
    try {
      const result = await acceptQuote(quoteId).unwrap();
      navigate(`/dashboard/orders/${result.order_id}`);
    } catch (err) {
      setError(err?.data?.detail || err?.data?.message || "Could not accept quote. Admin may not have reviewed it yet.");
    }
  };

  const inputClass = "form-control form-control-royal";
  const selectClass = "form-select form-select-royal";

  return (
    <div style={{ padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <h2 className="section-heading-gold mb-4" style={{ textAlign: "center" }}>
        <i className="fa-solid fa-file-invoice me-2"></i>Request a Quote
      </h2>

      <div className="card-royal p-4">
        <StepIndicator current={step} />

        {error && <div className="alert-royal-error mb-3">{error}</div>}

        {/* ─── STEP 1 ─── */}
        {step === 1 && (
          <form onSubmit={submitStep1}>
            <div className="mb-3">
              <label className="form-label-royal">Your Name</label>
              <input name="name" type="text" className={inputClass}
                placeholder="John Doe" value={step1.name} onChange={handleStep1Change} />
            </div>
            <div className="mb-3">
              <label className="form-label-royal">Email Address</label>
              <input name="email" type="email" className={inputClass}
                placeholder="john@example.com" value={step1.email} onChange={handleStep1Change} />
            </div>
            <div className="mb-3">
              <label className="form-label-royal">Service Category</label>
              <select name="service_category" className={selectClass}
                value={step1.service_category} onChange={handleStep1Change}>
                <option value="">Select a service</option>
                <option value="latex">LaTeX Services</option>
                <option value="data_analysis">Data Analysis</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label-royal">
                Description <span style={{ color: "var(--color-text-muted)" }}>(optional)</span>
              </label>
              <textarea name="description" className={inputClass} rows={3}
                placeholder="Brief notes about your work…"
                value={step1.description} onChange={handleStep1Change}></textarea>
            </div>
            <button type="submit" className="btn-gold">
              Next <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </form>
        )}

        {/* ─── STEP 2 — LaTeX ─── */}
        {step === 2 && step1.service_category === "latex" && (
          <form onSubmit={submitStep2}>
            <div className="mb-3">
              <label className="form-label-royal">Conversion Type</label>
              <select name="conversion_type" className={selectClass}
                value={step2.conversion_type || ""} onChange={handleStep2Change}>
                <option value="">Select conversion type</option>
                <option value="word_to_latex">Word to LaTeX</option>
                <option value="pdf_to_latex">PDF to LaTeX</option>
                <option value="editable_pdf_to_latex">Editable PDF to LaTeX</option>
                <option value="latex_editing">LaTeX Editing</option>
              </select>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label className="form-label-royal">Estimated Pages</label>
                <input name="estimated_pages" type="number" min="1" className={inputClass}
                  placeholder="e.g. 15" value={step2.estimated_pages || ""} onChange={handleStep2Change} />
              </div>
              <div className="col-sm-6">
                <label className="form-label-royal">Figures / Tables Count</label>
                <input name="figures_tables_count" type="number" min="0" className={inputClass}
                  placeholder="e.g. 5" value={step2.figures_tables_count || ""} onChange={handleStep2Change} />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label className="form-label-royal">Journal Template</label>
                <input name="journal_template" type="text" className={inputClass}
                  placeholder="e.g. IEEE, Elsevier" value={step2.journal_template || ""} onChange={handleStep2Change} />
              </div>
              <div className="col-sm-6">
                <label className="form-label-royal">Bibliography Style</label>
                <select name="bibliography_style" className={selectClass}
                  value={step2.bibliography_style || ""} onChange={handleStep2Change}>
                  <option value="">Select style</option>
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
              <textarea name="special_instructions" className={inputClass} rows={2}
                placeholder="Double-column format, specific font, etc."
                value={step2.special_instructions || ""} onChange={handleStep2Change}></textarea>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn-outline-gold" onClick={() => setStep(1)}>
                <i className="fa-solid fa-arrow-left me-2"></i>Back
              </button>
              <button type="submit" className="btn-gold" disabled={isRequesting}>
                {isRequesting ? (
                  <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Submitting…</>
                ) : (
                  <>Submit Request <i className="fa-solid fa-paper-plane ms-2"></i></>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ─── STEP 2 — Data Analysis ─── */}
        {step === 2 && step1.service_category === "data_analysis" && (
          <form onSubmit={submitStep2}>
            <div className="mb-3">
              <label className="form-label-royal">Data Type</label>
              <select name="data_type" className={selectClass}
                value={step2.data_type || ""} onChange={handleStep2Change}>
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
              <textarea name="analysis_objective" className={inputClass} rows={3}
                placeholder="e.g. Find monthly sales trends and forecast next quarter"
                value={step2.analysis_objective || ""} onChange={handleStep2Change}></textarea>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label className="form-label-royal">Charts Required?</label>
                <select name="charts_required" className={selectClass}
                  value={step2.charts_required || ""} onChange={handleStep2Change}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label-royal">Report Format</label>
                <select name="report_format" className={selectClass}
                  value={step2.report_format || ""} onChange={handleStep2Change}>
                  <option value="">Select format</option>
                  <option value="pdf">PDF</option>
                  <option value="docx">Word (DOCX)</option>
                  <option value="latex">LaTeX</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label-royal">Additional Notes</label>
              <textarea name="additional_notes" className={inputClass} rows={2}
                placeholder="e.g. Include regression and ANOVA"
                value={step2.additional_notes || ""} onChange={handleStep2Change}></textarea>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn-outline-gold" onClick={() => setStep(1)}>
                <i className="fa-solid fa-arrow-left me-2"></i>Back
              </button>
              <button type="submit" className="btn-gold" disabled={isRequesting}>
                {isRequesting ? (
                  <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Submitting…</>
                ) : (
                  <>Submit Request <i className="fa-solid fa-paper-plane ms-2"></i></>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ─── STEP 3 ─── */}
        {step === 3 && (
          <div>
            <div className="alert-royal-success mb-4">
              <i className="fa-solid fa-check-circle me-2"></i>
              Quote request submitted! Quote ID: <strong>#{quoteId}</strong>
            </div>

            {/* File upload */}
            <div className="mb-4">
              <h6 style={{ color: "var(--color-text-primary)", marginBottom: "0.75rem" }}>
                <i className="fa-solid fa-paperclip me-2" style={{ color: "var(--color-gold)" }}></i>
                Upload Your Document
              </h6>
              <form onSubmit={handleUpload}>
                <div className="mb-3">
                  <label className="form-label-royal">Select File</label>
                  <input
                    type="file"
                    className="form-control form-control-royal"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept=".pdf,.doc,.docx,.tex,.xlsx,.csv"
                  />
                  <div className="text-royal-muted mt-1" style={{ fontSize: "0.78rem" }}>
                    Accepted: PDF, DOC, DOCX, TEX, XLSX, CSV
                  </div>
                </div>
                {uploadSuccess ? (
                  <div className="alert-royal-success mb-3">
                    <i className="fa-solid fa-check me-2"></i>File uploaded successfully!
                  </div>
                ) : (
                  <button type="submit" className="btn-outline-gold mb-3" disabled={isUploading}>
                    {isUploading ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Uploading…</>
                    ) : (
                      <><i className="fa-solid fa-upload me-2"></i>Upload File</>
                    )}
                  </button>
                )}
              </form>
            </div>

            <hr style={{ borderColor: "var(--color-border)" }} />

            <div className="mt-3">
              <p className="text-royal-muted mb-3" style={{ fontSize: "0.88rem" }}>
                Once the admin reviews your files and sets a price, you can accept the quote to create an order. If the quote is already priced, click below to accept.
              </p>
              <button className="btn-gold" onClick={handleAccept} disabled={isAccepting}>
                {isAccepting ? (
                  <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Accepting…</>
                ) : (
                  <><i className="fa-solid fa-circle-check me-2"></i>Accept Quote & Create Order</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
