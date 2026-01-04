import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./registrationApi"; // adjust path if needed

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // RTK Query mutation hook
  const [register, { isLoading }] = useRegisterMutation();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";

    if (!form.email.trim()) e.email = "Email is required";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) e.email = "Enter a valid email";
    }

    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be ≥ 6 characters";

    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password)
      e.confirmPassword = "Passwords do not match";

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
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        re_password: form.confirmPassword,
      };

      // IMPORTANT: use .unwrap() so errors throw and go to catch
      await register(payload).unwrap();

      // If successful, redirect (or show a success message then redirect)
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      // RTK Query error shape, not axios
      const msg =
        err?.data?.message ||
        err?.data?.detail ||
        err?.error ||
        "Registration failed";
      setServerError(msg);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <h1
          className="fs-2 text-danger fw-bolder"
          style={{ marginTop: "6rem" }}
        >
          <i
            className="fa-solid fa-right-to-bracket pe-3"
            aria-hidden="true"
          ></i>
          Register Here
        </h1>
      </div>

      <div className="container mt-4 pt-3">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-6">
            <div className="card" style={{ background: "#f8f7f7" }}>
              <div className="card-body">
                <form onSubmit={handleSubmit} noValidate>
                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      value={form.username}
                      onChange={onChange}
                      type="text"
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      placeholder="Choose a username"
                      autoComplete="username"
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>

                  {/* First + Last name row */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={onChange}
                        type="text"
                        className={`form-control ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                        placeholder="First name"
                        autoComplete="given-name"
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={onChange}
                        type="text"
                        className={`form-control ${
                          errors.lastName ? "is-invalid" : ""
                        }`}
                        placeholder="Last name"
                        autoComplete="family-name"
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Create a password"
                      autoComplete="new-password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={onChange}
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  {/* Server error */}
                  {serverError && (
                    <div className="alert alert-danger">{serverError}</div>
                  )}

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-danger"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Register"}
                    </button>
                  </div>

                  <div
                    className="text-center mt-3"
                    style={{ background: "#ececec" }}
                  >
                    <p className="mb-0 p-2">
                      Already registered?
                      <Link to="/login" className="ps-2 text-decoration-none">
                        Log In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
