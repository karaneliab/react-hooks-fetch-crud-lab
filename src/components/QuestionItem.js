import React from "react";

 
function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(id); 
      } else {
        console.log('Error with status:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  
  const handleAnswerChange = async (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10); 
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      });

      if (response.ok) {
        onUpdate(id, newCorrectIndex); 
      } else {
        console.log('Error with status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
      
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;


