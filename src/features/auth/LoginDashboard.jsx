import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
import { useLoginMutation, useLazyGetMeQuery } from "./authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

export default function LoginDashboard() {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // the route the user tried to visit before login
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      const loginRes = await login({ email, password }).unwrap(); // ← Calling AuthProvider login()
      // 2) Fetch current user using getMe
      const me = await getMe().unwrap(); // calls GET /users/me

      dispatch(setCredentials({ user: me, token: loginRes.access }));
      navigate(from, { replace: true });
    } catch (err) {
      const message =
        err?.data?.message || err?.data?.detail || "Invalid email or password.";
      setError(message);
    }
  };

  return (
    <>
      <h2
        style={{
          marginTop: "8rem",
          color: "#b01a35",
          fontSize: "30px",
          fontWeight: "700",
        }}
      >
        <i className="fa-regular fa-circle-user ms-5 pe-3"></i>Login
      </h2>

      <div className="container mt-5">
        <div className="col-sm-12 col-md-4 offset-md-4">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">
                    <i className="fa-regular fa-envelope pe-2"></i>Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">
                    <i className="fa-solid fa-unlock pe-2"></i>Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <Link
                    to="/forgot-password"
                    className="form-text text-danger text-end d-block mt-2 text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Error message */}
                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-danger fw-semibold fs-6 px-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "LOGIN"}
                  <i className="fa-regular fa-paper-plane ps-2"></i>
                </button>
              </form>

              {/* Register Link */}
              <div className="mt-4">
                <div className="card-body text-center p-1 bg-secondary-subtle shadow-sm rounded-pill">
                  New User?
                  <Link
                    to="/register"
                    className="text-danger text-decoration-none ps-1"
                  >
                    Register Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
