import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

  const [serviceType, setServiceType] = useState("");
  const [priorityType, setPriorityType] = useState("");
  const [pages, setPages] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!serviceType) e.serviceType = "Please choose a service type";
    if (!priorityType) e.priorityType = "Please choose a priority";
    if (!pages || Number(pages) <= 0) e.pages = "Please enter number of pages";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    // For now we simply navigate to a quote or place-order page with query params
    // You can change this behaviour to call API or calculate quote locally
    navigate(
      `/orders/quote?service=${encodeURIComponent(
        serviceType
      )}&priority=${encodeURIComponent(priorityType)}&pages=${pages}`
    );
  };

  return (
    <>
      <div style={{ marginTop: "10rem" }}>
        <div className="container">
          <div className="row">
            {/* Profile card / left column */}
            <div className="p-3 col-md-6">
              <i
                className="fa-solid fa-user fa-7x shadow p-3 border rounded"
                aria-hidden="true"
              />
              <br />
              <br />
              <p className="fs-6">
                <b>Name:</b> Dr. Abdul Quddoos
              </p>
              <p className="fs-6">
                <b>Title:</b> Ph.D
              </p>
              <p className="fs-6">
                <b>Institute:</b> Era University
              </p>
              <p className="fs-6">
                <b>Email:</b> AbdulQuddoss@gmail.com
              </p>
              <p className="fs-6">
                <b>WhatsApp Number:</b> 0000000000
              </p>

              <div className="d-grid col-6 my-auto">
                <Link
                  to="/orders/track"
                  className="btn btn-danger"
                  type="button"
                >
                  Your Orders
                </Link>
              </div>

              <div className="mt-3">
                <Link to="/profile" className="text-decoration-none">
                  View Profile
                </Link>
              </div>
            </div>

            {/* Get Quote / form - right column */}
            <div className="p-3 col-md-6">
              <h2 className="my-4 py-1 text-danger">Get Quote</h2>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="serviceType" className="form-label">
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    className={`form-select ${
                      errors.serviceType ? "is-invalid" : ""
                    }`}
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="word_to_latex">Word To LaTeX</option>
                    <option value="pdf_to_latex">Typed PDF To LaTeX</option>
                    <option value="scanned_to_latex">
                      Handwritten/Scanned/Image To LaTeX
                    </option>
                    <option value="equation_to_latex">Equation To LaTeX</option>
                  </select>
                  {errors.serviceType && (
                    <div className="invalid-feedback">{errors.serviceType}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="priorityType" className="form-label">
                    Priority Type
                  </label>
                  <select
                    id="priorityType"
                    className={`form-select ${
                      errors.priorityType ? "is-invalid" : ""
                    }`}
                    value={priorityType}
                    onChange={(e) => setPriorityType(e.target.value)}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="regular">Regular</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  {errors.priorityType && (
                    <div className="invalid-feedback">
                      {errors.priorityType}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="pagesNumber" className="form-label">
                    Number Of Pages
                  </label>
                  <input
                    id="pagesNumber"
                    type="number"
                    className={`form-control ${
                      errors.pages ? "is-invalid" : ""
                    }`}
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    min="1"
                    placeholder="Enter number of pages"
                  />
                  {errors.pages && (
                    <div className="invalid-feedback">{errors.pages}</div>
                  )}
                </div>

                <button
                  className="btn btn-primary mt-3 px-5 py-2"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Example order card */}
          <div className="card text-center mt-5 shadow">
            <div className="card-header">Priority Type: Urgent</div>
            <div className="card-body">
              <h5 className="card-title">Service Type: PDF to LaTeX</h5>
              <p className="card-text">
                Number of Pages: 10
                <br />
                Status: Pending
              </p>
              <Link to="/orders/place-order" className="btn btn-primary">
                Create Order
              </Link>
            </div>
            <div className="card-footer text-body-secondary">
              Expected Delivery Time: 4-6 Business Days
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
