import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useActivateAccountMutation } from "./authApi";
import "../../styles/variables.css";

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const [activateAccount] = useActivateAccountMutation();
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!uid || !token) {
      setStatus("error");
      setErrorMsg("Invalid activation link.");
      return;
    }

    activateAccount({ uid, token })
      .unwrap()
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        setErrorMsg(
          err?.data?.detail ||
            err?.data?.uid?.[0] ||
            err?.data?.token?.[0] ||
            "This activation link is invalid or has already been used."
        );
      });
  }, [uid, token]);

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        {/* Icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "var(--gradient-royal)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {status === "loading" && (
            <div className="spinner-royal" style={{ width: 36, height: 36 }}></div>
          )}
          {status === "success" && (
            <i className="fa-solid fa-circle-check" style={{ color: "#a7f3d0", fontSize: "2rem" }}></i>
          )}
          {status === "error" && (
            <i className="fa-solid fa-circle-xmark" style={{ color: "#fca5a5", fontSize: "2rem" }}></i>
          )}
        </div>

        {status === "loading" && (
          <>
            <h2 className="section-heading-gold mb-2">Activating Account…</h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Please wait while we verify your activation link.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 style={{ color: "#a7f3d0", fontFamily: "var(--font-heading)" }} className="mb-2">
              Account Activated!
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
              Your account has been successfully activated. You can now sign in.
            </p>
            <Link to="/login" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>
              <i className="fa-solid fa-right-to-bracket me-2"></i>Go to Sign In
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h2 style={{ color: "#fca5a5", fontFamily: "var(--font-heading)" }} className="mb-2">
              Activation Failed
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
              {errorMsg}
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/register" className="btn-crimson" style={{ textDecoration: "none", display: "inline-block", borderRadius: "var(--radius-pill)", padding: "0.6rem 1.5rem", fontWeight: 600 }}>
                Register Again
              </Link>
              <Link to="/login" className="btn-outline-gold" style={{ textDecoration: "none", display: "inline-block" }}>
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
