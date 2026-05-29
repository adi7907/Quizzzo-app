import "./index.css";

export default function Login({ name, setName, setStep, quizzes, selectedQuizId, setSelectedQuizId, setView }) {
  
  // Set default selection if empty
  if (!selectedQuizId && quizzes.length > 0) {
    setSelectedQuizId(quizzes[0].id);
  }

  const handleStart = () => {
    if (!name.trim()) return alert("Enter your name!");
    const currentQuiz = quizzes.find(q => q.id === Number(selectedQuizId)) || quizzes[0];
    if (!currentQuiz || currentQuiz.questions.length === 0) return alert("This quiz has no questions yet!");
    setStep(1);
  };

  return (
    <div className="login-box">
      <h3>Student Login</h3>
      <input 
        className="login-input" 
        placeholder="Enter name..." 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      
      <label style={{ display: "block", margin: "10px 0 5px", fontSize: "14px", color: "#555" }}>Select Quiz:</label>
      <select 
        className="login-input" 
        style={{ marginTop: 0, marginBottom: "15px" }}
        value={selectedQuizId} 
        onChange={(e) => setSelectedQuizId(e.target.value)}
      >
        {quizzes.map(quiz => (
          <option key={quiz.id} value={quiz.id}>{quiz.name}</option>
        ))}
      </select>

      <button className="login-btn" onClick={handleStart}>Start Quiz</button>
      <button className="back-btn" onClick={() => setView("cover")}>Back to Home</button>
    </div>
  );
}