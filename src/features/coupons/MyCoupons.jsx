import { useState } from "react";
import { useGetMyCouponsQuery, useValidateCouponMutation } from "./couponsApi";
import "../../styles/variables.css";

function CouponCard({ coupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code || coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const code = typeof coupon === "string" ? coupon : coupon.code || "—";
  const discount = coupon.discount_percent || coupon.discount || null;
  const expiry = coupon.expiry_date || coupon.valid_until || null;
  const isActive = coupon.is_active !== false;

  return (
    <div
      className="card-royal p-4"
      style={{
        border: "1px solid var(--color-border-gold)",
        background: "var(--gradient-card)",
      }}
    >
      {/* Code row */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--color-gold)",
            letterSpacing: "0.08em",
            background: "rgba(201,168,76,0.1)",
            padding: "0.3rem 0.8rem",
            borderRadius: "var(--radius-sm)",
            border: "1px dashed var(--color-gold-dark)",
          }}
        >
          {code}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            color: copied ? "var(--color-gold)" : "var(--color-text-muted)",
            padding: "0.3rem 0.7rem",
            cursor: "pointer",
            fontSize: "0.8rem",
            transition: "color var(--transition-fast)",
          }}
        >
          <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"} me-1`}></i>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Meta */}
      <div className="d-flex gap-3 flex-wrap" style={{ fontSize: "0.82rem" }}>
        {discount && (
          <span style={{ color: "var(--color-gold-light)" }}>
            <i className="fa-solid fa-percent me-1"></i>
            {discount}% off
          </span>
        )}
        {expiry && (
          <span className="text-royal-muted">
            <i className="fa-regular fa-calendar me-1"></i>
            Expires: {new Date(expiry).toLocaleDateString()}
          </span>
        )}
        <span
          style={{
            color: isActive ? "#a7f3d0" : "var(--color-text-muted)",
            fontWeight: 600,
          }}
        >
          <i className={`fa-solid fa-circle me-1`} style={{ fontSize: "0.5rem" }}></i>
          {isActive ? "Active" : "Expired"}
        </span>
      </div>
    </div>
  );
}

export default function MyCoupons() {
  const { data: coupons, isLoading, isError } = useGetMyCouponsQuery();
  const [validateCoupon, { isLoading: isValidating }] = useValidateCouponMutation();

  const [validateForm, setValidateForm] = useState({ code: "", order_amount: "" });
  const [validationResult, setValidationResult] = useState(null);
  const [validationError, setValidationError] = useState("");

  const handleValidate = async (e) => {
    e.preventDefault();
    setValidationResult(null);
    setValidationError("");

    if (!validateForm.code.trim() || !validateForm.order_amount) {
      setValidationError("Please enter a coupon code and order amount.");
      return;
    }

    try {
      const result = await validateCoupon({
        code: validateForm.code.trim().toUpperCase(),
        order_amount: Number(validateForm.order_amount),
      }).unwrap();
      setValidationResult(result);
    } catch (err) {
      setValidationError(
        err?.data?.detail || err?.data?.message || "Invalid or expired coupon code."
      );
    }
  };

  return (
    <div style={{ padding: "2rem 0" }}>
      <h2 className="section-heading-gold mb-4">
        <i className="fa-solid fa-ticket me-2"></i>My Coupons
      </h2>

      {/* Coupon List */}
      <div className="card-royal p-4 mb-4">
        <h5 style={{ color: "var(--color-text-primary)", marginBottom: "1.25rem" }}>
          <i className="fa-solid fa-gift me-2" style={{ color: "var(--color-gold)" }}></i>
          Available Coupons
        </h5>

        {isLoading && (
          <div className="text-center py-4">
            <div className="spinner-royal mx-auto"></div>
            <p className="text-royal-muted mt-2">Loading your coupons…</p>
          </div>
        )}

        {isError && (
          <div className="alert-royal-error">
            Failed to load coupons. Please try again later.
          </div>
        )}

        {!isLoading && !isError && coupons?.length === 0 && (
          <div
            className="text-center py-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            <i className="fa-solid fa-ticket-simple fa-2x mb-3" style={{ opacity: 0.4 }}></i>
            <p>No coupons available yet.</p>
            <p style={{ fontSize: "0.85rem" }}>
              Coupons are awarded through referrals and promotions.
            </p>
          </div>
        )}

        {!isLoading && coupons?.length > 0 && (
          <div className="row g-3">
            {coupons.map((coupon, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <CouponCard coupon={coupon} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coupon Validator */}
      <div className="card-royal p-4">
        <h5 style={{ color: "var(--color-text-primary)", marginBottom: "1.25rem" }}>
          <i className="fa-solid fa-magnifying-glass me-2" style={{ color: "var(--color-gold)" }}></i>
          Validate a Coupon
        </h5>
        <p className="text-royal-muted mb-4" style={{ fontSize: "0.9rem" }}>
          Check how much discount a coupon gives before applying it to an order.
        </p>

        <form onSubmit={handleValidate}>
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label className="form-label-royal">Coupon Code</label>
              <input
                type="text"
                className="form-control form-control-royal"
                placeholder="e.g. REF-ABCD1234"
                value={validateForm.code}
                onChange={(e) =>
                  setValidateForm((f) => ({ ...f, code: e.target.value }))
                }
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label-royal">Order Amount (₹)</label>
              <input
                type="number"
                className="form-control form-control-royal"
                placeholder="e.g. 5000"
                min="1"
                value={validateForm.order_amount}
                onChange={(e) =>
                  setValidateForm((f) => ({ ...f, order_amount: e.target.value }))
                }
              />
            </div>
          </div>

          {validationError && (
            <div className="alert-royal-error mb-3">{validationError}</div>
          )}

          {validationResult && (
            <div
              className="mb-3 p-3"
              style={{
                background: "rgba(46,125,50,0.15)",
                border: "1px solid var(--color-success)",
                borderRadius: "var(--radius-sm)",
                color: "#a7f3d0",
              }}
            >
              <div className="fw-semibold mb-1">
                <i className="fa-solid fa-check-circle me-2"></i>
                Coupon valid!
              </div>
              <div style={{ fontSize: "0.9rem" }}>
                Coupon: <strong>{validationResult.coupon}</strong> &nbsp;|&nbsp;
                Discount: <strong>₹{validationResult.discount}</strong> &nbsp;|&nbsp;
                Final Price: <strong>₹{validationResult.final_price}</strong>
              </div>
            </div>
          )}

          <button type="submit" className="btn-gold" disabled={isValidating}>
            {isValidating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Checking…
              </>
            ) : (
              <>
                <i className="fa-solid fa-magnifying-glass me-2"></i>Validate Coupon
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
