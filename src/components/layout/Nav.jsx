import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";
import logo from "/logo.png";
import "./nav.css";
import "../../styles/variables.css";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(token);
  const [logoutMutation] = useLogoutMutation();
  const [navOpen, setNavOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // blacklist may fail if token already expired — still clear locally
    }
    dispatch(logout());
    navigate("/login");
    setNavOpen(false);
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.82)",
    textDecoration: "none",
    padding: "0.4rem 0.75rem",
    borderRadius: "var(--radius-sm)",
    fontWeight: isActive ? 700 : 400,
    fontSize: "0.92rem",
    transition: "color var(--transition-fast), background var(--transition-fast)",
    whiteSpace: "nowrap",
    borderBottom: isActive ? "2px solid rgba(255,255,255,0.55)" : "2px solid transparent",
    paddingBottom: "0.35rem",
  });

  return (
    <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          background: "var(--gradient-royal)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          height: "var(--navbar-height)",
          padding: "0 1.5rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          zIndex: 1050,
        }}
      >
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand" to="/" style={{ padding: 0 }}>
            <img src={logo} alt="TexScript Logo" style={{ height: 42, maxWidth: 140, objectFit: "contain" }} />
          </Link>

          {/* Mobile toggler */}
          <button
            className="navbar-toggler border-0"
            type="button"
            style={{ color: "#FFFFFF" }}
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`fa-solid ${navOpen ? "fa-xmark" : "fa-bars"} fa-lg`}></i>
          </button>

          {/* Nav links */}
          <div className={`collapse navbar-collapse ${navOpen ? "show" : ""}`} id="navbarMain">
            <ul className="navbar-nav mx-auto gap-1 text-center">
              <li className="nav-item">
                <NavLink to="/" end style={navLinkStyle} onClick={() => setNavOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/#about" style={navLinkStyle} onClick={() => setNavOpen(false)}>
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/#services" style={navLinkStyle} onClick={() => setNavOpen(false)}>
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/#quote" style={navLinkStyle} onClick={() => setNavOpen(false)}>
                  Get A Quote
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/#how-we-work" style={navLinkStyle} onClick={() => setNavOpen(false)}>
                  How We Work
                </NavLink>
              </li>
            </ul>

            {/* Right side */}
            <div className="d-flex align-items-center gap-2 justify-content-center mt-2 mt-lg-0">
              {!isAuthenticated ? (
                <button
                  style={{
                    background: "#FFFFFF",
                    color: "var(--color-crimson)",
                    border: "none",
                    borderRadius: "var(--radius-pill)",
                    padding: "0.45rem 1.4rem",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "box-shadow var(--transition-fast)",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                  onClick={() => { navigate("/login"); setNavOpen(false); }}
                >
                  <i className="fa-solid fa-right-to-bracket me-2"></i>Sign In
                </button>
              ) : (
                <>
                  <NavLink to="/dashboard" style={navLinkStyle} onClick={() => setNavOpen(false)}>
                    <i className="fa-solid fa-gauge me-1"></i>Dashboard
                  </NavLink>
                  <NavLink to="/dashboard/orders" style={navLinkStyle} onClick={() => setNavOpen(false)}>
                    <i className="fa-solid fa-list me-1"></i>Orders
                  </NavLink>
                  <NavLink to="/dashboard/coupons" style={navLinkStyle} onClick={() => setNavOpen(false)}>
                    <i className="fa-solid fa-ticket me-1"></i>Coupons
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.4)",
                      borderRadius: "var(--radius-pill)",
                      color: "rgba(255,255,255,0.9)",
                      padding: "0.4rem 1rem",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                    }}
                  >
                    <i className="fa-solid fa-right-from-bracket me-1"></i>Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
  );
}
