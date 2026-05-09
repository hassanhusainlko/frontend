import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";
import logo from "/logo.png";
import "./nav.css";
import "../../styles/variables.css";

const HASH_LINKS = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Get Quote", id: "quote" },
  { label: "How We Work", id: "how-we-work" },
];

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setNavOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      navigate(`/#${sectionId}`, { replace: true });
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHashActive = (id) =>
    location.pathname === "/" && location.hash === `#${id}`;

  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <button
          className="navbar-toggler border-0"
          onClick={() => setNavOpen(!navOpen)}
        >
          <i className={`fa-solid ${navOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>

        <div className={`collapse navbar-collapse ${navOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto nav-links">
            <li>
              <NavLink to="/" end className="nav-item-link">
                Home
              </NavLink>
            </li>
            {HASH_LINKS.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`/#${id}`}
                  className={`nav-item-link${isHashActive(id) ? " active" : ""}`}
                  onClick={(e) => scrollToSection(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {!isAuthenticated ? (
              <button
                className="btn-primary"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            ) : (
              <>
                <NavLink to="/dashboard" className="nav-item-link">
                  Dashboard
                </NavLink>
                <NavLink to="/dashboard/orders" className="nav-item-link">
                  Orders
                </NavLink>
                <NavLink to="/dashboard/coupons" className="nav-item-link">
                  Coupons
                </NavLink>

                <button className="btn-outline" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
