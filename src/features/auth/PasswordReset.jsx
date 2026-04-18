import { useState } from "react";
import { Link } from "react-router-dom";
import { useResetPasswordMutation } from "./authApi";
import "../../styles/variables.css";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await resetPassword({ email: email.trim().toLowerCase() }).unwrap();
      setSubmitted(true);
    } catch (err) {
      setError(
        err?.data?.detail ||
          err?.data?.email?.[0] ||
          err?.error ||
          "Failed to send reset email. Please try again."
      );
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
            <i className="fa-solid fa-key" style={{ color: "#FFFFFF", fontSize: "1.5rem" }}></i>
          </div>
          <h2>Reset Password</h2>
          <p>Enter your email and we'll send you a reset link</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center" }}>
            <div className="alert-royal-success mb-4">
              <i className="fa-solid fa-envelope-circle-check me-2"></i>
              Password reset email sent! Check your inbox and follow the instructions.
            </div>
            <Link to="/login" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>
              <i className="fa-solid fa-arrow-left me-2"></i>Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="form-label-royal">
                <i className="fa-regular fa-envelope pe-2"></i>Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-royal"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
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
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane me-2"></i>Send Reset Link
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
        )}
      </div>
    </div>
  );
}
