import { Link } from "react-router-dom";
import "../../styles/variables.css";

const SERVICES = [
  {
    icon: "fa-chart-line",
    title: "Medical Statistical Analysis",
    desc: "Regression, ANOVA, t-tests, chi-square, correlation, and advanced biostatistics for medical research.",
  },
  {
    icon: "fa-database",
    title: "Data Cleaning & Preparation",
    desc: "Organize clinical datasets, handle missing values, outliers, and normalize medical research data.",
  },
  {
    icon: "fa-chart-pie",
    title: "Medical Data Visualization",
    desc: "Publication-ready charts, survival curves, forest plots, and clinical data dashboards.",
  },
  {
    icon: "fa-file-lines",
    title: "Thesis & Report Writing",
    desc: "Comprehensive analysis reports with Introduction, Review of Literature, methodology, results, and references.",
  },
  {
    icon: "fa-heart-pulse",
    title: "Clinical Trial Analysis",
    desc: "Statistical analysis for clinical trials, cohort studies, case-control studies, and longitudinal data.",
  },
  {
    icon: "fa-clipboard-list",
    title: "Medical Survey Analysis",
    desc: "Questionnaire validation, factor analysis, reliability testing (Cronbach's alpha), and patient survey analysis.",
  },
];

const TOOLS = [
  { name: "SPSS", icon: "fa-solid fa-cube" },
  { name: "Stata", icon: "fa-solid fa-database" },
  { name: "Python", icon: "fa-brands fa-python" },
  { name: "R", icon: "fa-brands fa-r-project" },
  { name: "Excel", icon: "fa-regular fa-file-excel" },
  { name: "JASP", icon: "fa-solid fa-flask" },
];

