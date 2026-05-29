import { setLs } from "../../utils/storage";
import "./index.css";

export default function Quiz({ quiz, step, setStep, score, setScore, name, dbA }) {
  const curQ = quiz.questions[step - 1];

  const handleFinish = (finalScore) => {
    const newAtt = [...dbA, { 
      name, 
      quizName: quiz.name, // Record which specific quiz was completed
      score: finalScore, 
      total: quiz.questions.length, 
      date: new Date().toLocaleString() 
    }];
    setLs("qz_att", newAtt);
    window.open("?view=admin", "_blank");
    setStep(-1);
  };

  const handleOptionClick = (index) => {
    const newScore = score + (index === curQ.answer ? 1 : 0);
    setScore(newScore);
    step < quiz.questions.length ? setStep(step + 1) : handleFinish(newScore);
  };

  if (!curQ) return null;

  return (
    <div>
      <p className="progress">Quiz: <b>{quiz.name}</b> | Question {step} of {quiz.questions.length}</p>
      <h3 className="q-text">{curQ.q}</h3>
      {curQ.options.map((opt, i) => (
        <button key={i} className="opt-btn" onClick={() => handleOptionClick(i)}>
          {opt}
        </button>
      ))}
    </div>
  );
}