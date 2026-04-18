import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileForm from "./ProfileForm";
import "../../styles/variables.css";

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.data);

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : user?.email?.split("@")[0] || "User";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <div style={{ padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <h2 className="section-heading-gold mb-4" style={{ textAlign: "center" }}>
        <i className="fa-regular fa-id-badge me-2"></i>My Profile
      </h2>

      <div className="row g-4">
        {/* Left — Avatar + Summary */}
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card-royal p-4 text-center">
            {/* Avatar */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "var(--gradient-royal)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#FFFFFF",
                border: "2px solid rgba(192,57,43,0.3)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {avatarLetter}
            </div>

            <h5 style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>
              {displayName}
            </h5>
            <p className="text-royal-muted mb-1" style={{ fontSize: "0.85rem" }}>
              {user?.email || "—"}
            </p>

            {profile?.userType && (
              <span
                className="badge mt-1"
                style={{
                  background: "var(--gradient-gold)",
                  color: "#1A0A0A",
                  borderRadius: "var(--radius-pill)",
                  padding: "0.3rem 0.9rem",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {profile.userType}
              </span>
            )}

            <hr style={{ borderColor: "var(--color-border)", margin: "1.25rem 0" }} />

            {/* Quick links */}
            <div className="d-flex flex-column gap-2">
              <Link
                to="/dashboard"
                className="text-decoration-none"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(0,0,0,0.04)",
                  color: "var(--color-text-muted)",
                  fontSize: "0.85rem",
                  transition: "background var(--transition-fast)",
                }}
              >
                <i className="fa-solid fa-gauge me-2"></i>Dashboard
              </Link>
              <Link
                to="/dashboard/orders"
                className="text-decoration-none"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(0,0,0,0.04)",
                  color: "var(--color-text-muted)",
                  fontSize: "0.85rem",
                }}
              >
                <i className="fa-solid fa-file-lines me-2"></i>My Orders
              </Link>
              <Link
                to="/dashboard/coupons"
                className="text-decoration-none"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(0,0,0,0.04)",
                  color: "var(--color-crimson)",
                  fontSize: "0.85rem",
                }}
              >
                <i className="fa-solid fa-ticket me-2"></i>My Coupons
              </Link>
            </div>
          </div>
        </div>

        {/* Right — Profile Form */}
        <div className="col-12 col-md-8 col-lg-9">
          <div className="card-royal p-4">
            <h5 style={{ fontSize: "1.1rem", color: "var(--color-text-primary)", fontWeight: 700, marginBottom: "1rem" }}>
              <i className="fa-solid fa-pen-to-square me-2" style={{ color: "var(--color-crimson)" }}></i>Edit Profile Details
            </h5>
            <ProfileForm />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
