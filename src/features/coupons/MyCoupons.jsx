import { useState } from "react";
import { useGetMyCouponsQuery, useValidateCouponMutation } from "./couponsApi";
import "../../styles/variables.css";

function CouponCard({ coupon }) {
  const [copied, setCopied] = useState(false);

  const code     = typeof coupon === "string" ? coupon : coupon.code || "—";
  const discount = coupon.discount_percent ?? coupon.discount ?? null;
  const expiry   = coupon.expiry_date || coupon.valid_until || null;
  const isActive = coupon.is_active !== false;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      borderLeft: "4px solid var(--color-primary)",
      boxShadow: "var(--shadow-card)",
      overflow: "hidden",
      transition: "box-shadow var(--transition-normal), transform var(--transition-normal)",
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card-lg)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header strip */}
      <div style={{
        background: "var(--color-primary-xsubtle)",
        borderBottom: "1px dashed var(--color-border-purple)",
        padding: "0.9rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--color-primary)",
          letterSpacing: "0.1em",
        }}>
          {code}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            background: copied ? "var(--color-primary)" : "#FFFFFF",
            border: `1.5px solid ${copied ? "var(--color-primary)" : "var(--color-border-purple)"}`,
            borderRadius: "var(--radius-pill)",
            color: copied ? "#FFFFFF" : "var(--color-primary)",
            padding: "0.28rem 0.75rem",
            cursor: "pointer",
            fontSize: "0.78rem",
            fontWeight: 600,
            transition: "all var(--transition-fast)",
            flexShrink: 0,
          }}
          aria-label="Copy coupon code"
        >
          <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} style={{ fontSize: "0.72rem" }}></i>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "0.85rem 1rem" }}>
        <div className="d-flex align-items-center flex-wrap gap-2">
          {discount != null && (
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              background: "rgba(124,58,237,0.08)",
              color: "var(--color-primary)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "var(--radius-pill)",
              padding: "0.2rem 0.65rem",
              fontSize: "0.78rem",
              fontWeight: 700,
            }}>
              <i className="fa-solid fa-percent" style={{ fontSize: "0.65rem" }}></i>
              {discount}% off
            </span>
          )}

          {expiry && (
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              color: "var(--color-text-muted)",
              fontSize: "0.78rem",
            }}>
              <i className="fa-regular fa-calendar" style={{ fontSize: "0.72rem" }}></i>
              Expires {new Date(expiry).toLocaleDateString()}
            </span>
          )}

          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: isActive ? "var(--color-success)" : "var(--color-text-muted)",
            background: isActive ? "var(--color-success-bg)" : "rgba(107,114,128,0.08)",
            border: `1px solid ${isActive ? "var(--color-success-border)" : "rgba(107,114,128,0.18)"}`,
            borderRadius: "var(--radius-pill)",
            padding: "0.2rem 0.6rem",
          }}>
            <i className="fa-solid fa-circle" style={{ fontSize: "0.38rem" }}></i>
            {isActive ? "Active" : "Expired"}
          </span>
        </div>
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
    <div style={{ minHeight: "100vh", background: "var(--color-bg-page)", paddingTop: "var(--navbar-height)" }}>
      <div className="container py-4">

        {/* Page title */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div style={{ width: 4, height: 32, background: "var(--gradient-royal)", borderRadius: 2 }}></div>
          <h4 style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", margin: 0 }}>
            My Coupons
          </h4>
        </div>

        {/* ── Available Coupons ── */}
        <div className="card-royal p-4 mb-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <div style={{
              width: 36, height: 36, borderRadius: "var(--radius-sm)",
              background: "rgba(124,58,237,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className="fa-solid fa-gift" style={{ color: "var(--color-primary)", fontSize: "0.95rem" }}></i>
            </div>
            <div>
              <h6 style={{ margin: 0, fontWeight: 700, color: "var(--color-text-primary)" }}>Available Coupons</h6>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                Coupons awarded through referrals and promotions
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="d-flex align-items-center gap-2 py-3" style={{ color: "var(--color-text-muted)", fontSize: "0.88rem" }}>
              <div className="spinner-royal" style={{ width: 20, height: 20, borderWidth: 2 }}></div>
              Loading your coupons…
            </div>
          )}

          {isError && (
            <div className="alert-royal-error">
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              Failed to load coupons. Please try again later.
            </div>
          )}

          {!isLoading && !isError && (!coupons || coupons.length === 0) && (
            <div className="text-center py-5">
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(124,58,237,0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1rem",
              }}>
                <i className="fa-solid fa-ticket-simple" style={{ color: "var(--color-primary)", fontSize: "1.4rem", opacity: 0.5 }}></i>
              </div>
              <p style={{ color: "var(--color-text-primary)", fontWeight: 600, marginBottom: "0.25rem" }}>
                No coupons yet
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", maxWidth: 280, margin: "0 auto" }}>
                Coupons are awarded through referrals and special promotions.
              </p>
            </div>
          )}

          {!isLoading && coupons && coupons.length > 0 && (
            <div className="row g-3">
              {coupons.map((coupon, idx) => (
                <div key={idx} className="col-12 col-md-6 col-xl-4">
                  <CouponCard coupon={coupon} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Validate a Coupon ── */}
        <div className="card-royal p-4">
          <div className="d-flex align-items-center gap-2 mb-1">
            <div style={{
              width: 36, height: 36, borderRadius: "var(--radius-sm)",
              background: "rgba(124,58,237,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: "var(--color-primary)", fontSize: "0.9rem" }}></i>
            </div>
            <div>
              <h6 style={{ margin: 0, fontWeight: 700, color: "var(--color-text-primary)" }}>Validate a Coupon</h6>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                Check the discount before applying to an order
              </p>
            </div>
          </div>

          <hr style={{ borderColor: "var(--color-border)", margin: "1rem 0 1.25rem" }} />

          <form onSubmit={handleValidate}>
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
                <label className="form-label-royal">
                  <i className="fa-solid fa-ticket me-2"></i>Coupon Code
                </label>
                <input
                  type="text"
                  className="form-control form-control-royal"
                  placeholder="e.g. REF-ABCD1234"
                  value={validateForm.code}
                  onChange={(e) => setValidateForm((f) => ({ ...f, code: e.target.value }))}
                  style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}
                />
              </div>
              <div className="col-12 col-sm-6">
                <label className="form-label-royal">
                  <i className="fa-solid fa-indian-rupee-sign me-2"></i>Order Amount (₹)
                </label>
                <input
                  type="number"
                  className="form-control form-control-royal"
                  placeholder="e.g. 5000"
                  min="1"
                  value={validateForm.order_amount}
                  onChange={(e) => setValidateForm((f) => ({ ...f, order_amount: e.target.value }))}
                />
              </div>
            </div>

            {validationError && (
              <div className="alert-royal-error mb-3">
                <i className="fa-solid fa-circle-xmark me-2"></i>
                {validationError}
              </div>
            )}

            {validationResult && (
              <div className="mb-3 p-3" style={{
                background: "var(--color-success-bg)",
                border: "1px solid var(--color-success-border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--color-success)",
              }}>
                <div style={{ fontWeight: 700, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <i className="fa-solid fa-circle-check"></i>
                  Coupon is valid!
                </div>
                <div style={{ fontSize: "0.88rem", display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem" }}>
                  <span>
                    Code: <strong style={{ fontFamily: "var(--font-mono)" }}>{validationResult.coupon}</strong>
                  </span>
                  <span>
                    Discount: <strong>₹{validationResult.discount}</strong>
                  </span>
                  <span>
                    Final Price: <strong>₹{validationResult.final_price}</strong>
                  </span>
                </div>
              </div>
            )}

            <button type="submit" className="btn-gold" disabled={isValidating}>
              {isValidating ? (
                <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Checking…</>
              ) : (
                <><i className="fa-solid fa-magnifying-glass me-2"></i>Check Coupon</>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
