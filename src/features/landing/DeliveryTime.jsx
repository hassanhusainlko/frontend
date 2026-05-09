import "../../styles/variables.css";

export default function DeliveryTimeTable() {
  return (
    <section className="section-royal-alt">
      <div className="container">
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
            <div style={{ flex: 1, height: 1, background: "var(--color-border)" }}></div>
            <h2 className="section-heading-gold mb-0">Delivery Times</h2>
            <div style={{ flex: 1, height: 1, background: "var(--color-border)" }}></div>
          </div>
          <p className="text-royal-muted">Transparent timelines for every service type.</p>
        </div>

        <div className="card-royal" style={{ overflow: "hidden" }}>
          <div className="table-responsive">
            <table className="table mb-0 text-center" style={{ color: "var(--color-text-primary)" }}>
              <thead style={{ background: "var(--gradient-royal)" }}>
                <tr>
                  {["Period", "Up to 30 Pages", "Priority", "Delivery Time", "More than 30 Pages"].map((h) => (
                    <th key={h} style={{ padding: "1rem", color: "#FFFFFF", fontFamily: "var(--font-heading)", borderBottom: "none", fontWeight: 700 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { period: "Normal Days", priority: "Regular", time: "3â€“4 Business Days", rowspan: true },
                  { period: "Normal Days", priority: "Urgent",  time: "1â€“2 Business Days", rowspan: false },
                  { period: "Peak Days",   priority: "Regular", time: "4â€“7 Business Days", rowspan: true },
                  { period: "Peak Days",   priority: "Urgent",  time: "2â€“3 Business Days", rowspan: false },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.85rem 1rem", color: "var(--color-text-muted)" }}>{row.period}</td>
                    <td style={{ padding: "0.85rem 1rem", color: "var(--color-text-muted)" }}>Up to 30 pages</td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "var(--radius-pill)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        background: row.priority === "Urgent" ? "rgba(124,58,237,0.1)" : "rgba(124,58,237,0.06)",
                        color: row.priority === "Urgent" ? "var(--color-crimson-dark)" : "var(--color-crimson)",
                        border: `1px solid rgba(124,58,237,${row.priority === "Urgent" ? "0.4" : "0.25"})`,
                      }}>
                        {row.priority === "Urgent"
                          ? <><i className="fa-solid fa-bolt me-1"></i></>
                          : <><i className="fa-regular fa-clock me-1"></i></>}
                        {row.priority}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", color: "var(--color-text-primary)", fontWeight: 600 }}>
                      {row.time}
                    </td>
                    {row.rowspan && (
                      <td rowSpan="4" style={{ padding: "0.85rem 1rem", color: "var(--color-text-muted)", fontSize: "0.85rem", verticalAlign: "middle" }}>
                        Delivery time decided by mutual agreement via email
                      </td>
                    )}
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" style={{
                    padding: "1rem",
                    background: "#F9F9F9",
                    borderTop: "1px solid var(--color-border)",
                    color: "var(--color-text-muted)",
                    fontSize: "0.83rem",
                    fontStyle: "italic",
                  }}>
                    * Delivery Time = time between payment of Token Amount and supply of First Draft.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
