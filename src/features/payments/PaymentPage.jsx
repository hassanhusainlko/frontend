import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useCreatePaymentMutation } from "./paymentsApi";
import { launchCheckout } from "../../services/paymentService";
import "../../styles/variables.css";

export default function PaymentPage() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const payment_type = searchParams.get("type") || "token";

  const [createPayment] = useCreatePaymentMutation();
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function startPayment() {
      try {
        const result = await createPayment({ orderId, payment_type }).unwrap();
        if (cancelled) return;
        await launchCheckout(result.payment_session_id);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setStatus("error");
        setErrorMsg(
          err?.data?.detail ||
            err?.data?.message ||
            err?.error ||
            "Failed to initiate payment. Please try again."
        );
      }
    }

    startPayment();
    return () => { cancelled = true; };
  }, [orderId, payment_type]);

  const isToken = payment_type === "token";
  const amountLabel = isToken ? "Token Payment (30%)" : "Final Payment (70%)";

  return (
    <div className="auth-page" style={{ minHeight: "100vh" }}>
      <div className="auth-card" style={{ textAlign: "center", maxWidth: 460 }}>
        {/* Icon */}
        <div
          style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "var(--gradient-royal)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {status === "error" ? (
            <i className="fa-solid fa-circle-xmark" style={{ color: "#fca5a5", fontSize: "2rem" }}></i>
          ) : (
            <i className="fa-solid fa-credit-card" style={{ color: "var(--color-gold)", fontSize: "1.75rem" }}></i>
          )}
        </div>

        {status === "loading" && (
          <>
            <h2 className="section-heading-gold mb-2">{amountLabel}</h2>
            <p className="text-royal-muted mb-4">
              Order #{orderId} — Preparing secure checkout…
            </p>
            <div className="spinner-royal mx-auto mb-3"></div>
            <p className="text-royal-muted" style={{ fontSize: "0.85rem" }}>
              You will be redirected to the payment gateway shortly.
            </p>
          </>
        )}

        {status === "ready" && (
          <>
            <h2 className="section-heading-gold mb-2">Redirecting…</h2>
            <p className="text-royal-muted">
              Opening payment gateway for {amountLabel.toLowerCase()}.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 style={{ color: "#fca5a5", fontFamily: "var(--font-heading)" }} className="mb-2">
              Payment Failed
            </h2>
            <p className="text-royal-muted mb-4">{errorMsg}</p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button
                className="btn-gold"
                onClick={() => { setStatus("loading"); setErrorMsg(""); }}
              >
                <i className="fa-solid fa-rotate-right me-2"></i>Try Again
              </button>
              <button
                className="btn-outline-gold"
                onClick={() => navigate(`/dashboard/orders/${orderId}`)}
              >
                Back to Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
