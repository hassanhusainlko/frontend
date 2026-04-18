import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../profile/profileApi";
import "../../../styles/variables.css";

export default function UserInfoCard() {
  const authUser = useSelector((state) => state.auth.user);
  const navigate  = useNavigate();

  const { data: profileData, isLoading, isError, error } = useGetProfileQuery();

  // 404 → profile has never been created
  const profileNotFound = isError && error?.status === 404;

  const fullName =
    ((authUser?.first_name || "") + " " + (authUser?.last_name || "")).trim() || "N/A";

  const initials = fullName !== "N/A"
    ? fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="card-royal p-4">
      {/* Avatar */}
      <div className="text-center mb-4">
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "var(--gradient-royal)",
          border: "3px solid rgba(192,57,43,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 0.75rem",
          fontSize: "1.6rem", fontWeight: 700,
          color: "#FFFFFF",
          fontFamily: "var(--font-heading)",
          boxShadow: "var(--shadow-card)",
        }}>
          {initials}
        </div>
        <h6 style={{ color: "var(--color-text-primary)", fontWeight: 700, marginBottom: "0.2rem" }}>
          {fullName}
        </h6>
        <div style={{ color: "var(--color-text-muted)", fontSize: "0.82rem" }}>
          {authUser?.email || ""}
        </div>
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}>
          <div className="d-flex align-items-center gap-2" style={{ color: "var(--color-text-muted)", fontSize: "0.83rem" }}>
            <div className="spinner-royal" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
            Loading profile…
          </div>
        </div>
      )}

      {/* ── Profile not found → Create CTA ── */}
      {profileNotFound && (
        <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}>
          <div style={{
            background: "rgba(192,57,43,0.05)",
            border: "1px dashed rgba(192,57,43,0.3)",
            borderRadius: "var(--radius-md)",
            padding: "1rem",
            textAlign: "center",
            marginBottom: "1rem",
          }}>
            <i className="fa-solid fa-circle-user" style={{ color: "var(--color-crimson)", fontSize: "1.5rem", marginBottom: "0.5rem", display: "block" }}></i>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", marginBottom: "0.75rem" }}>
              Your profile is not set up yet.
            </p>
            <button
              className="btn-gold w-100"
              style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
              onClick={() => navigate("/dashboard/profile")}
            >
              <i className="fa-solid fa-user-plus me-2"></i>Create Profile
            </button>
          </div>
        </div>
      )}

      {/* ── Profile found → Info rows ── */}
      {!isLoading && !isError && profileData && (
        <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}>
          {[
            { label: "Email",     value: authUser?.email,                       icon: "fa-envelope" },
            { label: "User Type", value: profileData.userType,                  icon: "fa-id-badge" },
            { label: "Mobile",    value: profileData.mobileNumber,              icon: "fa-phone" },
            { label: "Country",   value: profileData.country,                   icon: "fa-earth-americas" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="d-flex align-items-start gap-2 mb-2" style={{ fontSize: "0.85rem" }}>
              <i className={`fa-solid ${icon} mt-1`} style={{ color: "var(--color-crimson)", width: 16, flexShrink: 0 }}></i>
              <div>
                <div style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", lineHeight: 1.2 }}>{label}</div>
                <div style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{value || "—"}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Action links ── */}
      <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1rem", marginTop: "0.5rem" }} className="d-flex flex-column gap-2">
        {[
          { to: "/dashboard/profile", icon: "fa-user-pen",  label: profileNotFound ? "Set Up Profile" : "Edit Profile" },
          { to: "/dashboard/coupons", icon: "fa-ticket",     label: "My Coupons" },
          { to: "/dashboard/orders",  icon: "fa-list-check", label: "All Orders" },
        ].map(({ to, icon, label }) => (
          <Link key={to} to={to} style={{
            display: "flex", alignItems: "center", gap: 8,
            color: "var(--color-crimson)", fontSize: "0.85rem", textDecoration: "none", fontWeight: 600,
            padding: "0.4rem 0.5rem", borderRadius: "var(--radius-sm)",
            transition: "background 0.15s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(192,57,43,0.07)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <i className={`fa-solid ${icon}`} style={{ width: 16 }}></i> {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
