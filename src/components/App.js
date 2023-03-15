import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json())
      .then(questions => setQuestions(questions))
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleChangeCorrectIndex(updatedQuestion) {
    console.log("in app:", updatedQuestion)
    const updatedQuestionIndex = questions.map(question => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestionIndex)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : 
      <QuestionList 
        questions={questions} 
        onDeleteQuestion={handleDeleteQuestion} 
        onSelectIndex={handleChangeCorrectIndex}
      />}
    </main>
  );
}

export default App;
