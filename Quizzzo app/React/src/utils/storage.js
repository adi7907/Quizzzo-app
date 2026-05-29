const DEFAULT_QUIZZES = [
  {
    id: 1,
    name: "sample quiz",
    questions: [
      { id: 1, q: "What is 2+2?", options: ["3", "4", "5", "22"], answer: 1 }
    ]
  }
];

export const setLs = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export const getLs = (k) => {
  const data = localStorage.getItem(k);
  
  if (k === "qz_quizzes" && !data) {
    setLs("qz_quizzes", DEFAULT_QUIZZES);
    return DEFAULT_QUIZZES;
  }
  
  return JSON.parse(data || "[]");
};