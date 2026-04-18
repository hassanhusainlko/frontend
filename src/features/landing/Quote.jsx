import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import "../../styles/variables.css";

export default function Quote() {
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState({ documentType: "", serviceType: "", pages: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pages = Number(form.pages);
    if (!form.documentType || !form.serviceType || !pages) return;

    const multiplier = form.serviceType === "Urgent" ? 10 : 5;
    const daysMultiplier = form.serviceType === "Urgent" ? 2 : 4;
    setResult({ price: pages * multiplier, days: pages * daysMultiplier });
  };

  const selectClass = "form-select form-select-royal";
  const inputClass = "form-control form-control-royal";

  return (
    <section id="quote" className="section-royal">
      <div className="container">
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
            <div style={{ flex: 1, height: 1, background: "var(--color-border)" }}></div>
            <h2 className="section-heading-gold mb-0">Instant Quote Estimate</h2>
            <div style={{ flex: 1, height: 1, background: "var(--color-border)" }}></div>
          </div>
          <p className="text-royal-muted">
            Get a quick price estimate. For an exact quote, use our full quote request form.
          </p>
        </div>

        <div className="card-royal p-4 p-md-5" style={{ maxWidth: 860, margin: "0 auto" }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label-royal">Document Type</label>
                <select name="documentType" className={selectClass} value={form.documentType} onChange={handleChange}>
                  <option value="">Select type</option>
                  <option>Research Paper</option>
                  <option>Thesis</option>
                  <option>Dissertation</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label-royal">Service Type</label>
                <select name="serviceType" className={selectClass} value={form.serviceType} onChange={handleChange}>
                  <option value="">Select priority</option>
                  <option>Regular</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label-royal">Number of Pages</label>
                <input type="number" name="pages" min="1" className={inputClass}
                  placeholder="e.g. 15" value={form.pages} onChange={handleChange} />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <button type="submit" className="btn-gold w-100">
                  <i className="fa-solid fa-calculator me-2"></i>Calculate
                </button>
              </div>
            </div>
          </form>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-4 p-4"
              style={{
                background: "var(--gradient-royal)",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="row g-3 align-items-center">
                <div className="col-12 col-md-8">
                  <div className="d-flex gap-4 flex-wrap">
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem" }}>Document Type</div>
                      <div style={{ color: "#FFFFFF", fontWeight: 600 }}>{form.documentType}</div>
                    </div>
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem" }}>Priority</div>
                      <div style={{ color: "#FFFFFF", fontWeight: 600 }}>{form.serviceType}</div>
                    </div>
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem" }}>Est. Price</div>
                      <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1.1rem" }}>₹{result.price}</div>
                    </div>
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem" }}>Delivery</div>
                      <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>{result.days} Business Days</div>
                    </div>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 0, marginTop: "0.5rem", fontSize: "0.78rem" }}>
                    * This is a rough estimate. For exact pricing, use the full quote request.
                  </p>
                </div>
                <div className="col-12 col-md-4 text-md-end">
                  <Link
                    to={token ? "/dashboard/quote-request" : "/register"}
                    style={{
                      textDecoration: "none",
                      display: "inline-block",
                      background: "#FFFFFF",
                      color: "var(--color-crimson)",
                      fontWeight: 700,
                      padding: "0.6rem 1.6rem",
                      borderRadius: "var(--radius-pill)",
                      fontSize: "0.9rem",
                      transition: "box-shadow var(--transition-fast)",
                    }}
                  >
                    <i className="fa-solid fa-arrow-right me-2"></i>
                    {token ? "Request Full Quote" : "Get Started"}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
