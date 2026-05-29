import { useState } from "react";
import { setLs } from "../../utils/storage";
import "./index.css";

export default function Instructor({ db, setDb, setView }) {
  const [pwd, setPwd] = useState("");
  const [logged, setLogged] = useState(false);
  
  // Quiz Creation States
  const [newQuizName, setNewQuizName] = useState("");
  const [targetQuizId, setTargetQuizId] = useState("");

  // Question Creation States
  const [q, setQ] = useState("");
  const [opts, setOpts] = useState(["", "", "", ""]);
  const [ans, setAns] = useState(0);

  if (!logged) return (
    <div className="inst-box">
      <h3>Instructor Login</h3>
      <input className="inst-input" type="text" placeholder="Password (123456)" onChange={e=>setPwd(e.target.value)} />
      <button className="inst-btn" onClick={() => pwd === "123456" ? setLogged(true) : alert("Wrong Password!")}>Login</button>
      <button className="back-btn" onClick={() => setView("cover")}>Back</button>
    </div>
  );

  // Initialize target selector if unset
  if (!targetQuizId && db.quizzes.length > 0) {
    setTargetQuizId(db.quizzes[0].id);
  }

  const handleCreateQuiz = () => {
    if (!newQuizName.trim()) return alert("Enter quiz name!");
    const newQuiz = { id: Date.now(), name: newQuizName.trim(), questions: [] };
    const updatedQuizzes = [...db.quizzes, newQuiz];
    
    const updatedDb = { ...db, quizzes: updatedQuizzes };
    setDb(updatedDb);
    setLs("qz_quizzes", updatedQuizzes);
    setTargetQuizId(newQuiz.id);
    setNewQuizName("");
    alert(`Quiz "${newQuiz.name}" created!`);
  };

  const handleAddQuestion = () => {
    if (!q || opts.some(o => !o)) return alert("Fill all fields!");
    
    const updatedQuizzes = db.quizzes.map(quiz => {
      if (quiz.id === Number(targetQuizId)) {
        return {
          ...quiz,
          questions: [...quiz.questions, { id: Date.now(), q, options: opts, answer: ans }]
        };
      }
      return quiz;
    });

    const updatedDb = { ...db, quizzes: updatedQuizzes };
    setDb(updatedDb);
    setLs("qz_quizzes", updatedQuizzes);
    
    setQ(""); setOpts(["", "", "", ""]); setAns(0);
    alert("Question added to selected quiz!");
  };

  return (
    <div className="inst-box" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ borderBottom: "1px solid #ccc", paddingBottom: "15px", marginBottom: "15px" }}>
        <h3>Create New Quiz</h3>
        <input className="inst-input" placeholder="Quiz Name (e.g. Midterm 1)" value={newQuizName} onChange={e=>setNewQuizName(e.target.value)} />
        <button className="inst-btn" style={{ background: "#1a73e8" }} onClick={handleCreateQuiz}>Create Quiz</button>
      </div>

      <h3>Add Question to Existing Quiz</h3>
      <label style={{ fontSize: "13px", color: "#555" }}>Select Target Quiz:</label>
      <select className="inst-input" value={targetQuizId} onChange={e=>setTargetQuizId(e.target.value)}>
        {db.quizzes.map(quiz => (
          <option key={quiz.id} value={quiz.id}>{quiz.name}</option>
        ))}
      </select>

      <input className="inst-input" placeholder="Question Text..." value={q} onChange={e=>setQ(e.target.value)} />
      {opts.map((o, i) => (
        <div key={i} className="opt-row">
          <input type="radio" checked={ans===i} onChange={()=>setAns(i)} />
          <input className="inst-input opt-input" placeholder={`Option ${i+1}`} value={o} onChange={e=>{
            const n = [...opts]; n[i] = e.target.value; setOpts(n);
          }} />
        </div>
      ))}
      
      <button className="inst-btn" onClick={handleAddQuestion}>Add Question</button>
      <button className="back-btn" onClick={() => setView("cover")}>Back Home</button>
    </div>
  );
}