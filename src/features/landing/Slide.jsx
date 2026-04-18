import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/variables.css";

export default function HeroBanner() {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap');

        .hero-banner {
          position: relative;
          margin-top: var(--navbar-height);
          min-height: 52vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #faf9f7;
          border-bottom: 1px solid #ede8e2;
        }

        .hero-banner::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(180deg, #c0392b 0%, #922b21 100%);
        }

        .hero-bg-shape {
          position: absolute;
          right: -80px;
          top: -80px;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(192,57,43,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-bg-lines {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 42%;
          background-image:
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 28px,
              rgba(192,57,43,0.045) 28px,
              rgba(192,57,43,0.045) 29px
            );
          pointer-events: none;
        }

        .hero-watermark {
          position: absolute;
          right: 3%;
          bottom: -1rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(6rem, 12vw, 11rem);
          font-weight: 700;
          color: rgba(192,57,43,0.06);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.03em;
          white-space: nowrap;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          padding: 3rem 4rem 3rem 5%;
          max-width: 700px;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c0392b;
          background: rgba(192,57,43,0.08);
          border: 1px solid rgba(192,57,43,0.18);
          padding: 0.3rem 0.8rem;
          border-radius: 2px;
          margin-bottom: 1.1rem;
        }

        .hero-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #1a1008;
          line-height: 1.15;
          margin: 0 0 1rem 0;
          letter-spacing: -0.01em;
        }

        .hero-heading em {
          font-style: italic;
          color: #c0392b;
        }

        .hero-divider {
          width: 48px;
          height: 2px;
          background: #c0392b;
          margin-bottom: 1rem;
          border-radius: 1px;
        }

        .hero-body {
          font-family: 'DM Sans', sans-serif;
          color: #6b5c4e;
          font-size: clamp(0.88rem, 1.5vw, 0.98rem);
          line-height: 1.72;
          margin-bottom: 1.8rem;
          max-width: 460px;
        }

        .hero-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .btn-primary-hero {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1.6rem;
          border-radius: 3px;
          background: #c0392b;
          color: #FFFFFF;
          border: none;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease;
          box-shadow: 0 3px 14px rgba(192,57,43,0.3);
          letter-spacing: 0.02em;
        }

        .btn-primary-hero:hover {
          background: #a93226;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(192,57,43,0.38);
          color: #FFFFFF;
        }

        .btn-ghost-hero {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.63rem 1.6rem;
          border-radius: 3px;
          background: transparent;
          color: #1a1008;
          border: 1.5px solid #c8bdb5;
          cursor: pointer;
          transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
          letter-spacing: 0.02em;
        }

        .btn-ghost-hero:hover {
          border-color: #c0392b;
          color: #c0392b;
          background: rgba(192,57,43,0.04);
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #ede8e2;
          flex-wrap: wrap;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .hero-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #c0392b;
          line-height: 1;
        }

        .hero-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: #9e8d80;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>

      <section className="hero-banner">
        <div className="hero-bg-shape" aria-hidden="true" />
        <div className="hero-bg-lines" aria-hidden="true" />
        <span className="hero-watermark" aria-hidden="true">
          LaTeX
        </span>

        <div className="hero-content">
          <div className="hero-tag">
            <i
              className="fa-solid fa-circle"
              style={{ fontSize: "0.4rem" }}
            ></i>
            Academic &amp; Research Services
          </div>

          <h1 className="hero-heading">
            Professional <em>LaTeX</em> &amp;
            <br />
            <em>Data Analysis</em> Services
          </h1>

          <div className="hero-divider" />

          <p className="hero-body">
            Expert typesetting for research papers, theses, and dissertations.
            Delivered on time, every time.
          </p>

          <div className="hero-actions">
            <Link
              to={token ? "/dashboard/quote-request" : "/register"}
              className="btn-primary-hero"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              Get a Quote
            </Link>

            <Link
              to={token ? "/dashboard" : "/login"}
              className="btn-ghost-hero"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
              {token ? "Go to Dashboard" : "Sign In"}
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">500+</span>
              <span className="hero-stat-label">Projects Done</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">98%</span>
              <span className="hero-stat-label">On-Time Delivery</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">12+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
