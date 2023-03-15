import React from "react";

function QuestionItem({ question, onDeleteQuestion, onSelectedIndex }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleChange(e) {
    console.log("orig queston:", question)
    const updatedQuestion = {
      ...question, 
      correctIndex: parseInt(e.target.value)
    }
    // console.log(updatedQuestion)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion)
    })
      .then(resp => resp.json())
      .then(updatedQuestion => onSelectedIndex(updatedQuestion))
      
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then(resp => resp.json())
      .then(() => onDeleteQuestion(question))
  }
    

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
