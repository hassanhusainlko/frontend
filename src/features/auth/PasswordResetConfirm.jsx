import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useResetPasswordConfirmMutation } from "./authApi";
import "../../styles/variables.css";

export default function PasswordResetConfirm() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ new_password: "", re_new_password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const e = {};
    if (!form.new_password) {
      e.new_password = "New password is required";
    } else if (form.new_password.length < 8) {
      e.new_password = "Password must be at least 8 characters";
    }
    if (!form.re_new_password) {
      e.re_new_password = "Please confirm your new password";
    } else if (form.re_new_password !== form.new_password) {
      e.re_new_password = "Passwords do not match";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setServerError("");

    try {
      await resetPasswordConfirm({
        uid,
        token,
        new_password: form.new_password,
        re_new_password: form.re_new_password,
      }).unwrap();
      navigate("/login?reset=1", { replace: true });
    } catch (err) {
      const data = err?.data;
      if (data && typeof data === "object") {
        const msgs = Object.values(data).flat().join(" ");
        setServerError(msgs || "Failed to reset password. The link may be expired.");
      } else {
        setServerError(err?.data?.detail || "Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-header">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--gradient-royal)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <i className="fa-solid fa-lock-open" style={{ color: "#FFFFFF", fontSize: "1.5rem" }}></i>
          </div>
          <h2>Set New Password</h2>
          <p>Choose a strong password for your account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label-royal">
              <i className="fa-solid fa-lock pe-2"></i>New Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                name="new_password"
                value={form.new_password}
                onChange={onChange}
                className={`form-control form-control-royal ${errors.new_password ? "border-danger" : ""}`}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                style={{ paddingRight: "2.6rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                tabIndex={-1}
                style={{
                  position: "absolute", right: 10, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--color-text-muted)", padding: "0 2px",
                  lineHeight: 1,
                }}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                <i className={`fa-solid ${showPw ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {errors.new_password && (
              <div className="text-danger" style={{ fontSize: "0.8rem", marginTop: 4 }}>
                {errors.new_password}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label-royal">
              <i className="fa-solid fa-lock pe-2"></i>Confirm New Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPw ? "text" : "password"}
                name="re_new_password"
                value={form.re_new_password}
                onChange={onChange}
                className={`form-control form-control-royal ${errors.re_new_password ? "border-danger" : ""}`}
                placeholder="Repeat your new password"
                autoComplete="new-password"
                style={{ paddingRight: "2.6rem" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPw((v) => !v)}
                tabIndex={-1}
                style={{
                  position: "absolute", right: 10, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--color-text-muted)", padding: "0 2px",
                  lineHeight: 1,
                }}
                aria-label={showConfirmPw ? "Hide password" : "Show password"}
              >
                <i className={`fa-solid ${showConfirmPw ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {errors.re_new_password && (
              <div className="text-danger" style={{ fontSize: "0.8rem", marginTop: 4 }}>
                {errors.re_new_password}
              </div>
            )}
          </div>

          {serverError && (
            <div className="alert-royal-error mb-3">{serverError}</div>
          )}

          <button
            type="submit"
            className="btn-gold w-100 mb-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Resetting Password...
              </>
            ) : (
              <>
                <i className="fa-solid fa-check me-2"></i>Set New Password
              </>
            )}
          </button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-decoration-none"
              style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}
            >
              <i className="fa-solid fa-arrow-left me-1"></i>Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