export default function DataAnalysis() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="section-royal"
        style={{
          paddingTop: "calc(var(--navbar-height) + 3rem)",
          paddingBottom: 0,
        }}
      >
        <div className="container">
          <div className="row align-items-center g-5 pb-5">
            <div className="col-12 col-lg-7">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  style={{
                    width: 4,
                    height: 36,
                    background: "var(--gradient-royal)",
                    borderRadius: 2,
                  }}
                ></div>
                <h2 className="section-heading-gold mb-0">
                  Medical Research Statistics
                </h2>
              </div>
              <h1
                className="section-heading-gold mb-3"
                style={{ fontSize: "2.2rem", lineHeight: 1.2 }}
              >
                Medical Data Analysis Services
              </h1>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: 1.8,
                  paddingBottom: "1.5rem",
                  fontSize: "1.05rem",
                }}
              >
                Specialised statistical analysis for medical research articles,
                PG dissertations, and PhD theses. We handle clinical data using
                industry-standard biostatistical methods.
              </p>
              <Link
                to="/orders/create-data-analysis"
                className="btn-gold text-decoration-none"
              >
                Get Started <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="col-12 col-lg-5 text-center">
              <div
                style={{
                  background: "var(--gradient-hero)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2rem",
                  border: "1px solid var(--color-border-purple)",
                }}
              >
                <i
                  className="fa-solid fa-heart-pulse"
                  style={{
                    fontSize: "4rem",
                    color: "var(--color-primary)",
                    opacity: 0.7,
                  }}
                ></i>
                <h4 className="section-heading-gold mt-3 mb-2">
                  Medical Biostatistics
                </h4>
                <p
                  className="text-royal-muted mb-0"
                  style={{ fontSize: "0.88rem" }}
                >
                  Rigorous statistical methods for credible clinical research
                  outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section-royal-alt">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading-gold mb-2">
              Medical Analysis Services
            </h2>
            <p
              className="text-royal-muted"
              style={{ maxWidth: 560, margin: "0 auto" }}
            >
              End-to-end support for medical research — from raw clinical data
              to published results.
            </p>
          </div>

          <div className="row g-4">
            {SERVICES.map(({ icon, title, desc }) => (
              <div key={title} className="col-12 col-sm-6 col-lg-4">
                <div
                  className="card-royal p-4 h-100"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-card-lg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                  style={{
                    transition:
                      "transform var(--transition-normal), box-shadow var(--transition-normal)",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-sm)",
                      background: "var(--color-primary-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <i
                      className={`fa-solid ${icon}`}
                      style={{
                        color: "var(--color-primary)",
                        fontSize: "1.2rem",
                      }}
                    ></i>
                  </div>
                  <h6
                    className="fw-semibold"
                    style={{
                      color: "var(--color-text-primary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {title}
                  </h6>
                  <p
                    className="text-royal-muted mb-0"
                    style={{ fontSize: "0.85rem", lineHeight: 1.65 }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="section-royal">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-5 text-center">
              <div
                style={{
                  background: "var(--gradient-royal)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2.5rem 2rem",
                  color: "#FFFFFF",
                }}
              >
                <i
                  className="fa-solid fa-toolbox"
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "0.75rem",
                    display: "block",
                  }}
                ></i>
                <h4
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  Tools & Technologies
                </h4>
                <p
                  style={{
                    opacity: 0.85,
                    fontSize: "0.88rem",
                    marginBottom: 0,
                  }}
                >
                  Industry-standard biostatistical software for reliable medical
                  research.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="row g-3">
                {TOOLS.map(({ name, icon }) => (
                  <div key={name} className="col-6 col-sm-4">
                    <div
                      style={{
                        background: "var(--color-bg-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        padding: "1rem",
                        textAlign: "center",
                        transition:
                          "border-color var(--transition-fast), box-shadow var(--transition-fast)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--color-primary)";
                        e.currentTarget.style.boxShadow = "var(--shadow-focus)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--color-border)";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      <i
                        className={icon}
                        style={{
                          fontSize: "1.5rem",
                          color: "var(--color-primary)",
                          marginBottom: "0.4rem",
                          display: "block",
                        }}
                      ></i>
                      <span
                        className="fw-semibold"
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-royal-alt">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading-gold mb-2">How It Works</h2>
            <p className="text-royal-muted">
              From your clinical data to a completed medical analysis.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              {
                step: "01",
                title: "Share Your Data",
                desc: "Tell us your research objective and upload your clinical dataset (Excel, CSV, SPSS, or Stata).",
              },
              {
                step: "02",
                title: "We Run the Analysis",
                desc: "Our biostatisticians perform the appropriate tests — regression, ANOVA, t-tests, survival analysis, and more.",
              },
              {
                step: "03",
                title: "Review Your Report",
                desc: "Receive a full report with Introduction, methodology, results, charts, and interpretations.",
              },
              {
                step: "04",
                title: "Get Delivered",
                desc: "Final delivery in your preferred format — PDF, DOCX, or LaTeX, ready for submission.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="col-12 col-sm-6 col-lg-3">
                <div className="text-center" style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "var(--gradient-button)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {step}
                  </div>
                  <h6
                    className="fw-semibold"
                    style={{
                      color: "var(--color-text-primary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {title}
                  </h6>
                  <p
                    className="text-royal-muted mb-0"
                    style={{ fontSize: "0.83rem", lineHeight: 1.6 }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-royal">
        <div className="container">
          <div
            className="text-center"
            style={{
              background: "var(--gradient-royal)",
              borderRadius: "var(--radius-lg)",
              padding: "3rem 2rem",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "var(--shadow-card-lg)",
            }}
          >
            <h2
              className="section-heading-gold mb-2"
              style={{ color: "#FFFFFF" }}
            >
              Need Medical Data Analysis?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.82)",
                marginBottom: "1.5rem",
                fontSize: "0.95rem",
              }}
            >
              Get accurate biostatistical analysis for your research article,
              dissertation, or thesis.
            </p>
            <Link
              to="/orders/create-data-analysis"
              className="btn-gold text-decoration-none"
              style={{
                background: "#FFFFFF",
                color: "var(--color-primary-dark)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F3FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
              }}
            >
              Start Your Order <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
