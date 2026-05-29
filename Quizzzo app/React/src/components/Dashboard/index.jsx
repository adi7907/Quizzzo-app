import "./index.css";

export default function Dashboard({ db }) {
  return (
    <div className="dashboard-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ marginBottom: 0 }}>📊 Analytics & Database</h2>
        

        <button 
          className="back-btn" 
          style={{ width: "auto", margin: 0, padding: "8px 16px" }} 
          onClick={() => window.location.href = "/"}
        >
          Back to Home
        </button>
      </div>

      <table className="db-table">
        <thead>
          <tr><th>Student</th><th>Score</th><th>Date</th></tr>
        </thead>
        <tbody>
          {db.a.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: "center", color: "#aaa" }}>No attempts yet.</td></tr>
          ) : (
            db.a.map((att, i) => (
              <tr key={i}>
                <td>{att.name}</td>
                <td>{att.score} / {att.total}</td>
                <td>{att.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}