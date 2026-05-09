import { useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useLoginMutation, useLazyGetMeQuery } from "./authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import "../../styles/variables.css";

export default function LoginDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const registered = searchParams.get("registered") === "1";
  const passwordReset = searchParams.get("reset") === "1";

  const [loginMutation, { isLoading }] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      const loginRes = await loginMutation({ email, password }).unwrap();
      try {
        const me = await getMe().unwrap();
        dispatch(setCredentials({ user: me, token: loginRes.access }));
      } catch {
        dispatch(setCredentials({ user: null, token: loginRes.access }));
      }
      navigate(from, { replace: true });
    } catch (err) {
      const message =
        err?.data?.detail ||
        err?.data?.non_field_errors?.[0] ||
        err?.data?.message ||
        "Invalid email or password.";
      setError(message);
    }
  };

  return (
    <div className="auth-page">
      {/* Home button */}
      <Link
        to="/"
        style={{
          position: "fixed",
          top: "1.1rem",
          left: "1.4rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          color: "var(--color-primary)",
          fontSize: "0.88rem",
          fontWeight: 600,
          padding: "0.4rem 0.9rem",
          borderRadius: "var(--radius-pill)",
          background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.2)",
          transition: "background 0.18s ease, box-shadow 0.18s ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(124,58,237,0.14)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(124,58,237,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(124,58,237,0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <i className="fa-solid fa-arrow-left" style={{ fontSize: "0.8rem" }}></i>
        Home
      </Link>

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
            <i className="fa-regular fa-circle-user" style={{ color: "#FFFFFF", fontSize: "1.75rem" }}></i>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your TexScript account</p>
        </div>

        {/* Post-registration notice */}
        {registered && (
          <div className="alert-royal-info mb-3">
            <i className="fa-solid fa-envelope-circle-check me-2"></i>
            Account created! Please check your email to activate your account before logging in.
          </div>
        )}

        {/* Post-reset notice */}
        {passwordReset && (
          <div className="alert-royal-success mb-3">
            <i className="fa-solid fa-check-circle me-2"></i>
            Password reset successful! You can now log in with your new password.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label-royal">
              <i className="fa-regular fa-envelope pe-2"></i>Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-royal"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-1">
            <label className="form-label-royal">
              <i className="fa-solid fa-lock pe-2"></i>Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                className="form-control form-control-royal"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
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
          </div>

          <div className="text-end mb-3">
            <Link
              to="/forgot-password"
              className="text-decoration-none"
              style={{ fontSize: "0.85rem", color: "var(--color-gold)" }}
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <div className="alert-royal-error mb-3">{error}</div>
          )}

          <button
            type="submit"
            className="btn-gold w-100 mb-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Signing In...
              </>
            ) : (
              <>
                <i className="fa-regular fa-paper-plane me-2"></i>Sign In
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
            New to TexScript?{" "}
            <Link to="/register" className="text-gold text-decoration-none fw-semibold">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
