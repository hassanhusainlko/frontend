import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./registrationApi";
import "../../styles/variables.css";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) {
      e.username = "Username is required";
    } else if (form.username.trim().length < 3) {
      e.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username.trim())) {
      e.username = "Only letters, numbers, and underscores are allowed";
    }
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }
    if (!form.password) {
      e.password = "Password is required";
    } else if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters";
    }
    if (!form.confirmPassword) {
      e.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      e.confirmPassword = "Passwords do not match";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setServerError("");

    try {
      const payload = {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        re_password: form.confirmPassword,
      };
      if (form.referralCode.trim()) {
        payload.referral_code_input = form.referralCode.trim();
      }

      await register(payload).unwrap();
      navigate("/login?registered=1", { replace: true });
    } catch (err) {
      const data = err?.data;
      if (data && typeof data === "object") {
        const msgs = Object.values(data).flat().join(" ");
        setServerError(msgs || "Registration failed. Please try again.");
      } else {
        setServerError(err?.data?.detail || err?.error || "Registration failed.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 500 }}>
        <div className="auth-card-header">
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "var(--gradient-royal)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem",
            boxShadow: "var(--shadow-card)",
          }}>
            <i className="fa-solid fa-user-plus" style={{ color: "#FFFFFF", fontSize: "1.5rem" }}></i>
          </div>
          <h2>Create Account</h2>
          <p>Join TexScript — professional LaTeX &amp; data services</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label-royal">
              <i className="fa-solid fa-at pe-2"></i>Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={onChange}
              className={`form-control form-control-royal ${errors.username ? "border-danger" : ""}`}
              placeholder="e.g. john_doe"
              autoComplete="username"
            />
            {errors.username && (
              <div className="text-danger" style={{ fontSize: "0.8rem", marginTop: 4 }}>
                {errors.username}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label-royal">
              <i className="fa-regular fa-envelope pe-2"></i>Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className={`form-control form-control-royal ${errors.email ? "border-danger" : ""}`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <div className="text-danger" style={{ fontSize: "0.8rem", marginTop: 4 }}>
                {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label-royal">
              <i className="fa-solid fa-lock pe-2"></i>Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={onChange}
                className={`form-control form-control-royal ${errors.password ? "border-danger" : ""}`}
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
            {errors.password && (
              <div className="text-danger" style={{ fontSize: "0.8rem", marginTop: 4 }}>
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label-royal">
              <i className="fa-solid fa-lock-open pe-2"></i>Confirm Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPw ? "text" : "password"}
                value={form.confirmPassword}
                onChange={onChange}
                className={`form-control form-control-royal ${errors.confirmPassword ? "border-danger" : ""}`}
                placeholder="Repeat your password"
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
            {errors.confirmPassword && (
              <div className="text-danger" style={{ fontSize: "0.8rem", marginTop: 4 }}>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Referral Code (optional) */}
          <div className="mb-4">
            <label className="form-label-royal">
              <i className="fa-solid fa-tag pe-2"></i>Referral Code
              <span style={{ color: "var(--color-text-muted)", marginLeft: 6 }}>(optional)</span>
            </label>
            <input
              id="referralCode"
              name="referralCode"
              type="text"
              value={form.referralCode}
              onChange={onChange}
              className="form-control form-control-royal"
              placeholder="e.g. REF-ABCD1234"
            />
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
                Creating Account...
              </>
            ) : (
              <>
                <i className="fa-solid fa-user-plus me-2"></i>Create Account
              </>
            )}
          </button>

          <div
            className="text-center py-2 px-3"
            style={{
              background: "rgba(0,0,0,0.04)",
              borderRadius: "var(--radius-pill)",
              color: "var(--color-text-muted)",
              fontSize: "0.9rem",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" className="text-gold text-decoration-none fw-semibold">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
