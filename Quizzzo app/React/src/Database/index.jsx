import { useState } from "react";
import { setLs } from "../utils/storage";

export default function Database({ db, setDb, setView }) {
  const [name, setName] = useState("");
  const [quizName, setQuizName] = useState("sample quiz");
  const [score, setScore] = useState("");

  const addFakeData = () => {
    if (!name || !score) return alert("Fill fields!");
    const newAttempt = { name, quizName, score: parseInt(score), total: 10, date: new Date().toLocaleString() };
    const updatedDb = { ...db, a: [...db.a, newAttempt] };
    
    setDb(updatedDb);
    setLs("qz_att", updatedDb.a);
    setName(""); setScore("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", background: "#fff" }}>
      <h2>🗄️ Mock Database (localStorage)</h2>
      <button onClick={() => setView("cover")} style={{ marginBottom: "20px", padding: "8px" }}>Back Home</button>

      <div style={{ background: "#eee", padding: "15px", marginBottom: "20px" }}>
        <h4>Manually add data</h4>
        <input placeholder="Student Name" value={name} onChange={e=>setName(e.target.value)} style={{ margin: "5px" }} />
        <select value={quizName} onChange={e=>setQuizName(e.target.value)} style={{ margin: "5px", padding: "4px" }}>
          {db.quizzes.map(q => (
            <option key={q.id} value={q.name}>{q.name}</option>
          ))}
        </select>
        <input placeholder="Score (out of 10)" type="number" value={score} onChange={e=>setScore(e.target.value)} style={{ margin: "5px" }} />
        <button onClick={addFakeData} style={{ padding: "5px 10px" }}>Save to DB</button>
      </div>

      <h4>Data history</h4>
      <table width="100%" border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ background: "#ccc" }}><th>ID</th><th>Student</th><th>Quiz Target</th><th>Score</th><th>Date</th></tr>
        </thead>
        <tbody>
          {db.a.length === 0 ? <tr><td colSpan="5" style={{textAlign: "center"}}>No data</td></tr> : db.a.map((row, i) => (
            <tr key={i}><td>{i+1}</td><td>{row.name}</td><td>{row.quizName || "sample quiz"}</td><td>{row.score} / {row.total}</td><td>{row.date}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}