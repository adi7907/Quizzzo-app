import "./index.css";

export default function Cover({ setView }) {
  const handleClearData = () => {
    localStorage.clear();
    window.location.reload(); 
  };

  return (
    <div className="cover-wrap">
      <h1 className="cover-title">Quizzzo</h1>
      <p className="cover-sub">Where learning is made easy</p>
      
      <div className="cover-btns">
        <button className="cover-btn" onClick={() => setView("student")}>Student Login</button>
        <button className="cover-btn inst-btn" onClick={() => setView("instructor")}>Instructor Login</button>
        <button className="cover-btn" onClick={() => setView("database")} style={{background: "#34a853"}}>Database</button>
      </div>

      <button className="tiny-clear-btn" onClick={handleClearData}>
         Clear Data
      </button>
    </div>
  );
}