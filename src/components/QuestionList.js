import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onSelectIndex}) {
  
  function handleDeleteQuestion(deletedQuestion) {
    onDeleteQuestion(deletedQuestion)
  }

  function handleChangeCorrectIndex(updatedQuestion) {
    onSelectIndex(updatedQuestion)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => (
        <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} onSelectedIndex={handleChangeCorrectIndex}/>
      ))}</ul>
    </section>
  );
}

export default QuestionList;
