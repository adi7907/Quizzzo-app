const url = new URLSearchParams(window.location.search);
const getLs = (k) => JSON.parse(localStorage.getItem(k) || "[]");
const setLs = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let db = { q: getLs("qz_q"), attempts: getLs("qz_att") };
let qIdx = 0, score = 0, sName = "";

// --- Admin Routing ---
if (url.get('view') === 'admin') {
  document.getElementById('panel-quiz').style.display = 'none';
  document.getElementById('panel-analytics').style.display = 'block';
  document.getElementById('attempt-tbody').innerHTML = db.attempts.map((a, i) => 
    `<tr><td>${i+1}</td><td>${a.name}</td><td>${a.score}/${a.total}</td><td>${a.date}</td></tr>`
  ).join('');
}

// --- Quiz Engine ---
window.startQuiz = () => {
  sName = document.getElementById("student-name").value || "Student";
  if (!db.q.length) return alert("No questions yet!");
  document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
  document.getElementById("view-quiz").classList.remove('hidden');
  renderQ();
};

const renderQ = () => {
  let q = db.q[qIdx];
  document.getElementById("progress-txt").textContent = `Q ${qIdx+1} of ${db.q.length}`;
  document.getElementById("q-text").textContent = q.q;
  document.getElementById("options-area").innerHTML = q.options.map((o, i) => 
    `<label class="option-label"><input type="radio" name="opt" value="${i}"> ${o}</label>`
  ).join('');
};

window.nextQ = () => {
  const sel = document.querySelector('input[name="opt"]:checked');
  if (!sel) return alert("Pick an option!");
  if (parseInt(sel.value) === db.q[qIdx].answer) score++;
  
  if (++qIdx < db.q.length) renderQ();
  else {
    db.attempts.push({ name: sName, score, total: db.q.length, date: new Date().toLocaleString() });
    setLs("qz_att", db.attempts);
    window.open("?view=admin", "_blank"); // Pops new tab
    
    document.getElementById("view-quiz").classList.add('hidden');
    document.getElementById("view-result").classList.remove('hidden');
    document.getElementById("score-display").textContent = `${score} / ${db.q.length}`;
  }
};