import { useState } from "react";
import Cover from "./components/Cover";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import Instructor from "./components/Instructor";
import Database from "./Database";
import { getLs } from "./utils/storage";
import "./App.css";
export default function App() {
  const isAdmin = new URLSearchParams(window.location.search).get("view") === "admin";
  const [db, setDb] = useState({ quizzes: getLs("qz_quizzes"), a: getLs("qz_att") });
  const [view, setView] = useState("cover"); 
  const [step, setStep] = useState(0); 
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState("");

  if (isAdmin) return <Dashboard db={db} />;

  const activeQuiz = db.quizzes.find(q => q.id === Number(selectedQuizId)) || db.quizzes[0];

  return (
    <div className="app-container" style={view === "database" ? { maxWidth: '100%', background: 'transparent', border: 'none', margin: 0, padding: 0 } : {}}>
      {view === "cover" && <Cover setView={setView} />}
      {view === "instructor" && <Instructor db={db} setDb={setDb} setView={setView} />}
      {view === "database" && <Database db={db} setDb={setDb} setView={setView} />}

      {view === "student" && (
        <>
          {step === 0 && (
            <Login 
              name={name} 
              setName={setName} 
              setStep={setStep} 
              quizzes={db.quizzes} 
              selectedQuizId={selectedQuizId}
              setSelectedQuizId={setSelectedQuizId}
              setView={setView} 
            />
          )}
          {step > 0 && activeQuiz && (
            <Quiz 
              quiz={activeQuiz} 
              step={step} 
              setStep={setStep} 
              score={score} 
              setScore={setScore} 
              name={name} 
              dbA={db.a}
            />
          )}
          {step === -1 && activeQuiz && (
            <div className="result-screen">
              <h2>Quiz Complete!</h2>
              <h1 className="score-text">{score} / {activeQuiz.questions.length}</h1>
              <p>Analytics have opened in a new tab.</p>
              <button className="back-btn" onClick={() => { setStep(0); setView("cover"); setName(""); }} style={{marginTop: 20}}>Go Home</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}